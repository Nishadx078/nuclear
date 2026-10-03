import type {
  ByProduct,
  CycleStage,
  FutureTech,
  Isotope,
  Lever,
  Pillar,
  Reference,
  Source,
  WasteType,
} from './types'

export const WASTE_TYPES: WasteType[] = [
  {
    id: 'very-low',
    name: 'Very Low Level / Exempt',
    klass: 'very-low',
    halfLifeNote: 'Days to a few years; clearance possible',
    activity: 8,
    examples: [
      'Contaminated packaging, foils and filters',
      'Smear samples and wipe test kits',
      'Protective clothing, gloves, shoe covers',
      'Sealed sources (Am-241, Sr-90) after source recovery',
    ],
    origin: 'Every licensed facility, including hospitals and research sites',
    pathway:
      'Typically cleared to conventional disposal after characterisation and a radiological case for clearance.',
    disposition:
      'Metal reprocessing or incineration with off-gas filtration, then near-surface landfill.',
  },
  {
    id: 'low-solid',
    name: 'Low Level Solid Waste (LLW)',
    klass: 'low',
    halfLifeNote: 'Up to ~300 years',
    activity: 55,
    examples: [
      'Contaminated equipment and tools',
      'Reactor internals and removed hardware',
      'Ion exchange resins and evaporator concentrates',
      'Concrete rubble from decommissioning',
      'Filters, sludges and absorbents',
    ],
    origin: 'Power stations, decommissioning projects, fuel cycle plants',
    pathway:
      'Disposal requires engineered near-surface barriers; activity concentrates in long-lived components.',
    disposition:
      'Metal decontamination and melting for clean fractions; conditioned remainder in vaults.',
  },
  {
    id: 'low-liquid',
    name: 'Low Level Liquid & Gaseous',
    klass: 'low',
    halfLifeNote: 'Minutes to ~30 years',
    activity: 40,
    examples: [
      'Primary and secondary coolants',
      'Demineralisation regenerant and reject',
      'Reactor and building ventilation exhaust',
      'Laundry water and shower drains',
    ],
    origin: 'Continuous operational streams from every facility',
    pathway:
      'Liquid routes to liquid treatment systems; airborne releases pass through filtration, hold-up and monitored stacks.',
    disposition:
      'Treated, monitored, then released under licence or recycled into the process.',
  },
  {
    id: 'intermediate',
    name: 'Intermediate Level Waste (ILW)',
    klass: 'intermediate',
    halfLifeNote: '~30 to 1,000 years (structure of stream matters most)',
    activity: 68,
    examples: [
      'Sludge, chemical precipitates and evaporation salts',
      'Smelt and incinerator residues',
      'Reactor moderator, insulation and graphite',
      'Cladding hulls with bound fission products',
    ],
    origin: 'Fuel reprocessing and waste treatment plants',
    pathway:
      'Typically too hot to handle directly, so processed and packaged before disposal.',
    disposition:
      'Conditioned into cement or bitumen form, or vitrified, then disposed in a deep facility.',
  },
  {
    id: 'high-heat',
    name: 'High Level Waste — Heat Generating',
    klass: 'high',
    halfLifeNote: '10² to 10⁶ years depending on isotopes',
    activity: 95,
    examples: [
      'Spent nuclear fuel assemblies',
      'Vitrified fission product glass canisters',
      'Reprocessing campaign residues and high burnup fuel',
    ],
    origin: 'Reactors and the back end of the fuel cycle',
    pathway:
      'Remote handling in shielded cells, active then passive cooling, extensive containment.',
    disposition:
      'Interim wet then dry-cask storage, with disposal in a deep geological repository after cooling.',
  },
  {
    id: 'long-alpha',
    name: 'Long-Lived Alpha Bearing Waste',
    klass: 'high',
    halfLifeNote: '10³ to 10⁵ years',
    activity: 88,
    examples: [
      'Legacy plutonium and americium residues',
      'Historic fuel-cycle raffinates and sludges',
      'Weapon-origin material and contaminated equipment',
    ],
    origin: 'Older reprocessing practice and defence programmes',
    pathway:
      'Alpha emitters are radiotoxic if inhaled, so dedicated containment is required rather than bulk treatment.',
    disposition:
      'Interim storage followed by deep geological disposal, with transmutation research under way.',
  },
]

