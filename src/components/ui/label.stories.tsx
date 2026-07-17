import type { Meta, StoryObj } from '@storybook/react-vite'

import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Components/Label',
  component: Label,
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="label-email">Email</Label>
      <Input id="label-email" type="email" placeholder="you@example.com" />
    </div>
  ),
}

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="label-terms" />
      <Label htmlFor="label-terms">Accept terms and conditions</Label>
    </div>
  ),
}
