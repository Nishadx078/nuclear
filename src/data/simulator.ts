/**
 * Management simulator scenario data.
 *
 * The simulator is a short turn-based card game: each day presents an event
 * with choices. Every choice carries deltas against three meters — heat,
 * containment risk and budget — plus points. Reaching day 8 ends the run and
 * the final score decides the outcome.
 *
 * Swap this array (and the shape of `SimEvent`) for live data later; the
 * simulator component only reads the types below.
 */

export interface SimChoice {
  label: string
  /** Positive = raises the meter, negative = lowers it. */
  heat: number
  risk: number
  budget: number
  points: number
  /** Feedback shown immediately after choosing. */
  feedback: string
  best?: boolean
}

export interface SimEvent {
  day: number
  title: string
  context: string
  icon: string
  choices: SimChoice[]
}

export const SIM_EVENTS: SimEvent[] = [
  {
    day: 1,
    title: 'Fresh spent fuel arrives',
    context:
      'A transport cask of spent fuel has reached the site pool. Decay heat is still high and cladding integrity must be verified before anything else.',
    icon: '🚛',
    choices: [
      {
        label: 'Spend time on full incoming inspection and characterisation',
        heat: 5,
        risk: -18,
        budget: -10,
        points: 140,
        best: true,
        feedback: 'Correct. Characterisation drives every downstream decision — cladding defects found now prevent a pool incident later.',
      },
      {
        label: 'Move it straight into the pool to save time',
        heat: 14,
        risk: 8,
        budget: 5,
        points: 45,
        feedback: 'Risky. Unverified assemblies may fail later in cooling, contaminating the pool water and forcing a shutdown.',
      },
      {
        label: 'Hold it on the cask until the pool is repacked',
        heat: 8,
        risk: -4,
        budget: -6,
        points: 75,
        feedback: 'Acceptable. Casks are not designed for long-term storage on site — the heat keeps rising while nothing removes it.',
      },
    ],
  },
  {
    day: 2,
    title: 'Decay heat rising in the pool',
    context:
      'Coolant temperature is climbing as short-lived isotopes decay. The operator has asked whether to increase water circulation now.',
    icon: '🌡️',
    choices: [
      {
        label: 'Increase circulation and check backup cooling capacity',
        heat: -20,
        risk: -10,
        budget: -6,
        points: 130,
        best: true,
        feedback: 'Right call. Heat removal is the single controlling factor in early storage — temperature drives cladding integrity.',
      },
      {
        label: 'Wait; the pool design has natural circulation',
        heat: 16,
        risk: 12,
        budget: 0,
        points: 40,
        feedback: 'Complacent. Passive design is a backup layer, not a licence to stop monitoring temperature.',
      },
      {
        label: 'Drain part of the pool to inspect the racks',
        heat: 30,
        risk: 25,
        budget: -15,
        points: 10,
        feedback: 'Dangerous. Losing water removes both shielding and cooling. Never reduce pool level with fuel inside.',
      },
    ],
  },
  {
    day: 3,
    title: 'Mixing low-level metal waste',
    context:
      'Decommissioning has produced 40 tonnes of mildly contaminated steel. Disposal volume will dominate this year’s budget.',
    icon: '🔩',
    choices: [
      {
        label: 'Decontaminate, melt and assay the metal for recycling',
        heat: 2,
        risk: -6,
        budget: -14,
        points: 150,
        best: true,
        feedback: 'Excellent. Metals dominate waste mass; melting with assay recovers a saleable product and cuts disposal volume hard.',
      },
      {
        label: 'Compaction only, then send everything to disposal',
        heat: 0,
        risk: 4,
        budget: -18,
        points: 60,
        feedback: 'Costly and wasteful. Compaction helps, but you throw away a recoverable resource and pay landfill fees twice over.',
      },
      {
        label: 'Leave it at the source until decommissioning ends',
        heat: 0,
        risk: 14,
        budget: -5,
        points: 35,
        feedback: 'Poor housekeeping. Segregating at the point of generation is the cheapest waste reduction available anywhere.',
      },
    ],
  },
  {
    day: 4,
    title: 'Ion exchange resin exhausted',
    context:
      'A reactor’s primary resin bed has reached capacity. It holds concentrated radionuclides but is only a fraction of site waste volume.',
    icon: '🧪',
    choices: [
      {
        label: 'Dewater, compact and condition the resin promptly',
        heat: 4,
        risk: -12,
        budget: -8,
        points: 135,
        best: true,
        feedback: 'Good practice. Dewatering cuts volume substantially, and conditioning in cement locks the activity into a stable form.',
      },
      {
        label: 'Leave the resin in place for a future campaign',
        heat: 6,
        risk: 16,
        budget: -4,
        points: 40,
        feedback: 'Waiting is not neutral. The resin keeps degrading and leaking activity into a stream that is harder to process later.',
      },
      {
        label: 'Discharge the regenerant to the treatment plant',
        heat: 0,
        risk: 6,
        budget: -3,
        points: 70,
        feedback: 'Partial credit. Liquid must go through treatment first — never straight to release, and the solid residue still needs conditioning.',
      },
    ],
  },
  {
    day: 5,
    title: 'Transport licence renewal',
    context:
      'A shipment of vitrified high-level waste canisters is scheduled. The packaging certificate is valid but the route review is pending.',
    icon: '🚂',
    choices: [
      {
        label: 'Complete route review, seal audit and emergency drill first',
        heat: 0,
        risk: -16,
        budget: -7,
        points: 145,
        best: true,
        feedback: 'Correct. Transport is a licensed operation: verified packaging, tracked inventory and rehearsed emergency response before departure.',
      },
      {
        label: 'Ship on schedule and file the paperwork afterwards',
        heat: 0,
        risk: 22,
        budget: 4,
        points: 20,
        feedback: 'Unacceptable. Shipping before the route review completes breaches the transport licence and risks regulatory action.',
      },
      {
        label: 'Postpone by three months to be safe',
        heat: 6,
        risk: -4,
        budget: -20,
        points: 80,
        feedback: 'Safe but expensive. Delay is a valid risk control, yet you hold inventory on site and absorb avoidable cost.',
      },
    ],
  },
  {
    day: 6,
    title: 'Interim storage transition',
    context:
      'Fuel in the pool has cooled for eight years. The dry cask farm has capacity, and the regulator wants a retrievability demonstration.',
    icon: '🗄️',
    choices: [
      {
        label: 'Transfer to passive dry casks and demonstrate retrieval',
        heat: -16,
        risk: -14,
        budget: -12,
        points: 155,
        best: true,
        feedback: 'Ideal. Dry casks run on natural convection with no power, and demonstrating retrievability keeps future options open.',
      },
      {
        label: 'Keep everything wet to avoid handling',
        heat: 10,
        risk: 8,
        budget: -16,
        points: 55,
        feedback: 'Pools need active cooling, pumps and staff. Extended wet storage converts a passive problem into an ongoing operational one.',
      },
      {
        label: 'Transfer to casks but seal the records indefinitely',
        heat: -8,
        risk: 10,
        budget: -8,
        points: 45,
        feedback: 'Half right on storage, wrong on records. Institutional control requires documentation that outlives the staff who wrote it.',
      },
    ],
  },
  {
    day: 7,
    title: 'Vitrification campaign',
    context:
      'Reprocessing liquor from a solvent extraction run is ready for immobilisation. Off-gas treatment has been flagged for maintenance.',
    icon: '♨️',
    choices: [
      {
        label: 'Service the melter off-gas filter, then vitrify',
        heat: -6,
        risk: -14,
        budget: -10,
        points: 150,
        best: true,
        feedback: 'Correct. Vitrification locks fission products in stable glass — but only if the melter’s off-gas filtration is intact during the run.',
      },
      {
        label: 'Run the melter with degraded filtration',
        heat: 8,
        risk: 24,
        budget: 6,
        points: 25,
        feedback: 'Serious error. Melter off-gas carries iodine and particulates; degraded filters can release activity straight to the stack.',
      },
      {
        label: 'Store the liquor in tanks another year',
        heat: 12,
        risk: 15,
        budget: -12,
        points: 50,
        feedback: 'Liquids are the least stable waste form. Holding them increases corrosion risk and keeps activity mobile in tanks.',
      },
    ],
  },
  {
    day: 8,
    title: 'Repository emplacement decision',
    context:
      'The deep repository is open. You must place a canister today. Buffer material, canister inspection and tunnel sealing are all on the critical path.',
    icon: '🕳️',
    choices: [
      {
        label: 'Inspect canister, seat the bentonite buffer, seal the gallery',
        heat: -4,
        risk: -20,
        budget: -14,
        points: 170,
        best: true,
        feedback: 'Correct closure of the cycle. Multiple independent barriers — form, buffer, canister, backfill, rock — only work if each is verified in place.',
      },
      {
        label: 'Emplace the canister and backfill with ordinary soil',
        heat: -4,
        risk: 26,
        budget: -6,
        points: 30,
        feedback: 'Wrong material. Plain soil will not swell to seal voids or condition groundwater — the buffer does a job soil cannot.',
      },
      {
        label: 'Hold the canister in the tunnel until tomorrow',
        heat: 10,
        risk: 18,
        budget: -4,
        points: 60,
        feedback: 'Delay buys nothing. The tunnel is the most exposed environment on site; emplace and seal while conditions are verified.',
      },
    ],
  },
]

export const SIM_TOTAL_DAYS = SIM_EVENTS.length

/** Score bands used to classify the final run. */
export const SIM_BANDS = {
  minSuccess: 950,
  minPartial: 700,
} as const
