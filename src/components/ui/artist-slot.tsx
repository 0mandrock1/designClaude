import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * mandrock0 artists roster — names, and the slots the unnamed ones will take.
 *
 * The panel is the one place the dark system flips to print: paper stock, ink,
 * hard 1.5px rules, no radius on the tiles. That inversion is the point — the
 * roster is a poster pinned to the page, not another card. The palette lives in
 * `--artists-*` tokens in `index.css` and is scoped to `ArtistsPanel`, so
 * nothing outside it inherits paper.
 *
 * Three states, and they are not decoration — each one says something different
 * about the name:
 *   active   — a live name with a domain behind it; the only state that links.
 *   archive  — retired, kept on the wall, deliberately dimmed and not clickable.
 *   reserved — an empty slot whose domain is already claimed. The hint only
 *              shows on hover, so the wall reads as a grid until you look.
 */

/** The domains already claimed for names that don't exist yet, in slot order. */
const RESERVED_DOMAINS = [
  "поп-вокал",
  "рейв",
  "джеми",
  "колаби",
  "ембієнт",
  "лайв-кодинг",
] as const

/** Six is the whole wall — `reservedSlots()` never returns more than this. */
const RESERVED_SLOT_COUNT = 6

export interface ReservedSlot {
  /** Zero-padded slot number as shown on the tile, e.g. `"01"`. */
  no: string
  domain: (typeof RESERVED_DOMAINS)[number]
}

/**
 * The reserved slots, clamped to the wall. Callers pass a count so a page can
 * show fewer than the full six without inventing domains of its own.
 */
function reservedSlots(count: number = RESERVED_SLOT_COUNT): ReservedSlot[] {
  const n = Math.max(0, Math.min(RESERVED_SLOT_COUNT, Math.floor(count)))
  return RESERVED_DOMAINS.slice(0, n).map((domain, i) => ({
    domain,
    no: String(i + 1).padStart(2, "0"),
  }))
}

function ArtistsPanel({ className, ...props }: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="artists-panel"
      className={cn(
        "grid gap-6 overflow-hidden rounded-card bg-artists-paper px-4 pt-[22px] pb-[26px] text-artists-ink",
        className
      )}
      {...props}
    />
  )
}

function ArtistsPanelHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="artists-panel-header"
      className={cn("grid gap-1.5", className)}
      {...props}
    />
  )
}

/** The `04 / Artists` line — mono, tracked out, deliberately quiet. */
function ArtistsPanelEyebrow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="artists-panel-eyebrow"
      className={cn(
        "font-mono text-[.72rem] tracking-[.22em] uppercase opacity-75",
        className
      )}
      {...props}
    />
  )
}

function ArtistsPanelTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="artists-panel-title"
      className={cn("text-2xl font-semibold tracking-tight", className)}
      {...props}
    />
  )
}

/**
 * A titled band inside the panel — "Свої імена", "Кого продюсую". `rule="heavy"`
 * is the 3px divider the design uses to break the roster off from the producing
 * credits; `rule="hairline"` underlines a heading within a band.
 */
function ArtistsSection({
  className,
  rule = "none",
  ...props
}: React.ComponentProps<"div"> & { rule?: "none" | "hairline" | "heavy" }) {
  return (
    <div
      data-slot="artists-section"
      data-rule={rule}
      className={cn(
        "grid gap-3",
        rule === "heavy" && "border-t-[3px] border-artists-ink pt-1.5",
        className
      )}
      {...props}
    />
  )
}

function ArtistsSectionHeader({
  className,
  rule = "none",
  ...props
}: React.ComponentProps<"div"> & { rule?: "none" | "hairline" }) {
  return (
    <div
      data-slot="artists-section-header"
      className={cn(
        "flex flex-wrap items-baseline gap-2.5",
        rule === "hairline" &&
          "border-b-[1.5px] border-artists-ink/35 pb-1.5",
        className
      )}
      {...props}
    />
  )
}

/** The auto-fitting wall the slots sit on. Tiles never go below 210px. */
function ArtistSlotGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="artist-slot-group"
      className={cn(
        "grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-2.5",
        className
      )}
      {...props}
    />
  )
}

const ARTIST_SLOT_STATES = ["active", "archive", "reserved"] as const
type ArtistSlotState = (typeof ARTIST_SLOT_STATES)[number]

const artistSlotVariants = cva(
  "group/slot flex min-h-28 flex-col justify-between gap-3.5 px-3.5 py-3",
  {
    variants: {
      state: {
        active:
          "border-[1.5px] border-artists-ink bg-artists-card text-artists-ink",
        archive:
          "border border-artists-ink/30 bg-artists-shade/35 text-artists-ink/60",
        reserved:
          "border-[1.5px] border-dashed border-artists-ink/50 text-artists-ink/80",
      },
    },
    defaultVariants: {
      state: "active",
    },
  }
)

