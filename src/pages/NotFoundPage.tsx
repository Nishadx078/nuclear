import { Link } from 'react-router-dom'
import { PageHead, PageNav } from '../components/PageHead'

const SUGGESTIONS = [
  { to: '/', label: 'Home', desc: 'Overview of all eight pages' },
  { to: '/cycle', label: 'The Management Cycle', desc: 'Interactive diagram, reactor to disposal' },
  { to: '/solutions', label: 'Sustainable Solutions', desc: 'Minimisation, reprocessing, by-products' },
  { to: '/safety', label: 'Safety & Sources', desc: 'Disclaimer and references' },
]

export default function NotFoundPage() {
  return (
    <>
      <PageHead
        kicker="Error 404"
        title="That page does not exist"
        lead="The link may be out of date, or the address mistyped. Use the pages below to get back on track."
        crumbs={[{ label: 'Not found' }]}
      >
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
          {SUGGESTIONS.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="nextprev-link !flex-row items-center justify-between"
            >
              <span>
                <span className="block text-[0.95rem] font-medium text-white">{s.label}</span>
                <span className="block text-[0.78rem] text-slate-500">{s.desc}</span>
              </span>
              <span aria-hidden="true" className="text-plasma">
                →
              </span>
            </Link>
          ))}
        </div>
      </PageHead>
      <PageNav next={{ to: '/', label: 'Home', kicker: 'Back to start' }} />
    </>
  )
}