export const ISOTOPES: Isotope[] = [
  {
    name: 'Carbon-14',
    halfLife: '5,730 years',
    scope: 10,
    scopeLabel: '10 half-lives ≈ 57,000 yr',
    desc: 'A major long-lived product of neutron capture in fuel and structural materials. It is a soft beta emitter, so it must be handled as a contamination concern rather than an external irradiation hazard.',
    relevance: 'Dominates the long-term dose from graphite and metal components in many disposal inventories.',
  },
  {
    name: 'Technetium-99',
    halfLife: '211,000 years',
    scope: 10,
    scopeLabel: '10 half-lives ≈ 2.1 Myr',
    desc: 'A fission product with a long half-life and a beta emitter. Because it has no stable isotope of the same element, it cannot be diluted by mixing with stable technetium.',
    relevance: 'Sets the timing for geological disposal in some waste streams; studied as a transmutation target.',
  },
  {
    name: 'Iodine-129',
    halfLife: '15.7 million years',
    scope: 10,
    scopeLabel: '10 half-lives ≈ 157 Myr',
    desc: 'A fission product released in Chernobyl and Fukushima. It is highly mobile in groundwater because iodine forms anions, which is why it is a key design case for repository liners.',
    relevance: 'A key long-term migration case for spent fuel and reprocessing waste.',
  },
  {
    name: 'Plutonium-239',
    halfLife: '24,100 years',
    scope: 10,
    scopeLabel: '10 half-lives ≈ 241,000 yr',
    desc: 'A fissile actinide. Its concern is partly radiological and partly that it is weapons-usable, which is why safeguards and accounting accompany it at every step.',
    relevance: 'Recoverable by reprocessing; the main driver for fast reactors and transmutation research.',
  },
  {
    name: 'Americium-241',
    halfLife: '432 years',
    scope: 10,
    scopeLabel: '10 half-lives ≈ 4,320 yr',
    desc: 'A decay product of plutonium-241 that emits alpha particles and gamma rays. It dominates the heat output of aged plutonium, which affects cooling time for stored waste packages.',
    relevance: 'Shortens required cooling periods if separated — a target for advanced separation research.',
  },
  {
    name: 'Caesium-137',
    halfLife: '30.1 years',
    scope: 10,
    scopeLabel: '10 half-lives ≈ 301 yr',
    desc: 'A highly mobile fission product with a short half-life relative to geological timescales. Around ten half-lives is the standard planning horizon for cooling and decay-storage before disposal.',
    relevance: 'Sets the minimum storage period before a spent fuel package is transportable for disposal.',
  },
  {
    name: 'Strontium-90',
    halfLife: '28.8 years',
    scope: 10,
    scopeLabel: '10 half-lives ≈ 288 yr',
    desc: 'A chemically hazardous fission product that concentrates in bone. It is readily separated chemically, which makes it a long-standing candidate for dedicated extraction.',
    relevance: 'Recoverable in principle as a heat or power source — see the isotope battery research section.',
  },
]

