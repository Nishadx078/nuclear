import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PageHead, PageNav } from '../components/PageHead'
import { Meter, Reveal } from '../components/ui'
import { LEADERBOARD_DEMO, MAX_TOTAL_POINTS, type Badge } from '../data/gamification'
import { useProgress } from '../hooks/useProgress'

const AVATARS = ['🧑‍🔬', '🧑‍🚀', '👩‍🏫', '🧑‍🏭', '👩‍💼', '🧑‍💻']

function formatDate(ts: number) {
  if (!ts) return '—'
  return new Date(ts).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatTime(ts: number) {
  return new Date(ts).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}

export default function DashboardPage() {
  const progress = useProgress()
  const { points, pct, topics, badges, quizBest, simulatorBest, state, completed } = progress

  const level = useMemo(() => {
    if (pct >= 90) return { tag: 'Repository Engineer', emoji: '🏅' }
    if (pct >= 65) return { tag: 'Operations Lead', emoji: '🛠️' }
    if (pct >= 35) return { tag: 'Safety Analyst', emoji: '🛡️' }
    if (pct > 0) return { tag: 'Crew Member', emoji: '🧑‍🔧' }
    return { tag: 'Independent Learner', emoji: '🌱' }
  }, [pct])

  /* Insert the real user into the demo standings at their earned rank. */
  const standings = useMemo(() => {
    const them = { name: state.profile.name, handle: state.profile.handle, points, quizPct: quizBest?.pct ?? 0, modules: completed.length, badge: badges.filter((b) => b.earned).at(-1)?.badge.emoji ?? '🌱', isDemo: false }
    const all = [...LEADERBOARD_DEMO, them].sort((a, b) => b.points - a.points || b.modules - a.modules)
    return all.map((row, i) => ({ ...row, rank: i + 1 }))
  }, [points, quizBest, completed, badges, state.profile])

  const learned = completed.length

  return (
    <>
      <PageHead
        kicker="🛰️ Learning dashboard"
        title="Your environmental education progress"
        lead="Everything you have explored on this site in one place — modules completed, badges earned, quiz and simulator bests, and where you stand against the demo class."
        crumbs={[{ label: 'Dashboard' }]}
      />

      <div className="page-body">
        <section className="section">
          <div className="wrap">
            {/* Profile banner */}
            <Reveal>
              <div className="panel">
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                  <div className="flex items-center gap-5">
                    <span
                      className="grid h-16 w-16 place-items-center rounded-2xl border border-edge bg-hull text-3xl"
                      aria-hidden="true"
                    >
                      {AVATARS[state.profile.avatar] ?? '🧑‍🔬'}
                    </span>
                    <div>
                      <p className="text-lg font-semibold text-white">
                        {state.profile.name}
                        <span className="ml-2 align-middle rounded-full border border-edge bg-hull px-2 py-0.5 font-mono text-[0.62rem] text-slate-400">
                          @{state.profile.handle}
                        </span>
                      </p>
                      <p className="mt-1 text-[0.82rem] text-slate-400">
                        Joined {formatDate(state.profile.joinedAt)}
                      </p>
                      <p className="mt-1.5 text-[0.82rem]">
                        <span className="mr-1.5">{level.emoji}</span>
                        <span className="font-medium text-plasma">{level.tag}</span>
                        <span className="ml-2 text-slate-500">· learner level</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-1 items-center gap-6 md:ml-auto md:justify-end">
                    <div className="text-right">
                      <p className="font-mono text-3xl text-white tabular-nums">{points}</p>
                      <p className="font-mono text-[0.6rem] tracking-[0.14em] text-slate-500 uppercase">
                        of {MAX_TOTAL_POINTS} pts
                      </p>
                    </div>
                    <div className="w-24">
                      <Meter value={pct} tone="#38f0ff" />
                      <p className="mt-1.5 text-center font-mono text-[0.62rem] text-plasma tabular-nums">
                        {pct}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Stats strip */}
            <Reveal delay={60}>
              <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  { k: 'Modules completed', v: learned, sub: `of ${topics.length} total` },
                  { k: 'Badges earned', v: progress.earnedBadgeCount, sub: `of ${badges.length}` },
                  {
                    k: 'Quiz best',
                    v: quizBest ? `${quizBest.pct}%` : '—',
                    sub: quizBest ? `${quizBest.score}/${quizBest.total} correct` : 'Not attempted',
                  },
                  {
                    k: 'Simulator best',
                    v: simulatorBest ? simulatorBest.score : '—',
                    sub: simulatorBest ? `${simulatorBest.outcome}` : 'Not run',
                  },
                ].map((s) => (
                  <div key={s.k} className="rounded-xl border border-edge bg-hull/50 p-4">
                    <p className="font-mono text-[0.6rem] tracking-[0.16em] text-slate-500 uppercase">{s.k}</p>
                    <p className="mt-2 font-mono text-2xl text-white tabular-nums">{s.v}</p>
                    <p className="mt-1 text-[0.72rem] text-slate-500">{s.sub}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Quick actions */}
            <Reveal delay={90}>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/quiz" className="btn btn-primary">
                  Take the quiz
                </Link>
                <Link to="/simulator" className="btn btn-primary">
                  Run the simulator
                </Link>
                <Link to="/model3d" className="btn btn-ghost">
                  View the 3D model
                </Link>
                <button type="button" className="btn btn-ghost" onClick={progress.reset}>
                  Reset my progress
                </button>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
              {/* Topics */}
              <Reveal>
                <div className="panel">
                  <h2 className="panel-title">Learning roadmap</h2>
                  <p className="panel-note">
                    Modules unlock as their prerequisites are completed. Opening a module and
                    finishing it pays points into your tally.
                  </p>

                  <div className="mt-5 grid gap-2">
                    {topics.map(({ topic, status }) => {
                      const locked = status === 'locked'
                      return (
                        <div
                          key={topic.id}
                          className={`flex items-center gap-4 rounded-xl border p-3.5 transition-colors ${
                            locked ? 'border-edge/50 bg-hull/25 opacity-60' : 'border-edge bg-hull/50'
                          }`}
                        >
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-edge bg-abyss/60 text-xl" aria-hidden="true">
                            {locked ? '🔒' : topic.emoji}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[0.88rem] font-medium text-white">
                              <span className="truncate">{locked ? `Locked · ${topic.title}` : topic.title}</span>
                              {status === 'completed' && (
                                <span className="font-mono text-[0.6rem] text-flux uppercase">✓ complete</span>
                              )}
                              {status === 'available' && topic.id === 'recovery-concepts' && (
                                <span className="font-mono text-[0.6rem] text-flare uppercase">new</span>
                              )}
                            </p>
                            <p className="mt-0.5 text-[0.74rem] leading-snug text-slate-500">{topic.blurb}</p>
                            {locked && topic.requires.length > 0 && (
                              <p className="mt-1 font-mono text-[0.62rem] text-slate-600">
                                Requires:{' '}
                                {topic.requires
                                  .map((r) => topics.find((t) => t.topic.id === r)?.topic.title ?? r)
                                  .join(', ')}
                              </p>
                            )}
                          </div>
                          <div className="flex shrink-0 items-center gap-4">
                            <span className="font-mono text-[0.62rem] text-slate-500 tabular-nums">
                              +{topic.points} pts
                            </span>
                            {status === 'completed' ? (
                              <span className="font-mono text-[0.66rem] text-plasma-dim">done</span>
                            ) : locked ? (
                              <span className="text-slate-600" aria-hidden="true">🔒</span>
                            ) : (
                              <Link to={topic.to} className="btn btn-ghost btn-sm">
                                Open
                              </Link>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Reveal>

              {/* Badges + leaderboard */}
              <div className="grid gap-6">
                <Reveal delay={60}>
                  <div className="panel">
                    <h2 className="panel-title">Badges</h2>
                    <p className="panel-note">Automatically awarded — no claiming required.</p>
                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {badges.map(({ badge, earned }) => (
                        <BadgeCard key={badge.id} badge={badge} earned={earned} />
                      ))}
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={100}>
                  <div className="panel">
                    <h2 className="panel-title">Class leaderboard</h2>
                    <p className="panel-note">
                      Demo classmates are fictional rows to show how the board behaves — your name
                      is inserted at your real rank.
                    </p>

                    <ol className="mt-5 grid gap-2">
                      {standings.map((row) => {
                        const you = !row.isDemo
                        const medal = row.rank === 1 ? '🥇' : row.rank === 2 ? '🥈' : row.rank === 3 ? '🥉' : ''
                        return (
                          <li
                            key={row.handle}
                            className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
                              you ? 'border-plasma/60 bg-plasma/[0.07]' : 'border-edge bg-hull/40'
                            }`}
                          >
                            <span className="w-7 text-center font-mono text-[0.66rem] text-slate-500 tabular-nums">
                              {medal || row.rank}
                            </span>
                            <span className="text-base" aria-hidden="true">
                              {row.badge}
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[0.84rem] font-medium text-white">
                                {row.name}
                                {you && <span className="ml-2 font-mono text-[0.6rem] text-plasma uppercase">you</span>}
                              </p>
                              <p className="font-mono text-[0.6rem] text-slate-500">
                                {row.modules} modules · {row.quizPct}% quiz
                              </p>
                            </div>
                            <span className="font-mono text-[0.84rem] text-plasma tabular-nums">
                              {row.points}
                            </span>
                          </li>
                        )
                      })}
                    </ol>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Activity log */}
            <Reveal delay={120}>
              <div className="panel mt-6">
                <h2 className="panel-title">Recent activity</h2>
                <p className="panel-note">
                  The last 40 point events are kept locally in this browser. Clear the site data or
                  press “Reset my progress” to start over.
                </p>

                {state.log.length === 0 ? (
                  <p className="mt-5 text-[0.84rem] text-slate-500">
                    Nothing yet — open a module or take the quiz and your achievements will show here.
                  </p>
                ) : (
                  <div className="mt-5 max-h-80 overflow-y-auto pr-2">
                    <ul className="grid gap-2.5">
                      {state.log.map((e) => (
                        <li key={`${e.at}-${e.label}`} className="flex items-center gap-4 rounded-lg border border-edge/60 bg-hull/30 px-3.5 py-2.5">
                          <span className="font-mono text-[0.66rem] text-plasma tabular-nums">+{e.points}</span>
                          <span className="flex-1 text-[0.84rem] text-slate-200">{e.label}</span>
                          <span className="font-mono text-[0.62rem] text-slate-600">{formatTime(e.at)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      </div>

      <PageNav
        prev={{ to: '/model3d', label: '3D Waste Model', kicker: 'Previous' }}
        next={{ to: '/fundamentals', label: 'Nuclear Waste Basics', kicker: 'Next in roadmap' }}
      />
    </>
  )
}

function BadgeCard({ badge, earned }: { badge: Badge; earned: boolean }) {
  return (
    <div
      className={`rounded-xl border p-3.5 text-center transition-colors ${
        earned ? 'border-flux/50 bg-flux/[0.06]' : 'border-edge bg-hull/40 opacity-70 grayscale'
      }`}
      title={badge.description}
    >
      <p className={`text-2xl ${earned ? '' : 'opacity-60'}`} aria-hidden="true">
        {earned ? badge.emoji : '🔒'}
      </p>
      <p className={`mt-2 text-[0.78rem] font-semibold leading-snug ${earned ? 'text-white' : 'text-slate-400'}`}>
        {badge.name}
      </p>
      <p className="mt-1 text-[0.66rem] leading-snug text-slate-500">{badge.description}</p>
    </div>
  )
}