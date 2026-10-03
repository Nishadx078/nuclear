import { useId, useMemo, useState } from 'react'
import { ISOTOPES, WASTE_TYPES } from '../data/content'
import type { WasteType } from '../data/types'
import { Reveal } from './ui'

const CLASS_TONE: Record<string, { ring: string; text: string; bg: string }> = {
  'very-low': { ring: 'rgba(143,163,189,.45)', text: '#c6d3e4', bg: 'rgba(143,163,189,.10)' },
  low: { ring: 'rgba(182,255,61,.5)', text: '#b6ff3d', bg: 'rgba(182,255,61,.09)' },
  intermediate: { ring: 'rgba(255,209,102,.5)', text: '#ffd166', bg: 'rgba(255,209,102,.09)' },
  high: { ring: 'rgba(255,92,122,.55)', text: '#ff5c7a', bg: 'rgba(255,92,122,.10)' },
}

const CLASS_BADGE: Record<string, string> = {
  'very-low': 'VLLW',
  low: 'LLW',
  intermediate: 'ILW',
  high: 'HLW',
}

const FILTERS: { key: string; label: string }[] = [
  { key: 'all', label: 'All classes' },
  { key: 'very-low', label: 'Very low' },
  { key: 'low', label: 'Low level' },
  { key: 'intermediate', label: 'Intermediate' },
  { key: 'high', label: 'High level' },
]

function matches(t: WasteType, filter: string, q: string) {
  if (filter !== 'all' && t.klass !== filter) return false
  if (!q) return true
  const hay = [t.name, t.origin, t.pathway, t.disposition, ...t.examples].join(' ').toLowerCase()
  return hay.includes(q)
}

