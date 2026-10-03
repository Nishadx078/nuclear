import { useState } from 'react'
import { PILLARS } from '../data/content'
import { Reveal } from './ui'

export default function TreatmentSection() {
  const [active, setActive] = useState(PILLARS[0]?.id ?? 'collect')
  const pillar = PILLARS.find((p) => p.id === active) ?? PILLARS[0]

  return (
    <section id="treatment" className="section section-alt">
      <div className="wrap">
        <Reveal>
          <header className="section-head">
            <span className="kicker">06 — Practice</span>
            <h2>Safe collection, treatment, transport and storage</h2>
            <p className="section-lead">
              These four pillars of licensed practice share three foundations: <em>minimise</em> the
              material, <em>condition</em> it into a robust form, and <em>characterise</em> everything so
              its fate is known for as long as it exists.
            </p>
          </header>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <button
                type="button"
                className="pillar-card"
                data-active={active === p.id}
                aria-pressed={active === p.id}
                onClick={() => setActive(p.id)}
              >
                <span className="pillar-idx block">{p.index}</span>
                <span className="mt-2 block text-[1.05rem] font-semibold text-white">{p.title}</span>
                <span className="mt-1 block text-[0.8rem] text-slate-400">{p.strapline}</span>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={110}>
          <div className="panel mt-6" aria-live="polite">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl">
                <span className="kicker">
                  {pillar.index} · {pillar.title}
                </span>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-slate-300">{pillar.summary}</p>
              </div>
              <span className="tag t-comm">Licensed practice</span>
            </div>

            <div className="mt-7 grid gap-7 md:grid-cols-2">
              <div>
                <h3 className="mb-3 font-mono text-[0.66rem] tracking-[0.18em] text-slate-500 uppercase">
                  How it works
                </h3>
                <div className="grid gap-3">
                  {pillar.practices.map((pr) => (
                    <div
                      key={pr.title}
                      className="rounded-xl border border-edge/80 bg-hull/50 p-4 transition-colors hover:border-plasma/40"
                    >
                      <h4 className="text-[0.9rem] font-semibold text-plasma">{pr.title}</h4>
                      <p className="mt-1.5 text-[0.83rem] leading-relaxed text-slate-400">{pr.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-mono text-[0.66rem] tracking-[0.18em] text-slate-500 uppercase">
                  Regulatory baseline
                </h3>
                <ul className="list">
                  {pillar.standards.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <p className="note">{pillar.note}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
