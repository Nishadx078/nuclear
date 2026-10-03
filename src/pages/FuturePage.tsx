import FutureSection from '../components/FutureSection'
import { PageHead, PageNav } from '../components/PageHead'

export default function FuturePage() {
  return (
    <>
      <PageHead
        kicker="11 — Research frontier"
        title="Future technologies in waste management"
        lead="Research-grade approaches to sustainable nuclear waste management, each with its maturity stated honestly. Several are already in demonstration and a few remain laboratory concepts. Maturity moves over time, so treat the labels as a snapshot rather than a fixed classification."
        crumbs={[{ label: 'Future Tech' }]}
      />
      <div className="page-body">
        <FutureSection />
      </div>
      <PageNav
        prev={{ to: '/disposal', label: 'Long-Term Disposal', kicker: 'Previous' }}
        next={{ to: '/safety', label: 'Safety & Sources', kicker: 'Next' }}
      />
    </>
  )
}
