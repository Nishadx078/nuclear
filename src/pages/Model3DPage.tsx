import { Suspense, lazy, useState } from 'react'
import { PageHead, PageNav } from '../components/PageHead'
import { Reveal } from '../components/ui'
import { SITE_PARTS, type SitePartId } from '../data/siteModel'

const SiteModel = lazy(() => import('../components/SiteModel'))

const HINTS: { label: string; action: string }[] = [
  { label: 'Drag', action: 'rotate the cutaway' },
  { label: 'Scroll', action: 'zoom in and out' },
  { label: 'Click', action: 'a glowing part to read about it' },
]

const DISCLAIMER =
  'The cross sections, barrier thicknesses and colours are simplified teaching diagrams, not engineering drawings. They show the principle of a multi-barrier deep geological repository (like Onkalo in Finland) rather than any real facility.'

export default function Model3DPage() {
  const [selected, setSelected] = useState<SitePartId | null>(null)
  const [showLabels, setShowLabels] = useState(true)

  const part = SITE_PARTS.find((p) => p.id === selected) ?? null

  return (
    <>
      <PageHead
        kicker="🧊 Interactive 3D model"
        title="Inside a deep geological repository"
        lead="A working cutaway of the nuclear waste management chain — surface facilities above, stable host granite below, and the bentonite-buffered canisters that finish the job. Every layer is a barrier."
        crumbs={[{ label: '3D Model' }]}
      />

      <div className="page-body">
        <section className="section">
          <div className="wrap">
            <Reveal>
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
                {/* Model stage */}
                <div className="panel overflow-hidden p-0">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-edge px-5 py-4">
                    <div>
                      <p className="font-mono text-[0.64rem] tracking-[0.16em] text-plasma-dim uppercase">
                        Multi-barrier engineering
                      </p>
                      <p className="mt-0.5 text-[0.9rem] font-medium text-white">
                        Spent fuel pool → dry cask → granite → buffer → canister
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowLabels((s) => !s)}
                      className="chip"
                      data-active={showLabels ? 'true' : 'false'}
                      aria-pressed={showLabels}
                    >
                      {showLabels ? 'Labels on' : 'Labels off'}
                    </button>
                  </div>

                  <div className="h-[26rem] sm:h-[30rem] lg:h-[34rem]" onPointerDown={() => undefined}>
                    <Suspense
                      fallback={
                        <div className="grid h-full place-items-center text-slate-500">
                          Loading 3D scene…
                        </div>
                      }
                    >
                      <SiteModel
                        selected={selected}
                        onSelect={setSelected}
                        showLabels={showLabels}
                      />
                    </Suspense>
                  </div>

                  <div className="border-t border-edge px-5 py-4">
                    <ul className="flex flex-wrap gap-x-6 gap-y-2">
                      {HINTS.map((h) => (
                        <li key={h.label} className="flex items-center gap-2">
                          <span className="font-mono text-[0.68rem] tracking-[0.14em] text-plasma-dim uppercase">
                            {h.label}
                          </span>
                          <span className="text-[0.78rem] text-slate-400">{h.action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Info panel */}
                <aside className="panel h-fit lg:sticky lg:top-28" aria-live="polite">
                  <h3 className="panel-title">Barrier layers</h3>
                  <p className="panel-note">
                    Select a part of the model — or click a row — to read how that layer contributes
                    to containment.
                  </p>

                  <ol className="mt-5 grid gap-2">
                    {SITE_PARTS.map((p, i) => (
                      <li key={p.id}>
                        <button
                          type="button"
                          onClick={() => setSelected(p.id)}
                          className={`flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                            selected === p.id
                              ? 'border-plasma/60 bg-plasma/[0.08]'
                              : 'border-transparent hover:border-edge'
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <span className="font-mono text-[0.62rem] text-slate-600 tabular-nums">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span
                              className={`text-[0.85rem] font-medium ${
                                selected === p.id ? 'text-plasma' : 'text-slate-200'
                              }`}
                            >
                              {p.title}
                            </span>
                          </span>
                          <span className="font-mono text-[0.6rem] text-slate-600">{p.depth}</span>
                        </button>
                      </li>
                    ))}
                  </ol>

                  <div
                    className={`mt-5 rounded-xl border p-4 transition-colors ${
                      part ? 'border-plasma/40 bg-plasma/[0.06]' : 'border-edge bg-hull/40'
                    }`}
                  >
                    {part ? (
                      <>
                        <p className="font-mono text-[0.6rem] tracking-[0.16em] text-plasma-dim uppercase">
                          {part.id}
                        </p>
                        <h4 className="mt-1 text-[0.95rem] font-semibold text-white">
                          {part.title}
                        </h4>
                        <p className="mt-0.5 font-mono text-[0.62rem] text-slate-500">{part.depth}</p>
                        <p className="mt-3 text-[0.84rem] leading-relaxed text-slate-300">
                          {part.body}
                        </p>
                      </>
                    ) : (
                      <p className="text-[0.82rem] text-slate-500">
                        Nothing selected yet. Click any part of the model or a row above.
                      </p>
                    )}
                  </div>
                </aside>
              </div>
            </Reveal>

            {/* Legend */}
            <Reveal delay={80}>
              <div className="panel mt-6">
                <h2 className="panel-title">How the barriers stack up</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {[
                    {
                      icon: '💧',
                      t: '1 · Water shielding',
                      d: 'Several metres of pool water absorbs the dose from a newly discharged assembly, buying the operator time while heat decays.',
                    },
                    {
                      icon: '🏗️',
                      t: '2 · Cask & glass',
                      d: 'Spent fuel is sealed in a corrosion-resistant canister, or molten waste is poured into stable borosilicate glass — immobilisation is the first permanent barrier.',
                    },
                    {
                      icon: '🧱',
                      t: '3 · Clay buffer',
                      d: 'Bentonite swells with moisture to seal all gaps around the canister, filters and chemically retards any dissolved radionuclides.',
                    },
                    {
                      icon: '⛰️',
                      t: '4 · Geological barrier',
                      d: 'Hundreds of metres of low-permeability granite and slow groundwater give containment over the millions of years the waste needs.',
                    },
                  ].map((b) => (
                    <div key={b.t} className="rounded-xl border border-edge bg-hull/50 p-4">
                      <p className="text-xl">{b.icon}</p>
                      <p className="mt-2 text-[0.84rem] font-semibold text-white">{b.t}</p>
                      <p className="mt-1.5 text-[0.78rem] leading-relaxed text-slate-400">{b.d}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 text-[0.72rem] italic leading-relaxed text-slate-500">
                  {DISCLAIMER}
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </div>

      <PageNav
        prev={{ to: '/simulator', label: 'Management Simulator', kicker: 'Previous' }}
        next={{ to: '/dashboard', label: 'Learning Dashboard', kicker: 'Next' }}
      />
    </>
  )
}