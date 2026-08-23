import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'

const meta = {
  title: 'Components/Sonner',
  component: Toaster,
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <>
      <Toaster />
      <Button
        variant="outline"
        onClick={() =>
          toast('Чергу оновлено', {
            description: 'JOB-0093 → render-farm-02',
            action: {
              label: 'Undo',
              onClick: () => {},
            },
          })
        }
      >
        Show Toast
      </Button>
    </>
  ),
}

export const Variants: Story = {
  render: () => (
    <>
      <Toaster />
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => toast.success('Синхронізовано')}>
          Success
        </Button>
        <Button variant="outline" onClick={() => toast.error('Помилка запису')}>
          Error
        </Button>
        <Button variant="outline" onClick={() => toast.warning('Диск заповнено на 90%')}>
          Warning
        </Button>
        <Button variant="outline" onClick={() => toast.info('Доступний новий білд')}>
          Info
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast.loading('Деплой у процесі', { id: 'deploy', duration: 2000 })
          }
        >
          Loading
        </Button>
      </div>
    </>
  ),
}
