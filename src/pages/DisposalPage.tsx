import DisposalSection from '../components/DisposalSection'
import { PageHead, PageNav } from '../components/PageHead'

export default function DisposalPage() {
  return (
    <>
      <PageHead
        kicker="10 — Permanence"
        title="Long-term disposal in deep geological repositories"
        lead="Disposal is not storage. Disposal aims to isolate waste so thoroughly that engineered barriers degrade naturally long after institutional memory has lapsed — leaning on geology that has been stable for tens of thousands of years."
        crumbs={[{ label: 'Solutions', to: '/solutions' }, { label: 'Long-Term Disposal' }]}
      />
      <div className="page-body">
        <DisposalSection />
      </div>
      <PageNav
        prev={{ to: '/solutions', label: 'Sustainable Solutions', kicker: 'Previous' }}
        next={{ to: '/future', label: 'Future Technologies', kicker: 'Next' }}
      />
    </>
  )
}