export const CYCLE_STAGES: CycleStage[] = [
  {
    id: 'irradiation',
    label: 'In-Reactor Irradiation',
    short: 'Irradiation',
    duration: '18–24 months per fuel cycle',
    x: 120,
    y: 130,
    summary: 'Neutron bombardment splits heavy nuclei and transmutes others.',
    detail: [
      'Fuel stays in the reactor for 18 to 24 months, held under strict limits on power, temperature and burnup.',
      'Fission releases energy plus two neutrons, which maintain the chain reaction and create new isotopes.',
      'Fuel cladding is deliberately doped with burnable absorbers so reactivity falls predictably as it ages.',
      'The operator’s job is to keep every radionuclide inside the cladding, inside the coolant circuit, inside the containment.',
    ],
    controls: [
      'Fuel qualification and cladding integrity testing',
      'Real-time neutron flux and coolant chemistry monitoring',
      'Burnup and fluence tracking per assembly',
      'Leak detection and fuel failure rate limits',
    ],
    riskFocus: 'Fuel performance and containment integrity',
  },
  {
    id: 'pool',
    label: 'Wet Storage Pool',
    short: 'Pool storage',
    duration: '5–10 years (or longer)',
    x: 330,
    y: 90,
    summary: 'Immediate decay-heat removal in a deep, clean water pool.',
    detail: [
      'After discharge, assemblies rest in the pool for months to years while short-lived isotopes decay and heat falls.',
      'Water is a deliberate heat sink and a transparent barrier: staff watch for fuel damage rather than touch it.',
      'The pool is a building designed to lose power safely — makeup water, natural circulation and passive backup are all required.',
      'Gaps and spaces in the pool water are actively monitored for activity.',
    ],
    controls: [
      'Water chemistry control and purification',
      'Pool level, temperature and evaporation monitoring',
      'Air activity monitor on the pool surface',
      'Emergency water makeup with backup power',
    ],
    riskFocus: 'Loss of cooling or water, and fuel failure during early life',
  },
  {
    id: 'dry',
    label: 'Dry Cask Interim Storage',
    short: 'Dry cask',
    duration: '40–100+ years, licensed and monitored',
    x: 560,
    y: 90,
    summary: 'Passive, ambient-cooled storage that buys decision time.',
    detail: [
      'Cooled fuel is transferred to sealed canisters — steel, stainless, or concrete depending on the design.',
      'Canisters sit in concrete or steel vaults with natural convection as the only cooling mechanism. No pumps, no power.',
      'This is the global default: simpler to inspect, cheaper to operate, and easier to licence than pools.',
      'Storage is explicitly temporary. The design assumes later retrieval will be possible for final disposal or advanced processing.',
    ],
    controls: [
      'Canister surface temperature and heat flux monitoring',
      'Aging management programme for canisters, welds and concrete vaults',
      'Airborne and groundwater radiological monitoring',
      'Packaging certified for its intended storage period',
    ],
    riskFocus: 'Long-term canister corrosion, degradation of welds and concrete',
  },
  {
    id: 'reprocessing',
    label: 'Reprocessing & Recycling',
    short: 'Reprocessing',
    duration: 'Months in a licensed facility',
    x: 780,
    y: 210,
    summary: 'Separate recoverable material from what genuinely must be isolated.',
    detail: [
      'Spent fuel is dissolved and solvent-extracted, partitioning uranium and plutonium from fission products.',
      'Uranium is converted to uranium oxide and returned to the fuel cycle; plutonium can become mixed oxide fuel.',
      'Only the fission products and minor residues need long-term isolation — typically 10 to 25 percent of the original mass.',
      'Where recycling is not licensed, the fuel instead goes directly to disposal after cooling.',
      'Safeguards, containment and remote handling are used throughout; this is among the most heavily controlled industrial processes in existence.',
    ],
    controls: [
      'Criticality safety controls and geometry restrictions',
      'Remote handling in heavily shielded hot cells',
      'IAEA safeguards and material accountancy',
      'Criticality and solvent inventory limits by design',
    ],
    riskFocus: 'Radiological containment, criticality safety, proliferation safeguards',
  },
  {
    id: 'vitrification',
    label: 'Vitrification & Conditioning',
    short: 'Conditioning',
    duration: 'Continuous process',
    x: 640,
    y: 380,
    summary: 'Turn troublesome liquid into a solid that will not move.',
    detail: [
      'Fission-product liquor is fed continuously into an electrically heated melter and becomes glass.',
      'Vitrification fixes radionuclides in an amorphous matrix, so they cannot migrate even if water reaches it.',
      'Glass canisters are passively cooled in air and remain stable for thousands of years.',
      'Lower-activity liquids are immobilised instead as cement, bitumen or polymers — cheaper, and adequate for their inventories.',
    ],
    controls: [
      'Off-gas filtration and iodine retention on the melter',
      'Feed chemistry limits to protect the melter and the glass',
      'Canister surface temperature monitoring',
      'Glass acceptance criteria on homogeneity and durability',
    ],
    riskFocus: 'Off-line gas release, melter reliability, glass homogeneity',
  },
  {
    id: 'transport',
    label: 'Transport & Inventory',
    short: 'Transport',
    duration: 'Days per shipment',
    x: 390,
    y: 430,
    summary: 'Certified, tracked, and secured movement between licensed sites.',
    detail: [
      'Packages must withstand drop, stacking, vibration, fire and water immersion tests before use.',
      'Contents are characterised, and the package certifies the radionuclides inside with tight activity limits.',
      'Shipments are tracked through a national or international registry from origin to destination with tamper seals.',
      'Routing avoids populated areas, and carriers are specifically licensed and trained for the class.',
    ],
    controls: [
      'IAEA / DOT package certification and periodic requalification',
      'Tamper-indicating seals and real-time consignee tracking',
      'Carrier licensing, route planning and emergency response readiness',
      'Pre-shipment characterisation and package selection records',
    ],
    riskFocus: 'Package integrity, loss of control in transit, misrouting',
  },
  {
    id: 'disposal',
    label: 'Deep Geological Disposal',
    short: 'Disposal',
    duration: '1 million years and beyond',
    x: 150,
    y: 380,
    summary: 'Engineered and natural barriers that isolate waste for geologic timescales.',
    detail: [
      'Disposal aims for safety that no longer depends on human institutions — geology does the work if society changes.',
      'Multiple independent barriers: the waste form itself, buffer clay, canister, backfill, and host rock.',
      'The site is chosen for stable geology — low groundwater flow, no significant seismic or fault activity.',
      'Waste is emplaced in deep tunnels, galleries are sealed, and the site is monitored for a defined period, then handed over.',
    ],
    controls: [
      'Site characterisation over decades',
      'Canister and buffer qualification testing',
      'Groundwater and radionuclide migration modelling',
      'Post-closure monitoring and institutional preservation',
    ],
    riskFocus: 'Long-term radionuclide migration, canister corrosion, groundwater flow',
  },
]

