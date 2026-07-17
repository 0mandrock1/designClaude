import type { Meta, StoryObj } from '@storybook/react-vite'

import { Slider } from '@/components/ui/slider'

const meta = {
  title: 'Components/Slider',
  component: Slider,
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Slider defaultValue={[50]} className="w-72" />,
}

export const Range: Story = {
  render: () => <Slider defaultValue={[25, 75]} className="w-72" />,
}

export const Vertical: Story = {
  render: () => (
    <div className="h-40">
      <Slider defaultValue={[50]} orientation="vertical" />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => <Slider defaultValue={[50]} className="w-72" disabled />,
}
