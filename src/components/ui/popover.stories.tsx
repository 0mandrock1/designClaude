import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'

const meta = {
  title: 'Components/Popover',
  component: Popover,
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        Open popover
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>
            Set the dimensions for the layer.
          </PopoverDescription>
        </PopoverHeader>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="popover-width" className="w-16">
              Width
            </Label>
            <Input id="popover-width" defaultValue="100%" className="h-7" />
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="popover-height" className="w-16">
              Height
            </Label>
            <Input id="popover-height" defaultValue="25px" className="h-7" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}
