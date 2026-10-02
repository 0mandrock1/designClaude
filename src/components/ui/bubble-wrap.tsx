import * as React from "react"

import { Debris } from "@/components/debris/Debris"
import { hash } from "@/lib/seed"
import { toneStyle, type Tone } from "@/lib/tone"
import { cn } from "@/lib/utils"

export interface BubbleWrapProps extends React.ComponentProps<"span"> {
  rows?: number
  cols?: number
  tone?: Tone
  debris?: boolean
  /** Which bubbles arrive already popped. */
  seed?: string | number
}

/**
 * mandrock0 bubble wrap — click a bubble and it pops; pop the whole sheet and a
 * fresh one rolls in. The least useful object ever packed. A pointless interactive.
 */
function BubbleWrap({
  rows = 3,
  cols = 6,
  tone = "info",
  debris = false,
  seed = "wrap",
  className,
  style,
  ...props
}: BubbleWrapProps) {
  const total = rows * cols
  const fresh = React.useCallback(
    // a seeded handful arrive pre-popped, so the sheet looks handled, not new
    () => Array.from({ length: total }, (_, i) => hash(`${seed}:${i}`) % 7 === 0),
    [seed, total]
  )
  const [popped, setPopped] = React.useState(fresh)

  React.useEffect(() => {
    if (!popped.every(Boolean)) return
    const t = window.setTimeout(() => setPopped(Array(total).fill(false)), 700)
    return () => window.clearTimeout(t)
  }, [popped, total])

  return (
    <span
      aria-hidden="true"
      data-pointless="bubble-wrap"
      data-tone={tone}
      className={cn(
        "relative inline-grid gap-1 rounded-card border border-border bg-void p-2 select-none",
        className
      )}
      style={toneStyle(tone, { gridTemplateColumns: `repeat(${cols}, 1.25rem)`, ...style })}
      {...props}
    >
      {popped.map((p, i) => (
        <span
          key={i}
          data-slot="bubble-wrap-cell"
          data-popped={p || undefined}
          className={cn(
            "size-5 rounded-full border transition-[background-color,box-shadow,border-color]",
            p
              ? "border-border bg-transparent"
              : "cursor-pointer border-(--tone)/50 bg-(--tone)/15 shadow-[inset_-2px_-2px_0_color-mix(in_oklch,var(--tone)_25%,transparent)] hover:bg-(--tone)/30 hover:shadow-glow-attention"
          )}
          onClick={() =>
            setPopped((prev) => (prev[i] ? prev : prev.map((v, j) => (j === i ? true : v))))
          }
        />
      ))}
      {debris && <Debris seed={String(seed)} name="wrap" count={2} />}
    </span>
  )
}

export { BubbleWrap }
