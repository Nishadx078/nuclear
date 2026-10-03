import { useState } from 'react'
import { FUTURE_TECH } from '../data/content'
import type { FutureTech } from '../data/types'
import { Meter, Reveal } from './ui'

const MATURITY: Record<FutureTech['maturity'], { label: string; cls: string }> = {
  demo: { label: 'Demonstration', cls: 't-demo' },
  comm: { label: 'Commercial / industrial use', cls: 't-comm' },
  rd: { label: 'Active R&D', cls: 't-rd' },
  lab: { label: 'Laboratory concept', cls: 't-lab' },
}

const TONE: Record<FutureTech['maturity'], string> = {
  demo: '#b6ff3d',
  comm: '#38f0ff',
  rd: '#7c5cff',
  lab: '#ffd166',
}

export default function FutureSection() {
  const [openId, setOpenId] = useState<string | null>(FUTURE_TECH[0]?.id ?? null)
  const [highlight, setHighlight] = useState<string | null>(null)

  const maxReadiness = Math.max(...FUTURE_TECH.map((t) => t.readiness))

  return (
    <section id="future" className="section">
      <div className="wrap">
        <Reveal>
          <header className="section-head">
            <span className="kicker">11 — Research frontier</span>
            <h2>Future technologies</h2>
            <p className="section-lead">
              Research-grade approaches to sustainable waste management, each with its maturity stated
              honestly. Several are already in demonstration and a few remain laboratory concepts — labels
              below reflect public literature broadly, and maturity moves over time.
            </p>
          </header>
        </Reveal>

        <Reveal delay={60}>
          <div className="mb-6 flex flex-wrap gap-2">
            {(Object.keys(MATURITY) as FutureTech['maturity'][]).map((m) => (
              <span key={m} className={`tag ${MATURITY[m].cls}`}>
                {MATURITY[m].label}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {FUTURE_TECH.map((t, i) => {
            const tone = TONE[t.maturity]
            const open = openId === t.id
            const dim = highlight !== null && highlight !== t.id
            return (
              <Reveal key={t.id} delay={i * 45}>
                <article
                  className="card h-full transition-opacity duration-300"
                  style={{ opacity: dim ? 0.35 : 1 }}
                  onMouseEnter={() => setHighlight(t.id)}
                  onMouseLeave={() => setHighlight(null)}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-[1rem] leading-snug font-semibold text-white">{t.name}</h3>
                    <span className={`tag shrink-0 ${MATURITY[t.maturity].cls}`}>
                      {MATURITY[t.maturity].label}
                    </span>
                  </div>

                  <p className="mt-2.5 text-[0.84rem] leading-relaxed text-slate-400">{t.summary}</p>

                  <div className="mt-4">
                    <div className="mb-1.5 flex justify-between font-mono text-[0.64rem] tracking-wider text-slate-500 uppercase">
                      <span>Research → deployment</span>
                      <span style={{ color: tone }}>{t.readiness}</span>
                    </div>
                    <Meter value={t.readiness} tone={tone} />
                  </div>

                  <button
                    type="button"
                    className="mt-4 flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.14em] text-plasma uppercase transition-colors hover:text-white"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? null : t.id)}
                  >
                    <span
                      className="inline-block transition-transform duration-300"
                      style={{ transform: open ? 'rotate(90deg)' : 'none' }}
                    >
                      ▸
                    </span>
                    {open ? 'Hide details' : 'Read more'}
                  </button>

                  {open && (
                    <div className="mt-3 grid gap-3">
                      <ul className="list">
                        {t.detail.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                      <p className="note">
                        <span className="font-semibold text-slate-300">Likely horizon: </span>
                        {t.horizon}
                      </p>
                    </div>
                  )}
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={100}>
          <div className="panel mt-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="panel-title">Readiness snapshot</h3>
              <span className="tag t-lab">Indicative, not a forecast</span>
            </div>
            <p className="panel-note">
              Hover a technology above to isolate it, or read the relative readiness bars below. Values are
              illustrative teaching estimates rather than a formal TRL assessment.
            </p>
            <ul className="mt-6 grid gap-1">
              {[...FUTURE_TECH]
                .sort((a, b) => b.readiness - a.readiness)
                .map((t) => (
                  <li key={t.id} className="bar-row">
                    <div className="bar-top">
                      <span className="bar-label">{t.name}</span>
                      <span className="bar-value" style={{ color: TONE[t.maturity] }}>
                        {t.readiness}
                      </span>
                    </div>
                    <Meter value={(t.readiness / maxReadiness) * 100} tone={TONE[t.maturity]} />
                  </li>
                ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
