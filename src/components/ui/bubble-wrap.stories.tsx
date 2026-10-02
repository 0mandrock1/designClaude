import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { BubbleWrap } from '@/components/ui/bubble-wrap'

const meta = {
  title: 'Components/BubbleWrap',
  component: BubbleWrap,
  argTypes: {
    tone: { control: 'select', options: ['action', 'info', 'ok', 'alive'] },
  },
} satisfies Meta<typeof BubbleWrap>

export default meta
type Story = StoryObj<typeof meta>

/** Pop them. Pop all of them and a fresh sheet rolls in. */
export const Default: Story = {
  args: { tone: 'info', rows: 3, cols: 6, seed: 'wrap' },
}

export const Tones: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-3">
      <BubbleWrap tone="action" rows={2} cols={4} seed="w1" />
      <BubbleWrap tone="info" rows={2} cols={4} seed="w2" />
      <BubbleWrap tone="ok" rows={2} cols={4} seed="w3" />
      <BubbleWrap tone="alive" rows={2} cols={4} seed="w4" />
    </div>
  ),
}

export const WithDebris: Story = {
  name: 'Debris (chaos layer)',
  render: () => (
    <div className="p-8">
      <BubbleWrap debris tone="alive" rows={3} cols={5} seed="wd" />
    </div>
  ),
}

export const Popped: Story = {
  args: { tone: 'ok', rows: 1, cols: 3, seed: 'popped' },
  play: async ({ canvasElement, userEvent }) => {
    const cells = canvasElement.querySelectorAll<HTMLElement>('[data-slot="bubble-wrap-cell"]')
    const fresh = [...cells].find((c) => !c.hasAttribute('data-popped'))!
    await userEvent.click(fresh)
    await expect(fresh.hasAttribute('data-popped')).toBe(true)
  },
}
