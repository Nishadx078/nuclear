import { useEffect, useRef, useState, type ReactNode } from 'react'

/** Fades content in once it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: ReactNode
  delay?: number
  as?: 'div' | 'section' | 'li' | 'article' | 'span'
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true)
            io.disconnect()
          }
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${shown ? 'reveal-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

/** Counts up to a target value when scrolled into view. */
export function CountUp({
  to,
  decimals = 0,
  prefix = '',
  suffix = '',
}: {
  to: number
  decimals?: number
  prefix?: string
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const noObserver = typeof IntersectionObserver === 'undefined'
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [value, setValue] = useState(() =>
    noObserver || reduceMotion ? to : 0,
  )

  useEffect(() => {
    const el = ref.current
    if (!el || noObserver) return
    let raf = 0
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return
        io.disconnect()
        if (reduceMotion) {
          setValue(to)
          return
        }
        const dur = 1500
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur)
          const eased = 1 - Math.pow(1 - p, 3)
          setValue(to * eased)
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, noObserver, reduceMotion])

  return (
    <span ref={ref}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}

/** Animated horizontal bar used across the data sections. */
export function Meter({ value, tone }: { value: number; tone?: string }) {
  const width = Math.max(0, Math.min(100, value))
  return (
    <div className="meter" role="presentation">
      <span
        style={
          tone
            ? { width: `${width}%`, background: `linear-gradient(90deg, ${tone}, ${tone}55)` }
            : { width: `${width}%` }
        }
      />
    </div>
  )
}

/** Decorative animated particle field suggesting radiation tracks. */
export function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number }
    const parts: P[] = []

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const target = Math.min(90, Math.round((w * h) / 22000))
      parts.length = 0
      for (let i = 0; i < target; i++) {
        parts.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: Math.random() * 1.6 + 0.5,
          a: Math.random() * 0.5 + 0.2,
        })
      }
    }

    resize()
    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of parts) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(56,240,255,${p.a})`
        ctx.fill()
      }
      // faint link lines
      ctx.lineWidth = 0.5
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i]
          const b = parts[j]
          const d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2
          if (d < 9000) {
            ctx.strokeStyle = `rgba(124,92,255,${(1 - d / 9000) * 0.07})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={ref} aria-hidden="true" className="fixed inset-0 -z-10 h-full w-full" />
}

/** Radial ring gauge. */
export function Ring({ value, label, tone = '#38f0ff' }: { value: number; label: string; tone?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const noObserver = typeof IntersectionObserver === 'undefined'
  const [pct, setPct] = useState(() => (noObserver ? value : 0))
  const R = 52
  const C = 2 * Math.PI * R

  useEffect(() => {
    const el = ref.current
    if (!el || noObserver) return
    const io = new IntersectionObserver(
      (e) => {
        if (e[0]?.isIntersecting) {
          setPct(value)
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [value, noObserver])

  return (
    <div ref={ref} className="relative mx-auto" style={{ width: 132, height: 132 }}>
      <svg viewBox="0 0 132 132" className="h-full w-full -rotate-90" role="img" aria-label={label}>
        <circle cx="66" cy="66" r={R} fill="none" stroke="#1c2942" strokeWidth="9" />
        <circle
          cx="66"
          cy="66"
          r={R}
          fill="none"
          stroke={tone}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C * (1 - pct / 100)}
          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1)' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div className="text-xl font-semibold text-white tabular-nums">{Math.round(pct)}%</div>
      </div>
    </div>
  )
}
