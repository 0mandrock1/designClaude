import * as React from "react"

import { Debris } from "@/components/debris/Debris"
import { clamp, useWobble } from "@/lib/pointless"
import { toneStyle, type Tone } from "@/lib/tone"
import { cn } from "@/lib/utils"

/** Thumb travel in px: 44px track − 20px thumb − 2×2px inset. */
const TRAVEL = 20

export interface FidgetSwitchProps extends React.ComponentProps<"span"> {
  /** Where it starts. It is never read back — there is nothing to read. */
  defaultOn?: boolean
  tone?: Tone
  debris?: boolean
}

/**
 * mandrock0 fidget switch — click it and it flips, drag the thumb and it
 * follows, let go and it snaps to the nearer side with a wobble. It switches
 * nothing. A pointless interactive.
 */
function FidgetSwitch({
  defaultOn = false,
  tone = "ok",
  debris = false,
  className,
  style,
  ...props
}: FidgetSwitchProps) {
  const [on, setOn] = React.useState(defaultOn)
  const [drag, setDrag] = React.useState<number | null>(null)
  const start = React.useRef({ x: 0, base: 0, moved: false })
  const { wobble, kick, onAnimationEnd } = useWobble()

  const x = drag ?? (on ? TRAVEL : 0)

  return (
    <span
      aria-hidden="true"
      data-pointless="fidget-switch"
      data-tone={tone}
      data-on={on || undefined}
      data-wobble={wobble || undefined}
      className={cn(
        "group/fidget relative inline-flex h-6 w-11 shrink-0 cursor-grab touch-none items-center rounded-full border border-(--tone)/40 bg-muted p-0.5 transition-colors select-none active:cursor-grabbing data-on:bg-(--tone)/30",
        className
      )}
      style={toneStyle(tone, style)}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        start.current = { x: e.clientX, base: on ? TRAVEL : 0, moved: false }
        setDrag(on ? TRAVEL : 0)
      }}
      onPointerMove={(e) => {
        if (drag === null) return
        const dx = e.clientX - start.current.x
        if (Math.abs(dx) > 2) start.current.moved = true
        setDrag(clamp(start.current.base + dx, 0, TRAVEL))
      }}
      onPointerUp={() => {
        if (drag === null) return
        setOn(start.current.moved ? drag > TRAVEL / 2 : !on)
        setDrag(null)
        kick()
      }}
      onPointerCancel={() => setDrag(null)}
      onAnimationEnd={onAnimationEnd}
      {...props}
    >
      <span
        data-slot="fidget-switch-thumb"
        className={cn(
          "block size-5 rounded-full bg-foreground shadow-glow-ambient group-data-on/fidget:bg-(--tone)",
          drag === null && "transition-transform duration-200 ease-out"
        )}
        style={{ transform: `translateX(${x}px)` }}
      />
      {debris && <Debris seed={tone} name="fidget" count={1} />}
    </span>
  )
}

export { FidgetSwitch }
