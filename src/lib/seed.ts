/**
 * Deterministic randomness for the chaos layer, the pointless interactives and
 * the ambient toys. designsync's render-check re-renders stories and diffs the
 * output, so anything that paints on first render must come from a seed — never
 * from Math.random().
 */

/** FNV-1a — string seed → unsigned 32-bit int. */
export function hash(input: string): number {
  let h = 2166136261
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

/** mulberry32 — a seeded stream of floats in [0, 1). */
export function rng(seed: string | number): () => number {
  let a = typeof seed === "number" ? seed >>> 0 : hash(seed)
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Quote a value for a CSS `content:` string — backslashes, quotes and newlines escaped. */
export function cssString(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\A ")}"`
}
