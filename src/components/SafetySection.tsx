import { REFERENCES, SAFETY_POINTS } from '../data/content'
import { Reveal } from './ui'

export default function SafetySection() {
  return (
    <section id="safety" className="section section-alt">
      <div className="wrap">
        <Reveal>
          <header className="section-head">
            <span className="kicker">12 — Non-negotiable</span>
            <h2>Safety notes and disclaimer</h2>
          </header>
        </Reveal>

        <Reveal delay={70}>
          <div className="disclaimer rounded-2xl p-6 md:p-9">
            <p className="disclaimer-lead">
              <strong>This website is an educational resource only.</strong> Nothing on this page is
              operational guidance.
            </p>
            <ul className="list">
              {SAFETY_POINTS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="disclaimer-close">
              Prepared for public education and informed civic discussion. Always verify technical details
              against current primary sources before relying on them for any purpose.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function ReferencesSection() {
  return (
    <section id="references" className="section">
      <div className="wrap">
        <Reveal>
          <header className="section-head">
            <span className="kicker">13 — Sources</span>
            <h2>References and further reading</h2>
            <p className="section-lead">
              A starting set of authoritative, publicly available sources. Institutional reports are listed
              by organisation; individual documents can be located through that organisation’s own search
              portal.
            </p>
          </header>
        </Reveal>

        <Reveal delay={70}>
          <ol className="refs">
            {REFERENCES.map((r) => (
              <li key={r.title}>
                <b>{r.body}</b>
                <i>{r.title}</i>
                <span>
                  {r.locator} — {r.note}
                </span>
              </li>
            ))}
          </ol>
          <p className="note">
            Values on this page are indicative teaching summaries rather than verbatim citations. For any
            decision affecting health, safety or the environment, consult the original documents and your
            national regulator.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
