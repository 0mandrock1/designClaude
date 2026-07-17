# mandrockspalace — brand tokens (compact v1)

Design tokens live in `src/index.css` as CSS variables (oklch), consumed by shadcn/ui components via Tailwind v4's `@theme inline`. This file documents the intent behind them — the source of truth for values is `src/index.css` itself.

## Typography

- **Geist Variable** (`@fontsource-variable/geist`), sans-serif, already wired as `--font-sans` / `--font-heading`. No custom typeface yet — revisit once a wordmark/logo exists.

## Color themes

Two themes, switched by the existing `.dark` class on `<html>`/root (shadcn convention — no new mechanism introduced).

### Light — warm earthy / muted
Sand/cream background, deep brown foreground, terracotta primary, olive-green accent. Muted, low-saturation — the calm counterpart to dark mode.

| Token | Role |
|---|---|
| `--background` | warm sand `oklch(0.97 0.015 80)` |
| `--primary` | terracotta `oklch(0.55 0.12 40)` |
| `--accent` | olive `oklch(0.68 0.09 135)` |

### Dark — charcoal + neon accent ("shader" mode)
Charcoal/deep-brown base (`--background: oklch(0.17 0.012 40)`) with one of three neon accents driving `--primary` / `--accent` / `--ring` via `--accent-shader`:

| Accent | Attribute | Value |
|---|---|---|
| Purple (default) | *(none)* | `oklch(0.62 0.27 300)` |
| Cyan | `data-accent="cyan"` | `oklch(0.75 0.15 200)` |
| Lime | `data-accent="lime"` | `oklch(0.85 0.22 130)` |

Usage: `<html class="dark" data-accent="cyan">`. All three raw values are always available as `--accent-purple` / `--accent-cyan` / `--accent-lime` regardless of which is active, so a picker/toggle can reference them directly.

## Interaction motif — "lightning strikes / shader"

Two utility classes in `src/index.css` (`@layer utilities`), built on a `--glow` token that resolves per-theme (terracotta glow in light, accent-colored glow in dark):

- **`.shader-glow`** — add to any interactive element; on hover/focus it gets a soft accent-colored box-shadow ring (the "energy" cue).
- **`.shader-gradient-text`** — animated-ready gradient text clip using `--primary` → `--glow` → `--primary`, for hero/emphasis text.

Neither replaces shadcn's existing focus-ring/hover states — they're additive, opt-in flourishes for brand moments (hero CTAs, feature highlights), not applied globally to every button.

## Status

This is a v1 pass sized for the current Storybook/design-sync work — enough real tokens and idiom for a design agent (or `/design-sync`'s conventions.md) to build on-brand. No logo, no full type scale, no dedicated typeface yet; expand here when those exist.
