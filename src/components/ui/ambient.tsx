import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * mandrock0 ambient layer — the decorative shell a page wears.
 *
 * Every layer is inert: `aria-hidden`, `pointer-events-none`, and behind the
 * content on z-index. Nothing here reacts to input, so the layer can be dropped
 * onto any page without touching its behaviour — which is the whole point:
 * one wrapper, and the page is dressed in the system.
 *
 * The paint lives in inline `style` rather than arbitrary Tailwind values —
 * these are multi-stop gradients with `color-mix()` inside, and the class-name
 * escaping needed to express them is far less readable than the CSS itself.
 * Layout, stacking and hit-testing stay in classes.
 */

const AMBIENT_LAYERS = [
  "grid",
  "scanlines",
  "sweep",
  "noise",
  "crosshairs",
  "vignette",
  "foci",
] as const

type AmbientLayerName = (typeof AMBIENT_LAYERS)[number]

type AmbientMode = "calm" | "default" | "hostile"

/**
 * The intensity ladder. `calm` keeps the room quiet enough to read a tracker in;
 * `hostile` turns everything on. The two motion layers (scanlines, sweep) only
 * ever appear at the top of the ladder — they are the ones that cost attention.
 */
const LAYERS_BY_MODE: Record<AmbientMode, readonly AmbientLayerName[]> = {
  calm: ["grid", "vignette"],
  default: ["grid", "noise", "vignette", "foci"],
  hostile: AMBIENT_LAYERS,
}

/** Layers gated by the `scanlines` switch — the ones that never stop moving. */
const MOTION_LAYERS: readonly AmbientLayerName[] = ["scanlines", "sweep"]

export interface AmbientLayerProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  name: AmbientLayerName
  /**
   * `fixed` pins the layer to the viewport (the real page). `absolute` pins it
   * to the nearest positioned ancestor — use it to demo the layer inside a box.
   */
  anchor?: "fixed" | "absolute"
  /** Parallax offset applied to the `foci` layer, e.g. `"-12px"`. */
  parallax?: string | number
}

function AmbientLayer({
  name,
  anchor = "fixed",
  parallax,
  className,
  style,
  ...props
}: AmbientLayerProps) {
  // useId is stable across re-renders of the same tree, so the filter reference
  // stays put; the colons React puts in the id are stripped because `url(#…)`
  // is a fragment reference and colons make it ambiguous.
  const rawId = React.useId()
  const filterId = `ambient-noise-${rawId.replace(/:/g, "")}`

  const base = cn(
    "pointer-events-none z-0",
    anchor === "fixed" ? "fixed" : "absolute",
    className
  )

  const shared = {
    "aria-hidden": true as const,
    "data-slot": "ambient-layer",
    "data-ambient-slot": `page-${name}`,
  }

  switch (name) {
    case "grid":
      return (
        <div
          {...shared}
          className={cn(base, "inset-0 opacity-45")}
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            ...style,
          }}
          {...props}
        />
      )

    case "scanlines":
      return (
        <div
          {...shared}
          className={cn(base, "inset-0 mix-blend-multiply")}
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, oklch(0% 0 0 / .28) 0 1px, transparent 1px 3px)",
            opacity: "calc(.5 * var(--glitch-budget, 1))",
            ...style,
          }}
          {...props}
        />
      )

    case "sweep":
      return (
        <div
          {...shared}
          className={cn(base, "inset-x-0 top-0 h-[16vh]")}
          style={{
            backgroundImage:
              "linear-gradient(to bottom, transparent, color-mix(in oklch, var(--accent-lime) 7%, transparent), transparent)",
            animation: "ambient-sweep 11s linear infinite",
            opacity: "var(--glitch-budget, 1)",
            ...style,
          }}
          {...props}
        />
      )

    case "noise":
      return (
        <svg
          aria-hidden="true"
          data-slot="ambient-layer"
          data-ambient-slot="page-noise"
          className={cn(base, "inset-0 h-full w-full opacity-[.14] mix-blend-overlay")}
          style={style}
        >
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves={2}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#${filterId})`} />
        </svg>
      )

    case "crosshairs":
      return (
        <div
          {...shared}
          className={cn(base, "inset-[10px] opacity-35")}
          style={{
            backgroundImage:
              "linear-gradient(var(--accent-lime), var(--accent-lime)), linear-gradient(var(--accent-lime), var(--accent-lime)), linear-gradient(var(--accent-lime), var(--accent-lime)), linear-gradient(var(--accent-lime), var(--accent-lime))",
            backgroundSize: "14px 1px, 1px 14px, 14px 1px, 1px 14px",
            backgroundPosition: "left top, left top, right bottom, right bottom",
            backgroundRepeat: "no-repeat",
            ...style,
          }}
          {...props}
        />
      )

    case "vignette":
      return (
        <div
          {...shared}
          className={cn(base, "inset-0")}
          style={{
            backgroundImage:
              "radial-gradient(120% 90% at 50% 45%, transparent 55%, oklch(0% 0 0 / .55) 100%)",
            ...style,
          }}
          {...props}
        />
      )

    case "foci":
      return (
        <div
          {...shared}
          className={cn(base, "inset-0")}
          style={{
            backgroundImage:
              "radial-gradient(560px 420px at 8% 4%, color-mix(in oklch, var(--accent-purple) 20%, transparent), transparent 68%), radial-gradient(520px 400px at 96% 58%, color-mix(in oklch, var(--accent-cyan) 11%, transparent), transparent 70%)",
            transform:
              parallax === undefined
                ? undefined
                : `translate3d(0, ${typeof parallax === "number" ? `${parallax}px` : parallax}, 0)`,
            ...style,
          }}
          {...props}
        />
      )
  }
}

