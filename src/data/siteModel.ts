/** Static metadata for the interactive 3D model — kept separate from the
 *  React-Three-Fiber scene so data stays in the main bundle while the heavy
 *  WebGL code is code-split and loaded only on the 3D page. */

export type SitePartId =
  | 'reactor'
  | 'pool'
  | 'casks'
  | 'strata'
  | 'tunnel'
  | 'canister'
  | 'buffer'

export interface SitePart {
  id: SitePartId
  title: string
  depth: string
  body: string
}

export const SITE_PARTS: SitePart[] = [
  {
    id: 'reactor',
    title: 'Reactor building',
    depth: 'Surface · 0 m',
    body: 'Where irradiation happens. Fuel stays 18–24 months before discharge; the containment structure around it is the first engineered barrier.',
  },
  {
    id: 'pool',
    title: 'Spent fuel pool',
    depth: 'Surface · inside containment',
    body: 'Deep clean water removes decay heat and shields staff. Assemblies rest here roughly 5–10 years while short-lived isotopes decay.',
  },
  {
    id: 'casks',
    title: 'Dry cask interim storage',
    depth: 'Surface · on grade',
    body: 'Cooled fuel in sealed steel or concrete canisters with passive natural-convection cooling. No pumps, no power — now the global default.',
  },
  {
    id: 'strata',
    title: 'Host rock strata',
    depth: '0 to 450 m',
    body: 'Stable crystalline rock with very slow groundwater movement. Geological stability over millions of years is the final, passive barrier.',
  },
  {
    id: 'tunnel',
    title: 'Emplacement gallery',
    depth: '≈ 430–450 m',
    body: 'Tunnels bored into stable rock. Once a gallery is filled it is sealed with a low-permeability clay plug, so the tunnel becomes part of the barrier.',
  },
  {
    id: 'canister',
    title: 'Waste package',
    depth: '≈ 450 m, in gallery',
    body: 'Copper or steel canister holding vitrified glass or spent fuel. Designed to resist corrosion for the required containment period.',
  },
  {
    id: 'buffer',
    title: 'Bentonite clay buffer',
    depth: '≈ 450 m, around canister',
    body: 'Clay that swells on contact with water to seal every void, and chemically conditions groundwater before it reaches the canister surface.',
  },
]