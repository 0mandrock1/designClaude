import type { Meta, StoryObj } from '@storybook/react-vite'

import { Debris } from '@/components/debris/Debris'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const meta = {
  title: 'Design System/mandrock0',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Swatch({ name, cssVar, className }: { name: string; cssVar: string; className: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={`h-14 w-full rounded-card border border-border ${className}`}
      />
      <div className="flex flex-col">
        <span className="font-mono text-[11px] leading-tight text-foreground">{name}</span>
        <span className="font-mono text-[10px] leading-tight text-muted-foreground">{cssVar}</span>
      </div>
    </div>
  )
}

export const Palette: Story = {
  render: () => (
    <div className="flex flex-col gap-8 bg-background p-8">
      <div>
        <h2 className="font-heading text-lg font-bold tracking-tight text-foreground">
          Поверхні
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Swatch name="background" cssVar="--background" className="bg-background" />
          <Swatch name="card" cssVar="--card" className="bg-card" />
          <Swatch name="popover" cssVar="--popover" className="bg-popover" />
          <Swatch name="muted" cssVar="--muted" className="bg-muted" />
        </div>
      </div>

      <div>
        <h2 className="font-heading text-lg font-bold tracking-tight text-foreground">
          Ролі — дія / інфо / готово / живе
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Swatch name="action" cssVar="--action" className="bg-action" />
          <Swatch name="info" cssVar="--info" className="bg-info" />
          <Swatch name="ok" cssVar="--ok" className="bg-ok" />
          <Swatch name="alive" cssVar="--alive" className="bg-alive" />
        </div>
      </div>

      <div>
        <h2 className="font-heading text-lg font-bold tracking-tight text-foreground">
          Акценти
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Swatch name="accent-purple" cssVar="--accent-purple" className="bg-accent-purple" />
          <Swatch name="accent-cyan" cssVar="--accent-cyan" className="bg-accent-cyan" />
          <Swatch name="accent-lime" cssVar="--accent-lime" className="bg-accent-lime" />
          <Swatch name="accent-crimson" cssVar="--accent-crimson" className="bg-accent-crimson" />
        </div>
      </div>

      <div>
        <h2 className="font-heading text-lg font-bold tracking-tight text-foreground">
          Дестрактив зсунуто — не крімзон
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Swatch name="destructive" cssVar="--destructive (hue ~38)" className="bg-destructive" />
        </div>
      </div>
    </div>
  ),
}

export const GlowLevels: Story = {
  name: 'Три сили глоу',
  render: () => (
    <div className="flex flex-col gap-6 bg-background p-8">
      <p className="font-mono text-xs text-muted-foreground">
        одна змінна --glow, три сили. ніколи три кольори.
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <div className="flex h-24 items-center justify-center rounded-card border border-border bg-card font-mono text-xs text-muted-foreground shadow-glow-ambient">
            ambient
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">
            ледь-ледь, поверхні у спокої
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex h-24 items-center justify-center rounded-card border border-border bg-card font-mono text-xs text-muted-foreground shadow-glow-attention">
            attention
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">
            виражений, треба увага
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex h-24 items-center justify-center rounded-card border border-border bg-card font-mono text-xs text-muted-foreground shadow-glow-interaction">
            interaction
          </div>
          <span className="font-mono text-[10px] text-muted-foreground">
            різкіший, hover / focus / active
          </span>
        </div>
      </div>
    </div>
  ),
}

export const Typography: Story = {
  name: 'Типографіка',
  render: () => (
    <div className="flex flex-col gap-6 bg-background p-8">
      <div>
        <span className="font-mono text-[10px] text-muted-foreground">display / заголовки</span>
        <p className="font-heading text-3xl font-black tracking-tight text-foreground">
          Обличчя системи
        </p>
      </div>
      <div>
        <span className="font-mono text-[10px] text-muted-foreground">sans / тіло (Geist)</span>
        <p className="max-w-md text-sm text-foreground">
          Тіло тексту сидить на Geist. Спокійно, без зайвого характеру — характер живе в
          заголовках, мікротексті та в debris.
        </p>
      </div>
      <div>
        <span className="font-mono text-[10px] text-muted-foreground">
          mono / мікротекст, мета, цифри
        </span>
        <p className="font-mono text-sm text-foreground">v0.3.1 · idle · 47ms · render ok</p>
      </div>
    </div>
  ),
}

export const DebrisShowcase: Story = {
  name: 'Debris у дії',
  render: () => (
    <div className="flex flex-col gap-6 bg-background p-8">
      <p className="font-mono text-xs text-muted-foreground">
        сід від id/індексу. Math.random заборонено — рендер мусить бути стабільний.
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card id="debris-idle" debris className="h-40">
          <CardHeader>
            <CardTitle>idle</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">осад статичний, процес не біжить.</p>
          </CardContent>
        </Card>
        <Card id="debris-alive" className="relative h-40 overflow-hidden">
          <CardHeader>
            <CardTitle>alive</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">процес живий — пульс від --alive.</p>
          </CardContent>
          <Debris seed="debris-alive" name="system-card" alive count={4} />
        </Card>
        <Card id="debris-dense" debris className="h-40" />
      </div>
    </div>
  ),
}
