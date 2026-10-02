import * as React from "react"

import { Debris } from "@/components/debris/Debris"
import { useWobble } from "@/lib/pointless"
import { hash } from "@/lib/seed"
import { toneStyle, type Tone } from "@/lib/tone"
import { cn } from "@/lib/utils"

const TICKS = 12

export interface FidgetDialProps extends React.ComponentProps<"span"> {
  tone?: Tone
  debris?: boolean
  /** Picks the starting angle. */
  seed?: string | number
}

/**
 * mandrock0 fidget dial — a knob you can spin by dragging around it, or click to
 * nudge a notch. It keeps its angle and turns nothing. A pointless interactive.
 */
function FidgetDial({
  tone = "action",
  debris = false,
  seed = "dial",
  className,
  style,
  ...props
}: FidgetDialProps) {
  const [angle, setAngle] = React.useState(() => (hash(String(seed)) % TICKS) * (360 / TICKS))
  const grab = React.useRef<{ last: number; travel: number } | null>(null)
  const { wobble, kick, onAnimationEnd } = useWobble()

  const pointerAngle = (e: React.PointerEvent<HTMLSpanElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    return (
      (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) /
      Math.PI
    )
  }

  return (
    <span
      aria-hidden="true"
      data-pointless="fidget-dial"
      data-tone={tone}
      data-wobble={wobble || undefined}
      className={cn(
        "relative inline-grid size-16 shrink-0 cursor-grab touch-none place-items-center rounded-full border border-(--tone)/40 bg-void select-none hover:shadow-glow-attention active:cursor-grabbing",
        className
      )}
      style={toneStyle(tone, style)}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        grab.current = { last: pointerAngle(e), travel: 0 }
      }}
      onPointerMove={(e) => {
        const g = grab.current
        if (!g) return
        const now = pointerAngle(e)
        // atan2 wraps at ±180°; fold each step back into (-180, 180] so a
        // pointer circling past the seam keeps turning instead of jumping
        const step = ((now - g.last + 540) % 360) - 180
        g.last = now
        g.travel += Math.abs(step)
        setAngle((a) => a + step)
      }}
      onPointerUp={() => {
        if (grab.current && grab.current.travel < 3) setAngle((a) => a + 360 / TICKS)
        grab.current = null
        kick()
      }}
      onPointerCancel={() => (grab.current = null)}
      onAnimationEnd={onAnimationEnd}
      {...props}
    >
      {Array.from({ length: TICKS }, (_, i) => (
        <span
          key={i}
          className="absolute inset-0"
          style={{ rotate: `${(i * 360) / TICKS}deg` }}
        >
          <span className="absolute top-1 left-1/2 h-1.5 w-px -translate-x-1/2 bg-(--tone)/40" />
        </span>
      ))}
      <span
        data-slot="fidget-dial-knob"
        className="relative size-10 rounded-full border border-border bg-card shadow-glow-ambient"
        style={{ rotate: `${angle}deg` }}
      >
        <span className="absolute top-1 left-1/2 h-3 w-0.5 -translate-x-1/2 rounded-full bg-(--tone)" />
      </span>
      {debris && <Debris seed={String(seed)} name="dial" count={1} />}
    </span>
  )
}

export { FidgetDial }
