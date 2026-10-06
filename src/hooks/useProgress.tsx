import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { createContext, useContext } from 'react'
import {
  BADGES,
  MAX_TOTAL_POINTS,
  MAX_QUIZ_POINTS,
  POINT_RULES,
  TOPICS,
  topicStatus,
  type Badge,
  type Topic,
  type TopicId,
} from '../data/gamification'

/* ------------------------------------------------------------------ *
 * Persisted shape — this is the contract with localStorage.
 * ------------------------------------------------------------------ */
export interface QuizResult {
  score: number
  total: number
  pct: number
  completedAt: number
}

export interface SimulatorResult {
  score: number
  outcome: 'success' | 'partial' | 'failure'
  day: number
  completedAt: number
}

export interface ProgressState {
  /** Demo identity — no auth, purely local. */
  profile: {
    name: string
    handle: string
    joinedAt: number
    avatar: number
  }
  points: number
  /** Modules the learner has opened and finished. */
  completed: TopicId[]
  /** Which points rules have already paid out (never double-award). */
  awarded: string[]
  quiz: QuizResult | null
  simulator: SimulatorResult | null
  /** Every points event, newest first — powers the dashboard feed. */
  log: { label: string; points: number; at: number }[]
}

const STORAGE_KEY = 'nwm.progress.v1'

export const DEFAULT_PROGRESS: ProgressState = {
  profile: { name: 'You', handle: 'demo-you', joinedAt: 0, avatar: 0 },
  points: 0,
  completed: [],
  awarded: [],
  quiz: null,
  simulator: null,
  log: [],
}

/* ------------------------------------------------------------------ *
 * Storage helpers (safe against private mode / quota errors)
 * ------------------------------------------------------------------ */
function read(): ProgressState {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_PROGRESS
    const parsed = JSON.parse(raw) as Partial<ProgressState>
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      profile: { ...DEFAULT_PROGRESS.profile, ...(parsed.profile ?? {}) },
      completed: parsed.completed ?? [],
      awarded: parsed.awarded ?? [],
      log: parsed.log ?? [],
    }
  } catch {
    return DEFAULT_PROGRESS
  }
}

function write(state: ProgressState) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    /* quota exceeded or storage disabled — progress simply won't persist */
  }
}

/* ------------------------------------------------------------------ *
 * Context
 * ------------------------------------------------------------------ */
export interface ProgressApi {
  state: ProgressState
  points: number
  maxPoints: number
  pct: number
  completed: TopicId[]
  topics: { topic: Topic; status: ReturnType<typeof topicStatus> }[]
  badges: { badge: Badge; earned: boolean }[]
  earnedBadgeCount: number
  quizBest: QuizResult | null
  simulatorBest: SimulatorResult | null
  /** Award points exactly once per `rule` key. */
  award: (rule: string, points: number, label: string) => void
  /** Mark a module complete; awards its module points the first time. */
  completeTopic: (id: TopicId) => void
  saveQuiz: (result: Omit<QuizResult, 'completedAt'>) => void
  saveSimulator: (result: Omit<SimulatorResult, 'completedAt'>) => void
  setProfile: (patch: Partial<ProgressState['profile']>) => void
  reset: () => void
}

