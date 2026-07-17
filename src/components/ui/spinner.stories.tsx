import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Spinner />,
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner className="size-3" />
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  ),
}

export const InButton: Story = {
  render: () => (
    <Button disabled>
      <Spinner />
      Please wait
    </Button>
  ),
}
