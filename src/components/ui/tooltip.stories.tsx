import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          Наведи курсор
        </TooltipTrigger>
        <TooltipContent>Додати в library</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const Sides: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Зверху
          </TooltipTrigger>
          <TooltipContent side="top">Tooltip зверху</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Справа
          </TooltipTrigger>
          <TooltipContent side="right">Tooltip справа</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Знизу
          </TooltipTrigger>
          <TooltipContent side="bottom">Tooltip знизу</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>
            Зліва
          </TooltipTrigger>
          <TooltipContent side="left">Tooltip зліва</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
}

export const WithDebris: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline" />}>
          Debris tooltip
        </TooltipTrigger>
        <TooltipContent debris>system: armed, 12ms</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}