const Ctx = createContext<ProgressApi | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ProgressState>(read)

  /* Persist on every change. */
  useEffect(() => {
    write(state)
  }, [state])

  const award = useCallback((rule: string, points: number, label: string) => {
    setState((s) => {
      if (s.awarded.includes(rule)) return s
      return {
        ...s,
        points: s.points + points,
        awarded: [...s.awarded, rule],
        log: [{ label, points, at: Date.now() }, ...s.log].slice(0, 40),
      }
    })
  }, [])

  const completeTopic = useCallback(
    (id: TopicId) => {
      const topic = TOPICS.find((t) => t.id === id)
      setState((s) => {
        if (s.completed.includes(id)) return s
        const nextCompleted = [...s.completed, id]
        const alreadyPaid = s.awarded.includes(`topic:${id}`)
        const log = alreadyPaid
          ? s.log
          : [
              { label: `Completed · ${topic?.title ?? id}`, points: topic?.points ?? 0, at: Date.now() },
              ...s.log,
            ].slice(0, 40)
        return {
          ...s,
          completed: nextCompleted,
          points: alreadyPaid ? s.points : s.points + (topic?.points ?? 0),
          awarded: alreadyPaid ? s.awarded : [...s.awarded, `topic:${id}`],
          log,
        }
      })
    },
    [],
  )

  const saveQuiz = useCallback((result: Omit<QuizResult, 'completedAt'>) => {
    const completedAt = Date.now()
    setState((s) => {
      const entries = new Set(s.awarded)
      const log = [...s.log]
      let gained = 0

      if (!entries.has('activity:quiz')) {
        entries.add('activity:quiz')
        gained += POINT_RULES.quiz
        log.unshift({ label: 'Completed the quiz', points: POINT_RULES.quiz, at: completedAt })
      }
      if (result.score === result.total && !entries.has('activity:quiz-perfect')) {
        entries.add('activity:quiz-perfect')
        gained += POINT_RULES.quizPerfect
        log.unshift({ label: 'Perfect quiz run', points: POINT_RULES.quizPerfect, at: completedAt })
      }

      const better = !s.quiz || result.score >= s.quiz.score
      return {
        ...s,
        points: s.points + gained,
        awarded: [...entries],
        quiz: better ? { ...result, completedAt } : s.quiz,
        completed: s.completed.includes('quiz') ? s.completed : [...s.completed, 'quiz'],
        log: gained > 0 ? log.slice(0, 40) : s.log,
      }
    })
  }, [])

  const saveSimulator = useCallback((result: Omit<SimulatorResult, 'completedAt'>) => {
    const completedAt = Date.now()
    setState((s) => {
      const entries = new Set(s.awarded)
      let gained = 0
      let log = s.log

      if (!entries.has('activity:simulator')) {
        entries.add('activity:simulator')
        gained = POINT_RULES.simulator
        log = [
          { label: 'Finished the management simulator', points: POINT_RULES.simulator, at: completedAt },
          ...s.log,
        ].slice(0, 40)
      }

      const better = !s.simulator || result.score >= s.simulator.score
      return {
        ...s,
        points: s.points + gained,
        awarded: [...entries],
        simulator: better ? { ...result, completedAt } : s.simulator,
        completed: s.completed.includes('simulator') ? s.completed : [...s.completed, 'simulator'],
        log,
      }
    })
  }, [])

  const setProfile = useCallback((patch: Partial<ProgressState['profile']>) => {
    setState((s) => ({ ...s, profile: { ...s.profile, ...patch } }))
  }, [])

  const reset = useCallback(() => setState(DEFAULT_PROGRESS), [])

  /* Derived values */
  const topics = useMemo(
    () => TOPICS.map((topic) => ({ topic, status: topicStatus(topic, state.completed) })),
    [state.completed],
  )

  const badges = useMemo(
    () => BADGES.map((badge) => ({ badge, earned: isBadgeEarned(badge, state) })),
    [state],
  )

  const earnedBadgeCount = badges.filter((b) => b.earned).length

  const api: ProgressApi = {
    state,
    points: state.points,
    maxPoints: MAX_TOTAL_POINTS,
    pct: Math.round((state.points / MAX_TOTAL_POINTS) * 100),
    completed: state.completed,
    topics,
    badges,
    earnedBadgeCount,
    quizBest: state.quiz,
    simulatorBest: state.simulator,
    award,
    completeTopic,
    saveQuiz,
    saveSimulator,
    setProfile,
    reset,
  }

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>
}

/* ------------------------------------------------------------------ *
 * Pure helpers
 * ------------------------------------------------------------------ */
function isBadgeEarned(
  badge: Badge,
  state: ProgressState,
): boolean {
  const pointsOk = badge.threshold === undefined || state.points >= badge.threshold
  const topicsOk = (badge.topics ?? []).every((t) => state.completed.includes(t))
  const hasSomeProgress = (badge.topics ?? []).length > 0 || badge.threshold !== undefined

  if (!hasSomeProgress) return false
  if (badge.all) return pointsOk && topicsOk
  if (badge.threshold !== undefined && badge.topics) return pointsOk && topicsOk
  if (badge.threshold !== undefined) return pointsOk
  return topicsOk
}

/** Quiz percentage used by the Nuclear Safety Scholar badge (80%). */
export const SCHOLAR_PASS = 80

/* ------------------------------------------------------------------ *
 * Hook
 * ------------------------------------------------------------------ */
export function useProgress(): ProgressApi {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useProgress must be used inside <ProgressProvider>')
  return ctx
}

export { MAX_QUIZ_POINTS }
