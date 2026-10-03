import { PUREX_STEPS, RECYCLE_CARDS } from '../data/content'
import { Ring, Reveal } from './ui'

export default function ReprocessingSection() {
  return (
    <section id="reprocessing" className="section section-alt">
      <div className="wrap">
        <Reveal>
          <header className="section-head">
            <span className="kicker">08 — Advanced processing</span>
            <h2>Advanced reprocessing and the closed fuel cycle</h2>
            <p className="section-lead">
              Reprocessing separates valuable fissile and fertile material from fission products, shrinking
              the volume of long-lived high-level waste roughly four- to ten-fold and enabling multiple
              recycle cycles. It is a mature industrial reality in France, Russia, Japan, India and
              China — though its economics and proliferation safeguards remain legitimately debated.
            </p>
          </header>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal delay={70}>
            <div className="panel h-full">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="panel-title">PUREX flow — the reference process</h3>
                <span className="tag t-comm">Industrial standard</span>
              </div>
              <ol className="steps mt-6">
                {PUREX_STEPS.map((s) => (
                  <li key={s.title}>
                    <b>{s.title}.</b> {s.body}
                  </li>
                ))}
              </ol>
              <p className="note">
                Advanced variants (GANEX, COEX, and fast-recycle concepts) co-extract actinides to cut
                plant size, solvent inventory and secondary waste — see the future technologies section.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-6">
              <div className="panel">
                <h3 className="panel-title mb-5">Volume and resource effect</h3>
                <div className="grid grid-cols-2 gap-5">
                  <div className="text-center">
                    <div className="relative mx-auto w-[8.25rem]">
                      <Ring value={100} label="Once-through: full spent fuel becomes high-level waste" tone="#ff5c7a" />
                    </div>
                    <h4 className="mt-3 text-[0.85rem] font-semibold text-white">Once-through</h4>
                    <p className="mt-1.5 text-[0.75rem] leading-relaxed text-slate-400">
                      Full spent fuel becomes high-level waste. Uranium and plutonium are not recovered.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="relative mx-auto w-[8.25rem]">
                      <Ring value={22} label="Reprocessed: roughly 22 percent relative high-level waste" tone="#b6ff3d" />
                    </div>
                    <h4 className="mt-3 text-[0.85rem] font-semibold text-white">Reprocessed and recycled</h4>
                    <p className="mt-1.5 text-[0.75rem] leading-relaxed text-slate-400">
                      Only vitrified fission products and minor residues remain as high-level waste.
                    </p>
                  </div>
                </div>
                <ul className="list mt-6">
                  <li>
                    <strong>Uranium supply.</strong> Reprocessing plus recycling can stretch mined uranium
                    supply from roughly 60–70 years to over a thousand years at present demand.
                  </li>
                  <li>
                    <strong>Dose reduction.</strong> Vitrification combined with longer cooling before
                    disposal reduces the inventory of long-lived isotopes in each package.
                  </li>
                  <li>
                    <strong>Energy yield.</strong> Mixed-oxide and metallic fuel recycling raises plutonium
                    utilisation substantially.
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="panel mt-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="panel-title">Non-nuclear recycling that cuts nuclear waste volume</h3>
              <span className="tag t-demo">Demonstrated industry</span>
            </div>
            <p className="panel-note max-w-3xl">
              Metals dominate the mass of most nuclear waste streams. Decontamination, melting and smelting
              can recover steel, stainless steel, zircaloy, copper and aluminium for reuse, reducing the
              low-level volume that would otherwise need disposal.
            </p>
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {RECYCLE_CARDS.map((c) => (
                <article key={c.title} className="card">
                  <h4 className="text-[0.95rem] font-semibold text-white">{c.title}</h4>
                  <p className="mt-2 text-[0.83rem] leading-relaxed text-slate-400">{c.body}</p>
                  <span className="tag t-comm mt-3 inline-block">{c.tag}</span>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
