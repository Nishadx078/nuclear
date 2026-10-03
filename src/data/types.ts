/** Domain model for the whole site. Types here drive the UI. */

export type WasteClass = 'very-low' | 'low' | 'intermediate' | 'high'

export interface WasteType {
  id: string
  name: string
  klass: WasteClass
  halfLifeNote: string
  activity: number
  examples: string[]
  origin: string
  pathway: string
  disposition: string
}

export interface CycleStage {
  id: string
  label: string
  short: string
  duration: string
  x: number
  y: number
  summary: string
  detail: string[]
  controls: string[]
  riskFocus: string
}

export interface Pillar {
  id: 'collect' | 'treat' | 'transport' | 'store'
  index: string
  title: string
  strapline: string
  summary: string
  practices: { title: string; body: string }[]
  standards: string[]
  note: string
}

export interface Lever {
  id: string
  title: string
  level: 'Design' | 'Operations' | 'Chemistry' | 'Fuel cycle'
  impact: number
  summary: string
  actions: string[]
}

export interface ByProduct {
  id: string
  stream: string
  product: string
  maturity: 'Commercial' | 'Demonstrated' | 'Research' | 'Conditional'
  benefit: string
  process: string
  caveat: string
  share: number
  unit: string
  color: string
}

export interface FutureTech {
  id: string
  name: string
  maturity: 'demo' | 'comm' | 'rd' | 'lab'
  readiness: number
  summary: string
  detail: string[]
  horizon: string
}

export interface Source {
  label: string
  volume: number
  note: string
}

export interface Reference {
  body: string
  title: string
  locator: string
  note: string
}

export interface Isotope {
  name: string
  halfLife: string
  scope: number
  scopeLabel: string
  desc: string
  relevance: string
}
