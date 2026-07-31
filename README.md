# designClaude

A neutral shadcn/ui component library scaffold with full Storybook coverage — 60 components, each
with a working `.stories.tsx`. No branding, no opinionated theme: this is the base you fork when you
want a component library of your own and don't want to wire up 60 stories by hand first.

## Stack

- React + TypeScript + Vite
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

## Component coverage

All 60 components under `src/components/ui` have a matching Storybook story. Run `npm run storybook`
to browse them interactively.

## Used by

- **[mandrockspalace](https://github.com/0mandrock1/mandrockspalace)** — the branded build on top of
  this scaffold: warm-earthy light theme, charcoal/neon dark theme (purple / cyan / lime accents),
  with a `BRANDBOOK.md` documenting the tokens.

Fork this one when you want a clean slate; fork that one when you like the palette.

## Status

Stable and intentionally boring. It only changes when shadcn/ui or Storybook ship something that
breaks the stories.
