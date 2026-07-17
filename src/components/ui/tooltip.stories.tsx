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
          Hover me
        </TooltipTrigger>
        <TooltipContent>Add to library</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const Sides: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>Top</TooltipTrigger>
          <TooltipContent side="top">Tooltip on top</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>Right</TooltipTrigger>
          <TooltipContent side="right">Tooltip on right</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>Bottom</TooltipTrigger>
          <TooltipContent side="bottom">Tooltip on bottom</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" />}>Left</TooltipTrigger>
          <TooltipContent side="left">Tooltip on left</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  ),
}
