import type { Meta, StoryObj } from '@storybook/react-vite'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Textarea className="w-80" placeholder="Type your message here." />,
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-1.5">
      <Label htmlFor="textarea-message">Your message</Label>
      <Textarea id="textarea-message" placeholder="Type your message here." />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Textarea className="w-80" placeholder="Disabled" disabled />
  ),
}
