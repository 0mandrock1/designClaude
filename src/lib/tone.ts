import type * as React from "react"

/**
 * The four role colours as a prop. Named `tone`, not `role`, because `role` is
 * the ARIA attribute every DOM component already forwards.
 *
 *   action — purple, the thing to click
 *   info   — cyan, neutral notice
 *   ok     — lime, success / complete
 *   alive  — crimson, live / irreversible
 *
 * Components set `--tone` once on their root and paint with `bg-(--tone)`,
 * `text-(--tone)`, `border-(--tone)/40` — one set of literal classes, so the
 * Tailwind subset compiles them no matter which tone a page picks.
 */
export type Tone = "action" | "info" | "ok" | "alive"

export const TONES: readonly Tone[] = ["action", "info", "ok", "alive"]

export function toneStyle(tone: Tone, style?: React.CSSProperties): React.CSSProperties {
  return { "--tone": `var(--${tone})`, ...style } as React.CSSProperties
}
