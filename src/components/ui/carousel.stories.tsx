import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex aspect-square items-center justify-center p-6">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}

export const Vertical: Story = {
  render: () => (
    <Carousel orientation="vertical" className="w-full max-w-xs">
      <CarouselContent className="h-64">
        {Array.from({ length: 4 }).map((_, index) => (
          <CarouselItem key={index}>
            <Card>
              <CardContent className="flex items-center justify-center p-6">
                <span className="text-3xl font-semibold">{index + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
}
