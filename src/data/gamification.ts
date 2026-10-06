/**
 * Central gamification catalog: points rules, badges, learning modules and
 * the demo leaderboard. Everything here is DATA ONLY — no React, no storage.
 *
 * To plug in a real backend later, keep these shapes and replace the fetchers
 * in src/lib/progress.ts with API calls.
 */

export type TopicId =
  | 'basics'
  | 'waste-types'
  | 'management-journey'
  | 'environmental-impact'
  | 'safe-handling'
  | 'recovery-concepts'
  | 'long-term-disposal'
  | 'future-technologies'
  | 'quiz'
  | 'simulator'
  | 'model3d'

export type TopicStatus = 'locked' | 'available' | 'completed'

export interface Topic {
  id: TopicId
  title: string
  emoji: string
  to: string
  blurb: string
  /** Points awarded the first time the topic is completed. */
  points: number
  /** Topic ids that must be completed before this one unlocks. */
  requires: TopicId[]
  /** Module group used by the dashboard's progress ring. */
  group: 'learn' | 'practice' | 'mastery'
}

/* ------------------------------------------------------------------ *
 * Points rules (environmental education points, "EEP")
 * ------------------------------------------------------------------ */
export const POINT_RULES = {
  /** Reading an article / finishing a topic page. */
  article: 10,
  /** Completing a learning module in full. */
  module: 15,
  /** Completing the quiz (any passing attempt). */
  quiz: 20,
  /** Running the management simulator to the end. */
  simulator: 30,
  /** Perfect quiz attempt — bonus on top of the quiz points. */
  quizPerfect: 25,
} as const

/* ------------------------------------------------------------------ *
 * Learning modules
 * ------------------------------------------------------------------ */
export const TOPICS: Topic[] = [
  {
    id: 'basics',
    title: 'Nuclear Waste Basics',
    emoji: '⚛️',
    to: '/fundamentals',
    blurb: 'What radioactive waste is, how decay and half-life work, why dose depends on pathway.',
    points: POINT_RULES.module,
    requires: [],
    group: 'learn',
  },
  {
    id: 'waste-types',
    title: 'Waste Types',
    emoji: '🗂️',
    to: '/types',
    blurb: 'The six classification classes from very-low level through heat-generating spent fuel.',
    points: POINT_RULES.module,
    requires: ['basics'],
    group: 'learn',
  },
  {
    id: 'management-journey',
    title: 'Management Journey',
    emoji: '🗺️',
    to: '/cycle',
    blurb: 'The seven-stage cycle from in-reactor irradiation to deep geological disposal.',
    points: POINT_RULES.module,
    requires: ['waste-types'],
    group: 'learn',
  },
  {
    id: 'environmental-impact',
    title: 'Environmental Impact',
    emoji: '🌍',
    to: '/origins',
    blurb: 'Where radiological consequences actually come from and how licensed practice controls them.',
    points: POINT_RULES.module,
    requires: ['basics'],
    group: 'learn',
  },
  {
    id: 'safe-handling',
    title: 'Safe Handling',
    emoji: '🛡️',
    to: '/handling',
    blurb: 'Collection, treatment, transportation and storage — the four pillars of practice.',
    points: POINT_RULES.module,
    requires: ['waste-types', 'environmental-impact'],
    group: 'learn',
  },
  {
    id: 'recovery-concepts',
    title: 'Advanced Recovery Concepts',
    emoji: '♻️',
    to: '/solutions',
    blurb: 'Minimisation, advanced reprocessing, recycling and industrial by-product recovery.',
    points: POINT_RULES.module,
    requires: ['safe-handling', 'management-journey'],
    group: 'mastery',
  },
  {
    id: 'long-term-disposal',
    title: 'Long-Term Disposal',
    emoji: '🕳️',
    to: '/disposal',
    blurb: 'Deep geological repositories, the multi-barrier system and interim storage.',
    points: POINT_RULES.module,
    requires: ['safe-handling'],
    group: 'mastery',
  },
  {
    id: 'future-technologies',
    title: 'Future Technologies',
    emoji: '🚀',
    to: '/future',
    blurb: 'Research-stage approaches: transmutation, advanced separation, robotics, waste-to-heat.',
    points: POINT_RULES.module,
    requires: ['recovery-concepts'],
    group: 'mastery',
  },
  {
    id: 'model3d',
    title: '3D Waste Model',
    emoji: '🧊',
    to: '/model3d',
    blurb: 'An interactive 3D cutaway of a deep geological repository and its barrier layers.',
    points: POINT_RULES.article,
    requires: ['management-journey'],
    group: 'practice',
  },
  {
    id: 'simulator',
    title: 'Management Simulator',
    emoji: '⚙️',
    to: '/simulator',
    blurb: 'Run a repository: cool, package, store and dispose before heat or dose escapes.',
    points: POINT_RULES.simulator,
    requires: ['management-journey', 'safe-handling'],
    group: 'practice',
  },
  {
    id: 'quiz',
    title: 'Environmental Education Quiz',
    emoji: '🧠',
    to: '/quiz',
    blurb: 'Twelve multiple-choice and true/false questions with explanations after each answer.',
    points: POINT_RULES.quiz,
    requires: ['basics', 'waste-types'],
    group: 'mastery',
  },
]

