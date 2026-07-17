import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from '@/components/ui/progress'

const meta = {
  title: 'Components/Progress',
  component: Progress,
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Progress value={40} className="w-72" />,
}

export const WithLabel: Story = {
  render: () => (
    <Progress value={65} className="w-72">
      <div className="flex justify-between">
        <ProgressLabel>Uploading...</ProgressLabel>
        <ProgressValue />
      </div>
    </Progress>
  ),
}
