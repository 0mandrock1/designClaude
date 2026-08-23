import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, within } from 'storybook/test'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const meta = {
  title: 'Components/Select',
  component: Select,
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select defaultValue="techno">
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Обери жанр" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Techno</SelectLabel>
          <SelectItem value="techno">Techno</SelectItem>
          <SelectItem value="acid">Acid</SelectItem>
          <SelectItem value="hardgroove">Hardgroove</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Не techno</SelectLabel>
          <SelectItem value="ebm">EBM</SelectItem>
          <SelectItem value="idm">IDM</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('combobox')
    await expect(trigger).toHaveTextContent(/techno/i)

    await userEvent.click(trigger)

    // SelectContent renders through a portal into document.body.
    const body = within(trigger.ownerDocument.body)
    const acid = await body.findByRole('option', { name: 'Acid' })
    await userEvent.click(acid)

    await expect(trigger).toHaveTextContent(/acid/i)
  },
}

export const Small: Story = {
  render: () => (
    <Select defaultValue="techno">
      <SelectTrigger size="sm" className="w-56">
        <SelectValue placeholder="Обери жанр" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="techno">Techno</SelectItem>
        <SelectItem value="acid">Acid</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Select defaultValue="techno" disabled>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Обери жанр" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="techno">Techno</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const WithDebris: Story = {
  name: 'Debris (chaos layer)',
  render: () => (
    <div className="flex flex-wrap items-center gap-4 p-8">
      <Select defaultValue="techno">
        <SelectTrigger debris id="genre-live" className="w-56">
          <SelectValue placeholder="Обери жанр" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="techno">Techno</SelectItem>
          <SelectItem value="acid">Acid</SelectItem>
          <SelectItem value="hardgroove">Hardgroove</SelectItem>
        </SelectContent>
      </Select>
      <Select defaultValue="ebm">
        <SelectTrigger debris id="genre-idle" size="sm" className="w-56">
          <SelectValue placeholder="Обери жанр" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ebm">EBM</SelectItem>
          <SelectItem value="idm">IDM</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
}
