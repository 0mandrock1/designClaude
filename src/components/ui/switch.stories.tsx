import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

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
      <Label htmlFor="switch-airplane">Режим польоту</Label>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('switch', { name: /режим польоту/i })
    await expect(toggle).toHaveAttribute('aria-checked', 'false')
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute('aria-checked', 'true')
  },
}

export const Small: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="switch-small" size="sm" defaultChecked />
      <Label htmlFor="switch-small">Нотифікації</Label>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="switch-disabled" disabled />
      <Label htmlFor="switch-disabled">Заблоковано</Label>
    </div>
  ),
}

export const LiveProcess: Story = {
  name: 'Live process (--alive)',
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="switch-live" defaultChecked className="data-checked:bg-alive" />
      <Label htmlFor="switch-live" className="flex items-center gap-1.5">
        Процес
        <span className="size-1.5 animate-pulse rounded-full bg-alive" />
        live
      </Label>
    </div>
  ),
}

export const WithDebris: Story = {
  name: 'Debris (chaos layer)',
  render: () => (
    <div className="flex flex-wrap items-center gap-6 p-8">
      <div className="flex items-center gap-2">
        <Switch id="switch-debris-on" debris defaultChecked />
        <Label htmlFor="switch-debris-on">Живий</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="switch-debris-off" debris />
        <Label htmlFor="switch-debris-off">Ідле</Label>
      </div>
    </div>
  ),
}
