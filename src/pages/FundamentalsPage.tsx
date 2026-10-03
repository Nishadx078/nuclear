import WhatSection from '../components/WhatSection'
import { PageHead, PageNav } from '../components/PageHead'

export default function FundamentalsPage() {
  return (
    <>
      <PageHead
        kicker="01 — Fundamentals"
        title="What is nuclear waste?"
        lead="Nuclear waste is any material that has become radioactive through exposure to neutron radiation during nuclear activity. Radioactivity is not the same as danger — what matters is the type of isotope, its half-life, its activity concentration, and how safely it is contained."
        crumbs={[{ label: 'Fundamentals' }]}
      />
      <div className="page-body">
        <WhatSection />
      </div>
      <PageNav
        prev={{ to: '/', label: 'Home', kicker: 'Back' }}
        next={{ to: '/types', label: 'Waste Types', kicker: 'Next' }}
      />
    </>
  )
}
