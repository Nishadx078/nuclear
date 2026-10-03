import { Reveal } from './ui'
import { ISOTOPES } from '../data/content'

const CARDS = [
  {
    icon: '⚛',
    title: 'Mostly ordinary matter',
    body: 'Reactor fuel is uranium or plutonium — elements found in nature. After irradiation it is treated as radioactive material. The atoms are the same size and behave the same chemically; only the neutron count of a small fraction has changed.',
  },
  {
    icon: '◷',
    title: 'It decays on a predictable clock',
    body: 'Unstable isotopes decay at a fixed rate. Carbon-14 halves roughly every 5,730 years, plutonium-239 about every 24,100 years, uranium-238 about every 4.5 billion years. Predictable decline in activity is the central fact behind storage design.',
  },
  {
    icon: '⛊',
    title: 'Risk depends on dose and pathway',
    body: 'A hazard is only realised when radioactivity actually reaches people. Engineered barriers, shielding and distance keep dose low, and independent regulation confirms that managed pathways stay well below regulated limits.',
  },
]

export default function WhatSection() {
  const featured = ISOTOPES[1]

  return (
    <section id="what" className="section">
      <div className="wrap">
        <Reveal>
          <header className="section-head">
            <span className="kicker">01 — Fundamentals</span>
            <h2>What is nuclear waste?</h2>
            <p className="section-lead">
              Nuclear waste is any material that has become radioactive as a result of exposure to
              neutron radiation during nuclear activity. Radioactivity is not the same as danger — what
              matters is the <em>type</em> of isotope, its <em>half-life</em>, its
              <em> activity concentration</em>, and how safely it is contained.
            </p>
          </header>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <article className="card h-full">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl border border-plasma/25 bg-plasma/10 text-lg text-plasma">
                  <span aria-hidden="true">{c.icon}</span>
                </div>
                <h3 className="mb-2 text-[1.02rem] font-semibold text-white">{c.title}</h3>
                <p className="text-[0.88rem] leading-relaxed text-slate-400">{c.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="panel mt-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="stage-dur">Example isotope</span>
                <span className="stage-title">{featured.name}</span>
              </div>
              <span className="stage-dur">half-life ≈ {featured.halfLife}</span>
            </div>
            <p className="mt-4 max-w-3xl text-[0.9rem] leading-relaxed text-slate-400">
              {featured.desc}
            </p>
            <p className="note">{featured.relevance}</p>
            <p className="mt-4 text-[0.82rem] text-slate-500">
              After ten half-lives a sample retains about 0.1% of its original radioactivity — the
              arithmetic behind the design rule that spent fuel can be stored, and left to decay, while
              its heat output becomes manageable. Explore the full set in the half-life explorer below.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
