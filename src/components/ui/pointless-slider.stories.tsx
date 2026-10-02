import type { Meta, StoryObj } from '@storybook/react-vite'

import { PointlessSlider } from '@/components/ui/pointless-slider'

const meta = {
  title: 'Components/PointlessSlider',
  component: PointlessSlider,
  argTypes: {
    tone: { control: 'select', options: ['action', 'info', 'ok', 'alive'] },
  },
} satisfies Meta<typeof PointlessSlider>

export default meta
type Story = StoryObj<typeof meta>

/** Drag the thumb — the readout follows. Let go — it springs back. */
export const Default: Story = {
  args: { tone: 'info', seed: 'slider' },
}

/** The seed picks the rest position and the unit it pretends to measure. */
export const Tones: Story = {
  render: () => (
    <div className="grid gap-4">
      <PointlessSlider tone="action" seed="s-action" />
      <PointlessSlider tone="info" seed="s-info" />
      <PointlessSlider tone="ok" seed="s-ok" />
      <PointlessSlider tone="alive" seed="s-alive" />
    </div>
  ),
}

export const WithDebris: Story = {
  name: 'Debris (chaos layer)',
  render: () => (
    <div className="grid gap-6 p-8">
      <PointlessSlider debris tone="ok" seed="d-ok" />
      <PointlessSlider debris tone="alive" seed="d-alive" />
    </div>
  ),
}
