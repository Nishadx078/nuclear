import TypesSection from '../components/TypesSection'
import { PageHead, PageNav } from '../components/PageHead'

export default function TypesPage() {
  return (
    <>
      <PageHead
        kicker="02 — Classification"
        title="The six main types of nuclear waste"
        lead="Classification drives handling, packaging, transport and disposal. These categories run from low-level items such as protective clothing to heat-generating spent fuel — and from exempt waste that can be released, to streams that must be isolated for a million years."
        crumbs={[{ label: 'Overview', to: '/' }, { label: 'Waste Types' }]}
      />
      <div className="page-body">
        <TypesSection />
      </div>
      <PageNav
        prev={{ to: '/fundamentals', label: 'What It Is', kicker: 'Previous' }}
        next={{ to: '/origins', label: 'Sources & Impact', kicker: 'Next' }}
      />
    </>
  )
}
