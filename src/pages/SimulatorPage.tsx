import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHead, PageNav } from '../components/PageHead'
import { Reveal } from '../components/ui'
import { SIM_BANDS, SIM_EVENTS, SIM_TOTAL_DAYS, type SimChoice } from '../data/simulator'
import { useProgress } from '../hooks/useProgress'

type Phase = 'intro' | 'running' | 'gameover' | 'finished'
type Outcome = 'success' | 'partial' | 'failure'

const MAX_HEAT = 100
const MAX_RISK = 100
const START_BUDGET = 100

interface Meter {
  heat: number
  risk: number
  budget: number
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export default function SimulatorPage() {
  const progress = useProgress()
  const [phase, setPhase] = useState<Phase>('intro')
  const [day, setDay] = useState(0)
  const [meters, setMeters] = useState<Meter>({ heat: 40, risk: 30, budget: START_BUDGET })
  const [score, setScore] = useState(0)
  const [picked, setPicked] = useState<SimChoice | null>(null)
  const [history, setHistory] = useState<{ title: string; label: string; correct: boolean; points: number }[]>([])
  const [outcome, setOutcome] = useState<Outcome>('partial')

  const event = SIM_EVENTS[day]
  const gameOver = phase === 'gameover'

  const reset = useCallback(() => {
    setPhase('running')
    setDay(0)
    setMeters({ heat: 40, risk: 30, budget: START_BUDGET })
    setScore(0)
    setPicked(null)
    setHistory([])
    setOutcome('partial')
  }, [])

  /** Apply a chosen option, evaluate failure conditions, advance or end the run. */
  const choose = useCallback(
    (choice: SimChoice) => {
      if (picked || !event) return
      setPicked(choice)

      const next: Meter = {
        heat: clamp(meters.heat + choice.heat, 0, MAX_HEAT),
        risk: clamp(meters.risk + choice.risk, 0, MAX_RISK),
        budget: meters.budget + choice.budget,
      }
      setMeters(next)
      setScore((s) => s + choice.points)
      setHistory((h) => [
        ...h,
        { title: event.title, label: choice.label, correct: !!choice.best, points: choice.points },
      ])

      const failed = next.heat >= MAX_HEAT || next.risk >= MAX_RISK || next.budget <= 0
      if (failed) {
        setOutcome('failure')
        setPhase('gameover')
      }
    },
    [event, meters, picked],
  )

  const advance = useCallback(() => {
    if (day + 1 >= SIM_TOTAL_DAYS) {
      const finalScore = score
      const finalOutcome: Outcome =
        finalScore >= SIM_BANDS.minSuccess ? 'success' : finalScore >= SIM_BANDS.minPartial ? 'partial' : 'failure'
      setOutcome(finalOutcome)
      setPhase('finished')
      progress.saveSimulator({ score: finalScore, outcome: finalOutcome, day: SIM_TOTAL_DAYS })
      return
    }
    setDay((d) => d + 1)
    setPicked(null)
  }, [day, score, progress])

  const failedReason = useMemo(() => {
    if (meters.heat >= MAX_HEAT) return 'Decay heat exceeded the containment limit — fuel cladding integrity is compromised.'
    if (meters.risk >= MAX_RISK) return 'Containment risk hit the threshold — an uncontrolled release pathway has opened.'
    if (meters.budget <= 0) return 'Budget exhausted — the facility can no longer maintain its safety programme.'
    return ''
  }, [meters])

  const heatPct = meters.heat
  const riskPct = meters.risk
  const budgetPct = clamp((meters.budget / START_BUDGET) * 100, 0, 100)

  return (
    <>
      <PageHead
        kicker="⚙️ Management Simulator"
        title="Run a repository for eight days"
        lead="You are the duty operations lead. Each day brings an event and three choices — manage decay heat, containment risk and budget at the same time. Push any meter to its limit and the run ends immediately."
        crumbs={[{ label: 'Practice' }, { label: 'Simulator' }]}
      />

      <div className="page-body">
        <section className="section">
          <div className="wrap">

            {/* ---------------- Intro ---------------- */}
            {phase === 'intro' && (
              <Reveal>
                <div className="panel mx-auto max-w-3xl">
                  <span className="kicker">8 day challenge</span>
                  <h2 className="mt-4 text-2xl font-semibold text-white">
                    Keep three meters under control
                  </h2>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {[
                      { icon: '🌡️', k: 'Decay heat', d: 'Rises with every poor cooling decision. Hit 100 and cladding fails.', tone: '#ffd166' },
                      { icon: '⚠️', k: 'Containment risk', d: 'Rises when barriers, filters or inspections are skipped.', tone: '#ff5c7a' },
                      { icon: '💰', k: 'Budget', d: 'Falls with every action. Zero budget means the safety programme stops.', tone: '#b6ff3d' },
                    ].map((m) => (
                      <div key={m.k} className="rounded-xl border border-edge bg-hull/50 p-4">
                        <p className="text-xl">{m.icon}</p>
                        <p className="mt-2 text-[0.9rem] font-semibold" style={{ color: m.tone }}>
                          {m.k}
                        </p>
                        <p className="mt-1 text-[0.78rem] leading-relaxed text-slate-400">{m.d}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 grid gap-4 rounded-xl border border-edge bg-hull/40 p-5 sm:grid-cols-3">
                    <div>
                      <p className="font-mono text-[0.6rem] tracking-[0.16em] text-slate-500 uppercase">Your best</p>
                      <p className="mt-1 font-mono text-xl text-plasma tabular-nums">
                        {progress.simulatorBest ? progress.simulatorBest.score : '—'}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[0.6rem] tracking-[0.16em] text-slate-500 uppercase">Last outcome</p>
                      <p className="mt-1 font-mono text-xl text-white">
                        {progress.simulatorBest
                          ? progress.simulatorBest.outcome === 'success'
                            ? 'Success'
                            : progress.simulatorBest.outcome === 'partial'
                              ? 'Partial'
                              : 'Failure'
                          : '—'}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[0.6rem] tracking-[0.16em] text-slate-500 uppercase">Success needs</p>
                      <p className="mt-1 font-mono text-xl text-flux tabular-nums">≥ {SIM_BANDS.minSuccess}</p>
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <button type="button" className="btn btn-primary" onClick={reset}>
                      Start run
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </button>
                    <Link to="/dashboard" className="btn btn-ghost">
                      Open dashboard
                    </Link>
                  </div>
                </div>
              </Reveal>
            )}

            {/* ---------------- Running / End ---------------- */}
            {(phase === 'running' || phase === 'gameover' || phase === 'finished') && (
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
                <div>
                  <Reveal>
                    {/* Meter HUD */}
                    <div className="panel mb-5">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="font-mono text-[0.66rem] tracking-[0.18em] text-plasma-dim uppercase">
                            {phase === 'finished' ? 'Run complete' : gameOver ? 'Run ended' : `Day ${day + 1} of ${SIM_TOTAL_DAYS}`}
                          </p>
                          <p className="mt-0.5 font-mono text-lg text-white tabular-nums">
                            Score {score}
                          </p>
                        </div>
                        <div className="flex gap-3">
                          {[
                            { k: 'Heat', v: heatPct, c: heatPct > 75 ? '#ff5c7a' : '#ffd166', unit: '' },
                            { k: 'Risk', v: riskPct, c: riskPct > 75 ? '#ff5c7a' : '#7c5cff', unit: '' },
                            { k: 'Budget', v: budgetPct, c: budgetPct < 30 ? '#ff5c7a' : '#b6ff3d', unit: '' },
                          ].map((m) => (
                            <div key={m.k} className="text-right">
                              <p className="font-mono text-[0.6rem] tracking-[0.14em] text-slate-500 uppercase">
                                {m.k}
                              </p>
                              <p className="font-mono text-sm tabular-nums" style={{ color: m.c }}>
                                {Math.round(m.v)}
                              </p>
                              <div className="mt-1 h-1.5 w-16 overflow-hidden rounded-full bg-plate">
                                <div
                                  className="h-full rounded-full transition-[width] duration-500"
                                  style={{ width: `${m.v}%`, background: m.c }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Day track */}
                      <ol className="mt-5 flex gap-1.5" aria-label="Simulator day progress">
                        {Array.from({ length: SIM_TOTAL_DAYS }, (_, i) => (
                          <li
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-colors ${
                              i < day || phase === 'finished'
                                ? 'bg-plasma/80'
                                : i === day
                                  ? 'bg-flux/80'
                                  : 'bg-plate'
                            }`}
                          />
                        ))}
                      </ol>
                    </div>
                  </Reveal>

                  {/* End screens */}
                  {phase === 'finished' && (
                    <Reveal>
                      <div
                        className={`panel mb-5 text-center ${
                          outcome === 'success'
                            ? 'border-flux/40'
                            : outcome === 'partial'
                              ? 'border-flare/40'
                              : 'border-danger/40'
                        }`}
                        aria-live="polite"
                      >
                        <p className="text-4xl">
                          {outcome === 'success' ? '🏆' : outcome === 'partial' ? '⚠️' : '💥'}
                        </p>
                        <p className="mt-3 font-mono text-5xl font-medium text-plasma tabular-nums">
                          {score}
                        </p>
                        <p className="mt-1 text-[0.9rem] text-white">
                          {outcome === 'success'
                            ? 'Repository operator — safe, efficient and compliant.'
                            : outcome === 'partial'
                              ? 'Partial success — the run finished, but decisions cost you.'
                              : 'Safety case failed — review the feedback below.'}
                        </p>
                        <p className="mt-1 text-[0.8rem] text-slate-500">
                          Best score:{' '}
                          <span className="text-plasma">{progress.simulatorBest?.score ?? score}</span>
                        </p>

                        <div className="mt-6 flex flex-wrap justify-center gap-3">
                          <button type="button" className="btn btn-primary" onClick={reset}>
                            Play again
                          </button>
                          <Link to="/quiz" className="btn btn-ghost">
                            Take the quiz
                          </Link>
                          <Link to="/dashboard" className="btn btn-ghost">
                            Dashboard
                          </Link>
                        </div>
                      </div>
                    </Reveal>
                  )}

                  {gameOver && (
                    <Reveal>
                      <div className="panel mb-5 border-danger/40 text-center" aria-live="assertive">
                        <p className="text-4xl">💥</p>
                        <p className="mt-3 text-lg font-semibold text-white">Run terminated</p>
                        <p className="mt-1.5 text-[0.88rem] text-slate-400">{failedReason}</p>
                        <p className="mt-1 text-[0.8rem] text-slate-500">Final score: {score}</p>
                        <div className="mt-5 flex flex-wrap justify-center gap-3">
                          <button type="button" className="btn btn-primary" onClick={reset}>
                            Restart run
                          </button>
                          <Link to="/quiz" className="btn btn-ghost">
                            Try the quiz instead
                          </Link>
                        </div>
                      </div>
                    </Reveal>
                  )}

                  {/* Current event */}
                  {phase === 'running' && event && (
                    <Reveal delay={60}>
                      <div className="panel">
                        <div className="flex items-start gap-4">
                          <span className="text-3xl" aria-hidden="true">
                            {event.icon}
                          </span>
                          <div>
                            <p className="font-mono text-[0.64rem] tracking-[0.16em] text-plasma-dim uppercase">
                              Event {event.day}
                            </p>
                            <h2 className="mt-1 text-xl font-semibold text-white">{event.title}</h2>
                          </div>
                        </div>

                        <p className="mt-4 text-[0.92rem] leading-relaxed text-slate-400">{event.context}</p>

                        <ul className="mt-6 grid gap-3">
                          {event.choices.map((c) => {
                            const chosen = picked?.label === c.label
                            let cls = 'border-edge bg-hull/50 hover:border-plasma/55 hover:bg-plasma/[0.06]'
                            if (picked) {
                              if (chosen) cls = c.best ? 'border-flux bg-flux/[0.10]' : 'border-flare bg-flare/[0.10]'
                              else if (c.best) cls = 'border-flux/50 bg-flux/[0.05] opacity-70'
                              else cls = 'border-edge/40 bg-hull/25 opacity-50'
                            }
                            return (
                              <li key={c.label}>
                                <button
                                  type="button"
                                  disabled={!!picked}
                                  onClick={() => choose(c)}
                                  className={`w-full rounded-xl border p-4 text-left transition-all duration-200 ${cls}`}
                                >
                                  <span className="text-[0.92rem] leading-relaxed text-slate-200">
                                    {c.label}
                                  </span>
                                  {picked && chosen && (
                                    <span className="mt-3 block font-mono text-[0.66rem] text-plasma-dim">
                                      +{c.points} pts
                                    </span>
                                  )}
                                </button>
                              </li>
                            )
                          })}
                        </ul>

                        {/* Feedback */}
                        {picked && (
                          <div
                            className={`mt-6 rounded-xl border-l-2 p-4 ${
                              picked.best
                                ? 'border-flux bg-flux/[0.05]'
                                : 'border-flare bg-flare/[0.05]'
                            }`}
                            aria-live="polite"
                          >
                            <p className="font-mono text-[0.64rem] tracking-[0.16em] uppercase"
                               style={{ color: picked.best ? '#b6ff3d' : '#ffd166' }}>
                              {picked.best ? 'Best practice ✓' : 'Suboptimal ⚠'}
                            </p>
                            <p className="mt-2 text-[0.88rem] leading-relaxed text-slate-300">
                              {picked.feedback}
                            </p>
                          </div>
                        )}

                        <div className="mt-6 flex justify-end">
                          <button
                            type="button"
                            className="btn btn-primary"
                            disabled={!picked}
                            style={{ opacity: picked ? 1 : 0.45 }}
                            onClick={advance}
                          >
                            {day + 1 >= SIM_TOTAL_DAYS ? 'See final result' : 'Next day'}
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </Reveal>
                  )}
                </div>

                {/* Run log sidebar */}
                <Reveal delay={120}>
                  <aside className="panel h-fit lg:sticky lg:top-28">
                    <h3 className="panel-title">Run log</h3>
                    <p className="panel-note">
                      Every decision you have made this run, with its points value.
                    </p>
                    {history.length === 0 ? (
                      <p className="mt-5 text-[0.82rem] text-slate-500">
                        No decisions yet — your choices will appear here as the run progresses.
                      </p>
                    ) : (
                      <ol className="mt-5 grid gap-3">
                        {history.map((h, i) => (
                          <li key={`${h.title}-${i}`} className="border-b border-edge/60 pb-3 last:border-0">
                            <p className="font-mono text-[0.6rem] tracking-[0.14em] text-plasma-dim uppercase">
                              Day {i + 1} · {h.points} pts
                            </p>
                            <p className="mt-1 text-[0.8rem] font-medium text-white">{h.title}</p>
                            <p className="mt-0.5 text-[0.76rem] leading-snug text-slate-500">{h.label}</p>
                          </li>
                        ))}
                      </ol>
                    )}

                    {history.length > 0 && (
                      <div className="mt-5 rounded-xl border border-edge bg-hull/50 p-4">
                        <p className="font-mono text-[0.6rem] tracking-[0.14em] text-slate-500 uppercase">
                          Decisions made
                        </p>
                        <p className="mt-1 font-mono text-xl text-white tabular-nums">
                          {history.length}/{SIM_TOTAL_DAYS}
                        </p>
                        <p className="mt-1 text-[0.75rem] text-slate-500">
                          {history.filter((h) => h.correct).length} best-practice choices
                        </p>
                      </div>
                    )}
                  </aside>
                </Reveal>
              </div>
            )}
          </div>
        </section>
      </div>

      <PageNav
        prev={{ to: '/quiz', label: 'Environmental Education Quiz', kicker: 'Previous' }}
        next={{ to: '/dashboard', label: 'Learning Dashboard', kicker: 'Next' }}
      />
    </>
  )
}
