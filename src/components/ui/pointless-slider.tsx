import * as React from "react"

import { Debris } from "@/components/debris/Debris"
import { clamp, useWobble } from "@/lib/pointless"
import { hash } from "@/lib/seed"
import { toneStyle, type Tone } from "@/lib/tone"
import { cn } from "@/lib/utils"

/** The unit the readout claims to measure. None of them are real. */
const UNITS = ["нічого", "тиші", "настрою", "bpm пустоти", "сенсу", "мс"] as const

export interface PointlessSliderProps extends React.ComponentProps<"span"> {
  tone?: Tone
  debris?: boolean
  /** Picks the rest position and the unit. */
  seed?: string | number
}

/**
 * mandrock0 pointless slider — drag the thumb (or tap the track) and the
 * readout follows; let go and it springs back to where it was. It sets nothing.
 * A pointless interactive.
 */
function PointlessSlider({
  tone = "info",
  debris = false,
  seed = "slider",
  className,
  style,
  ...props
}: PointlessSliderProps) {
  const n = hash(String(seed))
  const rest = 20 + (n % 61)
  const unit = UNITS[(n >>> 7) % UNITS.length]

  const track = React.useRef<HTMLSpanElement>(null)
  const [value, setValue] = React.useState<number | null>(null)
  const { wobble, kick, onAnimationEnd } = useWobble()

  const at = (clientX: number) => {
    const r = track.current?.getBoundingClientRect()
    if (!r || r.width === 0) return rest
    return Math.round(clamp(((clientX - r.left) / r.width) * 100, 0, 100))
  }

  const shown = value ?? rest

  return (
    <span
      aria-hidden="true"
      data-pointless="pointless-slider"
      data-tone={tone}
      data-wobble={wobble || undefined}
      className={cn(
        "relative inline-flex w-48 items-center gap-3 font-mono text-xs select-none",
        className
      )}
      style={toneStyle(tone, style)}
      onAnimationEnd={onAnimationEnd}
      {...props}
    >
      <span
        ref={track}
        data-slot="pointless-slider-track"
        className="relative h-1.5 flex-1 cursor-pointer touch-none rounded-full bg-muted"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          setValue(at(e.clientX))
        }}
        onPointerMove={(e) => {
          if (value !== null) setValue(at(e.clientX))
        }}
        onPointerUp={() => {
          setValue(null)
          kick()
        }}
        onPointerCancel={() => setValue(null)}
      >
        <span
          className={cn(
            "absolute inset-y-0 left-0 rounded-full bg-(--tone)/60",
            value === null && "transition-[width] duration-500 ease-[cubic-bezier(.34,1.56,.64,1)]"
          )}
          style={{ width: `${shown}%` }}
        />
        <span
          data-slot="pointless-slider-thumb"
          className={cn(
            "absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-(--tone) bg-void shadow-glow-ambient hover:shadow-glow-attention",
            value === null && "transition-[left] duration-500 ease-[cubic-bezier(.34,1.56,.64,1)]"
          )}
          style={{ left: `${shown}%` }}
        />
      </span>
      <span className="w-20 shrink-0 text-(--tone) tabular-nums">
        {shown}% {unit}
      </span>
      {debris && <Debris seed={String(seed)} name="slider" count={2} />}
    </span>
  )
}

export { PointlessSlider }
