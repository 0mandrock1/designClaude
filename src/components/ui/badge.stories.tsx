import type { Meta, StoryObj } from '@storybook/react-vite'
import { BadgeCheckIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <Badge>Бейдж</Badge>,
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="default">Дефолт</Badge>
      <Badge variant="secondary">Секондарі</Badge>
      <Badge variant="destructive">Дестрактив</Badge>
      <Badge variant="outline">Аутлайн</Badge>
      <Badge variant="ghost">Гост</Badge>
      <Badge variant="link">Лінк</Badge>
    </div>
  ),
}

export const Roles: Story = {
  name: 'Role tags',
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="info">В черзі</Badge>
      <Badge variant="ok">Завершено</Badge>
      <Badge variant="alive">Live прямо зараз</Badge>
    </div>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Badge variant="secondary">
      <BadgeCheckIcon />
      Верифіковано
    </Badge>
  ),
}

export const WithDebris: Story = {
  name: 'Debris (chaos layer)',
  render: () => (
    <div className="flex flex-wrap items-center gap-4 p-8">
      <Badge debris variant="alive">
        Процес живий
      </Badge>
      <Badge debris variant="ok">
        Готово
      </Badge>
      <Badge debris variant="outline">
        Ще ідле
      </Badge>
    </div>
  ),
}
