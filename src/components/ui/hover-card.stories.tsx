import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

const meta = {
  title: 'Components/HoverCard',
  component: HoverCard,
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger className="text-sm font-medium underline underline-offset-4">
        @shadcn
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex justify-between gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col gap-1">
            <h4 className="text-sm font-semibold">@shadcn</h4>
            <p className="text-sm text-muted-foreground">
              The creator of shadcn/ui. Building tools for developers.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}
