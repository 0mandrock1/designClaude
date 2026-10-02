## mandrock0 — how to build with this library

**Dark-only.** There is no light theme. The palette lives on `:root` (not `.dark`), so the first
paint is already dark; `.dark` remains as a no-op alias. `styles.css` sets
`html body { background-color: var(--background); color: var(--foreground) }` **unlayered** so a
host page's own body background cannot win. Never add a light background — `ghost` and `link`
button variants, `muted-foreground` text and every border are only legible on the dark surface.

### Setup

No global theme provider is needed — link `styles.css` and render components. Three components
need their own wrapper, and will throw or render inert without it:

- `Sidebar` and friends → wrap in `SidebarProvider` (`useSidebar` reads that context).
- `Tooltip` → wrap in `TooltipProvider`.
- RTL → wrap in `DirectionProvider`.
- `toast()` (from `sonner`) only shows if a `<Toaster />` is mounted somewhere in the tree.

### Styling idiom — Tailwind v4 utilities, but a COMPILED SUBSET

This is the one rule that will silently ruin output if ignored. `_ds_bundle.css` is Tailwind's
**compiled** stylesheet — it contains only the ~610 classes the library's own components and
stories happened to use. A utility that was never used **does not exist**, and writing it produces
no style and no error. Verified examples that are *absent*: `space-y-8`, `grid-cols-5`,
`gap-12`, `p-12`, `text-7xl`, `h-screen`, `bg-chart-6`.

So:

1. Prefer library components over your own markup.
2. For your own layout glue, these are confirmed present: `flex` `grid` `grid-cols-2` `block`
   `hidden` `relative` `absolute` `items-center` `justify-between` `gap-2` `gap-4` `gap-6`
   `p-4` `p-6` `px-3` `py-2` `mt-4` `mb-2` `w-full` `h-full` `max-w-md` `min-w-0` `shrink-0`
   `size-4` `overflow-hidden` `truncate` `text-sm` `text-lg` `font-medium` `font-semibold`
   `font-bold` `leading-none` `tracking-tight` `opacity-50` `font-sans`.
3. **For anything else, use the token directly in a `style` prop** — `var(--*)` always resolves:
   `style={{ fontSize: '1.5rem', color: 'var(--ok)', display: 'grid', gap: '1rem' }}`.

### Vocabulary (real names)

Confirmed utility classes:

| Purpose | Classes |
|---|---|
| Surfaces | `bg-background` `bg-card` `bg-popover` `bg-muted` `bg-secondary` `bg-primary` `bg-accent` `bg-sidebar` |
| Text | `text-foreground` `text-muted-foreground` `text-card-foreground` `text-primary-foreground` `text-destructive` `text-info` `text-ok` `text-alive` |
| Role fills | `bg-action` `bg-info` `bg-ok` `bg-alive` |
| Role text | `text-action` `text-info` `text-ok` `text-alive` |
| Void (true black) | `bg-void` `text-void` `text-void-foreground` `border-void` |
| Brand fills | `bg-accent-purple` `bg-accent-cyan` `bg-accent-lime` `bg-accent-crimson` |
| Lines | `border-border` `ring-ring` `ring-card` `border-sidebar-border` |
| Radius | `rounded-card` `rounded-control` `rounded-lg` `rounded-md` `rounded-full` |
| Glow | `shadow-glow-ambient` `shadow-glow-attention` `shadow-glow-interaction` |

Tokens (always available via `var()`, even where no utility was compiled):
`--background --foreground --card --popover --primary --secondary --muted --muted-foreground
--accent --destructive --border --input --ring --radius --radius-card --radius-control`,
brand `--accent-purple --accent-cyan --accent-lime --accent-crimson --accent-shader`,
roles `--action --info --ok --alive`, `--void` (true black), `--glitch-budget --glitch-ceiling`, glow `--glow --glow-ambient --glow-attention
--glow-interaction`, plus `--sidebar-*` and `--chart-1..5`.

**Glow discipline:** one colour, three strengths — ambient / attention / interaction. Never mix
three different glow colours in one view.

