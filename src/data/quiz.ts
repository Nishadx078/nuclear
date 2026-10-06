/**
 * Question bank for the Environmental Education Quiz.
 * Types: 'mcq' = multiple choice, 'tf' = true/false.
 * To add questions, append to the array — progress maths is derived, not hard-coded.
 */

export type QuestionKind = 'mcq' | 'tf'

export interface Question {
  id: string
  kind: QuestionKind
  question: string
  options: string[]
  /** Index into `options`. For 'tf', 0 = True, 1 = False. */
  answer: number
  /** Shown after the learner answers, whether right or wrong. */
  explanation: string
  topic: string
}

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 'q1',
    kind: 'mcq',
    topic: 'Waste management goals',
    question: 'What is an important goal of radioactive waste management?',
    options: [
      'Reduce environmental exposure',
      'Dump waste in rivers',
      'Burn waste in open air',
      'Mix waste with household garbage',
    ],
    answer: 0,
    explanation:
      'The entire purpose of waste management is to keep radiation dose to people and the environment as low as reasonably achievable. Every step — classification, conditioning, containment and disposal — exists to reduce exposure along all pathways.',
  },
  {
    id: 'q2',
    kind: 'tf',
    topic: 'Half-life',
    question: 'Radioactive waste remains equally radioactive forever.',
    options: ['True', 'False'],
    answer: 1,
    explanation:
      'False. Radioactive material decays at a fixed, predictable rate: activity halves every half-life. After ten half-lives a sample has fallen to roughly 0.1% of its original activity, which is the arithmetic behind decay storage before disposal.',
  },
  {
    id: 'q3',
    kind: 'mcq',
    topic: 'Waste classification',
    question: 'Which of these is a recognised classification of nuclear waste?',
    options: [
      'Low level waste',
      'Domestic organic waste',
      'Electronic device waste',
      'Construction and demolition waste',
    ],
    answer: 0,
    explanation:
      'Low level waste is one of the standard classes. Nuclear waste is typically categorised by activity and heat generation into very low level, low level, intermediate level and high level waste.',
  },
  {
    id: 'q4',
    kind: 'tf',
    topic: 'Environmental impact',
    question:
      'With proper management, controlled disposal is designed to release no radioactivity at all.',
    options: ['True', 'False'],
    answer: 0,
    explanation:
      'True. Engineered disposal relies on multiple independent barriers — waste form, canister, buffer clay, backfill and host rock — specifically so that nothing is released during normal operation and very little over geological time.',
  },
  {
    id: 'q5',
    kind: 'mcq',
    topic: 'Spent fuel handling',
    question: 'Where does spent fuel go immediately after leaving the reactor?',
    options: [
      'A wet storage pool for cooling',
      'An open-air cooling tower',
      'Straight to a deep geological repository',
      'A commercial shipping container',
    ],
    answer: 0,
    explanation:
      'Freshly discharged fuel is intensely hot and highly radioactive, so it goes into a deep water pool where the water both removes decay heat and shields staff. After roughly 5–10 years it moves to passive dry cask storage.',
  },
  {
    id: 'q6',
    kind: 'mcq',
    topic: 'Treatment principles',
    question: 'Which of the following is the PRIMARY goal of waste treatment?',
    options: [
      'Reduce volume and immobilise activity',
      'Increase the radioactivity of the waste',
      'Store all waste permanently on site',
      'Dilute waste into the surrounding soil',
    ],
    answer: 0,
    explanation:
      'Treatment does two things: it removes and concentrates activity so the bulk material becomes smaller, and it locks what remains into a stable matrix like glass or cement. Volume reduction and immobilisation are the paired objectives.',
  },
  {
    id: 'q7',
    kind: 'tf',
    topic: 'Transport',
    question:
      'Radioactive waste can only be transported by specially licensed vehicles using certified packaging.',
    options: ['True', 'False'],
    answer: 0,
    explanation:
      'True. Packages must pass drop, fire, immersion and stacking tests before use, and carriers are licensed with agreed routes and tracked inventories. Transport of high-activity material is heavily regulated worldwide.',
  },
  {
    id: 'q8',
    kind: 'mcq',
    topic: 'Reprocessing',
    question: 'What does the PUREX process recover from spent nuclear fuel?',
    options: [
      'Uranium and plutonium',
      'Only water and steam',
      'Concrete and steel',
      'Nothing — it destroys all material',
    ],
    answer: 0,
    explanation:
      'PUREX uses solvent extraction to partition uranium and plutonium from fission products. The uranium returns to the fuel cycle; plutonium can become mixed oxide fuel. Only the fission products and minor residues need long-term isolation.',
  },
  {
    id: 'q9',
    kind: 'tf',
    topic: 'Waste minimisation',
    question:
      'Recycling contaminated metals from decommissioning can reduce the volume of nuclear waste.',
    options: ['True', 'False'],
    answer: 0,
    explanation:
      'True. Metals dominate the mass of most decommissioning waste. Decontamination plus smelting returns clean steel, stainless, zircaloy and copper to industry under formal clearance, cutting low-level disposal volume substantially.',
  },
  {
    id: 'q10',
    kind: 'mcq',
    topic: 'Long-term disposal',
    question: 'What is a Deep Geological Repository?',
    options: [
      'A facility built deep underground to isolate waste for geological time',
      'A surface warehouse near a river',
      'A landfill for household waste',
      'A rocket used to launch waste into space',
    ],
    answer: 0,
    explanation:
      'Disposal places waste hundreds of metres below ground in stable rock, behind multiple engineered barriers, so that safety no longer depends on human institutions after closure.',
  },
  {
    id: 'q11',
    kind: 'tf',
    topic: 'Radiation basics',
    question:
      'Radioactive waste must always be extremely dangerous — every radioactive item poses the same level of risk.',
    options: ['True', 'False'],
    answer: 1,
    explanation:
      'False. Hazard depends on the specific isotope, its activity, its half-life and the pathway to people. A smoke detector source and a spent fuel assembly are both radioactive but orders of magnitude apart in risk.',
  },
  {
    id: 'q12',
    kind: 'mcq',
    topic: 'Future technologies',
    question: 'Which future approach aims to destroy long-lived actinides rather than store them?',
    options: [
      'Fast-neutron transmutation',
      'Open-air incineration',
      'Dilution into ocean water',
      'Surface burial in shallow trenches',
    ],
    answer: 0,
    explanation:
      'Transmutation uses fast neutrons in a reactor or accelerator-driven system to fission long-lived actinides, converting them into shorter-lived fission products. It reduces the burden on a repository but does not remove the need for one.',
  },
]

export const QUIZ_PASS_PCT = 80
