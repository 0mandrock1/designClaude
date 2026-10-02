import * as React from "react"

import { Debris } from "@/components/debris/Debris"
import { BubbleWrap } from "@/components/ui/bubble-wrap"
import { DudButton } from "@/components/ui/dud-button"
import { FidgetDial } from "@/components/ui/fidget-dial"
import { FidgetSwitch } from "@/components/ui/fidget-switch"
import { PointlessSlider } from "@/components/ui/pointless-slider"
import { hash } from "@/lib/seed"
import { TONES, type Tone } from "@/lib/tone"
import { cn } from "@/lib/utils"

const POINTLESS_KINDS = ["dud", "switch", "slider", "dial", "wrap"] as const

type PointlessKind = (typeof POINTLESS_KINDS)[number]

export interface PointlessScatterProps extends React.ComponentProps<"div"> {
  /** Same seed, same shelf — the layout is deterministic. */
  seed?: string | number
  /** How many toys to put out. The README floor is 3 per screen. */
  count?: number
  /** Narrow which toys may appear. Defaults to all five. */
  kinds?: readonly PointlessKind[]
  /** Paint every toy in one tone; omit to let the seed mix all four roles. */
  tone?: Tone
  /** Hand `debris` down to every toy. */
  debris?: boolean
}

/**
 * mandrock0 pointless scatter — fills a dead area (a gutter, an empty hero
 * corner, the space under a short list) with a seeded shelf of pointless
 * interactives. It is the quickest way to meet the per-screen minimum.
 *
 * A grid, not an overlay: the toys sit in their own cells and never cover real
 * content or steal its clicks.
 */
function PointlessScatter({
  seed = "scatter",
  count = 5,
  kinds = POINTLESS_KINDS,
  tone,
  debris = false,
  className,
  ...props
}: PointlessScatterProps) {
  const items = Array.from({ length: count }, (_, i) => {
    const n = hash(`${seed}:${i}`)
    return {
      kind: kinds[n % kinds.length],
      tone: tone ?? TONES[(n >>> 5) % TONES.length],
      key: `${seed}-${i}`,
    }
  })

  return (
    <div
      data-slot="pointless-scatter"
      className={cn(
        "relative grid grid-cols-[repeat(auto-fill,minmax(8.5rem,1fr))] place-items-center gap-4 p-4",
        className
      )}
      {...props}
    >
      {items.map(({ kind, tone, key }) => {
        const common = { tone, debris, seed: key }
        switch (kind) {
          case "dud":
            return <DudButton key={key} {...common} />
          case "switch":
            return <FidgetSwitch key={key} tone={tone} debris={debris} />
          case "slider":
            return <PointlessSlider key={key} {...common} className="w-full" />
          case "dial":
            return <FidgetDial key={key} {...common} />
          case "wrap":
            return <BubbleWrap key={key} {...common} rows={2} cols={4} />
        }
      })}
      {debris && <Debris seed={String(seed)} name="scatter" count={3} />}
    </div>
  )
}

export { PointlessScatter, POINTLESS_KINDS, type PointlessKind }