**Role colours carry meaning:** `--action` (purple) = the thing to click, `--info` (cyan) =
neutral notice, `--ok` (lime) = success/complete, `--alive` (crimson) = live/irreversible.

**Chaos layer (optional, signature):** `Debris` renders deterministic decorative fragments —
`<Debris seed={7} name="job" count={3} alive />`. Purely decorative; it lives in `::before` so it
never reaches the a11y tree or text selection. `--glitch-budget` caps animation and drops to `0`
under `prefers-reduced-motion`.

### System rules (mandatory on every page / screen)

These are rules of the system, not suggestions. A screen that breaks them is off-brand.

**1. At least 3 pointless interactives per screen.** Elements that react to hover / click / drag
and do nothing: `DudButton`, `FidgetSwitch`, `PointlessSlider`, `FidgetDial`, `BubbleWrap`. The
quickest way to meet the floor is one `PointlessScatter count={3}` in a dead gutter or empty
corner. Never put one in the primary action path, never over real content. They carry `tone` =
`action | info | ok | alive` (the four role colours) and `debris`. They are `aria-hidden` and out of
the tab order on purpose — a control that announces itself and does nothing is a lie to a screen
reader. (Prop is `tone`, not `role`: `role` is the ARIA attribute.)

**2. Glitch budget per screen.** `--glitch-budget` is `1` by default and `0` under
`prefers-reduced-motion` (the system forces this; nothing can override it). Raise it only on
showcase/landing screens: `<Ambient mode="hostile" glitch={2}>`. `--glitch-ceiling` is `4` and hard —
no glitch ever moves more than 4px. At most **2** `idle` hosts per screen; `alive` only for a
real running process. `GlitchText` is for labels and headings of ~4 words, never body copy: it
glitches a decorative ghost behind the text, the text itself never moves.

**3. Where to use `--void`.** Inverted `Button`/`Badge` (`variant="void"` / `"invert"`), the heavy
`Separator variant="void"`, `Plate` status strips, wells behind toys, and as black ink on a paper
(`bg-foreground`) surface. Never as a page or card background. Void against `--background` is
only ~1.04:1, so it never forms an edge on its own — frame it (`border-border` or a `tone`
edge) or fill it with text. Every text token passes WCAG AA on void (foreground 18.6, muted 7.2,
info 12.1, ok 15.0, action 4.9, alive 5.3).

```jsx
<Ambient mode="hostile" glitch={2} seed="deploys">           {/* showcase screen only */}
  <Plate tone="alive" debris>
    <PlateLabel>alive</PlateLabel>
    <GlitchText trigger="alive">стрім іде</GlitchText>
  </Plate>

  <Card>…</Card>
  <Separator variant="void" />
  <Button variant="void">Деплой</Button>
  <Button variant="invert">Підтвердити</Button>

  {/* rule 1: the floor of three */}
  <PointlessScatter seed="gutter" count={3} kinds={['dud', 'switch', 'dial']} />
</Ambient>

<DudButton tone="info">натисни</DudButton>
<PointlessSlider tone="ok" seed="mood" />
<Debris seed={7} name="job" count={4} glitch={['slice', 'split']} idle />
```

### Where the truth is

Read `_ds/<folder>/styles.css` and its `@import`s before styling — it is the authority on which
classes exist. Per component, read `components/components/<Name>/<Name>.prompt.md` (usage) and
`<Name>.d.ts` (props). All 72 components sit under the single `components` group.

### Idiomatic example

```jsx
<Card className="max-w-md">
  <CardHeader>
    <CardTitle>Деплой</CardTitle>
    <CardDescription>Черга задач рендер-ферми.</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="flex items-center justify-between gap-4">
      <Badge className="bg-ok">Готово</Badge>
      <span style={{ fontSize: '1.25rem', color: 'var(--muted-foreground)' }}>412s</span>
    </div>
  </CardContent>
  <CardFooter className="flex gap-2">
    <Button variant="outline">Відміна</Button>
    <Button>Задеплоїти</Button>
  </CardFooter>
</Card>
```

Note the mix: library components for the controls, confirmed utilities for layout, and an inline
`var(--*)` style for the one size/colour that has no compiled utility.
