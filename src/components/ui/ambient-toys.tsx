import * as React from "react"

import { rng } from "@/lib/seed"
import type { Tone } from "@/lib/tone"
import { cn } from "@/lib/utils"

/**
 * mandrock0 ambient toys — the pointer-reactive half of the ambient layer, the
 * same idle toys the mandrock.me homepage runs from `mandrock0-ambient.js`:
 *
 *   field     — a dot lattice that bends away from the pointer and lights up
 *   particles — sparks shed while the pointer moves, a burst on every press
 *   trail     — a fading line behind the pointer
 *   cursor    — a reticle drawn over the pointer
 *
 * One canvas, `pointer-events-none`, listening on its host (the viewport when
 * `anchor="fixed"`, the parent box when `absolute`) — so the toys answer the
 * pointer everywhere without ever taking a click from the content above them.
 *
 * Deterministic on first paint (the resting lattice comes from `seed`), and the
 * motion toys (particles, trail) stay off under reduced motion or a zero
 * `--glitch-budget`.
 */

const AMBIENT_TOYS = ["field", "particles", "trail", "cursor"] as const

type AmbientToyName = (typeof AMBIENT_TOYS)[number]

const ACCENTS = ["--accent-purple", "--accent-cyan", "--accent-lime", "--accent-crimson"] as const

export interface AmbientToysProps
  extends Omit<React.ComponentProps<"canvas">, "children"> {
  toys?: readonly AmbientToyName[]
  seed?: string | number
  /** `fixed` for a real page, `absolute` to keep the toys inside the parent box. */
  anchor?: "fixed" | "absolute"
  /** Colour the lit lattice and the reticle with one role; omit to let the seed pick. */
  tone?: Tone
}

type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number; col: string; sz: number }

