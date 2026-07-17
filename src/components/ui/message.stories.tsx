import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from '@/components/ui/message'

const meta = {
  title: 'Components/Message',
  component: Message,
} satisfies Meta<typeof Message>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <MessageGroup className="w-96">
      <Message align="start">
        <MessageAvatar>
          <Avatar>
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>Assistant</MessageHeader>
          <p className="rounded-lg bg-muted px-3 py-2">
            Hi there! How can I help you today?
          </p>
        </MessageContent>
      </Message>
      <Message align="end">
        <MessageAvatar>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent>
          <MessageHeader>You</MessageHeader>
          <p className="rounded-lg bg-primary px-3 py-2 text-primary-foreground">
            Can you explain how Storybook works?
          </p>
        </MessageContent>
      </Message>
    </MessageGroup>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Message align="start" className="w-96">
      <MessageAvatar>
        <Avatar>
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      </MessageAvatar>
      <MessageContent>
        <p className="rounded-lg bg-muted px-3 py-2">
          Sure, Storybook lets you build UI components in isolation.
        </p>
        <MessageFooter>10:32 AM</MessageFooter>
      </MessageContent>
    </Message>
  ),
}
