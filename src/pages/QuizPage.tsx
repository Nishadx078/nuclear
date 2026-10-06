import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHead, PageNav } from '../components/PageHead'
import { Reveal } from '../components/ui'
import { QUIZ_QUESTIONS, QUIZ_PASS_PCT, type Question } from '../data/quiz'
import { useProgress } from '../hooks/useProgress'

type Phase = 'intro' | 'playing' | 'result'

interface Answer {
  questionId: string
  picked: number
  correct: boolean
}

/** Shuffle once per mount so a retry feels different but stays stable. */
function shuffled<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export default function QuizPage() {
  const progress = useProgress()
  const [phase, setPhase] = useState<Phase>('intro')
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [picked, setPicked] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [order, setOrder] = useState<Question[]>(() => shuffled(QUIZ_QUESTIONS))

  const total = order.length
  const question = order[index]
  const answeredCount = answers.length
  const correctCount = answers.filter((a) => a.correct).length
  const scorePct = total ? Math.round((correctCount / total) * 100) : 0
  const best = progress.quizBest

  const pct = useMemo(() => {
    if (phase === 'result') return 100
    return Math.round((answeredCount / total) * 100)
  }, [phase, answeredCount, total])

  const start = () => {
    setOrder(shuffled(QUIZ_QUESTIONS))
    setIndex(0)
    setAnswers([])
    setPicked(null)
    setRevealed(false)
    setPhase('playing')
  }

  const choose = (i: number) => {
    if (revealed || !question) return
    setPicked(i)
    setRevealed(true)
    const correct = i === question.answer
    setAnswers((prev) => [...prev, { questionId: question.id, picked: i, correct }])
  }

  const next = () => {
    if (index + 1 >= total) {
      const finalAnswers = answers
      const score = finalAnswers.filter((a) => a.correct).length
      progress.saveQuiz({ score, total, pct: Math.round((score / total) * 100) })
      setPhase('result')
      return
    }
    setIndex((i) => i + 1)
    setPicked(null)
    setRevealed(false)
  }

  const answeredQuestion = revealed ? question : null

  return (
    <>
      <PageHead
        kicker="🧠 Environmental Education Quiz"
        title="Test your nuclear waste knowledge"
        lead="Twelve questions covering waste goals, classification, the management journey, environmental impact and future technologies. Multiple-choice and true/false, with an explanation after every answer. Scoring is saved to this browser."
        crumbs={[{ label: 'Practice' }, { label: 'Quiz' }]}
      />

      <div className="page-body">
        <section className="section">
          <div className="wrap">

            {/* ---------- Intro ---------- */}
            {phase === 'intro' && (
              <Reveal>
                <div className="panel mx-auto max-w-3xl text-center">
                  <span className="kicker justify-center">12 questions</span>
                  <h2 className="mt-4 text-2xl font-semibold text-white">
                    Ready to earn the Nuclear Safety Scholar badge?
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-[0.92rem] leading-relaxed text-slate-400">
                    Answer all 12 questions. You can retry as often as you like — your best score is kept,
                    and a perfect run awards bonus points.
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {[
                      { k: 'Questions', v: `${total}` },
                      { k: 'Pass mark', v: `${QUIZ_PASS_PCT}%` },
                      { k: 'Best score', v: best ? `${best.pct}%` : '—' },
                    ].map((s) => (
                      <div key={s.k} className="rounded-xl border border-edge bg-hull/50 p-4">
                        <p className="font-mono text-2xl text-plasma tabular-nums">{s.v}</p>
                        <p className="mt-1 font-mono text-[0.62rem] tracking-[0.16em] text-slate-500 uppercase">
                          {s.k}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <button type="button" className="btn btn-primary" onClick={start}>
                      {best ? 'Retake the quiz' : 'Start the quiz'}
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </button>
                    <Link to="/dashboard" className="btn btn-ghost">
                      View my dashboard
                    </Link>
                  </div>
                </div>
              </Reveal>
            )}

            {/* ---------- Playing ---------- */}
            {phase === 'playing' && question && (
              <div className="mx-auto max-w-3xl">
                <Reveal>
                  {/* Progress indicator */}
                  <div className="panel mb-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-mono text-[0.66rem] tracking-[0.18em] text-plasma-dim uppercase">
                          Question {index + 1} of {total}
                        </p>
                        <p className="mt-0.5 text-[0.8rem] text-slate-500">{question.topic}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-lg text-white tabular-nums">
                          {correctCount}/{answeredCount}
                        </p>
                        <p className="font-mono text-[0.6rem] tracking-[0.16em] text-slate-500 uppercase">
                          correct
                        </p>
                      </div>
                    </div>

                    <div
                      className="meter mt-4"
                      role="progressbar"
                      aria-valuenow={pct}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Quiz progress"
                    >
                      <span style={{ width: `${pct}%` }} />
                    </div>

                    {/* Step dots */}
                    <ol className="mt-3 flex flex-wrap gap-1.5">
                      {order.map((q, i) => {
                        const a = answers[i]
                        const tone = a
                          ? a.correct
                            ? 'bg-flux/70 border-flux/50'
                            : 'bg-danger/70 border-danger/50'
                          : i === index
                            ? 'bg-plasma border-plasma/60'
                            : 'bg-plate border-edge'
                        return (
                          <li
                            key={q.id}
                            className={`h-1.5 w-6 rounded-full border transition-colors ${tone}`}
                            title={`Question ${i + 1}`}
                          />
                        )
                      })}
                    </ol>
                  </div>
                </Reveal>

                <Reveal delay={60}>
                  <div className="panel">
                    <span
                      className={`tag ${question.kind === 'tf' ? 't-comm' : 't-demo'}`}
                    >
                      {question.kind === 'tf' ? 'True / False' : 'Multiple choice'}
                    </span>

                    <h2 className="mt-4 text-xl leading-snug font-semibold text-white">
                      {question.question}
                    </h2>

                    <ul className="mt-6 grid gap-3">
                      {question.options.map((opt, i) => {
                        const isPicked = picked === i
                        const isCorrect = i === question.answer
                        let cls =
                          'border-edge bg-hull/50 hover:border-plasma/55 hover:bg-plasma/[0.06]'
                        if (revealed) {
                          if (isCorrect) cls = 'border-flux bg-flux/[0.10]'
                          else if (isPicked) cls = 'border-danger bg-danger/[0.10]'
                          else cls = 'border-edge/50 bg-hull/30 opacity-60'
                        }
                        return (
                          <li key={opt}>
                            <button
                              type="button"
                              disabled={revealed}
                              onClick={() => choose(i)}
                              aria-pressed={isPicked}
                              className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all duration-200 ${cls}`}
                            >
                              <span
                                className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border font-mono text-[0.7rem] ${
                                  revealed
                                    ? isCorrect
                                      ? 'border-flux text-flux'
                                      : isPicked
                                        ? 'border-danger text-danger'
                                        : 'border-edge text-slate-500'
                                    : 'border-edge text-plasma-dim'
                                }`}
                              >
                                {String.fromCharCode(65 + i)}
                              </span>
                              <span className="text-[0.92rem] leading-relaxed text-slate-200">
                                {opt}
                              </span>
                              {revealed && isCorrect && (
                                <span className="ml-auto shrink-0 text-flux" aria-label="Correct">
                                  ✓
                                </span>
                              )}
                              {revealed && isPicked && !isCorrect && (
                                <span className="ml-auto shrink-0 text-danger" aria-label="Incorrect">
                                  ✕
                                </span>
                              )}
                            </button>
                          </li>
                        )
                      })}
                    </ul>

                    {/* Explanation panel */}
                    {revealed && answeredQuestion && (
                      <div
                        className="mt-6 rounded-xl border-l-2 border-plasma bg-plasma/[0.05] p-4"
                        aria-live="polite"
                      >
                        <p className="font-mono text-[0.64rem] tracking-[0.16em] text-plasma uppercase">
                          {answers[answers.length - 1]?.correct ? 'Correct ✓' : 'Not quite ✕'}
                        </p>
                        <p className="mt-2 text-[0.88rem] leading-relaxed text-slate-300">
                          {answeredQuestion.explanation}
                        </p>
                      </div>
                    )}

                    <div className="mt-6 flex items-center justify-between gap-3">
                      <p className="font-mono text-[0.7rem] text-slate-500">
                        {answeredCount}/{total} answered
                      </p>
                      <button
                        type="button"
                        className="btn btn-primary"
                        disabled={!revealed}
                        onClick={next}
                        style={{ opacity: revealed ? 1 : 0.45 }}
                      >
                        {index + 1 >= total ? 'See results' : 'Next question'}
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </Reveal>
              </div>
            )}

            {/* ---------- Result ---------- */}
            {phase === 'result' && (
              <Reveal>
                <div className="panel mx-auto max-w-3xl">
                  <div className="text-center">
                    <span className="kicker justify-center">Final result</span>
                    <p className="mt-5 font-mono text-6xl font-medium text-plasma tabular-nums">
                      {scorePct}%
                    </p>
                    <p className="mt-2 text-[1.05rem] text-white">
                      {correctCount} correct out of {total}
                    </p>
                    <p className="mt-1 text-[0.85rem] text-slate-500">
                      Pass mark {QUIZ_PASS_PCT}% · best score{' '}
                      {progress.quizBest ? `${progress.quizBest.pct}%` : '—'}
                    </p>
                  </div>

                  <div
                    className={`mt-7 rounded-xl border p-5 text-center ${
                      scorePct >= QUIZ_PASS_PCT
                        ? 'border-flux/40 bg-flux/[0.07]'
                        : 'border-flare/40 bg-flare/[0.07]'
                    }`}
                    aria-live="polite"
                  >
                    <p className="text-[1.3rem]">
                      {scorePct === 100
                        ? '🏆 Perfect score!'
                        : scorePct >= QUIZ_PASS_PCT
                          ? '☢️ Nuclear Safety Scholar badge earned'
                          : '🌱 Keep going — every attempt teaches you something'}
                    </p>
                    <p className="mt-1.5 text-[0.85rem] text-slate-400">
                      {scorePct >= QUIZ_PASS_PCT
                        ? 'Points for the quiz have been added to your environmental education score.'
                        : 'Review the topics you missed, then try again — your best score is what counts.'}
                    </p>
                  </div>

                  {/* Per-question review */}
                  <h3 className="mt-8 font-mono text-[0.66rem] tracking-[0.18em] text-slate-500 uppercase">
                    Answer review
                  </h3>
                  <ol className="mt-3 grid gap-2">
                    {order.map((q, i) => {
                      const a = answers[i]
                      return (
                        <li
                          key={q.id}
                          className={`rounded-xl border p-4 ${
                            a?.correct ? 'border-edge bg-hull/50' : 'border-danger/30 bg-danger/[0.06]'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className={`mt-0.5 font-mono text-sm ${
                                a?.correct ? 'text-flux' : 'text-danger'
                              }`}
                            >
                              {a?.correct ? '✓' : '✕'}
                            </span>
                            <div className="min-w-0">
                              <p className="text-[0.9rem] font-medium text-white">{q.question}</p>
                              <p className="mt-1 text-[0.82rem] text-slate-400">
                                Correct answer:{' '}
                                <span className="text-flux">{q.options[q.answer]}</span>
                                {!a?.correct && a && (
                                  <>
                                    {' · '}
                                    your answer: <span className="text-danger">{q.options[a.picked]}</span>
                                  </>
                                )}
                              </p>
                              <p className="mt-1.5 text-[0.8rem] leading-relaxed text-slate-500">
                                {q.explanation}
                              </p>
                            </div>
                          </div>
                        </li>
                      )
                    })}
                  </ol>

                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button type="button" className="btn btn-primary" onClick={start}>
                      Retry quiz
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" />
                      </svg>
                    </button>
                    <Link to="/dashboard" className="btn btn-ghost">
                      Open dashboard
                    </Link>
                    <Link to="/simulator" className="btn btn-ghost">
                      Try the simulator
                    </Link>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      </div>

      <PageNav
        prev={{ to: '/model3d', label: '3D Waste Model', kicker: 'Previous' }}
        next={{ to: '/simulator', label: 'Management Simulator', kicker: 'Next' }}
      />
    </>
  )
}
