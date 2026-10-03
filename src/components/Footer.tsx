import { Link } from 'react-router-dom'
import { FOOTER_LINKS } from '../data/nav'

export default function Footer() {
  // De-duplicate routes while preserving order.
  const seen = new Set<string>()
  const links = FOOTER_LINKS.filter((l) => {
    const key = l.to.split('#')[0] ?? l.to
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  return (
    <footer className="relative border-t border-edge/80 bg-trench/85 py-12">
      <div className="wrap grid gap-10 lg:grid-cols-[1.2fr_1.6fr]">
        <div>
          <strong className="text-[0.98rem] font-semibold text-white">
            Nuclear Waste Management &amp; Sustainable Solutions
          </strong>
          <p className="mt-2 max-w-sm text-[0.83rem] leading-relaxed text-slate-400">
            Educational content for public understanding. Not professional, engineering or regulatory
            advice — see the safety notes and disclaimer for full terms.
          </p>
          <p className="mt-4 font-mono text-[0.66rem] tracking-wider text-slate-500 uppercase">
            Static build · no trackers · no external requests
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="mb-3 font-mono text-[0.66rem] tracking-[0.18em] text-plasma-dim uppercase">
            All pages
          </h2>
          <ul className="grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="group flex items-baseline gap-2 text-[0.82rem] text-slate-400 transition-colors hover:text-plasma"
                >
                  <span className="font-mono text-[0.6rem] text-plasma-dim">{l.num}</span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="wrap mt-10 border-t border-edge/60 pt-6">
        <Link to="/" className="btn btn-ghost btn-sm">
          Back to top ↑
        </Link>
      </div>
    </footer>
  )
}
