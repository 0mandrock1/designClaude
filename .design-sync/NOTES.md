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
  `ds-bundle/_ds_bundle.css`) and fix or cut any name that no longer resolves. Known-absent as of
  2026-10-02 and documented as such: `space-y-8`, `grid-cols-5`, `gap-12`, `p-12`, `text-7xl`,
  `h-screen`, `bg-chart-6`. (`text-xl`, `text-2xl`, `space-y-4`, `grid-cols-3`, `text-accent-*` and
  `bg-chart-1` became present once the void/glitch stories used them; the compiled set grows with
  the stories.)
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

## mandrock.me layout import (2026-08-25)

The `mandrock.me` Claude Design export (`dc.html` + tailwind bundle) was folded back into the
library: the palette was re-tuned to the layout's values and three of its structures were
extracted as components. What a future sync needs to know:

- **The palette moved off the plum hues onto crimson/magenta.** `--accent-purple`, `--accent-lime`,
  `--background`, `--foreground`, `--card`, `--popover`, `--secondary`, `--muted`,
  `--muted-foreground`, `--border` and `--input` all changed value in `src/index.css`.
  `--accent-cyan`, `--accent-crimson` and `--destructive` did not. Every screenshot and captured
  card from before this date grades against the old palette — a diff against them is expected,
  not a regression.
- **`button.stories.tsx` / `CssCheck` asserts the resolved `--primary` literally**
  (`oklch(0.7 0.3 320)`). It is the only test in the repo that hardcodes a token *value*, so it
  fails the moment `--accent-purple` is retuned again. That is deliberate — it is the tripwire
  proving the theme actually loaded — but it must be updated in the same commit as the token.
  Note the assertion uses the browser's serialized form (`0.7 0.3`), not the authored `70% .30`.
- **Two components were added: `Ambient` and `ArtistSlot`.** Both went through
  `.design-sync/gen-entry.sh` and both carry `cardMode: "column"` overrides in `config.json`.
- **`ArtistsPanel` deliberately inverts the palette to print** — `--artists-paper` / `--artists-ink`
  and friends in `src/index.css`, registered in `@theme inline` so `bg-artists-paper` and the
  `border-artists-ink/30` opacity modifiers compile. It is the one light surface in a dark-only
  system, and it is scoped to the panel. Do not "fix" it toward the dark tokens.
- **`Ambient` layers are `position: fixed` by default**, which escapes any preview cell. The
  stories all pass `anchor="absolute"` so they stay inside their frame; `cardMode: "column"` is
  enough and `single` is not needed. If a future story forgets `anchor`, its card will paint over
  the whole preview page.
- **`Ambient` sits at 6 stories and `ArtistSlot` at 7 — the cap.** `calm` and `hostile` were
  deliberately folded into the single `Modes` story rather than given their own, to stay under
  `--max-stories 7`. Adding one more story to either needs the flag raised in the same change.

## void / glitch / pointless layer (2026-10-02)

- **Palette:** `dff90b8`'s crimson palette (`oklch(11% .105 14)` background, purple `70% .30 320`) was
  superseded by `d1a5318` on master — production mandrock.me ships master's values. Master wins;
  `Ambient`, `ArtistSlot`, `--artists-*` and Card `alive` from `dff90b8` are kept. `CssCheck` in
  `button.stories.tsx` asserts `oklch(0.62 0.27 300)` again.
- **New tokens/utilities:** `--void` (`bg-void` `text-void` `text-void-foreground` `border-void`),
  `--glitch-ceiling`, per-element `--glitch-k` (the clamped budget every keyframe reads).
- **New components (9):** `Plate`, `GlitchText`, `DudButton`, `FidgetSwitch`, `PointlessSlider`,
  `FidgetDial`, `BubbleWrap`, `PointlessScatter`, `AmbientToys` (71 `ui` components total). `Debris`
  got `glitch` / `idle` props and its own story file. Button and Badge gained `void` / `invert`
  variants, Separator `variant="void"`, Ambient `toys` / `seed`. All prop their role colour as
  `tone`, not `role` (ARIA collision).
- **`--max-stories` must be 8**: Button is now at 8 (Default, CssCheck, Variants, Sizes, Disabled,
  WithIcon, Void, WithDebris). Ambient is at 7 (the old cap) after the `Toys` story.
- **Ambient `default` mode now paints the dot lattice** (`TOYS_BY_MODE`), so every earlier Ambient
  grade differs from today's render — expected, not a regression.
- **New `play()` stories → the reference shows post-interaction state:** `DudButton/Pressed`,
  `FidgetSwitch/Flipped`, `BubbleWrap/Popped`, `GlitchText/ReadabilityCheck`, `Button/Void`. Same
  rule as the nine older ones: the compiled preview is the correct initial render.
- **Pointer toys are canvas/pointer driven** (`AmbientToys`, `FidgetDial`, `PointlessSlider`,
  `FidgetSwitch`) — static captures only show the resting state. Their `anchor="absolute"` stories
  keep the canvas inside the card; a forgotten `anchor` paints over the whole preview page.
- **Hover glitch fix:** debris bits are `pointer-events-none`, so `.debris-bit:hover` never matched.
  The trigger is now `*:hover > [data-slot="debris"] > .debris-bit` — the host's hover.
- **Rebuild the reference before syncing** (`npx storybook build -o .design-sync/sb-reference`): the
  compiled CSS is scraped from it, and `border-void` / `text-void` only exist because stories use them.
