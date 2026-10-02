import * as React from "react"

import { Debris } from "@/components/debris/Debris"
import { useWobble } from "@/lib/pointless"
import { hash } from "@/lib/seed"
import { toneStyle, type Tone } from "@/lib/tone"
import { cn } from "@/lib/utils"

/** What the button says after each press — it never says it did something. */
const DUD_LINES = [
  "нічого",
  "ще раз",
  "все ще нічого",
  "ок",
  "не працює",
  "і не буде",
  "натиснуто",
  "так-так",
  "no-op",
  "0 змін",
] as const

export interface DudButtonProps
  extends Omit<React.ComponentProps<"span">, "children"> {
  /** Label before the first press. */
  children?: React.ReactNode
  tone?: Tone
  debris?: boolean
  /** Picks where in the reply cycle the button starts. */
  seed?: string | number
}

/**
 * mandrock0 dud button — a button-shaped thing that presses, wobbles, counts
 * the presses and does nothing else. A pointless interactive.
 */
function DudButton({
  children = "натисни",
  tone = "action",
  debris = false,
  seed = "dud",
  className,
  style,
  onClick,
  ...props
}: DudButtonProps) {
  const [presses, setPresses] = React.useState(0)
  const { wobble, kick, onAnimationEnd } = useWobble()
  const offset = hash(String(seed))

  return (
    <span
      aria-hidden="true"
      data-pointless="dud-button"
      data-tone={tone}
      data-wobble={wobble || undefined}
      className={cn(
        "relative inline-flex h-8 cursor-pointer items-center gap-2 overflow-hidden rounded-control border border-(--tone)/40 bg-(--tone)/10 px-3 font-mono text-xs text-(--tone) transition-[background-color,box-shadow,translate,scale] select-none hover:bg-(--tone)/20 hover:shadow-glow-attention active:translate-y-px active:scale-95",
        className
      )}
      style={toneStyle(tone, style)}
      onClick={(e) => {
        setPresses((p) => p + 1)
        kick()
        onClick?.(e)
      }}
      onAnimationEnd={onAnimationEnd}
      {...props}
    >
      <span>
        {presses === 0
          ? children
          : DUD_LINES[(offset + presses - 1) % DUD_LINES.length]}
      </span>
      <span className="tabular-nums opacity-60">
        {String(presses).padStart(2, "0")}
      </span>
      {debris && <Debris seed={String(seed)} name="dud" count={2} />}
    </span>
  )
}

export { DudButton }