export const PILLARS: Pillar[] = [
  {
    id: 'collect',
    index: '01',
    title: 'Collection',
    strapline: 'Segregate at the point of generation',
    summary:
      'Waste is separated where it is created, not where it is convenient to process later. Correct sorting at the point of generation is the cheapest waste reduction available anywhere in the system.',
    practices: [
      {
        title: 'Segregate by activity and half-life',
        body: 'Keep short-lived nuclides away from long-lived streams so that decay can do the volume reduction work for free.',
      },
      {
        title: 'Separate clean from contaminated',
        body: 'Non-contaminated surfaces are released for reuse under a formal clearance process, keeping clean material out of the waste stream entirely.',
      },
      {
        title: 'Minimise packaging and double handling',
        body: 'Use only the containment needed for the hazard. Over-packaging multiplies volume and cost without adding safety.',
      },
      {
        title: 'Characterise as you go',
        body: 'Nuclide inventories and activity records allow correct routing and demonstrate compliance for decades.',
      },
    ],
    standards: [
      'Characterisation before classification',
      'Segregation by nuclide and half-life',
      'Documented waste acceptance criteria',
      'Clearance only under formal radiological case',
    ],
    note: 'Good collection practice is the difference between a disposal problem and a manageable disposal problem.',
  },
  {
    id: 'treat',
    index: '02',
    title: 'Treatment',
    strapline: 'Reduce volume, immobilise activity',
    summary:
      'Treatment removes activity from bulk material where possible, and immobilises what remains. The two levers are complementary: decontaminate first, then condition the residue.',
    practices: [
      {
        title: 'Volume reduction',
        body: 'Compaction, incineration with off-gas filtration, supercritical water oxidation, and plasma treatment reduce low-level volume substantially.',
      },
      {
        title: 'Metals recycling',
        body: 'Contact, induction and electrochemical decontamination followed by smelting recovers steel, stainless, zircaloy and copper for reuse.',
      },
      {
        title: 'Liquid processing',
        body: 'Filtration, ion exchange, evaporation, precipitation and reverse osmosis separate the concentrate for vitrification or cementation.',
      },
      {
        title: 'Immobilisation',
        body: 'Vitrification for high-level streams; cement, bitumen and polymer encapsulation where a simpler, robust matrix suffices.',
      },
    ],
    standards: [
      'Remote or shielded operation for hot streams',
      'Criticality safety where fissile material is present',
      'Off-gas filtration and effluent treatment',
      'Validated waste form performance',
    ],
    note: 'The goal is the smallest volume of the most stable waste form for the specific inventory.',
  },
  {
    id: 'transport',
    index: '03',
    title: 'Transport',
    strapline: 'Certified, tracked, secured',
    summary:
      'Transport is treated as a controlled, licensed operation rather than a logistical afterthought. Package performance is demonstrated by testing before any material moves.',
    practices: [
      {
        title: 'Qualified packaging',
        body: 'Packages pass drop, stack, vibration, fire and immersion tests for their contents and remain intact under accident conditions.',
      },
      {
        title: 'Content characterisation',
        body: 'The package certificate declares radionuclides, activity limits and physical form — shielding is designed against that inventory.',
      },
      {
        title: 'Inventory tracking',
        body: 'Consignments move under seals and records from origin to destination, with reconciliation at each transfer point.',
      },
      {
        title: 'Route and carrier control',
        body: 'Licensed carriers, agreed routes, security requirements and pre-arranged emergency response.',
      },
    ],
    standards: [
      'IAEA transport regulations (SSR-6) or national equivalent',
      'Type B(U) / Type B packages for high-activity material',
      'Tamper seals and consignee records',
      'Emergency response plans in place before departure',
    ],
    note: 'Every regulatory scheme in the world treats high-activity transport as a low-frequency, high-consequence event.',
  },
  {
    id: 'store',
    index: '04',
    title: 'Storage',
    strapline: 'Passive, monitored, reversible',
    summary:
      'Interim storage is deliberately designed to be passive, inspectable and reversible. It buys time so that later generations can use better technology than we have.',
    practices: [
      {
        title: 'Wet then dry transition',
        body: 'Years in a pool for heat removal and decay, then transfer to passive dry casks — now the international default.',
      },
      {
        title: 'Optimise cooling time',
        body: 'Five to ten years of decay storage removes short-lived isotopes and cuts the dose carried by every later package.',
      },
      {
        title: 'Ageing management',
        body: 'Inspections and degradation models for canisters, welds and concrete vaults, with a maintenance horizon in decades.',
      },
      {
        title: 'Maintain retrievability',
        body: 'Record and physical systems designed so waste can still be removed — storage is not a final answer.',
      },
    ],
    standards: [
      'Independent review of ageing management',
      'Thermal monitoring of packages',
      'Groundwater and air monitoring programmes',
      'Retrieval demonstrated during commissioning',
    ],
    note: 'Storage duration is a policy choice, not a physical constant. Regulators can require it; technology can shorten it.',
  },
]

