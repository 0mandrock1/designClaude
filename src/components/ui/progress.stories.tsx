import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from '@/components/ui/progress'

const meta = {
  title: 'Components/Progress',
  component: Progress,
  args: {
    // Satisfies the required `value` prop of the base-ui Progress
    // primitive at the Meta level so individual stories don't need to
    // redeclare `args`.
    value: 0,
  },
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
  play: async ({ canvas }) => {
    // Prop value=65 is reflected both as the aria-valuenow and the
    // rendered percentage text via the base-ui Progress primitive.
    const progressbar = canvas.getByRole('progressbar')
    await expect(progressbar).toHaveAttribute('aria-valuenow', '65')
    await expect(canvas.getByText('65%')).toBeVisible()
  },
}
