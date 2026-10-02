import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { FidgetSwitch } from '@/components/ui/fidget-switch'

const meta = {
  title: 'Components/FidgetSwitch',
  component: FidgetSwitch,
  argTypes: {
    tone: { control: 'select', options: ['action', 'info', 'ok', 'alive'] },
  },
} satisfies Meta<typeof FidgetSwitch>

export default meta
type Story = StoryObj<typeof meta>

/** Click to flip, or drag the thumb and let go — it snaps to the nearer side. */
export const Default: Story = {
  args: { tone: 'ok' },
}

export const Tones: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <FidgetSwitch tone="action" defaultOn />
      <FidgetSwitch tone="info" defaultOn />
      <FidgetSwitch tone="ok" defaultOn />
      <FidgetSwitch tone="alive" defaultOn />
      <FidgetSwitch tone="alive" />
    </div>
  ),
}

export const WithDebris: Story = {
  name: 'Debris (chaos layer)',
  render: () => (
    <div className="flex items-center gap-6 p-8">
      <FidgetSwitch debris tone="alive" defaultOn />
      <FidgetSwitch debris tone="info" />
    </div>
  ),
}

/** Flips on click; there is no value to read back, and no input in the DOM. */
export const Flipped: Story = {
  args: { tone: 'action' },
  play: async ({ canvasElement, userEvent }) => {
    const sw = canvasElement.querySelector<HTMLElement>('[data-pointless="fidget-switch"]')!
    await expect(sw.hasAttribute('data-on')).toBe(false)
    await userEvent.click(sw)
    await expect(sw.hasAttribute('data-on')).toBe(true)
    await expect(canvasElement.querySelector('input')).toBeNull()
  },
}