/* ------------------------------------------------------------------ *
 * Badges
 * ------------------------------------------------------------------ */
export type BadgeId =
  | 'environment-explorer'
  | 'radiation-awareness'
  | 'waste-management-champion'
  | 'nuclear-safety-scholar'
  | 'perfect-quiz'
  | 'simulator-operator'
  | 'completionist'

export interface Badge {
  id: BadgeId
  emoji: string
  name: string
  description: string
  /** Points threshold. Satisfied when `points >= threshold`. */
  threshold?: number
  /** Completed topics required. Satisfied when every listed topic is complete. */
  topics?: TopicId[]
  /** Badge awarded when both a points threshold and topic list are met. */
  all?: boolean
}

export const BADGES: Badge[] = [
  {
    id: 'environment-explorer',
    emoji: '🌱',
    name: 'Environment Explorer',
    description: 'Earn 100 environmental education points by working through the material.',
    threshold: 100,
  },
  {
    id: 'radiation-awareness',
    emoji: '☢️',
    name: 'Radiation Awareness Learner',
    description:
      'Complete Nuclear Waste Basics, Waste Types and Environmental Impact — the core radiation literacy set.',
    topics: ['basics', 'waste-types', 'environmental-impact'],
  },
  {
    id: 'waste-management-champion',
    emoji: '♻️',
    name: 'Waste Management Champion',
    description: 'Complete the Management Journey module and finish the management simulator.',
    topics: ['management-journey', 'simulator'],
  },
  {
    id: 'nuclear-safety-scholar',
    emoji: '🏆',
    name: 'Nuclear Safety Scholar',
    description: 'Score 80% or better on the Environmental Education Quiz.',
    topics: ['quiz'],
  },
  {
    id: 'perfect-quiz',
    emoji: '💯',
    name: 'Perfect Quiz Run',
    description: 'Answer every single question correctly on one attempt.',
    threshold: POINT_RULES.quizPerfect,
    topics: ['quiz'],
    all: true,
  },
  {
    id: 'simulator-operator',
    emoji: '⚙️',
    name: 'Repository Operator',
    description: 'Complete the simulator with a score of 300 points or more.',
    threshold: 300,
    topics: ['simulator'],
    all: true,
  },
  {
    id: 'completionist',
    emoji: '🎓',
    name: 'Environmental Studies Graduate',
    description: 'Complete every learning module on the site.',
    topics: [
      'basics',
      'waste-types',
      'management-journey',
      'environmental-impact',
      'safe-handling',
      'recovery-concepts',
      'long-term-disposal',
      'future-technologies',
      'model3d',
      'simulator',
      'quiz',
    ],
  },
]

/* ------------------------------------------------------------------ *
 * Demo leaderboard — clearly fictional users for a class-project demo.
 * ------------------------------------------------------------------ */
export interface LeaderRow {
  name: string
  handle: string
  points: number
  quizPct: number
  modules: number
  badge: string
  isDemo: boolean
}

export const LEADERBOARD_DEMO: LeaderRow[] = [
  { name: 'A. Okonkwo', handle: 'demo-student-1', points: 480, quizPct: 100, modules: 11, badge: '🎓', isDemo: true },
  { name: 'M. Haddad', handle: 'demo-student-2', points: 415, quizPct: 92, modules: 10, badge: '🏆', isDemo: true },
  { name: 'S. Lindqvist', handle: 'demo-student-3', points: 355, quizPct: 83, modules: 9, badge: '♻️', isDemo: true },
  { name: 'R. Patel', handle: 'demo-student-4', points: 300, quizPct: 75, modules: 8, badge: '☢️', isDemo: true },
  { name: 'T. Nakamura', handle: 'demo-student-5', points: 245, quizPct: 67, modules: 7, badge: '🌱', isDemo: true },
  { name: 'L. Moreau', handle: 'demo-student-6', points: 160, quizPct: 58, modules: 5, badge: '🌱', isDemo: true },
]

/** Points that a single run of the quiz can earn, used for progress maths. */
export const MAX_QUIZ_POINTS = POINT_RULES.quiz + POINT_RULES.quizPerfect

/** Total points obtainable across every module and activity. */
export const MAX_TOTAL_POINTS =
  TOPICS.reduce((sum, t) => sum + t.points, 0) + POINT_RULES.quizPerfect

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

/** A topic is unlocked when every topic it requires is already completed. */
export function isUnlocked(topic: Topic, completed: readonly TopicId[]): boolean {
  return topic.requires.every((r) => completed.includes(r))
}

export function topicStatus(topic: Topic, completed: readonly TopicId[]): TopicStatus {
  if (completed.includes(topic.id)) return 'completed'
  return isUnlocked(topic, completed) ? 'available' : 'locked'
}
