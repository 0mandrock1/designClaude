import type { Meta, StoryObj } from '@storybook/react-vite'

import { Skeleton } from '@/components/ui/skeleton'

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

// NOTE: Skeleton is the one deliberate exception to core-20's terse,
// system-brutalist copy register. The captions below live only in this
// story (the Skeleton component itself takes no text prop) — small,
// muted, mono, one line, warm in a way nothing else in this system is
// allowed to be.

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <Skeleton className="size-12 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <p className="font-mono text-xs text-muted-foreground/60">
        система дихає, ще рахує
      </p>
    </div>
  ),
}

export const Card: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-40 w-72 rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <p className="font-mono text-xs text-muted-foreground/60">
        3 ночі, рендер ще йде
      </p>
    </div>
  ),
}

export const Feed: Story = {
  name: 'Feed (loading list)',
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="size-9 rounded-full" />
          <div className="flex flex-1 flex-col gap-1.5">
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </div>
        </div>
      ))}
      <p className="font-mono text-xs text-muted-foreground/60">
        пульс є, форми ще нема
      </p>
    </div>
  ),
}

export const WithDebris: Story = {
  name: 'Debris (chaos layer)',
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <Skeleton debris id="avatar-loading" className="size-12 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton debris id="line-title" className="h-4 w-48" />
          <Skeleton debris id="line-subtitle" className="h-4 w-32" />
        </div>
      </div>
      <p className="font-mono text-xs text-muted-foreground/60">
        місто за вікном не спить, і воно теж
      </p>
    </div>
  ),
}
