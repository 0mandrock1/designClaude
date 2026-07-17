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
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
  play: async ({ canvas, userEvent }) => {
    const btn = canvas.getByRole('button', { name: /button/i })
    await expect(btn).toBeEnabled()
    await userEvent.click(btn)
    await expect(btn).toBeVisible()
  },
}

export const CssCheck: Story = {
  args: {
    children: 'Themed button',
    variant: 'default',
    size: 'default',
  },
  play: async ({ canvas }) => {
    const btn = canvas.getByRole('button', { name: /themed button/i })
    const { backgroundColor } = getComputedStyle(btn)
    // bg-primary resolves through the CSS var `--primary: oklch(0.205 0 0)`
    // (a near-black gray in light mode). Chromium's computed style preserves
    // the oklch() function rather than serializing to rgb(). Assert the
    // Tailwind/shadcn theme actually loaded in the Storybook preview (not
    // the browser default transparent background) and matches this exact
    // resolved value.
    await expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)')
    await expect(backgroundColor).toBe('oklch(0.205 0 0)')
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <MailIcon />
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
}

export const WithIcon: Story = {
  render: () => (
    <Button>
      <MailIcon />
      Send email
    </Button>
  ),
}
