import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import { Reveal } from '../components/ui'
import { BY_PRODUCTS } from '../data/content'

const TOPICS = [
  {
    to: '/fundamentals',
    kicker: '01',
    title: 'What it is',
    body: 'Radioactivity, decay and half-lives — and why a hazard only exists once radioactivity actually reaches people.',
    span: 'Fundamentals',
  },
  {
    to: '/types',
    kicker: '02',
    title: 'The six waste classes',
    body: 'From exempt items like contaminated clothing to heat-generating spent fuel, with a live half-life explorer.',
    span: 'Classification',
  },
  {
    to: '/origins',
    kicker: '03',
    title: 'Sources and impact',
    body: 'Which facilities produce which streams, what the consequences are, and how licensed practice controls risk.',
    span: 'Origins & Impact',
  },
  {
    to: '/cycle',
    kicker: '04',
    title: 'The management cycle',
    body: 'An interactive seven-stage diagram tracing material from in-reactor irradiation to geological disposal.',
    span: 'Interactive',
  },
  {
    to: '/handling',
    kicker: '05',
    title: 'Safe handling',
    body: 'Collection, treatment, transport and storage — the four pillars of licensed practice, in detail.',
    span: 'Practice',
  },
  {
    to: '/solutions',
    kicker: '06',
    title: 'Sustainable solutions',
    body: 'Waste minimisation, advanced reprocessing, recycling, and converting residues into valuable by-products.',
    span: 'Solutions',
  },
  {
    to: '/disposal',
    kicker: '10',
    title: 'Long-term disposal',
    body: 'The multi-barrier system, repository status worldwide, and interim storage that buys decision time.',
    span: 'Permanence',
  },
  {
    to: '/future',
    kicker: '11',
    title: 'Future technologies',
    body: 'Research-stage approaches from transmutation to robotics and waste-to-heat, each with honest maturity labels.',
    span: 'Research Frontier',
  },
]

