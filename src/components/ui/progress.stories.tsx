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
        <ProgressLabel>Завантаження...</ProgressLabel>
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

export const Complete: Story = {
  name: 'Complete (ok state)',
  render: () => (
    <Progress value={100} className="w-72">
      <div className="flex justify-between">
        <ProgressLabel>Деплой</ProgressLabel>
        <ProgressValue />
      </div>
    </Progress>
  ),
  play: async ({ canvas }) => {
    // At value === max the base-ui primitive marks data-complete on both
    // Root and Indicator — that's what flips the fill from action-purple
    // to --ok (lime) via `data-complete:bg-ok`, no extra prop needed.
    const progressbar = canvas.getByRole('progressbar')
    await expect(progressbar).toHaveAttribute('aria-valuenow', '100')
    await expect(progressbar).toHaveAttribute('data-complete')
  },
}

export const WithDebris: Story = {
  name: 'Debris (chaos layer)',
  render: () => (
    <div className="flex flex-col gap-6 p-8">
      <Progress value={40} debris className="w-72 p-1">
        <div className="flex justify-between">
          <ProgressLabel>Синк ще йде</ProgressLabel>
          <ProgressValue />
        </div>
      </Progress>
      <Progress value={100} debris className="w-72 p-1">
        <div className="flex justify-between">
          <ProgressLabel>Готово</ProgressLabel>
          <ProgressValue />
        </div>
      </Progress>
    </div>
  ),
}