export default function TypesSection() {
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [isoIndex, setIsoIndex] = useState(0)
  const sliderId = useId()

  const iso = ISOTOPES[isoIndex] ?? ISOTOPES[0]
  const q = query.trim().toLowerCase()
  const visible = useMemo(() => WASTE_TYPES.filter((t) => matches(t, filter, q)), [filter, q])

  /* Decay curve: remaining activity = 100 · 0.5^n */
  const curve = useMemo(() => {
    const pts: string[] = []
    for (let n = 0; n <= 10; n += 0.2) {
      const x = 30 + (n / 10) * 270
      const y = 20 + Math.pow(0.5, n) * 140
      pts.push(`${x.toFixed(2)},${y.toFixed(2)}`)
    }
    return `M ${pts.join(' L ')}`
  }, [])

  return (
    <section id="types" className="section section-alt">
      <div className="wrap">
        <Reveal>
          <header className="section-head">
            <span className="kicker">02 — Classification</span>
            <h2>The six main types of nuclear waste</h2>
            <p className="section-lead">
              Classification drives handling, packaging, transport and disposal. The categories below run
              from low-level items such as protective clothing to heat-generating spent fuel. Filter by
              class, or search for a material you have in mind.
            </p>
          </header>
        </Reveal>

        <Reveal delay={70}>
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter waste classes">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  className="chip"
                  data-active={filter === f.key}
                  aria-pressed={filter === f.key}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="relative w-full sm:w-72">
              <span className="sr-only">Search waste types</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="coolant, resin, cladding…"
                className="w-full rounded-full border border-edge bg-hull/70 py-2 pr-4 pl-10 text-sm text-slate-200 transition-colors placeholder:text-slate-500 focus:border-plasma/60 focus:outline-none"
              />
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 stroke-slate-500"
                fill="none"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((t, i) => {
            const tone = CLASS_TONE[t.klass] ?? CLASS_TONE.low
            return (
              <Reveal key={t.id} delay={i * 50}>
                <article className="card h-full">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="text-[1.02rem] leading-snug font-semibold text-white">{t.name}</h3>
                    <span
                      className="tag shrink-0"
                      style={{ color: tone.text, borderColor: tone.ring, background: tone.bg }}
                    >
                      {CLASS_BADGE[t.klass]}
                    </span>
                  </div>

                  <p className="font-mono text-[0.68rem] tracking-wider text-plasma-dim uppercase">
                    {t.halfLifeNote}
                  </p>

                  <dl className="mt-4 grid gap-2.5 text-[0.8rem] leading-relaxed">
                    <div>
                      <dt className="font-semibold text-slate-300">Typical contents</dt>
                      <dd className="text-slate-400">{t.examples.slice(0, 3).join(' · ')}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-300">Origin</dt>
                      <dd className="text-slate-400">{t.origin}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-slate-300">Route</dt>
                      <dd className="text-slate-400">{t.disposition}</dd>
                    </div>
                  </dl>

                  <div className="mt-4 border-t border-edge/70 pt-3">
                    <div className="mb-1.5 flex justify-between font-mono text-[0.65rem] tracking-wider text-slate-500 uppercase">
                      <span>Relative activity</span>
                      <span style={{ color: tone.text }}>{t.activity}</span>
                    </div>
                    <div className="meter">
                      <span
                        style={{
                          width: `${t.activity}%`,
                          background: `linear-gradient(90deg, ${tone.ring}, ${tone.text})`,
                        }}
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>

        {visible.length === 0 && (
          <p className="empty-state">
            No class matches that search. Try “coolant”, “resin”, “cladding” or “concrete”.
          </p>
        )}

        <Reveal delay={100}>
          <div className="panel mt-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="panel-title">Half-life explorer</h3>
                <p className="panel-note max-w-md">
                  Step through key isotopes to see why storage durations are what they are. Activity
                  halves every half-life; after ten, roughly 0.1% remains.
                </p>
              </div>
              <span className="tag t-lab">Teaching tool</span>
            </div>

            <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_21rem]">
              <div>
                <label
                  htmlFor={sliderId}
                  className="mb-3 block font-mono text-[0.68rem] tracking-[0.18em] text-slate-400 uppercase"
                >
                  Isotope · 1 of {ISOTOPES.length}
                </label>
                <input
                  id={sliderId}
                  type="range"
                  min={0}
                  max={ISOTOPES.length - 1}
                  step={1}
                  value={isoIndex}
                  onChange={(e) => setIsoIndex(Number(e.target.value))}
                  className="sim-range"
                />

                <div className="mt-6 stage-detail">
                  <p className="stage-title">
                    {iso.name} <span className="stage-dur">≈ {iso.halfLife}</span>
                  </p>
                  <p className="text-[0.88rem] leading-relaxed text-slate-400">{iso.desc}</p>
                  <p className="note">{iso.relevance}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {ISOTOPES.map((it, i) => (
                    <button
                      key={it.name}
                      type="button"
                      onClick={() => setIsoIndex(i)}
                      aria-pressed={i === isoIndex}
                      className="chip !px-2.5 !py-1 !text-[0.7rem]"
                      data-active={i === isoIndex}
                    >
                      {it.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <svg
                  viewBox="0 0 320 190"
                  className="w-full"
                  role="img"
                  aria-label={`Decay curve: ${iso.name} reaches 0.1 percent of original activity after ten half-lives`}
                >
                  <defs>
                    <linearGradient id="decayFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38f0ff" />
                      <stop offset="100%" stopColor="#38f0ff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <g className="grid-lines">
                    <line x1="30" y1="20" x2="300" y2="20" />
                    <line x1="30" y1="60" x2="300" y2="60" />
                    <line x1="30" y1="100" x2="300" y2="100" />
                    <line x1="30" y1="140" x2="300" y2="140" />
                  </g>
                  <path d={`${curve} L 300 160 L 30 160 Z`} fill="url(#decayFill)" />
                  <path d={curve} fill="none" stroke="#38f0ff" strokeWidth="2" />
                  <line
                    x1="196"
                    y1="20"
                    x2="196"
                    y2="160"
                    stroke="#b6ff3d"
                    strokeWidth="1"
                    strokeDasharray="3 4"
                  />
                  <text x="196" y="14" fill="#b6ff3d" fontSize="9" textAnchor="middle" fontFamily="monospace">
                    10 half-lives
                  </text>
                  <text x="34" y="32" fill="#6f86a5" fontSize="9" fontFamily="monospace">
                    100%
                  </text>
                  <text x="34" y="157" fill="#6f86a5" fontSize="9" fontFamily="monospace">
                    0.1%
                  </text>
                  <text x="30" y="180" fill="#6f86a5" fontSize="9" fontFamily="monospace">
                    0
                  </text>
                  <text x="300" y="180" fill="#6f86a5" fontSize="9" fontFamily="monospace" textAnchor="end">
                    {iso.scopeLabel}
                  </text>
                </svg>
                <p className="mt-2 text-center font-mono text-[0.65rem] tracking-wider text-slate-500 uppercase">
                  Remaining activity vs. half-lives
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
