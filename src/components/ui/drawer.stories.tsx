import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

const meta = {
  title: 'Components/Drawer',
  component: Drawer,
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>Open Drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Move goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-4 text-sm text-muted-foreground">
          This is the drawer body content.
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const ShowSwipeHandle: Story = {
  render: () => (
    <Drawer showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>Open with handle</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Swipe down to dismiss</DrawerTitle>
          <DrawerDescription>Drag the handle to close.</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-6" />
      </DrawerContent>
    </Drawer>
  ),
}
