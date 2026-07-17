import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable" className="w-72">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="default" id="radio-default" />
        <Label htmlFor="radio-default">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" id="radio-comfortable" />
        <Label htmlFor="radio-comfortable">Comfortable</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="compact" id="radio-compact" />
        <Label htmlFor="radio-compact">Compact</Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvas, userEvent }) => {
    const comfortable = canvas.getByRole('radio', { name: /comfortable/i })
    const compact = canvas.getByRole('radio', { name: /compact/i })
    await expect(comfortable).toHaveAttribute('aria-checked', 'true')
    await expect(compact).toHaveAttribute('aria-checked', 'false')
    await userEvent.click(compact)
    await expect(compact).toHaveAttribute('aria-checked', 'true')
    await expect(comfortable).toHaveAttribute('aria-checked', 'false')
  },
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="one" className="w-72">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="one" id="radio-one" />
        <Label htmlFor="radio-one">Option one</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="two" id="radio-two" disabled />
        <Label htmlFor="radio-two">Option two (disabled)</Label>
      </div>
    </RadioGroup>
  ),
}
