import type { Meta, StoryObj } from '@storybook/react-vite'

import { FidgetDial } from '@/components/ui/fidget-dial'

const meta = {
  title: 'Components/FidgetDial',
  component: FidgetDial,
  argTypes: {
    tone: { control: 'select', options: ['action', 'info', 'ok', 'alive'] },
  },
} satisfies Meta<typeof FidgetDial>

export default meta
type Story = StoryObj<typeof meta>

/** Drag around it to spin; click to nudge one notch. It turns nothing. */
export const Default: Story = {
  args: { tone: 'action', seed: 'dial' },
}

export const Tones: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <FidgetDial tone="action" seed="d1" />
      <FidgetDial tone="info" seed="d2" />
      <FidgetDial tone="ok" seed="d3" />
      <FidgetDial tone="alive" seed="d4" />
    </div>
  ),
}

export const WithDebris: Story = {
  name: 'Debris (chaos layer)',
  render: () => (
    <div className="flex items-center gap-6 p-8">
      <FidgetDial debris tone="alive" seed="dd1" />
      <FidgetDial debris tone="ok" seed="dd2" />
    </div>
  ),
}