export const LEVERS: Lever[] = [
  {
    id: 'burnup',
    title: 'Higher fuel burnup',
    level: 'Fuel cycle',
    impact: 72,
    summary: 'Extract more energy per unit of fuel before discharge.',
    actions: [
      'Pull more energy from each assembly, so fewer assemblies are removed per unit of electricity',
      'New cladding and fuel designs resist irradiation-induced embrittlement',
      'Trade-off: higher residual radioactivity and more stringent storage analysis required',
    ],
  },
  {
    id: 'lifetime-core',
    title: 'Long-life reactor cores',
    level: 'Design',
    impact: 66,
    summary: 'Design reactors around 60–80 year core lifetimes.',
    actions: [
      'Materials qualified for decades of irradiation rather than single cycles',
      'Waste volume per unit of energy falls by the same ratio as core life',
      'Requires new licensing concepts for very-long-term structural integrity',
    ],
  },
  {
    id: 'fast-reactor',
    title: 'Recycling in fast reactors',
    level: 'Fuel cycle',
    impact: 78,
    summary: 'Use fast neutron spectra to burn recycled actinides productively.',
    actions: [
      'Sodium or lead fast reactors consume plutonium and minor actinides rather than accumulating them',
      'Supports multiple recycling cycles instead of a single use of uranium',
      'Closed fuel cycle keeps uranium mining demand low for far longer',
    ],
  },
  {
    id: 'filter-life',
    title: 'Longer-lived filters and resins',
    level: 'Chemistry',
    impact: 58,
    summary: 'Design replaceable media that last longer and hold more activity.',
    actions: [
      'Higher-capacity ion exchange resins extend service intervals',
      'Reusable filter media reduce routine replacement waste',
      'Selective media capture specific radionuclides so the bulk stream is easier to release',
    ],
  },
  {
    id: 'smart-release',
    title: 'Analytically driven release',
    level: 'Operations',
    impact: 54,
    summary: 'Measure before deciding what needs to be discarded.',
    actions: [
      'In-process assay and continuous monitoring justify clearance decisions in real time',
      'Segregate uncontaminated bulk so it never enters a waste stream',
      'Reduces low-level volume without weakening any safety case',
    ],
  },
  {
    id: 'decon',
    title: 'Routine surface decontamination',
    level: 'Operations',
    impact: 69,
    summary: 'Remove activity from surfaces before decommissioning.',
    actions: [
      'Contact, chemical and electrochemical methods recover metal for reuse',
      'Full-body and slab decontamination can make large concrete volumes unclassified',
      'Metals go back into the supply chain as certified, cleared material',
    ],
  },
  {
    id: 'materials',
    title: 'Corrosion-resistant materials',
    level: 'Design',
    impact: 61,
    summary: 'Pick materials that stay intact for the required containment period.',
    actions: [
      'Copper and high-nickel alloys resist the groundwater chemistry expected in granite host rock',
      'Container performance is matched to the nuclide inventory it holds',
      'Longevity reduces the number of packages that must be managed',
    ],
  },
  {
    id: 'modular',
    title: 'Modular and smaller-reactor design',
    level: 'Design',
    impact: 46,
    summary: 'Reduce per-unit waste intensity through design choices.',
    actions: [
      'Compact cores and simpler coolant systems mean less activated structure',
      'Design for retrievability and component replacement from the start',
      'Smaller inventories are easier to characterise, package and eventually process',
    ],
  },
]

export const VOLUME_MIX = [
  { label: 'Contaminated metals & structural steel', share: 42, note: 'Highest-value recycling target' },
  { label: 'Concrete, rubble and shielding', share: 28, note: 'Decontaminable, then reusable as aggregate' },
  { label: 'Filters, resins and absorbents', share: 12, note: 'Compactable and incinerable' },
  { label: 'Coolants and process liquids', share: 11, note: 'Treated and largely recycled to process' },
  { label: 'Spent fuel assemblies', share: 7, note: 'Small share of volume, most of the activity' },
]

export const PUREX_STEPS = [
  {
    title: 'Chopping & dissolution',
    body: 'Assemblies are cut in a hot cell and the ceramic fuel dissolved in nitric acid. Cladding hulls and structural debris are separated for recycling.',
  },
  {
    title: 'Solvent extraction',
    body: 'An organic solvent — typically tributyl phosphate diluted in kerosene — selectively partitions uranium and plutonium away from fission products.',
  },
  {
    title: 'Uranium recovery',
    body: 'Uranyl nitrate is converted to uranium oxide powder and returned to the fuel cycle for re-enrichment.',
  },
  {
    title: 'Plutonium recovery',
    body: 'Further extraction and reduction yield plutonium dioxide for mixed oxide fuel or for fast reactor use.',
  },
  {
    title: 'Vitrification',
    body: 'Concentrated fission-product liquor is fed to a melter and immobilised in glass for storage or disposal.',
  },
  {
    title: 'Secondary waste treatment',
    body: 'Solvent is recycled, hulls are smelted for cladding reuse, and off-gas is filtered before release under licence.',
  },
]

