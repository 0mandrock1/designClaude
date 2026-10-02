import type { Meta, StoryObj } from '@storybook/react-vite'

import { Ambient } from '@/components/ui/ambient'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PointlessScatter } from '@/components/ui/pointless-scatter'

const meta = {
  title: 'Components/PointlessScatter',
  component: PointlessScatter,
} satisfies Meta<typeof PointlessScatter>

export default meta
type Story = StoryObj<typeof meta>

/** A seeded shelf — same seed, same toys in the same cells. */
export const Default: Story = {
  render: () => (
    <PointlessScatter seed="shelf" count={5} className="w-[36rem] rounded-card border border-border" />
  ),
}

/** One tone for the whole shelf, when the screen already has a dominant role. */
export const OneTone: Story = {
  render: () => (
    <PointlessScatter
      seed="mono"
      count={4}
      tone="alive"
      className="w-[36rem] rounded-card border border-border"
    />
  ),
}

/**
 * The intended use: real content in the main column, the dead gutter filled
 * with toys, all inside the ambient layer — the pointer toys answer everywhere,
 * the shelf toys answer where they sit, nothing covers the card.
 */
export const InAmbient: Story = {
  render: () => (
    <Ambient
      anchor="absolute"
      mode="hostile"
      seed="scatter-page"
      className="h-[26rem] w-[48rem] rounded-card border border-border bg-background"
    >
      <div className="grid h-full grid-cols-[1fr_15rem] gap-4 p-6">
        <Card className="self-start">
          <CardHeader>
            <CardTitle>Деплой</CardTitle>
            <CardDescription>Черга задач рендер-ферми.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Три задачі в черзі, одна жива.
          </CardContent>
        </Card>
        <PointlessScatter seed="gutter" count={3} kinds={['dud', 'switch', 'dial']} debris />
      </div>
    </Ambient>
  ),
}
