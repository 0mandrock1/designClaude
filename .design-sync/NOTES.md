# design-sync notes — designClaude / mandrock0

Repo-specific gotchas for future syncs. One bullet per finding.

## Repo shape

- This repo is a **Vite app**, not a published library: `package.json` is `private`, has no
  `main`/`module`/`exports`, and `dist/` is an app build (hashed `index-*.js` + `index.html`),
  not a component dist. The converter therefore runs in **synth-entry mode** (`[NO_DIST]` is
  expected and not an error) — it synthesizes an entry that re-exports every `.tsx` under
  `cfg.srcDir`.
- `cfg.srcDir` is pinned to **`src/components`**, not the default `src`. Synth-entry mode
  re-exports every `.tsx` under the source root, and `src/main.tsx` calls `createRoot(...).render()`
  at module scope — pulling it into the bundle would run the whole app on import. `src/components`
  holds exactly `ui/` (the 60 shadcn components) and `debris/` (the chaos-layer overlay the stories
  use), which is the real component surface.
- No `buildCmd` is set on purpose: `npm run build` builds the *app*, which the converter never
  reads. Only the Storybook reference needs rebuilding when the DS source changes.
- `cfg.tsconfig` is `tsconfig.app.json` (not `tsconfig.json`, which is a solution file with only
  `references`). That's where the `@/* -> ./src/*` path alias lives, and esbuild needs it to
  resolve `@/…` imports in synth-entry mode.

## Styling

- Tailwind v4. `src/index.css` is *source* (`@import "tailwindcss"`), not compiled CSS, so
  `cfg.cssEntry` is deliberately unset — the converter scrapes the **compiled** CSS out of the
  storybook reference build (`[CSS_FROM_STORYBOOK]`), which is the correct path for this repo.
  `.storybook/preview.tsx` imports `../src/index.css`, so the reference build contains it.
- Dark-only design system: the palette lives in `:root` (not `.dark`) so first paint is already
  dark. `.dark` is kept as a no-op alias for code that still toggles the class.
- Fonts come from `@fontsource-variable/geist` via an `@import` in `src/index.css`.

## Stories

- Story titles are `Components/<PascalName>`, which pair with export names directly — no
  `titleMap` entries needed for components.
- `src/stories/System.stories.tsx` (title `Design System/mandrock0`) is a palette/typography
  showcase, not a component. Excluded via `titleMap: {"mandrock0": null}`.
- Many components carry a `Debris (chaos layer)` story that composes `src/components/debris/Debris.tsx`
  over the component. These are real stories and are synced.

## Fixes found during the sync

- `[GENERAL]` **Preview cards rendered on white while the DS is dark-only.** Symptom: every
  preview card had a white page background; ghost/link button variants were effectively
  invisible, while the storybook reference rendered on the dark plum surface. Root cause: the
  card template (`lib/emit.mjs`, app-contract surface — must not be forked) hardcodes an
  **unlayered** `body{margin:0;padding:24px;background:#fff}`, while `src/index.css` declares
  `body { @apply bg-background }` inside `@layer base`. Unlayered styles beat layered ones
  outright, so specificity and source order can't rescue it. Fix: an **unlayered**
  `html body { background-color: var(--background); color: var(--foreground) }` appended at the
  end of `src/index.css` — no-op for the app, but it survives any host page that sets its own
  body background. Do not "fix" this per-component.
- `[NO_DIST]` from the first run was resolved by `cfg.entry` + `cfg.extraEntries` both pointing at
  `.design-sync/entry.ts`. The `entry` makes the bundle; the `extraEntries` copy is what feeds the
  **export gate** — without it `exportedNames()` finds no `.d.ts` tree, `exported` is empty, and all
  60 storybook titles get dropped as `[TITLE_UNMAPPED]`. Both keys are required; dropping either
  silently empties the sync.
- `titleMap` needed for 3 components whose story title != export name:
  `Chart -> ChartContainer`, `Resizable -> ResizablePanelGroup`, `Sonner -> Toaster`.
- `[TOKENS_MISSING]` (7 vars: `--accordion-panel-height`, `--drawer-swipe-*`, `--nested-drawers`,
  `--tw`) is **triaged and expected** — these are set at runtime by base-ui components via inline
  style, not defined in any stylesheet. Not a real gap; don't chase it on future syncs.
