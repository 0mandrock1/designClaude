import type { Meta, StoryObj } from '@storybook/react-vite'

import { Plate, PlateLabel } from '@/components/ui/plate'

const meta = {
  title: 'Components/Plate',
  component: Plate,
} satisfies Meta<typeof Plate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Plate className="w-96">
      <PlateLabel>статус</PlateLabel>
      <span>рендер-ферма · 3 у черзі</span>
    </Plate>
  ),
}

/** The tone is the edge and the label; the surface is always void. */
export const Tones: Story = {
  render: () => (
    <div className="grid w-96 gap-2">
      <Plate tone="action">
        <PlateLabel>action</PlateLabel>
        <span>натисни, щоб задеплоїти</span>
      </Plate>
      <Plate tone="info">
        <PlateLabel>info</PlateLabel>
        <span>v0.3.1 · 47ms</span>
      </Plate>
      <Plate tone="ok">
        <PlateLabel>ok</PlateLabel>
        <span>render ok · cache warm</span>
      </Plate>
      <Plate tone="alive">
        <PlateLabel>alive</PlateLabel>
        <span>live прямо зараз</span>
      </Plate>
    </div>
  ),
}

/** A plate bolted onto a card — void reads as a cut-out against the card surface. */
export const OnCard: Story = {
  render: () => (
    <div className="grid w-96 gap-3 rounded-card border border-border bg-card p-4">
      <div className="text-sm font-medium">Деплой mandrock.me</div>
      <div className="text-sm text-muted-foreground">Черга задач рендер-ферми.</div>
      <Plate tone="ok">
        <PlateLabel>ok</PlateLabel>
        <span>412s · 0 помилок</span>
      </Plate>
    </div>
  ),
}

/**
 * Void as ink: on a paper (`bg-foreground`) surface the black rule is the
 * strongest edge in the system (18:1) — the one place `border-void` stands alone.
 */
export const OnPaper: Story = {
  render: () => (
    <div className="grid w-96 gap-3 rounded-card bg-foreground p-4 text-void">
      <div className="text-sm font-semibold">Свої імена</div>
      <div className="border-t-2 border-void pt-3 text-sm">Кого продюсую</div>
      <Plate tone="alive" className="border-void">
        <PlateLabel>alive</PlateLabel>
        <span>стрім іде</span>
      </Plate>
    </div>
  ),
}

export const WithDebris: Story = {
  name: 'Debris (chaos layer)',
  render: () => (
    <div className="grid w-96 gap-2 p-4">
      <Plate tone="alive" debris>
        <PlateLabel>alive</PlateLabel>
        <span>стрім іде</span>
      </Plate>
      <Plate debris>
        <PlateLabel>idle</PlateLabel>
        <span>нічого не відбувається</span>
      </Plate>
    </div>
  ),
}
