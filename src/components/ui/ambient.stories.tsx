import type { Meta, StoryObj } from '@storybook/react-vite'

import { Ambient, AmbientLayer, AmbientSlot } from '@/components/ui/ambient'
import { Badge } from '@/components/ui/badge'

const meta = {
  title: 'Components/Ambient',
  component: Ambient,
} satisfies Meta<typeof Ambient>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Every story pins the layer with `anchor="absolute"`. On a real page the layers
 * are `fixed` so they hold still while the content scrolls past — inside a
 * story that would escape the frame and paint over the whole browser.
 */
const frame = 'h-72 w-[32rem] rounded-card border border-border bg-background'

function Readout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-full place-content-center gap-2 text-center">
      <div className="font-mono text-xs tracking-[.22em] text-muted-foreground uppercase">
        одна людина · три світи
      </div>
      <div className="font-heading text-3xl font-bold tracking-tight">
        mandrock0
      </div>
      <div className="font-mono text-xs text-muted-foreground">{children}</div>
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <Ambient anchor="absolute" className={frame}>
      <Readout>mode=default · сітка · шум · вогнища</Readout>
    </Ambient>
  ),
}

/**
 * The intensity ladder side by side — the whole point of the `mode` prop, and
 * the reason `calm` and `hostile` get no story of their own: the ladder only
 * means anything as a comparison, and the capture cap is 7 stories.
 */
export const Modes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['calm', 'default', 'hostile'] as const).map((mode) => (
        <Ambient
          key={mode}
          mode={mode}
          anchor="absolute"
          className="h-44 w-64 rounded-card border border-border bg-background"
        >
          <div className="grid h-full place-content-center">
            <Badge variant="outline" className="font-mono">
              {mode}
            </Badge>
          </div>
        </Ambient>
      ))}
    </div>
  ),
}

/**
 * `glitch` is a ceiling, not a switch — it scales every glitch in the subtree at
 * once, and 0 stops the motion layers dead without removing them.
 */
export const GlitchBudget: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {[0, 1, 2].map((glitch) => (
        <Ambient
          key={glitch}
          mode="hostile"
          glitch={glitch}
          anchor="absolute"
          className="h-44 w-64 rounded-card border border-border bg-background"
        >
          <div className="grid h-full place-content-center font-mono text-xs text-muted-foreground">
            budget {glitch.toFixed(1)}
          </div>
        </Ambient>
      ))}
    </div>
  ),
}

/** One page can retune the shader without touching the tokens. */
export const AccentOverride: Story = {
  render: () => (
    <Ambient
      mode="hostile"
      accent="oklch(72% .25 350)"
      anchor="absolute"
      className={frame}
    >
      <Readout>accent=oklch(72% .25 350)</Readout>
    </Ambient>
  ),
}

/** Each layer on its own, so it is obvious what the ladder is turning on. */
export const Layers: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(
        [
          'grid',
          'scanlines',
          'sweep',
          'noise',
          'crosshairs',
          'vignette',
          'foci',
        ] as const
      ).map((name) => (
        <div
          key={name}
          className="relative h-36 w-52 overflow-hidden rounded-card border border-border bg-background"
        >
          <AmbientLayer name={name} anchor="absolute" />
          <div className="relative z-1 grid h-full place-content-center font-mono text-[.7rem] text-muted-foreground">
            {name}
          </div>
        </div>
      ))}
    </div>
  ),
}

/**
 * Named holes the ambient runtime writes into. The children are the fallback —
 * with no runtime attached the page still reads correctly.
 */
export const Slots: Story = {
  render: () => (
    <Ambient anchor="absolute" className={frame}>
      <div className="grid h-full content-center gap-3 px-6 font-mono text-xs">
        <div className="flex items-baseline gap-2">
          <span className="text-accent-lime">AMBIENT</span>
          <AmbientSlot name="seed-readout">v0 · 8f3c21</AmbientSlot>
        </div>
        <AmbientSlot name="footer-note">ambient: seed 8f3c21</AmbientSlot>
      </div>
    </Ambient>
  ),
}
