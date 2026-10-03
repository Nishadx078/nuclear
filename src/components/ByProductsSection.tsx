import { useMemo, useState } from 'react'
import { BY_PRODUCTS } from '../data/content'
import type { ByProduct } from '../data/types'
import { Meter, Reveal } from './ui'

const MATURITY_TONE: Record<ByProduct['maturity'], string> = {
  Commercial: '#b6ff3d',
  Demonstrated: '#38f0ff',
  Research: '#ffd166',
  Conditional: '#7c5cff',
}

export default function ByProductsSection() {
  const [openId, setOpenId] = useState<string | null>(BY_PRODUCTS[0]?.id ?? null)
  const [feed, setFeed] = useState(120)

  /* Teaching mass balance: shares are illustrative, not a design calculation. */
  const recovered = useMemo(
    () => BY_PRODUCTS.filter((b) => b.id !== 'swarf'),
    [],
  )
  const totalRecovered = useMemo(
    () => recovered.reduce((sum, b) => sum + b.share, 0),
    [recovered],
  )
  const disposalRemainder = 100 - totalRecovered

  return (
    <section id="byproducts" className="section">
      <div className="wrap">
        <Reveal>
          <header className="section-head">
            <span className="kicker">09 — Circular economy</span>
            <h2>Residues into valuable by-products</h2>
            <p className="section-lead">
              Under licence, several waste streams are genuinely useful feedstocks. The rule is strict: a
              by-product must be fully characterised, meet its own regulatory specification for its new
              use, and never bypass radiological controls on the way out of the facility.
            </p>
          </header>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-2">
          {BY_PRODUCTS.map((b, i) => {
            const tone = MATURITY_TONE[b.maturity]
            const open = openId === b.id
            return (
              <Reveal key={b.id} delay={i * 55}>
                <article className="card h-full">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-mono text-[0.64rem] tracking-[0.16em] text-slate-500 uppercase">
                        waste stream
                      </p>
                      <h3 className="mt-1 text-[0.98rem] leading-snug font-semibold text-white">{b.stream}</h3>
                    </div>
                    <span
                      className="tag shrink-0"
                      style={{ color: tone, borderColor: `${tone}66`, background: `${tone}14` }}
                    >
                      {b.maturity}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-[0.85rem] text-slate-400">
                    <span aria-hidden="true" className="text-plasma">
                      ↓
                    </span>
                    <span className="font-medium text-plasma">{b.product}</span>
                  </div>

                  <p className="mt-3 text-[0.84rem] leading-relaxed text-slate-400">{b.benefit}</p>

                  <button
                    type="button"
                    className="mt-4 flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.14em] text-plasma uppercase transition-colors hover:text-white"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? null : b.id)}
                  >
                    <span
                      className="inline-block transition-transform duration-300"
                      style={{ transform: open ? 'rotate(90deg)' : 'none' }}
                    >
                      ▸
                    </span>
                    {open ? 'Hide process & caveat' : 'Show process & caveat'}
                  </button>

                  {open && (
                    <div className="mt-3 grid gap-3 rounded-xl border border-edge/80 bg-hull/50 p-4">
                      <div>
                        <h4 className="font-mono text-[0.64rem] tracking-[0.16em] text-slate-500 uppercase">
                          Industrial process
                        </h4>
                        <p className="mt-1.5 text-[0.83rem] leading-relaxed text-slate-300">{b.process}</p>
                      </div>
                      <div>
                        <h4 className="font-mono text-[0.64rem] tracking-[0.16em] text-flare uppercase">
                          Caveat
                        </h4>
                        <p className="mt-1.5 text-[0.83rem] leading-relaxed text-slate-400">{b.caveat}</p>
                      </div>
                    </div>
                  )}
                </article>
              </Reveal>
            )
          })}
        </div>

        {/* Recovery simulator */}
        <Reveal delay={110}>
          <div className="panel mt-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="panel-title">By-product recovery simulator</h3>
              <span className="tag t-lab">Illustrative mass balance</span>
            </div>
            <p className="panel-note max-w-3xl">
              Set the feed tonnage for a hypothetical decommissioning project. Percentages below are
              representative teaching values drawn from published industrial ranges — this is a
              demonstration of the mass-balance idea, not an engineering calculation.
            </p>

            <div className="mt-7 grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
              <div>
                <label htmlFor="feed" className="mb-3 block text-[0.82rem] text-slate-300">
                  Contaminated feed (tonnes)
                </label>
                <input
                  id="feed"
                  type="range"
                  min={10}
                  max={500}
                  step={10}
                  value={feed}
                  onChange={(e) => setFeed(Number(e.target.value))}
                  className="sim-range"
                />
                <output
                  htmlFor="feed"
                  className="mt-3 block font-mono text-2xl text-plasma tabular-nums"
                >
                  {feed} t
                </output>
                <button type="button" className="btn btn-ghost btn-sm mt-4" onClick={() => setFeed(120)}>
                  Reset
                </button>

                <div className="mt-6 rounded-xl border border-flux/25 bg-flux/5 p-4">
                  <h4 className="text-[0.82rem] font-semibold text-flux">Recovered for reuse</h4>
                  <p className="mt-1 font-mono text-xl text-white tabular-nums">
                    {Math.round((feed * totalRecovered) / 100)} t
                  </p>
                  <p className="mt-1 text-[0.75rem] text-slate-400">{totalRecovered}% of the feed stream</p>
                </div>

                <div className="mt-3 rounded-xl border border-edge bg-hull/50 p-4">
                  <h4 className="text-[0.82rem] font-semibold text-slate-300">Sent for disposal</h4>
                  <p className="mt-1 font-mono text-xl text-white tabular-nums">
                    {Math.round((feed * disposalRemainder) / 100)} t
                  </p>
                  <p className="mt-1 text-[0.75rem] text-slate-400">{disposalRemainder}% remainder</p>
                </div>
              </div>

              <ul className="grid content-start gap-1">
                {recovered.map((b) => (
                  <li key={b.id} className="bar-row">
                    <div className="bar-top">
                      <span className="bar-label">{b.product}</span>
                      <span className="bar-value" style={{ color: b.color }}>
                        {Math.round((feed * b.share) / 100)} {b.unit === 'kL' ? 'kL' : 't'}
                      </span>
                    </div>
                    <Meter value={b.share * 2} tone={b.color} />
                    <p className="bar-note">{b.share}% of feed stream</p>
                  </li>
                ))}
                <li className="bar-row">
                  <div className="bar-top">
                    <span className="bar-label text-slate-500">Residual requiring disposal</span>
                    <span className="bar-value text-slate-500">
                      {Math.round((feed * disposalRemainder) / 100)} t
                    </span>
                  </div>
                  <Meter value={disposalRemainder * 2} tone="#52627d" />
                  <p className="bar-note">Not recyclable by any known process</p>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
