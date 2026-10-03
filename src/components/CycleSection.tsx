import { useEffect, useMemo, useRef, useState } from 'react'
import { CYCLE_STAGES } from '../data/content'
import type { CycleStage } from '../data/types'
import { Reveal } from './ui'

/** Ordered flow, plus the branch that skips reprocessing. */
const FLOW: { from: string; to: string; branch?: boolean }[] = [
  { from: 'irradiation', to: 'pool' },
  { from: 'pool', to: 'dry' },
  { from: 'dry', to: 'reprocessing' },
  { from: 'reprocessing', to: 'vitrification' },
  { from: 'dry', to: 'transport', branch: true },
  { from: 'vitrification', to: 'transport' },
  { from: 'transport', to: 'disposal' },
  { from: 'disposal', to: 'irradiation', branch: true },
]

const NODE_R = 46

function nodePos(s: CycleStage) {
  return { cx: s.x, cy: s.y }
}

/** Gentle curve between two nodes so the cycle reads as a loop. */
function linkPath(a: CycleStage, b: CycleStage, branch: boolean) {
  const { cx: x1, cy: y1 } = nodePos(a)
  const { cx: x2, cy: y2 } = nodePos(b)
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  if (branch) {
    // Bulge outward from the centroid for the skip / return paths.
    const dx = x2 - x1
    const dy = y2 - y1
    const len = Math.hypot(dx, dy) || 1
    const bulge = 70
    const qx = mx + (-dy / len) * bulge
    const qy = my + (dx / len) * bulge
    return `M ${x1} ${y1} Q ${qx} ${qy} ${x2} ${y2}`
  }
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`
}

export default function CycleSection() {
  const [activeId, setActiveId] = useState<string>(CYCLE_STAGES[0]?.id ?? '')
  const [touring, setTouring] = useState(false)
  const timer = useRef<number | null>(null)

  const stage = useMemo(
    () => CYCLE_STAGES.find((s) => s.id === activeId) ?? CYCLE_STAGES[0],
    [activeId],
  )
  const activeIndex = useMemo(() => CYCLE_STAGES.findIndex((s) => s.id === stage.id), [stage.id])

  const byId = useMemo(() => {
    const m = new Map<string, CycleStage>()
    for (const s of CYCLE_STAGES) m.set(s.id, s)
    return m
  }, [])

  /* live edges: everything touching the active node, plus the loop back to start */
  const liveEdges = useMemo(() => {
    const set = new Set<string>()
    for (const e of FLOW) {
      if (e.from === stage.id || e.to === stage.id) set.add(`${e.from}-${e.to}`)
      if (stage.id === 'disposal' && e.to === 'irradiation') set.add(`${e.from}-${e.to}`)
    }
    return set
  }, [stage.id])

  /* Auto-tour walks the stages in sequence. */
  useEffect(() => {
    if (!touring) {
      if (timer.current) window.clearInterval(timer.current)
      timer.current = null
      return
    }
    timer.current = window.setInterval(() => {
      setActiveId((prev) => {
        const i = CYCLE_STAGES.findIndex((s) => s.id === prev)
        return CYCLE_STAGES[(i + 1) % CYCLE_STAGES.length]?.id ?? prev
      })
    }, 2600)
    return () => {
      if (timer.current) window.clearInterval(timer.current)
      timer.current = null
    }
  }, [touring])

  const step = (dir: 1 | -1) => {
    const next = CYCLE_STAGES[(activeIndex + dir + CYCLE_STAGES.length) % CYCLE_STAGES.length]
    setActiveId(next.id)
    setTouring(false)
  }

  return (
    <section id="cycle" className="section">
      <div className="wrap">
        <Reveal>
          <header className="section-head">
            <span className="kicker">05 — Interactive</span>
            <h2>The nuclear waste management cycle</h2>
            <p className="section-lead">
              Select any stage to inspect it. Real flows run in parallel: low-level streams leave for
              disposal while spent fuel moves to interim storage and — in countries that licence it —
              reprocessing. The dashed path is the once-through route, where fuel goes straight to
              disposal after cooling.
            </p>
          </header>
        </Reveal>

        <Reveal delay={70}>
          <div className="panel">
            <div className="grid gap-7 xl:grid-cols-[1.55fr_1fr]">
              <div className="order-2 xl:order-1">
                <svg
                  viewBox="0 0 900 520"
                  className="w-full"
                  role="img"
                  aria-label={`Interactive management cycle diagram. Currently selected: ${stage.label}`}
                >
                  <defs>
                    <marker
                      id="cycleArrow"
                      viewBox="0 0 10 10"
                      refX="9"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M0 0 L10 5 L0 10 z" fill="#38f0ff" />
                    </marker>
                    <marker
                      id="cycleArrowIdle"
                      viewBox="0 0 10 10"
                      refX="9"
                      refY="5"
                      markerWidth="6"
                      markerHeight="6"
                      orient="auto-start-reverse"
                    >
                      <path d="M0 0 L10 5 L0 10 z" fill="#2a3a58" />
                    </marker>
                  </defs>

                  {/* edges */}
                  {FLOW.map((e) => {
                    const a = byId.get(e.from)
                    const b = byId.get(e.to)
                    if (!a || !b) return null
                    const key = `${e.from}-${e.to}`
                    const live = liveEdges.has(key)
                    const d = linkPath(a, b, !!e.branch)
                    return (
                      <g key={key} className="cycle-arrow">
                        <path
                          d={d}
                          className={`cycle-link ${live ? 'is-live' : ''} ${e.branch ? 'is-branch' : ''}`}
                          markerEnd={`url(#${live ? 'cycleArrow' : 'cycleArrowIdle'})`}
                        />
                        {live && !e.branch && (
                          <path
                            d={d}
                            fill="none"
                            stroke="#9df7ff"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            opacity=".9"
                          >
                            <animate
                              attributeName="stroke-dasharray"
                              values="0 900; 26 874"
                              dur="1.5s"
                              fill="freeze"
                            />
                          </path>
                        )}
                      </g>
                    )
                  })}

                  {/* nodes */}
                  {CYCLE_STAGES.map((s, i) => {
                    const { cx, cy } = nodePos(s)
                    const isActive = s.id === stage.id
                    return (
                      <g
                        key={s.id}
                        className={`cycle-node ${isActive ? 'is-active' : ''}`}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isActive}
                        aria-label={`Stage ${i + 1}: ${s.label}`}
                        onClick={() => {
                          setActiveId(s.id)
                          setTouring(false)
                        }}
                        onKeyDown={(ev) => {
                          if (ev.key === 'Enter' || ev.key === ' ') {
                            ev.preventDefault()
                            setActiveId(s.id)
                            setTouring(false)
                          }
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <circle cx={cx} cy={cy} r={NODE_R} />
                        <text className="step-num" x={cx} y={cy - 24}>
                          STAGE {String(i + 1).padStart(2, '0')}
                        </text>
                        <text x={cx} y={cy + 4}>
                          {s.short}
                        </text>
                        <text className="step-num" x={cx} y={cy + 22}>
                          {s.duration.split(' ')[0]}{s.duration.includes(' ')
                            ? ` ${s.duration.split(' ')[1]}`
                            : ''}
                        </text>
                        {isActive && (
                          <circle cx={cx} cy={cy} r={NODE_R + 5} fill="none" stroke="#38f0ff" strokeWidth="1" opacity=".45">
                            <animate attributeName="r" values={`${NODE_R + 3};${NODE_R + 13};${NODE_R + 3}`} dur="2.6s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values=".5;0;.5" dur="2.6s" repeatCount="indefinite" />
                          </circle>
                        )}
                      </g>
                    )
                  })}
                </svg>
              </div>

              <div className="order-1 xl:order-2">
                <div aria-live="polite" className="stage-detail">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[0.68rem] tracking-[0.18em] text-plasma uppercase">
                      stage {String(activeIndex + 1).padStart(2, '0')} / {String(CYCLE_STAGES.length).padStart(2, '0')}
                    </span>
                    <span className="stage-dur">{stage.duration}</span>
                  </div>
                  <h3 className="stage-title text-xl">{stage.label}</h3>
                  <p className="text-[0.92rem] leading-relaxed text-slate-300">{stage.summary}</p>

                  <div>
                    <h4 className="mb-2 font-mono text-[0.66rem] tracking-[0.18em] text-slate-500 uppercase">
                      What happens
                    </h4>
                    <ul className="list">
                      {stage.detail.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-2 font-mono text-[0.66rem] tracking-[0.18em] text-slate-500 uppercase">
                      Controls in force
                    </h4>
                    <ul className="list">
                      {stage.controls.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>

                  <p className="note">
                    <span className="font-semibold text-slate-300">Primary risk focus: </span>
                    {stage.riskFocus}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-edge/70 pt-5">
              <button type="button" className="btn btn-ghost" onClick={() => step(-1)}>
                ◀ Previous
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setTouring((v) => !v)}
                aria-pressed={touring}
              >
                {touring ? '❚❚ Pause tour' : '▶ Auto-tour'}
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => step(1)}>
                Next ▶
              </button>
              <div className="ml-auto flex flex-wrap items-center gap-4 font-mono text-[0.66rem] tracking-wider text-slate-500 uppercase">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-0.5 w-6 rounded bg-plasma" /> active route
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className="inline-block h-0 w-6 border-t-2 border-dashed border-slate-600"
                  />
                  once-through
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
