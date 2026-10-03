import { useState } from 'react'
import { LEVERS, VOLUME_MIX } from '../data/content'
import { Meter, Reveal } from './ui'

const LEVEL_TONE: Record<string, string> = {
  Design: '#7c5cff',
  Operations: '#38f0ff',
  Chemistry: '#b6ff3d',
  'Fuel cycle': '#ffd166',
}

export default function InnovationSection() {
  const [openId, setOpenId] = useState<string | null>(LEVERS[0]?.id ?? null)
  const [level, setLevel] = useState<string>('all')

  const levels = ['all', ...new Set(LEVERS.map((l) => l.level))]
  const visible = level === 'all' ? LEVERS : LEVERS.filter((l) => l.level === level)

  return (
    <section id="minimisation" className="section">
      <div className="wrap">
        <Reveal>
          <header className="section-head">
            <span className="kicker">07 — Minimisation</span>
            <h2>Reducing waste before it exists</h2>
            <p className="section-lead">
              The most sustainable waste is waste never created. The highest-impact levers sit upstream
              in reactor design, fuel chemistry and operations — which is exactly where a qualified
              waste-management engineer would start.
            </p>
          </header>
        </Reveal>

        <Reveal delay={70}>
          <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter by lever area">
            {levels.map((lv) => (
              <button
                key={lv}
                type="button"
                className="chip"
                data-active={level === lv}
                aria-pressed={level === lv}
                onClick={() => setLevel(lv)}
              >
                {lv === 'all' ? 'All levers' : lv}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-2">
          {visible.map((l, i) => {
            const tone = LEVEL_TONE[l.level] ?? '#38f0ff'
            const open = openId === l.id
            return (
              <Reveal key={l.id} delay={i * 55}>
                <article className="card h-full">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[1.05rem] font-semibold text-white">{l.title}</h3>
                    <span
                      className="tag shrink-0"
                      style={{ color: tone, borderColor: `${tone}66`, background: `${tone}14` }}
                    >
                      {l.level}
                    </span>
                  </div>

                  <p className="mt-2 text-[0.87rem] text-slate-400">{l.summary}</p>

                  <div className="mt-4">
                    <div className="mb-1.5 flex justify-between font-mono text-[0.64rem] tracking-wider text-slate-500 uppercase">
                      <span>Indicative effect on waste intensity</span>
                      <span style={{ color: tone }}>{l.impact}</span>
                    </div>
                    <Meter value={l.impact} tone={tone} />
                  </div>

                  <button
                    type="button"
                    className="mt-4 flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.14em] text-plasma uppercase transition-colors hover:text-white"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? null : l.id)}
                  >
                    <span
                      className="inline-block transition-transform duration-300"
                      style={{ transform: open ? 'rotate(90deg)' : 'none' }}
                    >
                      ▸
                    </span>
                    {open ? 'Hide actions' : 'Show actions'}
                  </button>

                  {open && (
                    <ul className="list mt-3">
                      {l.actions.map((a) => (
                        <li key={a}>{a}</li>
                      ))}
                    </ul>
                  )}
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={110}>
          <div className="panel mt-8">
            <h3 className="panel-title">Where the waste volume actually comes from</h3>
            <p className="panel-note max-w-3xl">
              A large share of nuclear waste <em>volume</em> is low-activity material — contaminated
              metals, concrete and filters. Reducing and recycling that bulk often matters more per unit
              of effort than attempting to treat higher-activity streams. Spent fuel is a small share of
              the volume and almost all of the radioactivity.
            </p>
            <ul className="mt-6 grid gap-1 md:grid-cols-2">
              {VOLUME_MIX.map((v) => (
                <li key={v.label} className="bar-row">
                  <div className="bar-top">
                    <span className="bar-label">{v.label}</span>
                    <span className="bar-value">{v.share}%</span>
                  </div>
                  <Meter value={v.share * 2} />
                  <p className="bar-note">{v.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
