import type { Meta, StoryObj } from '@storybook/react-vite'

import { AmbientToys } from '@/components/ui/ambient-toys'

const meta = {
  title: 'Components/AmbientToys',
  component: AmbientToys,
} satisfies Meta<typeof AmbientToys>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Every story pins the canvas with `anchor="absolute"` so it listens to and
 * paints inside its own box; on a real page it is `fixed` to the viewport.
 */
const frame =
  'relative h-64 w-[32rem] overflow-hidden rounded-card border border-border bg-background'

function Hint({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-1 grid h-full place-content-center font-mono text-xs text-muted-foreground">
      {children}
    </div>
  )
}

/** The full homepage set: move over it, press on it. */
export const Default: Story = {
  render: () => (
    <div className={frame}>
      <AmbientToys anchor="absolute" seed="home" />
      <Hint>рухай курсор · тисни</Hint>
    </div>
  ),
}

/** Each toy on its own. */
export const Toys: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['field', 'particles', 'trail', 'cursor'] as const).map((toy) => (
        <div
          key={toy}
          className="relative h-40 w-56 overflow-hidden rounded-card border border-border bg-background"
        >
          <AmbientToys anchor="absolute" toys={[toy]} seed={toy} />
          <Hint>{toy}</Hint>
        </div>
      ))}
    </div>
  ),
}

/** `tone` pins the lit lattice and the reticle to one role. */
export const Tones: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['action', 'info', 'ok', 'alive'] as const).map((tone) => (
        <div
          key={tone}
          className="relative h-40 w-56 overflow-hidden rounded-card border border-border bg-background"
        >
          <AmbientToys anchor="absolute" toys={['field', 'cursor']} tone={tone} seed={tone} />
          <Hint>{tone}</Hint>
        </div>
      ))}
    </div>
  ),
}
