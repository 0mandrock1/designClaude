import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

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
      <Label htmlFor="terms">Прийняти умови</Label>
    </div>
  ),
  play: async ({ canvas, userEvent }) => {
    const checkbox = canvas.getByRole('checkbox', {
      name: /прийняти умови/i,
    })
    await expect(checkbox).toHaveAttribute('aria-checked', 'false')
    await userEvent.click(checkbox)
    await expect(checkbox).toHaveAttribute('aria-checked', 'true')
  },
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Checkbox id="c1" />
        <Label htmlFor="c1">Не відмічено</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c2" defaultChecked />
        <Label htmlFor="c2">Відмічено</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c3" disabled />
        <Label htmlFor="c3">Заблоковано</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="c4" disabled defaultChecked />
        <Label htmlFor="c4">Заблоковано, відмічено</Label>
      </div>
    </div>
  ),
}

export const WithDebris: Story = {
  name: 'Debris (chaos layer)',
  render: () => (
    <div className="flex flex-col gap-3 p-8">
      <div className="flex items-center gap-2">
        <Checkbox id="cd1" debris />
        <Label htmlFor="cd1">Осад — не відмічено</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="cd2" debris defaultChecked />
        <Label htmlFor="cd2">Осад — відмічено</Label>
      </div>
    </div>
  ),
}
