import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@/components/ui/button'
import { DirectionProvider } from '@/components/ui/direction'

const meta = {
  title: 'Components/DirectionProvider',
  component: DirectionProvider,
} satisfies Meta<typeof DirectionProvider>

export default meta
type Story = StoryObj<typeof meta>

export const RightToLeft: Story = {
  render: () => (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="flex w-72 items-center justify-between rounded-lg border p-3">
        <span className="text-sm">מיושר לפי RTL</span>
        <Button size="sm">פעולה</Button>
      </div>
    </DirectionProvider>
  ),
}

export const LeftToRight: Story = {
  render: () => (
    <DirectionProvider direction="ltr">
      <div className="flex w-72 items-center justify-between rounded-lg border p-3">
        <span className="text-sm">Aligned LTR</span>
        <Button size="sm">Action</Button>
      </div>
    </DirectionProvider>
  ),
}
