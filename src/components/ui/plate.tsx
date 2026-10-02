import * as React from "react"

import { Debris } from "@/components/debris/Debris"
import { toneStyle, type Tone } from "@/lib/tone"
import { cn } from "@/lib/utils"

/**
 * mandrock0 plate — a true-black strip bolted onto the page: a status line, a
 * section stamp, a caption under a render. Void is the surface; the tone is a
 * 2px edge plus the label colour, so the plate always has a visible boundary
 * even where void meets the near-black background (~1.05:1 on its own).
 *
 * Every tone passes AA as text on void (action 4.9+, alive 4.7+, info 12, ok 15).
 */
function Plate({
  tone,
  debris = false,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  /** Role colour for the edge and the label. Omit for a plain border-framed plate. */
  tone?: Tone
  debris?: boolean
}) {
  return (
    <div
      data-slot="plate"
      data-tone={tone}
      className={cn(
        "relative flex items-center gap-3 overflow-hidden rounded-card border border-border bg-void px-3 py-2 font-mono text-xs text-void-foreground",
        tone && "border-l-2 border-l-(--tone)",
        className
      )}
      style={tone ? toneStyle(tone, style) : style}
      {...props}
    >
      {children}
      {debris && <Debris seed={tone ?? "plate"} name="plate" count={2} />}
    </div>
  )
}

/** The mono caps label at the head of a plate — coloured by the plate's tone. */
function PlateLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="plate-label"
      className={cn(
        // with no tone set, var(--tone) is invalid at computed time and the
        // colour simply inherits the plate's void-foreground
        "shrink-0 tracking-[.18em] text-(--tone) uppercase",
        className
      )}
      {...props}
    />
  )
}

export { Plate, PlateLabel }
