import InnovationSection from '../components/InnovationSection'
import ReprocessingSection from '../components/ReprocessingSection'
import ByProductsSection from '../components/ByProductsSection'
import { PageHead, PageNav } from '../components/PageHead'

const ANCHORS = [
  { id: 'minimisation', label: 'Waste minimisation', to: '/solutions#minimisation' },
  { id: 'reprocessing', label: 'Reprocessing & recycling', to: '/solutions#reprocessing' },
  { id: 'byproducts', label: 'By-products', to: '/solutions#byproducts' },
]

export default function SolutionsPage() {
  return (
    <>
      <PageHead
        kicker="07–09 — Solutions"
        title="Reducing, recycling and reusing nuclear waste"
        lead="The most sustainable waste is waste never created. This page covers upstream minimisation, the advanced reprocessing that makes a closed fuel cycle possible, and the industrial processes that turn contaminated residues into ordinary, saleable materials."
        crumbs={[{ label: 'Solutions', to: '/solutions' }]}
      >
        <nav aria-label="Sections on this page" className="mt-7 flex flex-wrap gap-2">
          {ANCHORS.map((a) => (
            <a key={a.id} href={a.to} className="chip">
              {a.label}
            </a>
          ))}
        </nav>
      </PageHead>

      <div className="page-body">
        <InnovationSection />
        <ReprocessingSection />
        <ByProductsSection />
      </div>

      <PageNav
        prev={{ to: '/handling', label: 'Safe Handling', kicker: 'Previous' }}
        next={{ to: '/disposal', label: 'Long-Term Disposal', kicker: 'Next' }}
      />
    </>
  )
}
