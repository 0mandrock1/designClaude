import type { Meta, StoryObj } from '@storybook/react-vite'
import { BoldIcon } from 'lucide-react'

import { Toggle } from '@/components/ui/toggle'

const meta = {
  title: 'Components/Toggle',
  component: Toggle,
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <BoldIcon />
    </Toggle>
  ),
}

export const Outline: Story = {
  render: () => (
    <Toggle variant="outline" aria-label="Toggle bold">
      <BoldIcon />
      Bold
    </Toggle>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Toggle size="sm" aria-label="Toggle small">
        <BoldIcon />
      </Toggle>
      <Toggle size="default" aria-label="Toggle default">
        <BoldIcon />
      </Toggle>
      <Toggle size="lg" aria-label="Toggle large">
        <BoldIcon />
      </Toggle>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Toggle disabled aria-label="Toggle disabled">
      <BoldIcon />
    </Toggle>
  ),
}
