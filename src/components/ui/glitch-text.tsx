import * as React from "react"

import { cssString, hash } from "@/lib/seed"
import { cn } from "@/lib/utils"

/**
 * mandrock0 glitching label — the one glitch allowed near real copy.
 *
 * Readability is the contract: the text node itself is never moved, clipped or
 * recoloured. The glitch is a *ghost* — an aria-hidden copy whose glyphs live in
 * `::before` (so they never reach the a11y tree, the copy buffer or in-page
 * search) — that flashes behind the text in thin slices, at ≤ .35 opacity and
 * at most `--glitch-ceiling` px off. Under reduced motion it never shows.
 */

type GlitchTrigger = "hover" | "alive" | "idle"

export interface GlitchTextProps extends Omit<React.ComponentProps<"span">, "children"> {
  /** Plain text only — the ghost has to be able to repeat it in CSS. */
  children: string
  /**
   * What fires it, highest priority first: `alive` (a real process is running —
   * loops fast), `hover` (user interaction — once per hover, the default),
   * `idle` (a seeded blink every few seconds).
   */
  trigger?: GlitchTrigger
}

function GlitchText({
  children,
  trigger = "hover",
  className,
  style,
  ...props
}: GlitchTextProps) {
  const n = hash(children)
  return (
    <span
      data-slot="glitch-text"
      data-trigger={trigger}
      className={cn("relative inline-block", className)}
      style={style}
      {...props}
    >
      {children}
      <span
        aria-hidden="true"
        className="glitch-ghost pointer-events-none absolute inset-0 text-info opacity-0 select-none"
        style={
          {
            "--debris-content": cssString(children),
            "--glitch-delay": `${(n % 40) / 10}s`,
          } as React.CSSProperties
        }
      />
      <span
        aria-hidden="true"
        className="glitch-ghost pointer-events-none absolute inset-0 text-alive opacity-0 select-none [animation-direction:reverse]"
        style={
          {
            "--debris-content": cssString(children),
            "--glitch-delay": `${((n >>> 8) % 40) / 10}s`,
          } as React.CSSProperties
        }
      />
    </span>
  )
}

export { GlitchText, type GlitchTrigger }
