import { IMPACT_LISTS } from '../data/content'
import { Reveal } from './ui'

export default function ImpactSection() {
  return (
    <section id="impact" className="section section-alt">
      <div className="wrap">
        <Reveal>
          <header className="section-head">
            <span className="kicker">04 — Consequences</span>
            <h2>Environmental and health impact</h2>
            <p className="section-lead">
              Nuance matters here. Nuclear waste has real consequences when mismanaged, but the dominant
              radiological impacts recorded so far come from <strong>accidents and routine gaseous
              releases</strong> — not from engineered disposal, which by design is built to release
              nothing at all.
            </p>
          </header>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal delay={70}>
            <div className="panel h-full">
              <h3 className="risk-head mb-4">Where the impact comes from</h3>
              <ul className="list">
                {IMPACT_LISTS.hazards.map((h) => (
                  <li key={h.title}>
                    <strong>{h.title}.</strong> {h.body}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="grid gap-6">
            <Reveal delay={130}>
              <div className="panel">
                <h3 className="panel-title mb-4">How impact is controlled</h3>
                <ul className="list">
                  {IMPACT_LISTS.controls.map((c) => (
                    <li key={c.title}>
                      <strong>{c.title}.</strong> {c.body}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="panel">
                <h4 className="mb-2 text-[0.95rem] font-semibold text-flare">Perspective on scale</h4>
                <p className="text-[0.88rem] leading-relaxed text-slate-400">
                  Typical annual public dose from the entire global nuclear power fleet is on the order
                  of 0.001 mSv in many regions, against roughly 2.4 mSv per year of average natural
                  background radiation worldwide (UNSCEAR). Comparisons like this are useful for
                  establishing order of magnitude, but doses are always assessed per pathway and per
                  person — never as a single global average.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
