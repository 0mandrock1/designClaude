# designClaude

A shadcn/ui component library scaffold with full Storybook coverage — 60 components, each with working `.stories.tsx` files.

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

All 60 components under `src/components/ui` have a matching Storybook story. Run `npm run storybook` to browse them interactively.
