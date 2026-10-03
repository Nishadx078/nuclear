import SourcesSection from '../components/SourcesSection'
import ImpactSection from '../components/ImpactSection'
import { PageHead, PageNav } from '../components/PageHead'

export default function OriginsPage() {
  return (
    <>
      <PageHead
        kicker="03–04 — Origins & consequences"
        title="Sources and environmental impact"
        lead="Every nuclear waste stream is produced during a normal, licensed operation — and has real environmental consequences when mismanaged. This page traces where each stream comes from, then examines what that means for health and ecology, and how licensed practice controls it."
        crumbs={[{ label: 'Overview', to: '/' }, { label: 'Sources & Impact' }]}
      />
      <div className="page-body">
        <SourcesSection />
        <ImpactSection />
      </div>
      <PageNav
        prev={{ to: '/types', label: 'Waste Types', kicker: 'Previous' }}
        next={{ to: '/cycle', label: 'The Management Cycle', kicker: 'Next' }}
      />
    </>
  )
}
