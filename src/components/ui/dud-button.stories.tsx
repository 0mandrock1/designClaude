import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { DudButton } from '@/components/ui/dud-button'

const meta = {
  title: 'Components/DudButton',
  component: DudButton,
  argTypes: {
    tone: { control: 'select', options: ['action', 'info', 'ok', 'alive'] },
  },
} satisfies Meta<typeof DudButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'натисни', tone: 'action' },
}

export const Tones: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <DudButton tone="action" seed="a">action</DudButton>
      <DudButton tone="info" seed="i">info</DudButton>
      <DudButton tone="ok" seed="o">ok</DudButton>
      <DudButton tone="alive" seed="l">alive</DudButton>
    </div>
  ),
}

export const WithDebris: Story = {
  name: 'Debris (chaos layer)',
  render: () => (
    <div className="flex flex-wrap items-center gap-4 p-8">
      <DudButton debris tone="alive" seed="d1">не тисни</DudButton>
      <DudButton debris tone="info" seed="d2">тисни</DudButton>
    </div>
  ),
}

/** It counts the presses, says something useless, and nothing else changes. */
export const Pressed: Story = {
  args: { children: 'натисни', tone: 'ok', seed: 'pressed' },
  play: async ({ canvasElement, userEvent }) => {
    const dud = canvasElement.querySelector<HTMLElement>('[data-pointless="dud-button"]')!
    await expect(dud.getAttribute('aria-hidden')).toBe('true')
    await userEvent.click(dud)
    await userEvent.click(dud)
    await expect(dud.textContent).toMatch(/02$/)
  },
}