/** What the tile calls itself when the caller doesn't override it. */
const DEFAULT_LABELS: Record<ArtistSlotState, string> = {
  active: "активний",
  archive: "архів",
  reserved: "слот",
}

export interface ArtistSlotProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof artistSlotVariants> {
  /** Overrides the state's default caption in the tile's top row. */
  label?: React.ReactNode
  /** Slot number shown instead of the status dot. Reserved tiles only. */
  no?: React.ReactNode
  /** Present ⇒ the tile is a link. Only `active` names are ever given one. */
  href?: string
}

function ArtistSlot({
  state = "active",
  label,
  no,
  href,
  className,
  children,
  ...props
}: ArtistSlotProps) {
  const resolved = (state ?? "active") as ArtistSlotState
  // A reserved tile shows its number where the others show a status dot; the
  // dot is filled while the name is live and hollow once it is archived.
  const indicator =
    no !== undefined ? (
      <span className="font-mono text-[.64rem]">{no}</span>
    ) : (
      <span
        aria-hidden="true"
        className={cn(
          "size-[7px] rounded-full",
          resolved === "active" ? "bg-artists-ink" : "border border-current"
        )}
      />
    )

  // Only an active name is ever a link, so the tag is derived from `href`
  // rather than configured. Props are typed as HTMLAttributes<HTMLElement>
  // (not ComponentProps<"div">) precisely so both tags accept them.
  const Comp: React.ElementType = href ? "a" : "div"

  return (
    <Comp
      data-slot="artist-slot"
      data-state={resolved}
      href={href}
      className={cn(artistSlotVariants({ state: resolved }), className)}
      {...props}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[.64rem] tracking-[.16em] uppercase">
          {label ?? DEFAULT_LABELS[resolved]}
        </span>
        {indicator}
      </div>
      <div className={cn("grid", resolved === "reserved" ? "gap-2" : "gap-0.5")}>
        {children}
      </div>
    </Comp>
  )
}

/**
 * The name itself. An archived name is set lighter and at the body size — the
 * roster should read the live names first from across the room.
 */
function ArtistSlotName({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="artist-slot-name"
      className={cn(
        "text-xl font-bold tracking-tight",
        "group-data-[state=archive]/slot:text-[1.05rem] group-data-[state=archive]/slot:font-normal group-data-[state=archive]/slot:tracking-normal",
        className
      )}
      {...props}
    />
  )
}

/** The line under the name — domain, genre, whatever grounds it. */
function ArtistSlotMeta({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="artist-slot-meta"
      className={cn("font-mono text-[.7rem] opacity-75", className)}
      {...props}
    />
  )
}

/** Stand-in rule where an empty slot's name will eventually go. */
function ArtistSlotBar({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden="true"
      data-slot="artist-slot-bar"
      className={cn("block h-0.5 w-[64%] bg-artists-ink/45", className)}
      {...props}
    />
  )
}

/**
 * Reveals on hover only. The wall should read as a clean grid at rest; the
 * explanation is there for whoever actually stops on a tile.
 */
function ArtistSlotHint({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="artist-slot-hint"
      data-slot-hint="true"
      className={cn(
        "font-mono text-[.62rem] tracking-[.06em] opacity-0 transition-opacity duration-150 group-hover/slot:opacity-80",
        className
      )}
      {...props}
    />
  )
}

/**
 * The producing credit — an ink well punched into the paper. Inverted against
 * the panel so an outside artist never reads as one of the names above.
 */
function ArtistFeature({
  className,
  href,
  ...props
}: React.HTMLAttributes<HTMLElement> & { href?: string }) {
  const Comp: React.ElementType = href ? "a" : "div"
  return (
    <Comp
      data-slot="artist-feature"
      href={href}
      className={cn(
        "group/feature grid gap-3.5 bg-artists-well px-4 py-[18px] text-artists-well-foreground",
        className
      )}
      {...props}
    />
  )
}

function ArtistFeatureMeta({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="artist-feature-meta"
      className={cn(
        "flex items-center justify-between gap-2.5 font-mono text-[.66rem]",
        className
      )}
      {...props}
    />
  )
}

function ArtistFeatureName({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="artist-feature-name"
      className={cn(
        "text-[clamp(1.6rem,8vw,2.4rem)] leading-none font-medium tracking-[.02em] uppercase",
        className
      )}
      {...props}
    />
  )
}

export {
  ArtistsPanel,
  ArtistsPanelHeader,
  ArtistsPanelEyebrow,
  ArtistsPanelTitle,
  ArtistsSection,
  ArtistsSectionHeader,
  ArtistSlotGroup,
  ArtistSlot,
  ArtistSlotName,
  ArtistSlotMeta,
  ArtistSlotBar,
  ArtistSlotHint,
  ArtistFeature,
  ArtistFeatureMeta,
  ArtistFeatureName,
  artistSlotVariants,
  reservedSlots,
  RESERVED_DOMAINS,
  RESERVED_SLOT_COUNT,
  ARTIST_SLOT_STATES,
  type ArtistSlotState,
}
