import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor, within } from 'storybook/test'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="destructive" />}>
        Видалити проєкт
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Видалити проєкт?</DialogTitle>
          <DialogDescription>
            Ця дія незворотна. Всі files, history та debris буде видалено
            permanently.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Скасувати
          </DialogClose>
          <Button variant="destructive">Видалити</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: /видалити проєкт/i })
    await userEvent.click(trigger)

    // DialogContent renders through a portal into document.body, so it
    // won't be found inside `canvas` — query the portal root instead.
    const body = within(trigger.ownerDocument.body)
    const dialog = await body.findByRole('dialog')
    await waitFor(() =>
      expect(within(dialog).getByText('Видалити проєкт?')).toBeVisible()
    )

    await userEvent.click(
      within(dialog).getByRole('button', { name: /скасувати/i })
    )
    // Closing animates out (duration-100), so the node lingers briefly
    // with data-closed before being unmounted.
    await waitFor(() =>
      expect(body.queryByRole('dialog')).not.toBeInTheDocument()
    )
  },
}

export const WithDebris: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Створити компонент
      </DialogTrigger>
      <DialogContent debris>
        <DialogHeader>
          <DialogTitle>Новий компонент</DialogTitle>
          <DialogDescription>
            Задай name та variant. Debris активний, поки dialog відкритий.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            Скасувати
          </DialogClose>
          <Button type="submit">Створити</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
