import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '@/components/ui/input'

const meta = {
  title: 'Components/Input',
  component: Input,
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'email',
    placeholder: 'Email',
  },
  render: (args) => <Input className="w-72" {...args} />,
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled',
    disabled: true,
  },
  render: (args) => <Input className="w-72" {...args} />,
}

export const Invalid: Story = {
  args: {
    placeholder: 'Invalid input',
    'aria-invalid': true,
  },
  render: (args) => <Input className="w-72" {...args} />,
}
