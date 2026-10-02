import type { Meta, StoryObj } from '@storybook/react-vite'

import { Debris, GLITCH_KINDS } from '@/components/debris/Debris'

const meta = {
  title: 'Components/Debris',
  component: Debris,
  args: { seed: 'debris', count: 4 },
} satisfies Meta<typeof Debris>

export default meta
type Story = StoryObj<typeof meta>

const box = 'relative h-28 w-56 overflow-hidden rounded-card border border-border bg-card'

/** Hover the box — debris is pointer-events-none, so the host's hover fires it. */
export const Default: Story = {
  render: (args) => (
    <div className={box}>
      <Debris {...args} />
    </div>
  ),
}

/** Each glitch kind on its own, `alive` so it loops without a hover. */
export const GlitchKinds: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {GLITCH_KINDS.map((kind) => (
        <div key={kind} className="relative h-24 w-40 overflow-hidden rounded-card border border-border bg-card">
          <Debris seed={`kind-${kind}`} name={kind} count={6} glitch={kind} alive />
          <div className="absolute bottom-2 left-2 font-mono text-xs text-muted-foreground">{kind}</div>
        </div>
      ))}
    </div>
  ),
}

/** `idle` — the lowest-priority trigger: a seeded blink every ~9s, never in unison. */
export const Idle: Story = {
  render: () => (
    <div className={box}>
      <Debris seed="idle" name="idle" count={8} idle />
    </div>
  ),
}

/** Budget scales the amplitude; past --glitch-ceiling (4) it stops growing. */
export const Budget: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      {[0, 1, 4, 12].map((b) => (
        <div
          key={b}
          className="relative h-24 w-40 overflow-hidden rounded-card border border-border bg-card"
          style={{ '--glitch-budget': b } as React.CSSProperties}
        >
          <Debris seed="budget" name="budget" count={6} glitch="shift" alive />
          <div className="absolute bottom-2 left-2 font-mono text-xs text-muted-foreground">
            budget {b} → {Math.min(b, 4)}px
          </div>
        </div>
      ))}
    </div>
  ),
}
