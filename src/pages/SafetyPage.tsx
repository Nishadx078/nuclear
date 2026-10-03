import SafetySection, { ReferencesSection } from '../components/SafetySection'
import { PageHead, PageNav } from '../components/PageHead'

export default function SafetyPage() {
  return (
    <>
      <PageHead
        kicker="12–13 — Non-negotiable"
        title="Safety notes, disclaimer and references"
        lead="Nuclear waste handling must be performed only by qualified, licensed professionals within authorised, regulator-approved facilities. This page sets out those limits plainly, followed by the authoritative sources behind the material on this site."
        crumbs={[{ label: 'Safety & Sources' }]}
      />
      <div className="page-body">
        <SafetySection />
        <ReferencesSection />
      </div>
      <PageNav
        prev={{ to: '/future', label: 'Future Technologies', kicker: 'Previous' }}
        next={{ to: '/', label: 'Home', kicker: 'Back to start' }}
      />
    </>
  )
}