- `[GRID_OVERFLOW]`: 10 components need `cardMode: "column"` (stories wider than a grid cell) and
  2 need `cardMode: "single"` (fixed/portal content escapes any cell: Progress, Sidebar). All are
  recorded in `cfg.overrides`.
- `[GENERAL]` **Stories with `play()` interactions make the storybook panel show a POST-interaction
  state while the preview shows the initial render.** 9 components use `userEvent` in `play()`:
  accordion, button, checkbox, dialog, radio-group, select, switch, tabs, toggle. Storybook executes
  `play`, the compiled previews do not — so e.g. Checkbox/Default is checked on the reference and
  unchecked in the preview, and Accordion/Default has a different item open. In every such case the
  **preview is the correct initial render** and the reference is the artifact; graded `match` with a
  per-story note. Do NOT "fix" these by faking interaction state in an owned preview — that would
  destroy the fidelity being verified.

## Re-sync risks

What can silently go stale — check these first on the next sync.

- **`html body` in `src/index.css` is load-bearing.** It looks like a redundant duplicate of the
  `@layer base` `body` rule and a tidy-up would delete it. If it goes, EVERY preview card reverts
  to a white page background (the card template's unlayered `body{background:#fff}` wins) and the
  ghost/link variants become invisible. Keep it, and keep it unlayered.
- **`.design-sync/entry.ts` is generated, not hand-maintained.** Adding or removing a component
  under `src/components/` requires re-running `.design-sync/gen-entry.sh`. Skip it and the new
  component is missing from the bundle, its storybook title drops out as `[TITLE_UNMAPPED]`, and
  the sync silently ships 59 components instead of 60.
- **`conventions.md` enumerates class names verified against THIS build.** Tailwind v4 compiles
  only the utilities actually used, so the shipped class set changes whenever component code
  changes. On re-sync, re-run the validation pass (grep each documented class against
  `ds-bundle/_ds_bundle.css`) and fix or cut any name that no longer resolves. Known-absent today
  and deliberately documented as such: `text-action`, `text-accent-cyan`, `text-accent-lime`,
  `bg-chart-1`, `text-xl`, `text-2xl`, `space-y-4`, `grid-cols-3`.
- **The storybook reference must be rebuilt whenever `src/` changes.** The component CSS is
  scraped from it (`[CSS_FROM_STORYBOOK]`), so a stale reference means grading against the old
  design AND shipping the old stylesheet. `[REFERENCE_STALE?]` in the capture log means it was
  forgotten.
- **InputOTP and Toaster were verified by manual capture, not by the compare harness.** The
  harness waits for the first non-style/script child of `#storybook-root` to become *visible*;
  `input-otp` emits `<noscript>` first and `sonner` an empty `<section>`, both invisible, so it
  times out and reports a false `sb-error`. Both stories DO render (confirmed over HTTP and in the
  product card). They are NOT `skip`ped — skipping would replace two working cards with floor
  cards. If a future harness version fixes the visibility probe, these should grade normally; if
  they still report `sb-error`, re-verify by manual capture rather than skipping.
- **Nine components are graded against a post-interaction reference.** accordion, button, checkbox,
  dialog, radio-group, select, switch, tabs, toggle run `userEvent` in `play()`. Their `Default`
  grades carry a "reference is the artifact" note. If those play functions change what they click,
  the notes go stale — re-read them rather than trusting the verdict.
- **Story cap is `--max-stories 7`**, chosen because Button (7) is the only component above the
  default 6. If any component gains an 8th story it will be silently uncapped-but-uncaptured —
  raise the flag to match.
- **`[TOKENS_MISSING]` (7 vars) is triaged, not unresolved.** `--accordion-panel-height`,
  `--drawer-swipe-*`, `--nested-drawers`, `--tw` are set at runtime by base-ui via inline style.
  Expected absence; do not chase.
- **This sync used no fan-out subagents** (the user's global config forbids the Agent tool unless
  asked), so `.design-sync/learnings/` was never created. A future run that does fan out must fold
  learnings before the driver will pass.