export const BY_PRODUCTS: ByProduct[] = [
  {
    id: 'steel',
    stream: 'Contaminated structural steel, cladding hulls, liner plates',
    product: 'Cleared recycled steel for reuse in industry',
    maturity: 'Demonstrated',
    benefit:
      'Carbon and stainless steel dominate the mass of most decommissioning waste. Decontamination plus smelting returns it as ordinary product.',
    process:
      'Mechanical surface removal or chemical decontamination → induction or electric-arc smelting → radiological assay → release certification.',
    caveat:
      'Blending to meet clearance limits is standard practice; the recycled material is measured, not assumed.',
    share: 46,
    unit: 't',
    color: '#38f0ff',
  },
  {
    id: 'zircaloy',
    stream: 'Fuel cladding hulls and zircaloy structural components',
    product: 'Zirconium alloy recycled back into cladding manufacture',
    maturity: 'Demonstrated',
    benefit:
      'Zircaloy is a high-value, low-abundance alloy. Metallic waste streams from PUREX hulls can be re-alloyed for new cladding.',
    process:
      'Hull decontamination and sorting → vacuum or argon remelting → alloy composition check → fabrication of new components.',
    caveat:
      'Hull recycling economics depend on facility throughput and on market demand for the recovered alloy.',
    share: 12,
    unit: 't',
    color: '#7c5cff',
  },
  {
    id: 'swarf',
    stream: 'Used cutting oil and metal-working fluids from decommissioning',
    product: 'Recovered base oil for industrial reuse',
    maturity: 'Commercial',
    benefit:
      'Cutting fluids are ordinary hydrocarbons that happen to be in a controlled area. Physically removing entrained metal particles returns usable oil.',
    process:
      'Coalescing and filtration → centrifuge or membrane de-oiling of swarf → water content control → return to the lubricant supply chain.',
    caveat:
      'Contamination must be verified below the relevant clearance threshold before the oil is released for general use.',
    share: 8,
    unit: 'kL',
    color: '#b6ff3d',
  },
  {
    id: 'plasma',
    stream: 'Contaminated consumables: filters, gloves, absorbents, plastics',
    product: 'Syngas and vitrified residue; metals recovered',
    maturity: 'Demonstrated',
    benefit:
      'Plasma pyrolysis handles mixed, high-moisture waste that incineration struggles with, driving off hydrogen and fluorine for treatment.',
    process:
      'Sorting → thermal treatment → off-gas quench and scrubbing → syngas or vitrified residue → metals recovery from residue.',
    caveat:
      'Off-gas treatment is essential; fluorine-bearing plastics require dedicated scrubbing.',
    share: 7,
    unit: 't',
    color: '#ffd166',
  },
  {
    id: 'concrete',
    stream: 'Contaminated concrete rubble and shielding blocks',
    product: 'Processed aggregate for non-nuclear construction',
    maturity: 'Demonstrated',
    benefit:
      'Concrete is the largest volume stream in most decommissioning projects. Decontamination can return it as general fill or aggregate.',
    process:
      'Surface scabbling or diamond wire cutting → aggregate sorting → washing and assay → release determination by activity index.',
    caveat:
      'Concrete that cannot be decontaminated below clearance levels goes to disposal as low-level waste instead.',
    share: 19,
    unit: 't',
    color: '#ff5c7a',
  },
  {
    id: 'reagents',
    stream: 'Spent process reagents, acids and organic solvents from reprocessing',
    product: 'Recovered nitric acid and solvent, re-usable reagents',
    maturity: 'Research',
    benefit:
      'Reprocessing consumes large volumes of nitric acid and solvent. Regeneration cuts both cost and secondary waste at source.',
    process:
      'Solvent recovery by distillation → acid regeneration → catalytic destruction of residual organics → recycle to the process.',
    caveat:
      'Contamination by fission products makes full regeneration difficult; research targets partial reuse with clean recycle loops.',
    share: 8,
    unit: 'kL',
    color: '#9df7ff',
  },
]

export const RECYCLE_CARDS = [
  {
    title: 'Metal recycling',
    body: 'Decontamination and smelting recover steel, stainless, zircaloy, copper and aluminium from structural waste, liners and hulls.',
    tag: 'Highest volume saving',
  },
  {
    title: 'Fuel cycle metals',
    body: 'Uranium and plutonium are chemically separated and returned as fuel material. This is the only process that recycles the fuel itself.',
    tag: 'Closed fuel cycle',
  },
  {
    title: 'Non-metallic reuse',
    body: 'Ceramic insulators, refractory bricks and shielding concrete are decontaminated and reused where their activity index allows.',
    tag: 'Concrete and ceramics',
  },
  {
    title: 'Process fluid recovery',
    body: 'Used lubricants, cutting oils and solvents are filtered and regenerated for industrial reuse rather than incineration.',
    tag: 'Hydrocarbons and solvents',
  },
  {
    title: 'Filter media reuse',
    body: 'Filters and ion exchange resins are regenerated where the radionuclide load permits, or compacted to reduce disposal volume.',
    tag: 'Ion exchange media',
  },
  {
    title: 'Certified release',
    body: 'Measured material below clearance levels is released to ordinary commerce under formal regulatory case and documentation.',
    tag: 'Regulatory pathway',
  },
]

export const SOURCES_DATA: Source[] = [
  { label: 'Decommissioning concrete & steel', volume: 92, note: 'Largest mass; long-term low-level inventory' },
  { label: 'Operational resins & filters', volume: 54, note: 'Regular replacement, high specific activity' },
  { label: 'Spent fuel assemblies', volume: 21, note: 'Small volume, almost all the heat and long-term dose' },
  { label: 'Coolants & process waters', volume: 47, note: 'Continuous streams, treated before release' },
  { label: 'Cladding hulls', volume: 18, note: 'Recoverable metal, some bound fission products' },
  { label: 'Medical & research streams', volume: 4, note: 'Tiny volume, short half-lives, frequent dispatch' },
  { label: 'Industrial & sealed sources', volume: 6, note: 'Am-241, Ra-226, industrial radiography sources' },
  { label: 'Legacy defence material', volume: 12, note: 'Long-lived alpha, weapons origin' },
]