function AmbientToys({
  toys = AMBIENT_TOYS,
  seed = "ambient",
  anchor = "fixed",
  tone,
  className,
  ...props
}: AmbientToysProps) {
  const ref = React.useRef<HTMLCanvasElement>(null)
  const toyKey = toys.join(",")

  React.useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return
    const on = new Set(toyKey.split(","))

    const R = rng(seed)
    const css = getComputedStyle(canvas)
    const read = (name: string) => css.getPropertyValue(name).trim() || "white"
    const accents = ACCENTS.map(read)
    const muted = read("--muted-foreground")
    const lit = tone ? read(`--${tone}`) : accents[Math.floor(R() * 4)]
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches
    const budget = parseFloat(css.getPropertyValue("--glitch-budget")) || 0
    const motion = !reduced && budget > 0

    const spacing = 22 + R() * 10
    const reach = 90 + R() * 60
    const cursorShape = Math.floor(R() * 3)
    const sparkShape = Math.floor(R() * 3)

    const host: HTMLElement | null =
      anchor === "fixed" ? document.documentElement : canvas.parentElement
    if (!host) return

    let W = 0
    let H = 0
    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const r =
        anchor === "fixed"
          ? { width: window.innerWidth, height: window.innerHeight }
          : host.getBoundingClientRect()
      W = r.width
      H = r.height
      canvas.width = Math.max(1, Math.round(W * dpr))
      canvas.height = Math.max(1, Math.round(H * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const p = { x: -9999, y: -9999, active: false }
    let sparks: Particle[] = []
    let trail: { x: number; y: number; t: number }[] = []
    let raf = 0
    let last = 0

    const shed = (n: number, vx: number, vy: number) => {
      for (let i = 0; i < n; i++) {
        if (sparks.length > 160) sparks.shift()
        const a = Math.random() * Math.PI * 2
        const s = 0.02 + Math.random() * 0.1
        sparks.push({
          x: p.x,
          y: p.y,
          vx: vx * 0.15 + Math.cos(a) * s,
          vy: vy * 0.15 + Math.sin(a) * s,
          life: 0,
          max: 500 + Math.random() * 700,
          col: accents[Math.floor(Math.random() * 4)],
          sz: 1.2 + Math.random() * 1.4,
        })
      }
    }

    const draw = (t: number) => {
      const dt = Math.min(50, last ? t - last : 16)
      last = t
      ctx.clearRect(0, 0, W, H)

      if (on.has("field")) {
        const r2 = reach * reach
        for (let y = spacing / 2; y < H; y += spacing) {
          for (let x = spacing / 2; x < W; x += spacing) {
            ctx.globalAlpha = 0.35
            ctx.fillStyle = muted
            ctx.fillRect(x - 0.5, y - 0.5, 1, 1)
            if (!p.active) continue
            const dx = x - p.x
            const dy = y - p.y
            const d2 = dx * dx + dy * dy
            if (d2 >= r2) continue
            const d = Math.sqrt(d2) || 1
            const k = 1 - d / reach
            const s = 1 + 2 * k
            ctx.globalAlpha = 0.15 + 0.6 * k
            ctx.fillStyle = lit
            ctx.fillRect(x + (dx / d) * k * 6 - s / 2, y + (dy / d) * k * 6 - s / 2, s, s)
          }
        }
      }

      if (on.has("trail") && motion && trail.length > 1) {
        trail = trail.filter((q) => t - q.t < 360)
        ctx.lineCap = "round"
        ctx.strokeStyle = lit
        for (let i = 1; i < trail.length; i++) {
          const k = 1 - (t - trail[i].t) / 360
          ctx.globalAlpha = k * 0.5
          ctx.lineWidth = 2 * k + 0.2
          ctx.beginPath()
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y)
          ctx.lineTo(trail[i].x, trail[i].y)
          ctx.stroke()
        }
      }

      if (on.has("particles") && motion) {
        sparks = sparks.filter((s) => (s.life += dt) < s.max)
        for (const s of sparks) {
          s.x += s.vx * dt
          s.y += s.vy * dt
          s.vy += 2e-5 * dt
          const k = 1 - s.life / s.max
          ctx.globalAlpha = k * 0.9
          ctx.fillStyle = s.col
          ctx.strokeStyle = s.col
          if (sparkShape === 0) {
            ctx.beginPath()
            ctx.arc(s.x, s.y, s.sz * k + 0.3, 0, Math.PI * 2)
            ctx.fill()
          } else if (sparkShape === 1) {
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(s.x, s.y)
            ctx.lineTo(s.x - s.vx * 40, s.y - s.vy * 40)
            ctx.stroke()
          } else {
            ctx.fillRect(s.x - s.sz / 2, s.y - 0.4, s.sz, 0.8)
            ctx.fillRect(s.x - 0.4, s.y - s.sz / 2, 0.8, s.sz)
          }
        }
      }

      if (on.has("cursor") && p.active) {
        ctx.globalAlpha = 0.8
        ctx.strokeStyle = lit
        ctx.fillStyle = lit
        ctx.lineWidth = 1.3
        const m = 8
        ctx.beginPath()
        if (cursorShape === 0) {
          ctx.arc(p.x, p.y, m, 0, Math.PI * 2)
        } else if (cursorShape === 1) {
          ctx.moveTo(p.x - m, p.y)
          ctx.lineTo(p.x - m * 0.4, p.y)
          ctx.moveTo(p.x + m * 0.4, p.y)
          ctx.lineTo(p.x + m, p.y)
          ctx.moveTo(p.x, p.y - m)
          ctx.lineTo(p.x, p.y - m * 0.4)
          ctx.moveTo(p.x, p.y + m * 0.4)
          ctx.lineTo(p.x, p.y + m)
        } else {
          ctx.rect(p.x - m, p.y - m, m * 2, m * 2)
        }
        ctx.stroke()
      }

      ctx.globalAlpha = 1
      // keep animating only while something is still moving
      raf = p.active || sparks.length || trail.length ? requestAnimationFrame(draw) : 0
      if (!raf) last = 0
    }

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(draw)
    }
    const local = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      return { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onMove = (e: PointerEvent) => {
      const { x, y } = local(e)
      const vx = p.active ? x - p.x : 0
      const vy = p.active ? y - p.y : 0
      Object.assign(p, { x, y, active: true })
      if (motion) {
        trail.push({ x, y, t: performance.now() })
        if (trail.length > 64) trail.shift()
        if (Math.random() < 0.35) shed(1, vx, vy)
      }
      kick()
    }
    const onDown = (e: PointerEvent) => {
      Object.assign(p, local(e), { active: true })
      if (motion) shed(6 + Math.floor(Math.random() * 5), 0, 0)
      kick()
    }
    const onLeave = () => {
      p.active = false
      kick()
    }

    resize()
    draw(0)
    const ro = new ResizeObserver(() => {
      resize()
      kick()
    })
    ro.observe(anchor === "fixed" ? document.documentElement : host)
    host.addEventListener("pointermove", onMove, { passive: true })
    host.addEventListener("pointerdown", onDown, { passive: true })
    host.addEventListener("pointerleave", onLeave, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      host.removeEventListener("pointermove", onMove)
      host.removeEventListener("pointerdown", onDown)
      host.removeEventListener("pointerleave", onLeave)
    }
  }, [toyKey, seed, anchor, tone])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      data-slot="ambient-toys"
      className={cn(
        "pointer-events-none inset-0 z-0 h-full w-full",
        anchor === "fixed" ? "fixed" : "absolute",
        className
      )}
      {...props}
    />
  )
}

export { AmbientToys, AMBIENT_TOYS, type AmbientToyName }
