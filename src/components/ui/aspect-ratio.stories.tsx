import type { Meta, StoryObj } from '@storybook/react-vite'

import { AspectRatio } from '@/components/ui/aspect-ratio'

const meta = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  args: {
    ratio: 16 / 9,
  },
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg bg-muted">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Landscape"
          className="size-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
}

export const Square: Story = {
  render: () => (
    <div className="w-60">
      <AspectRatio ratio={1} className="overflow-hidden rounded-lg bg-muted">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Square"
          className="size-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
}
