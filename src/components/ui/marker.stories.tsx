import type { Meta, StoryObj } from '@storybook/react-vite'
import { CheckCircle2Icon } from 'lucide-react'

import { Marker, MarkerContent, MarkerIcon } from '@/components/ui/marker'

const meta = {
  title: 'Components/Marker',
  component: Marker,
} satisfies Meta<typeof Marker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Marker className="w-80">
      <MarkerIcon>
        <CheckCircle2Icon />
      </MarkerIcon>
      <MarkerContent>Task completed successfully.</MarkerContent>
    </Marker>
  ),
}

export const Separator: Story = {
  render: () => (
    <Marker variant="separator" className="w-80">
      <MarkerContent>OR</MarkerContent>
    </Marker>
  ),
}

export const Border: Story = {
  render: () => (
    <Marker variant="border" className="w-80">
      <MarkerContent>Section title</MarkerContent>
    </Marker>
  ),
}
