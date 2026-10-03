import CycleSection from '../components/CycleSection'
import { PageHead, PageNav } from '../components/PageHead'

export default function CyclePage() {
  return (
    <>
      <PageHead
        kicker="05 — Interactive"
        title="The nuclear waste management cycle"
        lead="Seven stages carry material from in-reactor irradiation to geological isolation. Real flows run in parallel: low-level streams leave for disposal while spent fuel moves to interim storage and — in countries that licence it — reprocessing. Select any stage to inspect what happens there."
        crumbs={[{ label: 'Management', to: '/cycle' }, { label: 'The Cycle' }]}
      />
      <div className="page-body">
        <CycleSection />
      </div>
      <PageNav
        prev={{ to: '/origins', label: 'Sources & Impact', kicker: 'Previous' }}
        next={{ to: '/handling', label: 'Safe Handling', kicker: 'Next' }}
      />
    </>
  )
}
