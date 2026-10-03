import { Reveal } from './ui'

const BARRIERS = [
  {
    cls: 'b1',
    name: 'Waste form',
    body: 'Vitrified glass pellet or the spent fuel assembly itself, in a stable physical form.',
  },
  {
    cls: 'b2',
    name: 'Bentonite clay buffer',
    body: 'Swells to seal voids around the package and chemically conditions groundwater at the canister surface.',
  },
  {
    cls: 'b3',
    name: 'Waste package',
    body: 'Copper, copper-nickel or steel canister — corrosion-resistant for the required containment period.',
  },
  {
    cls: 'b4',
    name: 'Backfill and sealing',
    body: 'Low-permeability clay plug installed during emplacement, so the tunnel becomes more sealed over time.',
  },
  {
    cls: 'b5',
    name: 'Host rock',
    body: 'Crystalline granite or clay at 400–700 m depth, chosen for low groundwater flow and long-term stability.',
  },
  {
    cls: 'b6',
    name: 'Natural isolation',
    body: 'Radionuclides decay; long half-lives place a firm bound on the residual dose reaching the surface.',
  },
]

const DISPOSAL = [
  {
    head: 'Operational (Finland)',
    body: 'Onkalo, a spent fuel repository in bedrock at roughly 430 m, began trial operation in 2022. The world’s first.',
  },
  {
    head: 'Operational (Sweden)',
    body: 'The Forsmark repository for spent nuclear fuel, at about 450 m depth, opened for loading in 2025.',
  },
  {
    head: 'Advanced development',
    body: 'France (Cigéo), Switzerland (Nördlich Lägern), Canada (site selection) and the USA, where WIPP has been operating since 1999.',
  },
  {
    head: 'Notable disposal route',
    body: 'WIPP in New Mexico handles plutonium and transuranic waste from the US weapons programme — a successful long-running demonstration.',
  },
]

const STORAGE = [
  {
    head: 'Wet storage',
    body: 'Fuel pools at 30–40 °C. Excellent heat removal, but it needs active cooling and water management.',
  },
  {
    head: 'Dry cask storage',
    body: 'Sealed canisters in concrete or steel vaults with passive cooling. Now the global default for cooled pools.',
  },
  {
    head: 'Cooling-time optimisation',
    body: '5–10 years in storage lets short-lived isotopes decay, cutting the dose carried by every later package. The single biggest near-free win in the system.',
  },
  {
    head: 'Design horizon',
    body: 'Storage is licensed and maintained for decades to a century, leaving the future free to choose better technology than we have today.',
  },
]

export default function DisposalSection() {
  return (
    <section id="disposal" className="section section-alt">
      <div className="wrap">
        <Reveal>
          <header className="section-head">
            <span className="kicker">10 — Permanence</span>
            <h2>Long-term disposal: deep geological repositories</h2>
            <p className="section-lead">
              Disposal is not storage. Disposal aims to isolate waste so thoroughly that engineered barriers
              degrade naturally long after institutional memory has lapsed — leaning on geology that has been
              stable for tens of thousands of years.
            </p>
          </header>
        </Reveal>

        <Reveal delay={70}>
          <div className="panel">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="panel-title">The multi-barrier system</h3>
              <span className="tag t-demo">Redundant by design</span>
            </div>
            <p className="panel-note">
              No single barrier is relied upon. Each performs its function independently, so the system
              stays protective even if one degrades unexpectedly.
            </p>
            <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {BARRIERS.map((b, i) => (
                <Reveal key={b.cls} delay={i * 55}>
                  <div className={`barrier ${b.cls} h-full`}>
                    <span>{b.name}</span>
                    <p>{b.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Reveal delay={90}>
            <div className="panel h-full">
              <h3 className="panel-title mb-4">Repository status snapshot</h3>
              <ul className="list">
                {DISPOSAL.map((d) => (
                  <li key={d.head}>
                    <strong>{d.head}.</strong> {d.body}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={130}>
            <div className="panel h-full">
              <h3 className="panel-title mb-4">Interim storage: buying time intelligently</h3>
              <ul className="list">
                {STORAGE.map((s) => (
                  <li key={s.head}>
                    <strong>{s.head}.</strong> {s.body}
                  </li>
                ))}
              </ul>
              <p className="note">
                Storage duration is a policy choice rather than a physical constant. Regulators can require
                it, and technology can shorten it.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