const PILLARS = [
  { n: '01', t: 'Collection', d: 'Segregate at the point of generation, before contamination spreads.' },
  { n: '02', t: 'Treatment', d: 'Reduce volume and immobilise the activity that remains.' },
  { n: '03', t: 'Transport', d: 'Certified packaging, tracked and secured between licensed sites.' },
  { n: '04', t: 'Storage', d: 'Passive, monitored and reversible — buying time for better technology.' },
]

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Topic index */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <header className="section-head">
              <span className="kicker">Contents</span>
              <h2>Eight pages, one system</h2>
              <p className="section-lead">
                Nuclear waste management is a chain, not a topic. Each page below covers one link in that
                chain, from the physics of a single isotope through to the geology that isolates it for a
                million years.
              </p>
            </header>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TOPICS.map((t, i) => (
              <Reveal key={t.to} delay={i * 45}>
                <Link
                  to={t.to}
                  className="card group h-full !block transition-[transform,border-color,box-shadow] duration-300 hover:border-plasma/50 hover:shadow-[0_26px_50px_-34px_rgba(56,240,255,0.55)]"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[0.68rem] tracking-[0.18em] text-plasma-dim">
                      {t.kicker}
                    </span>
                    <span
                      className="text-plasma opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                  <h3 className="mt-2.5 text-[1.02rem] font-semibold text-white">{t.title}</h3>
                  <p className="mt-2 text-[0.83rem] leading-relaxed text-slate-400">{t.body}</p>
                  <p className="mt-3 font-mono text-[0.62rem] tracking-[0.14em] text-slate-500 uppercase">
                    {t.span}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* At-a-glance facts */}
      <section className="section section-alt">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="panel h-full">
                <h3 className="panel-title">The system in numbers</h3>
                <p className="panel-note">
                  A few figures that frame the whole topic. Each is explored in detail on the pages below.
                </p>
                <dl className="mt-6 grid gap-5">
                  {[
                    { v: '6', k: 'Waste classes', d: 'From exempt items to heat-generating spent fuel', to: '/types' },
                    { v: '7', k: 'Cycle stages', d: 'Irradiation through to geological disposal', to: '/cycle' },
                    { v: '4', k: 'Handling pillars', d: 'Collect, treat, transport, store', to: '/handling' },
                    { v: '5', k: 'Multi-barrier layers', d: 'Waste form through to natural isolation', to: '/disposal' },
                    { v: '9', k: 'Future technologies', d: 'Research-stage approaches with honest labels', to: '/future' },
                  ].map((s) => (
                    <Link
                      key={s.k}
                      to={s.to}
                      className="group flex items-baseline gap-4 border-b border-edge/60 pb-3 last:border-0"
                    >
                      <span className="font-mono text-2xl text-plasma tabular-nums">{s.v}</span>
                      <span className="min-w-0">
                        <span className="block text-[0.9rem] font-medium text-white transition-colors group-hover:text-plasma">
                          {s.k}
                        </span>
                        <span className="block text-[0.78rem] text-slate-500">{s.d}</span>
                      </span>
                    </Link>
                  ))}
                </dl>
              </div>
            </Reveal>

            <div className="grid gap-6">
              <Reveal delay={80}>
                <div className="panel">
                  <h3 className="panel-title">The four pillars of licensed handling</h3>
                  <p className="panel-note">
                    Everything on this site sits inside a framework of minimise, condition, characterise.
                  </p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {PILLARS.map((p) => (
                      <div
                        key={p.n}
                        className="rounded-xl border border-edge/80 bg-hull/50 p-4 transition-colors hover:border-plasma/40"
                      >
                        <span className="font-mono text-[0.66rem] tracking-[0.16em] text-plasma-dim">
                          {p.n}
                        </span>
                        <h4 className="mt-1.5 text-[0.95rem] font-semibold text-white">{p.t}</h4>
                        <p className="mt-1 text-[0.8rem] leading-relaxed text-slate-400">{p.d}</p>
                      </div>
                    ))}
                  </div>
                  <Link to="/handling" className="btn btn-ghost btn-sm mt-5">
                    Read the handling page
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <div className="panel">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="panel-title">Where the solutions come from</h3>
                    <span className="tag t-demo">By-products &amp; advanced processing</span>
                  </div>
                  <p className="panel-note">
                    Spent fuel is a small share of waste volume but nearly all of the radioactivity. The
                    bulk is metals, concrete and filters — which is exactly where recycling pays.
                  </p>
                  <ul className="mt-5 grid gap-2.5">
                    {BY_PRODUCTS.slice(0, 3).map((b) => (
                      <li key={b.id} className="flex items-start gap-3">
                        <span
                          className="mt-1.5 h-2 w-2 shrink-0 rounded-sm"
                          style={{ background: b.color, boxShadow: `0 0 10px ${b.color}` }}
                          aria-hidden="true"
                        />
                        <span className="min-w-0">
                          <span className="block text-[0.85rem] text-slate-200">{b.stream}</span>
                          <span className="block text-[0.76rem] text-plasma-dim">→ {b.product}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/solutions" className="btn btn-ghost btn-sm mt-5">
                    Explore sustainable solutions
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Closing disclaimer strip */}
      <section className="section">
        <div className="wrap">
          <Reveal>
            <div className="disclaimer rounded-2xl p-6 md:p-8">
              <h3 className="disclaimer-lead">Educational resource only</h3>
              <p className="text-[0.88rem] leading-relaxed text-slate-300">
                Nuclear waste handling, treatment, transport and storage must be performed only by qualified,
                licensed professionals within authorised, regulator-approved facilities. Nothing on this site
                is operational guidance, and no figure here should be used for engineering or compliance
                decisions. See the{' '}
                <Link to="/safety" className="text-plasma underline underline-offset-4">
                  safety notes and disclaimer
                </Link>{' '}
                for full terms.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

