import type { Meta, StoryObj } from '@storybook/react-vite'

import { Separator } from '@/components/ui/separator'

const meta = {
  title: 'Components/Separator',
  component: Separator,
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm leading-none font-medium">mandrock0</h4>
        <p className="text-sm text-muted-foreground">Компонентна бібліотека, без світлої теми.</p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <div>Блог</div>
        <Separator orientation="vertical" />
        <div>Доки</div>
        <Separator orientation="vertical" />
        <div>Сорси</div>
      </div>
    </div>
  ),
}

export const WithDebris: Story = {
  name: 'Debris (chaos layer)',
  render: () => (
    <div className="p-8">
      <div className="space-y-1">
        <h4 className="text-sm leading-none font-medium">mandrock0</h4>
        <p className="text-sm text-muted-foreground">Осад — 1-2 гліфи біля лінії, не більше.</p>
      </div>
      <Separator debris className="my-6" />
      <div className="flex h-5 items-center gap-6 text-sm">
        <div>Блог</div>
        <Separator debris orientation="vertical" />
        <div>Доки</div>
        <Separator debris orientation="vertical" />
        <div>Сорси</div>
      </div>
    </div>
  ),
}
