import type { Meta, StoryObj } from '@storybook/react-vite'
import { BoldIcon, ItalicIcon, UnderlineIcon } from 'lucide-react'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const meta = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ToggleGroup>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Outline: Story = {
  render: () => (
    <ToggleGroup variant="outline">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ToggleGroup orientation="vertical">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <UnderlineIcon />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}
