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
    placeholder: 'Пошта',
  },
  render: (args) => <Input className="w-72" {...args} />,
}

export const Disabled: Story = {
  args: {
    placeholder: 'Заблоковано',
    disabled: true,
  },
  render: (args) => <Input className="w-72" {...args} />,
}

export const Invalid: Story = {
  args: {
    placeholder: 'Невалідний ввід',
    'aria-invalid': true,
  },
  render: (args) => <Input className="w-72" {...args} />,
}

export const WithDebris: Story = {
  name: 'Debris (chaos layer)',
  render: () => (
    <div className="w-72 p-8">
      <Input debris id="deploy-target" placeholder="Ціль деплою" />
    </div>
  ),
}
