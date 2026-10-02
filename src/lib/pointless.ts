import * as React from "react"

/**
 * Shared plumbing for the pointless interactives (DudButton, FidgetSwitch,
 * PointlessSlider, FidgetDial, BubbleWrap). They react — hover, press, drag —
 * and change nothing outside themselves: no value leaves the component, no
 * form field, no callback with meaning.
 *
 * They are `aria-hidden` and out of the tab order on purpose. A control that
 * announces itself as a button and then does nothing is a lie to a screen
 * reader; a decorative toy that only answers the pointer is not.
 */

/** Re-triggerable one-shot wobble: `data-wobble` drives the CSS keyframe. */
export function useWobble() {
  const [wobble, setWobble] = React.useState(false)
  const kick = React.useCallback(() => {
    setWobble(false)
    // next frame, so the attribute actually flips and the animation restarts
    requestAnimationFrame(() => setWobble(true))
  }, [])
  const onAnimationEnd = React.useCallback(() => setWobble(false), [])
  return { wobble, kick, onAnimationEnd }
}

export const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v))
