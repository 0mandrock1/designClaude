import type { Meta, StoryObj } from '@storybook/react-vite'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="c1" />
        <Label htmlFor="c1">Unchecked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c2" defaultChecked />
        <Label htmlFor="c2">Checked</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c3" disabled />
        <Label htmlFor="c3">Disabled</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c4" disabled defaultChecked />
        <Label htmlFor="c4">Disabled checked</Label>
      </div>
    </div>
  ),
}
