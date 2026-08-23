import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * mandrock0 chaos layer — the single source of truth for decorative debris.
 * Everything here is deterministic: the same seed always produces the same
 * bits, because designsync's render-check re-renders stories and diffs the
 * output. Non-deterministic randomness would make that diff non-empty every time.
 */

const GLYPHS = ["✦", "▸", "░", "·", "※"] as const

// mostly system state / component meta — the room the debris lives in.
// one slot in eight is allowed to say something that isn't a system fact.
const STATE_WORDS = [
  "v0.3.1",
  "idle",
  "47ms",
  "sync",
  "ready",
  "armed",
  "no-op",
  "ok",
  "cache warm",
  "render ok",
  "12ms",
  "queued",
]

const ABSURD_WORDS = [
  "десь гуде вентилятор",
  "ще не пора спати",
  "тиша перед деплоєм",
  "хтось лишив TODO з 2019",
  "світло від монітора",
  "це ще не баг",
]

function hash(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function pick<T>(pool: readonly T[], n: number): T {
  return pool[n % pool.length]
}

type Bit = {
  content: string
  top: string
  left: string
  rot: number
  glitch: boolean
}

function buildBits(seed: string, name: string, count: number): Bit[] {
  const bits: Bit[] = []
  for (let i = 0; i < count; i++) {
    const n = hash(`${seed}:${name}:${i}`)
    // n is unsigned (0..2^32-1), but `>>` reinterprets its operand as a
    // signed int32 first — past 2^31 that flips negative and turns every
    // derived index/offset below negative too. `>>>` keeps it unsigned.
    const isAbsurd = n % 8 === 0
    const isGlyph = ((n >>> 3) % 3) === 0
    const text = isGlyph
      ? pick(GLYPHS, n >>> 5)
      : isAbsurd
        ? pick(ABSURD_WORDS, n >>> 7)
        : pick(STATE_WORDS.concat([`${name}#${i}`]), n >>> 9)

    bits.push({
      content: text,
      top: `${8 + (n % 80)}%`,
      left: `${5 + ((n >>> 2) % 85)}%`,
      rot: (n % 13) - 6,
      glitch: n % 6 === 0,
    })
  }
  return bits
}

export interface DebrisProps {
  /** Stable seed — pass the component's id/name or index, never a non-deterministic value. */
  seed: string | number
  /** Component name, used both as a pool ingredient and meta microtext. */
  name?: string
  /** How many glyph/microtext bits to scatter. */
  count?: number
  /** A real process is running right now — the sole trigger for pulse/glitch. */
  alive?: boolean
  className?: string
}

function Debris({ seed, name = "debris", count = 3, alive = false, className }: DebrisProps) {
  const bits = React.useMemo(
    () => buildBits(String(seed), name, count),
    [seed, name, count]
  )

  return (
    <span
      aria-hidden="true"
      data-slot="debris"
      data-alive={alive || undefined}
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {bits.map((bit, i) => (
        <i
          key={i}
          data-glitch={bit.glitch || undefined}
          data-alive={alive || undefined}
          className="debris-bit absolute font-mono text-[9px] leading-none whitespace-nowrap text-muted-foreground/35 not-italic select-none"
          style={
            {
              top: bit.top,
              left: bit.left,
              transform: `rotate(${bit.rot}deg)`,
              "--debris-content": `"${bit.content}"`,
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  )
}

export { Debris }
