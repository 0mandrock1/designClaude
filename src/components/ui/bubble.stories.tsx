import type { Meta, StoryObj } from '@storybook/react-vite'

import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from '@/components/ui/bubble'

const meta = {
  title: 'Components/Bubble',
  component: Bubble,
} satisfies Meta<typeof Bubble>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <BubbleGroup className="w-96">
      <Bubble align="start" variant="muted">
        <BubbleContent>Hey, how's it going?</BubbleContent>
      </Bubble>
      <Bubble align="end" variant="default">
        <BubbleContent>Pretty good, thanks for asking!</BubbleContent>
      </Bubble>
    </BubbleGroup>
  ),
}

export const Variants: Story = {
  render: () => (
    <BubbleGroup className="w-96">
      <Bubble variant="default">
        <BubbleContent>default</BubbleContent>
      </Bubble>
      <Bubble variant="secondary">
        <BubbleContent>secondary</BubbleContent>
      </Bubble>
      <Bubble variant="muted">
        <BubbleContent>muted</BubbleContent>
      </Bubble>
      <Bubble variant="tinted">
        <BubbleContent>tinted</BubbleContent>
      </Bubble>
      <Bubble variant="outline">
        <BubbleContent>outline</BubbleContent>
      </Bubble>
      <Bubble variant="ghost">
        <BubbleContent>ghost</BubbleContent>
      </Bubble>
      <Bubble variant="destructive">
        <BubbleContent>destructive</BubbleContent>
      </Bubble>
    </BubbleGroup>
  ),
}

export const WithReactions: Story = {
  render: () => (
    <Bubble align="start" variant="muted" className="mb-3">
      <BubbleContent>Nice work on the release!</BubbleContent>
      <BubbleReactions>🎉 2</BubbleReactions>
    </Bubble>
  ),
}
