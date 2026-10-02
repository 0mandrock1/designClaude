# designClaude

**mandrock0** — a dark-only shadcn/ui component library: 71 components, each with working
Storybook stories, a role-colour layer (`action` / `info` / `ok` / `alive`), a true-black accent
(`--void`), a chaos layer (deterministic debris + glitches) and a set of deliberately pointless
interactives. It is the source of truth for the mandrock.me layout and is synced into
Claude Design with `/design-sync`.

## Stack

- React + TypeScript + Vite, Tailwind v4
- [shadcn/ui](https://ui.shadcn.com/) components (`src/components/ui`)
- Storybook 10
- Oxlint

## Getting started

```bash
npm install
npm run dev          # Vite dev server
npm run storybook    # Storybook on http://localhost:6006
```

## Scripts

- `npm run build` — type-check and build
- `npm run build-storybook` — static Storybook build
- `npm run lint` — Oxlint

## System rules

These apply to every page and screen built with the library. They are rules of the system, not
suggestions. (The copy that `/design-sync` ships to Claude Design lives in
[`.design-sync/conventions.md`](.design-sync/conventions.md) — keep the two in step.)

### 1. At least 3 pointless interactives per screen

Elements that react to hover / click / drag and do nothing: `DudButton`, `FidgetSwitch`,
`PointlessSlider`, `FidgetDial`, `BubbleWrap`. The quickest way to meet the floor is one
`PointlessScatter count={3}` in a dead gutter or empty corner. Never in the primary action path,
never over real content.

Every one takes a `tone` (`action | info | ok | alive` — the four role colours) and `debris`. They
are `aria-hidden` and outside the tab order on purpose: a control that announces itself as a
button and does nothing is a lie to a screen reader. The prop is `tone`, not `role`, because `role`
is the ARIA attribute.

```tsx
<PointlessScatter seed="gutter" count={3} kinds={['dud', 'switch', 'dial']} />

<DudButton tone="info">натисни</DudButton>
<FidgetSwitch tone="ok" defaultOn />
<PointlessSlider tone="alive" seed="mood" debris />
```

The `Ambient` layer adds pointer toys of its own — the dot lattice, sparks, trail and reticle from
the mandrock.me homepage (`AmbientToys`): `calm` has none, `default` lights the lattice, `hostile`
runs all four. They count as atmosphere, **not** toward the floor of three.

### 2. Glitch budget per screen

- `--glitch-budget` is **1** by default and **0** under `prefers-reduced-motion`. The system forces
  this; no subtree can override it.
- Raise it only on showcase/landing screens: `<Ambient mode="hostile" glitch={2}>`.
- `--glitch-ceiling` is **4** and hard: whatever the budget, no glitch moves more than 4px.
- At most **2** `idle` hosts per screen. `alive` is only for a real running process.
- Glitch kinds: `shift`, `slice`, `split`, `flicker`, `skew`, `drop`. Narrow them with
  `<Debris glitch={['slice', 'split']} />`, or silence them with `glitch="off"`.
- **Readability:** `GlitchText` is for labels and headings of ~4 words, never body copy. It
  glitches an `aria-hidden` ghost in `::before`; the text itself is never moved, clipped or
  recoloured. Decoration content stays in `::before`, never in the DOM.

```tsx
<Ambient mode="hostile" glitch={2}>
  <GlitchText trigger="alive">стрім іде</GlitchText>
  <Debris seed={7} name="job" count={4} glitch="split" idle />
</Ambient>
```

### 3. Where to use `--void`

`--void` is `oklch(0 0 0)` — real black; `--background` is a tinted near-black and is not.

- **Use it for:** inverted `Button` / `Badge` (`variant="void"` and `"invert"`), the heavy
  `Separator variant="void"`, `Plate` status strips, wells behind the toys, and as black ink on a
  paper (`bg-foreground`) surface.
- **Never** as a page or card background.
- **Never as a bare edge.** Void against `--background` is only ~1.04:1 (against `--card` ~1.11:1),
  so it does not read as a boundary by itself. Frame it with `border-border` or a `tone` edge, or
  fill it with text.
- **Contrast (WCAG AA, text on void):** foreground 18.6, muted-foreground 7.2, info 12.1, ok 15.0,
  action 4.9, alive 5.3 — every token passes. Void *as text* on a role fill: info 12.1, ok 15.0,
  action 4.9, alive 5.3; on `--foreground` 18.6.

```tsx
<Button variant="void">Деплой</Button>
<Button variant="invert">Підтвердити</Button>
<Badge variant="void" className="text-alive">alive</Badge>
<Separator variant="void" />
<Plate tone="ok"><PlateLabel>ok</PlateLabel>412s · 0 помилок</Plate>
```

## Component coverage

All components under `src/components/ui` have a matching Storybook story. Run `npm run storybook`
to browse them interactively.

## Used by

- **[mandrockspalace](https://github.com/0mandrock1/mandrockspalace)** — the branded build on top of
  this library, with a `BRANDBOOK.md` documenting the tokens.
