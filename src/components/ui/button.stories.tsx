import type { Meta, StoryObj } from '@storybook/react-vite'
import { MailIcon } from 'lucide-react'
import { expect } from 'storybook/test'

import { Button } from '@/components/ui/button'

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Задеплоїти',
    variant: 'default',
    size: 'default',
  },
  play: async ({ canvas, userEvent }) => {
    const btn = canvas.getByRole('button', { name: /задеплоїти/i })
    await expect(btn).toBeEnabled()
    await userEvent.click(btn)
    await expect(btn).toBeVisible()
  },
}

export const CssCheck: Story = {
  args: {
    children: 'Themed кнопка',
    variant: 'default',
    size: 'default',
  },
  play: async ({ canvas }) => {
    const btn = canvas.getByRole('button', { name: /themed кнопка/i })
    const { backgroundColor } = getComputedStyle(btn)
    // bg-primary resolves through --primary: var(--accent-shader), the
    // mandrock0 dark palette lives in :root now — no light-mode fallback,
    // no .dark toggle needed. Assert the theme actually loaded (not the
    // browser default transparent) and matches the resolved action-purple.
    await expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)')
    await expect(backgroundColor).toBe('oklch(0.62 0.27 300)')
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="default">Дефолт</Button>
      <Button variant="secondary">Секондарі</Button>
      <Button variant="destructive">Дестрактив</Button>
      <Button variant="outline">Аутлайн</Button>
      <Button variant="ghost">Гост</Button>
      <Button variant="link">Лінк</Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="xs">Дрібна xs</Button>
      <Button size="sm">Дрібна sm</Button>
      <Button size="default">Дефолт</Button>
      <Button size="lg">Велика</Button>
      <Button size="icon">
        <MailIcon />
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    children: 'Заблоковано',
    disabled: true,
  },
}

export const WithIcon: Story = {
  render: () => (
    <Button>
      <MailIcon />
      Відправити мейл
    </Button>
  ),
}

export const WithDebris: Story = {
  name: 'Debris (chaos layer)',
  render: () => (
    <div className="flex flex-wrap items-center gap-4 p-8">
      <Button debris variant="default">
        Живий процес
      </Button>
      <Button debris variant="outline">
        Ще ідле
      </Button>
      <Button debris variant="destructive" size="lg">
        Незворотна дія
      </Button>
    </div>
  ),
}