export const IMPACT_LISTS = {
  hazards: [
    {
      title: 'Ionising radiation',
      body: 'Alpha, beta, gamma and neutron emission damages cells at sufficient dose. Alpha is the dominant risk when inhaled, which drives containment rather than shielding.',
    },
    {
      title: 'Long persistence',
      body: 'Long-lived isotopes remain an obligation far beyond a human lifetime, which is why interim storage is designed for centuries rather than years.',
    },
    {
      title: 'Water and soil pathways',
      body: 'Leakage into aquifers is the principal route of chronic exposure at a disposal site, hence multi-barrier containment and long-term groundwater monitoring.',
    },
    {
      title: 'Ecological and land burden',
      body: 'Facilities occupy land, impose exclusion zones and constrain local resource use. These are real costs even where radiological dose is very small.',
    },
    {
      title: 'Accident pathways',
      body: 'The Chernobyl and Fukushima releases raised public dose measurably. They are the reason for modern safety culture — not a description of routine licensed disposal, which releases nothing by design.',
    },
  ],
  controls: [
    {
      title: 'Dilution',
      body: 'Much industrial hazard is managed by controlled dispersion into air or water, within strict activity and concentration limits.',
    },
    {
      title: 'Containment',
      body: 'Sealed sources, engineered containment and remote handling keep dose to workers and the public below regulated limits.',
    },
    {
      title: 'Institutional control',
      body: 'Licensing, inspection, safeguards and independent monitoring maintain accountability across generations of facility staff.',
    },
  ],
}

export const FUTURE_TECH: FutureTech[] = [
  {
    id: 'transmutation',
    name: 'Fast-neutron transmutation',
    maturity: 'rd',
    readiness: 45,
    summary: 'Use fast reactors or accelerators to fission long-lived actinides instead of storing them.',
    detail: [
      'Plutonium, americium and curium are fissioned, converting long-lived waste into short-lived fission products.',
      'Reduces both long-term heat load and the inventory of material needing deep disposal.',
      'Requires dedicated facilities and does not eliminate the need for geological disposal — it reduces its burden.',
      'Demonstrated at pilot scale; commercial deployment depends on fast reactor build-out.',
    ],
    horizon: 'Contributes most if deployed from the 2050s onward',
  },
  {
    id: 'partitioning',
    name: 'Advanced partitioning & separation',
    maturity: 'rd',
    readiness: 52,
    summary: 'Selective separation so minor actinides are handled apart from the main waste stream.',
    detail: [
      'GANEX and COEX flows co-extract actinides and lanthanides, cutting plant size and secondary waste.',
      'Minor actinide streams can then be directed to transmutation while bulk fission products go straight to vitrification.',
      'Smaller, simpler flows also reduce solvent inventory and criticality constraints.',
    ],
    horizon: 'Near-term deployment alongside new reprocessing plants',
  },
  {
    id: 'waste-to-heat',
    name: 'Waste-to-heat & isotope power',
    maturity: 'demo',
    readiness: 58,
    summary: 'Use decay heat and specific isotopes to provide useful heat or electricity.',
    detail: [
      'Strontium-90 and plutonium-238 have been used as heat sources in remote, off-grid installations.',
      'Radioisotope thermoelectric generators have powered spacecraft and remote monitoring stations for decades.',
      'Modern proposals target continuous waste-to-heat for remote Arctic communities and industrial process heat.',
      'Economics are currently the limiting factor; volume of usable heat per unit of material is low.',
    ],
    horizon: 'Demonstrated niche applications, uncertain economics',
  },
  {
    id: 'geo',
    name: 'Enhanced geology & in-situ monitoring',
    maturity: 'comm',
    readiness: 78,
    summary: 'Use the host rock itself as the engineered barrier.',
    detail: [
      'Bentonite swells to seal voids and chemically conditions groundwater at the canister surface.',
      'Disposal galleries can be designed as self-sealing, so the site becomes more stable over time.',
      'Fiber-optic and geochemical sensors track temperature, pressure and radionuclide migration in real time.',
    ],
    horizon: 'Standard practice in current repository designs',
  },
  {
    id: 'clearing',
    name: 'Advanced clearance & partitioning',
    maturity: 'demo',
    readiness: 62,
    summary: 'Reduce waste volume at the point of generation using accurate measurement.',
    detail: [
      'In-process assay and continuous activity monitoring allow real-time decisions on what is genuinely waste.',
      'Segregating clean bulk before it is contaminated prevents material ever entering a waste stream.',
      'Machine-vision and laser-based systems can sort and assay large concrete volumes for decontamination.',
    ],
    horizon: 'Deployed at multiple sites; capabilities still improving',
  },
  {
    id: 'robotic',
    name: 'Robotics & remote handling',
    maturity: 'comm',
    readiness: 74,
    summary: 'Automate the most hazardous decommissioning tasks.',
    detail: [
      'Robotic crawlers size, cut and package concrete in high-radiation environments without exposing anyone.',
      'Machine vision and force feedback handle geometry that is difficult to predict in a decommissioned building.',
      'Reduces worker dose to near zero for the highest-exposure tasks and makes operations economically viable.',
    ],
    horizon: 'Commercial and increasingly standard',
  },
  {
    id: 'synthetic',
    name: 'Synthetic natural gas from waste',
    maturity: 'lab',
    readiness: 22,
    summary: 'Convert polymer waste into usable fuel gas rather than incinerating it.',
    detail: [
      'Plasma and supercritical water oxidation turn plastics and absorbents into hydrogen and carbon monoxide.',
      'The syngas can be cleaned and used, replacing the natural gas currently burned in incineration.',
      'Fluorine and chlorine in the plastics require dedicated off-gas scrubbing to protect the environment and equipment.',
    ],
    horizon: 'Laboratory scale, pilot demonstration needed',
  },
  {
    id: 'canisters',
    name: 'Novel canister materials',
    maturity: 'rd',
    readiness: 50,
    summary: 'Containers designed to outlast the radioactivity they hold.',
    detail: [
      'Copper-nickel and stainless steels are matched to the specific groundwater chemistry of the host rock.',
      'Coating and cladding techniques delay corrosion onset, pushing canister lifetime beyond the required containment period.',
      'Each material is qualified for the nuclide inventory and thermal load it must carry.',
    ],
    horizon: 'Qualified for near-term repository programmes',
  },
  {
    id: 'wide',
    name: 'Waste-minimising reactor designs',
    maturity: 'rd',
    readiness: 41,
    summary: 'Design reactors around what happens to their fuel afterwards.',
    detail: [
      'Modular designs minimise activated structure and simplify segmentation for decommissioning.',
      'Retrievable storage and reversible assembly designs keep future options open.',
      'Design-for-disassembly reduces the cost and dose of the eventual cleanup campaign.',
    ],
    horizon: 'Emerging design doctrine, entering licensing practice',
  },
]

