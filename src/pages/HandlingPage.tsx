import TreatmentSection from '../components/TreatmentSection'
import { PageHead, PageNav } from '../components/PageHead'

export default function HandlingPage() {
  return (
    <>
      <PageHead
        kicker="06 — Practice"
        title="Safe collection, treatment, transport and storage"
        lead="These four pillars of licensed practice share three foundations: minimise the material, condition it into a robust form, and characterise everything so its fate is known for as long as it exists. Nothing here is operational guidance — it is a description of how the licensed system works."
        crumbs={[{ label: 'Management', to: '/cycle' }, { label: 'Safe Handling' }]}
      />
      <div className="page-body">
        <TreatmentSection />
      </div>
      <PageNav
        prev={{ to: '/cycle', label: 'The Cycle', kicker: 'Previous' }}
        next={{ to: '/solutions', label: 'Sustainable Solutions', kicker: 'Next' }}
      />
    </>
  )
}
