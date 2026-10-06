export interface NavChild {
  to: string
  label: string
  num: string
  desc: string
}

export interface NavGroup {
  id: string
  label: string
  /** Route used when clicking the group label itself. */
  to: string
  children: NavChild[]
}

export const BRAND = {
  title: 'Nuclear Waste',
  subtitle: 'Sustainable Solutions',
} as const

export const NAV_GROUPS: NavGroup[] = [
  {
    id: 'overview',
    label: 'Overview',
    to: '/',
    children: [
      {
        to: '/',
        label: 'Home',
        num: '00',
        desc: 'What this site covers and where to start',
      },
      {
        to: '/fundamentals',
        label: 'What It Is',
        num: '01',
        desc: 'Radioactivity, half-lives and dose pathways',
      },
      {
        to: '/types',
        label: 'Waste Types',
        num: '02',
        desc: 'The six main classification classes',
      },
    ],
  },
  {
    id: 'origins',
    label: 'Origins & Impact',
    to: '/origins',
    children: [
      {
        to: '/origins',
        label: 'Sources',
        num: '03',
        desc: 'Which facilities produce which streams',
      },
      {
        to: '/origins',
        label: 'Environmental Impact',
        num: '04',
        desc: 'Health, ecology and how risk is controlled',
      },
    ],
  },
  {
    id: 'practice',
    label: 'Management',
    to: '/cycle',
    children: [
      {
        to: '/cycle',
        label: 'The Cycle',
        num: '05',
        desc: 'Interactive diagram from reactor to disposal',
      },
      {
        to: '/handling',
        label: 'Safe Handling',
        num: '06',
        desc: 'Collection, treatment, transport, storage',
      },
    ],
  },
  {
    id: 'solutions',
    label: 'Solutions',
    to: '/solutions',
    children: [
      {
        to: '/solutions#minimisation',
        label: 'Minimisation',
        num: '07',
        desc: 'Reducing waste before it is created',
      },
      {
        to: '/solutions#reprocessing',
        label: 'Reprocessing & Recycling',
        num: '08',
        desc: 'PUREX, the closed fuel cycle, metals',
      },
      {
        to: '/solutions#byproducts',
        label: 'By-Products',
        num: '09',
        desc: 'Residues recovered as useful feedstocks',
      },
      {
        to: '/disposal',
        label: 'Long-Term Disposal',
        num: '10',
        desc: 'Geological repositories and multi-barrier design',
      },
    ],
  },
  {
    id: 'future',
    label: 'Future Tech',
    to: '/future',
    children: [
      {
        to: '/future',
        label: 'Research Frontier',
        num: '11',
        desc: 'Research-stage approaches and their maturity',
      },
    ],
  },
  {
    id: 'interactive',
    label: 'Practice',
    to: '/quiz',
    children: [
      {
        to: '/quiz',
        label: 'Education Quiz',
        num: '12',
        desc: '12 questions with explanations and scoring',
      },
      {
        to: '/simulator',
        label: 'Management Simulator',
        num: '13',
        desc: 'Run a repository for eight days',
      },
      {
        to: '/model3d',
        label: '3D Waste Model',
        num: '14',
        desc: 'Interactive deep repository cutaway',
      },
      {
        to: '/dashboard',
        label: 'Learning Dashboard',
        num: '15',
        desc: 'Points, badges and class standings',
      },
    ],
  },
]

export const STANDALONE_LINKS: NavChild[] = [
  { to: '/safety', label: 'Safety & Sources', num: '16–17', desc: 'Disclaimer and references' },
]

export const FOOTER_LINKS: NavChild[] = [
  ...NAV_GROUPS.flatMap((g) => g.children),
  ...STANDALONE_LINKS,
]
