import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { GlitchText } from '@/components/ui/glitch-text'

const meta = {
  title: 'Components/GlitchText',
  component: GlitchText,
  args: { children: 'mandrock0', trigger: 'hover' },
  argTypes: {
    trigger: { control: 'select', options: ['hover', 'alive', 'idle'] },
  },
} satisfies Meta<typeof GlitchText>

export default meta
type Story = StoryObj<typeof meta>

/** Hover it: a ghost flashes in thin slices behind the word. The word never moves. */
export const Default: Story = {
  render: (args) => (
    <div className="p-8 text-lg font-semibold tracking-tight">
      <GlitchText {...args} />
    </div>
  ),
}

/** The three triggers, in priority order: system event > interaction > idle. */
export const Triggers: Story = {
  render: () => (
    <div className="grid gap-4 p-8 font-mono text-sm">
      <div className="flex items-center gap-4">
        <span className="w-16 text-muted-foreground">alive</span>
        <GlitchText trigger="alive">стрім іде</GlitchText>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-muted-foreground">hover</span>
        <GlitchText trigger="hover">наведи на мене</GlitchText>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-16 text-muted-foreground">idle</span>
        <GlitchText trigger="idle">тиша перед деплоєм</GlitchText>
      </div>
    </div>
  ),
}

/**
 * The readability contract, asserted: the accessible text is exactly the label,
 * the ghosts are aria-hidden, and the real text node carries no animation.
 */
export const ReadabilityCheck: Story = {
  render: () => (
    <div className="p-8 text-lg">
      <GlitchText trigger="alive" data-testid="glitch">
        Задеплоїти
      </GlitchText>
    </div>
  ),
  play: async ({ canvas }) => {
    const root = canvas.getByTestId('glitch')
    await expect(root.textContent).toBe('Задеплоїти')
    const ghosts = root.querySelectorAll('.glitch-ghost')
    await expect(ghosts.length).toBe(2)
    for (const g of ghosts) await expect(g.getAttribute('aria-hidden')).toBe('true')
    await expect(getComputedStyle(root).animationName).toBe('none')
  },
}

/** Budget scales the ghost offset, clamped at --glitch-ceiling (4px). */
export const Budget: Story = {
  render: () => (
    <div className="grid gap-3 p-8 font-mono text-sm">
      {[0, 1, 2, 4, 9].map((b) => (
        <div
          key={b}
          className="flex items-center gap-4"
          style={{ '--glitch-budget': b } as React.CSSProperties}
        >
          <span className="w-24 text-muted-foreground">budget {b}</span>
          <GlitchText trigger="alive">{`зсув ≤ ${Math.min(b, 4)}px`}</GlitchText>
        </div>
      ))}
    </div>
  ),
}
