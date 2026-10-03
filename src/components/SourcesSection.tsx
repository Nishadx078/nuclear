import { useMemo } from 'react'
import { SOURCES_DATA } from '../data/content'
import { Meter, Reveal } from './ui'

const CARDS = [
  {
    title: 'Power stations',
    body: 'Spent fuel assemblies, cladding hulls, reactor internals, ion-exchange resins, contaminated coolants, filters and reactor vessel concrete. The largest-volume, most tightly controlled category.',
  },
  {
    title: 'Fuel cycle facilities',
    body: 'Conversion and enrichment tails, off-gas, solvent extraction residues and process waste. Historically a major contributor to long-lived alpha-bearing waste.',
  },
  {
    title: 'Medicine and research',
    body: 'Short-lived diagnostic isotopes (Tc-99m, F-18, I-131), research reactor fuel, sealed sources and target foils. Small volumes, short half-lives, frequent dispatch.',
  },
  {
    title: 'Industry, defence and accidents',
    body: 'Smoke detectors (Am-241), lightning arresters, industrial radiography sources, thoriated tungsten, depleted uranium, legacy weapons material, and material from events such as Chernobyl (1986) and Fukushima (2011).',
  },
]

export default function SourcesSection() {
  const max = useMemo(() => Math.max(...SOURCES_DATA.map((s) => s.volume)), [])

  return (
    <section id="sources" className="section">
      <div className="wrap">
        <Reveal>
          <header className="section-head">
            <span className="kicker">03 — Origins</span>
            <h2>Where nuclear waste comes from</h2>
            <p className="section-lead">
              Every stream below is produced during a normal, licensed operation. Volume and activity vary
              enormously by facility type — medical isotopes, for instance, are tiny in volume but
              demand prompt handling.
            </p>
          </header>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal delay={80}>
            <div className="panel h-full">
              <h3 className="panel-title">Waste stream by origin</h3>
              <p className="panel-note">
                Bars show relative magnitude so the order of size is visible at a glance. Exact volumes
                vary strongly with plant design and reporting convention.
              </p>
              <ul className="mt-6 grid gap-1">
                {SOURCES_DATA.map((s) => (
                  <li key={s.label} className="bar-row">
                    <div className="bar-top">
                      <span className="bar-label">{s.label}</span>
                      <span className="bar-value">{Math.round((s.volume / max) * 100)}</span>
                    </div>
                    <Meter value={(s.volume / max) * 100} />
                    <p className="bar-note">{s.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {CARDS.map((c, i) => (
              <Reveal key={c.title} delay={120 + i * 70}>
                <article className="card h-full">
                  <h3 className="mb-2 text-[0.98rem] font-semibold text-white">{c.title}</h3>
                  <p className="text-[0.85rem] leading-relaxed text-slate-400">{c.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
