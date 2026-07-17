import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronRightIcon, FolderIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from '@/components/ui/item'

const meta = {
  title: 'Components/Item',
  component: Item,
} satisfies Meta<typeof Item>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Item variant="outline" className="w-96">
      <ItemMedia variant="icon">
        <FolderIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Documents</ItemTitle>
        <ItemDescription>124 files, 2.4 GB</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="icon-sm">
          <ChevronRightIcon />
        </Button>
      </ItemActions>
    </Item>
  ),
}

export const WithAvatar: Story = {
  render: () => (
    <Item variant="outline" className="w-96">
      <ItemMedia variant="image">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>shadcn</ItemTitle>
        <ItemDescription>shadcn@example.com</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="sm" variant="outline">
          Message
        </Button>
      </ItemActions>
    </Item>
  ),
}

export const Group: Story = {
  render: () => (
    <ItemGroup className="w-96">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Profile</ItemTitle>
          <ItemDescription>Manage your public profile.</ItemDescription>
        </ItemContent>
      </Item>
      <ItemSeparator />
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Billing</ItemTitle>
          <ItemDescription>View invoices and payment history.</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
}
