import type { Meta, StoryObj } from '@storybook/react-vite'

import { Kbd, KbdGroup } from '@/components/ui/kbd'

const meta = {
  title: 'Components/Kbd',
  component: Kbd,
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Kbd>⌘</Kbd>,
}

export const Group: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>Ctrl</Kbd>
      <Kbd>Alt</Kbd>
      <Kbd>Delete</Kbd>
    </KbdGroup>
  ),
}

export const InText: Story = {
  render: () => (
    <p className="text-sm text-muted-foreground">
      Press <Kbd>⌘</Kbd>
      <Kbd>K</Kbd> to open the command menu.
    </p>
  ),
}
