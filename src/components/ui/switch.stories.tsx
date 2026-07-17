import type { Meta, StoryObj } from '@storybook/react-vite'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

const meta = {
  title: 'Components/Switch',
  component: Switch,
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="switch-airplane" />
      <Label htmlFor="switch-airplane">Airplane Mode</Label>
    </div>
  ),
}

export const Small: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="switch-small" size="sm" defaultChecked />
      <Label htmlFor="switch-small">Notifications</Label>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="switch-disabled" disabled />
      <Label htmlFor="switch-disabled">Disabled</Label>
    </div>
  ),
}
