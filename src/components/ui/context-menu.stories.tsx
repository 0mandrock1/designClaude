import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'

const meta = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-40 w-72 items-center justify-center rounded-lg border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuItem>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>Show bookmarks</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup defaultValue="light">
          <ContextMenuRadioItem value="light">Light</ContextMenuRadioItem>
          <ContextMenuRadioItem value="dark">Dark</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger>More tools</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Save page as...</ContextMenuItem>
            <ContextMenuItem>Cast media to device</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
}