export interface AmbientProps extends React.ComponentProps<"div"> {
  /** Intensity ladder — how much of the room is on. */
  mode?: AmbientMode
  /**
   * Force the two motion layers on or off regardless of `mode`. Left undefined,
   * the mode decides.
   */
  scanlines?: boolean
  /** Ceiling for every glitch in the subtree — 0 disables motion outright. */
  glitch?: number
  /** Overrides `--accent-purple` for the subtree, so one page can retune the shader. */
  accent?: string
  /** Parallax offset handed to the `foci` layer; drive it from scroll position. */
  parallax?: string | number
  /** `fixed` for a real page, `absolute` to contain the layer inside this box. */
  anchor?: "fixed" | "absolute"
  /** Explicit layer set, bypassing the `mode` ladder entirely. */
  layers?: readonly AmbientLayerName[]
}

function Ambient({
  mode = "default",
  scanlines,
  glitch,
  accent,
  parallax,
  anchor = "fixed",
  layers,
  className,
  style,
  children,
  ...props
}: AmbientProps) {
  const active = React.useMemo(() => {
    const base = layers ?? LAYERS_BY_MODE[mode]
    if (scanlines === undefined) return base
    return scanlines
      ? Array.from(new Set([...base, ...MOTION_LAYERS]))
      : base.filter((l) => !MOTION_LAYERS.includes(l))
  }, [layers, mode, scanlines])

  return (
    <div
      data-slot="ambient"
      data-mode={mode}
      className={cn("relative isolate overflow-x-hidden", className)}
      style={
        {
          ...(glitch === undefined ? null : { "--glitch-budget": String(glitch) }),
          ...(accent === undefined ? null : { "--accent-purple": accent }),
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      {active.map((name) => (
        <AmbientLayer
          key={name}
          name={name}
          anchor={anchor}
          parallax={name === "foci" ? parallax : undefined}
        />
      ))}
      {/* Content sits one step above every layer, and carries its own stacking
          context so a sticky header inside it can't be painted over by the grid. */}
      <div data-slot="ambient-content" className="relative z-1 h-full">
        {children}
      </div>
    </div>
  )
}

export interface AmbientSlotProps extends React.ComponentProps<"span"> {
  /** Slot name the ambient runtime writes into, e.g. `seed-readout`. */
  name: string
}

/**
 * A named hole in the page the ambient runtime can fill — the seed readout in
 * the status strip, the note in the footer. Renders its children as a fallback
 * so the page still reads correctly with the runtime absent.
 */
function AmbientSlot({ name, className, ...props }: AmbientSlotProps) {
  return (
    <span
      data-slot="ambient-slot"
      data-ambient-slot={name}
      className={cn("font-mono text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Ambient,
  AmbientLayer,
  AmbientSlot,
  AMBIENT_LAYERS,
  LAYERS_BY_MODE,
  type AmbientLayerName,
  type AmbientMode,
}
