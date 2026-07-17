import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Message, MessageAvatar, MessageContent } from '@/components/ui/message'
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@/components/ui/message-scroller'

const meta = {
  title: 'Components/MessageScroller',
  component: MessageScroller,
} satisfies Meta<typeof MessageScroller>

export default meta
type Story = StoryObj<typeof meta>

const messages = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  align: i % 2 === 0 ? ('start' as const) : ('end' as const),
  text: `Message number ${i + 1}`,
}))

export const Default: Story = {
  render: () => (
    <MessageScrollerProvider>
      <MessageScroller className="h-96 w-96 rounded-lg border">
        <MessageScrollerViewport>
          <MessageScrollerContent className="p-4">
            {messages.map((message) => (
              <MessageScrollerItem key={message.id}>
                <Message align={message.align}>
                  <MessageAvatar>
                    <Avatar>
                      <AvatarFallback>
                        {message.align === 'start' ? 'AI' : 'ME'}
                      </AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                  <MessageContent>
                    <p className="rounded-lg bg-muted px-3 py-2 group-data-[align=end]/message:bg-primary group-data-[align=end]/message:text-primary-foreground">
                      {message.text}
                    </p>
                  </MessageContent>
                </Message>
              </MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
        <MessageScrollerButton direction="end" />
      </MessageScroller>
    </MessageScrollerProvider>
  ),
}