export const REFERENCES: Reference[] = [
  {
    body: 'International Atomic Energy Agency',
    title: 'IAEA Nuclear Safety Standards — radioactive waste management (Safety Series)',
    locator: 'iaea.org · NS-G series',
    note: 'Primary international standards for classification, handling and disposal.',
  },
  {
    body: 'IAEA',
    title: 'Safe Transport of Radioactive Material (SSR-6)',
    locator: 'iaea.org/publications',
    note: 'The international regulations governing package design and shipment.',
  },
  {
    body: 'IAEA / OECD NEA',
    title: 'Status and Trends in Spent Fuel and Radioactive Waste Management',
    locator: 'oecd-nea.org',
    note: 'Annual technical report on inventories, storage and disposal programmes.',
  },
  {
    body: 'Posiva Oy (Finland)',
    title: 'ONKALO Final Operational Safety Case',
    locator: 'posiva.fi',
    note: 'The most complete public safety case for a spent fuel repository.',
  },
  {
    body: 'SKB (Sweden)',
    title: 'Forsmark repository programme — safety assessment',
    locator: 'skb.com',
    note: 'Detailed engineering and safety analysis for a granite-hosted repository.',
  },
  {
    body: 'US Department of Energy',
    title: 'Waste Isolation Pilot Plant (WIPP) — transuranic waste disposal',
    locator: 'energy.gov/wipp',
    note: 'A long-running operational demonstration of deep salt-bed disposal.',
  },
  {
    body: 'UNSCEAR',
    title: 'Sources, Effects and Risks of Ionising Radiation',
    locator: 'unscear.org',
    note: 'The UN scientific authority on radiation levels and health effects.',
  },
  {
    body: 'US NRC',
    title: 'Backgrounder on nuclear waste management and disposal',
    locator: 'nrc.gov',
    note: 'Accessible regulator overview of US policy and repository siting.',
  },
  {
    body: 'World Nuclear Association',
    title: 'Nuclear Fuel Cycle Overview',
    locator: 'world-nuclear.org',
    note: 'Concise reference on mining, enrichment, fuel use, reprocessing and waste.',
  },
  {
    body: 'National regulators',
    title: 'ASME, NUREG / ONR, and national equivalents',
    locator: 'nrc.gov · asme.org',
    note: 'Technical standards for fuel handling, storage and package design.',
  },
]

export const SAFETY_POINTS = [
  'Nuclear waste handling, treatment, transport and storage must be performed only by qualified, licensed professionals within authorised, regulator-approved facilities.',
  'Radiological work requires formal qualification, radiation protection training, dosimetry, and a site-specific radiation protection plan.',
  'Legal frameworks differ by country. Classification schemes, transport rules and disposal requirements must be confirmed with the responsible national regulator.',
  'Figures on this page are illustrative teaching summaries drawn from public sources and rounded for clarity. They are not suitable for engineering, design, compliance or procurement decisions.',
  'Material described as recyclable or recoverable remains fully subject to radiological clearance rules. Being useful does not exempt a material from regulation.',
  'In an emergency involving suspected radioactive material, follow your national emergency authority guidance. Do not attempt to handle or isolate the material yourself.',
]
