import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ParticleField, Reveal } from './ui'

export interface Crumb {
  label: string
  to?: string
}

export function PageHead({
  kicker,
  title,
  lead,
  crumbs,
  children,
}: {
  kicker: string
  title: ReactNode
  lead: string
  crumbs: Crumb[]
  children?: ReactNode
}) {
  return (
    <div className="page-head">
      <ParticleField />
      <div className="glow glow-a animate-drift" aria-hidden="true" />

      <div className="wrap relative">
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-0.4">
                <span aria-hidden="true">/</span>
                {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>

        <Reveal>
          <p className="kicker mt-5">{kicker}</p>
        </Reveal>
        <Reveal delay={60}>
          <h1 className="mt-3 max-w-3xl text-3xl leading-[1.1] font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.9rem]">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-slate-300">{lead}</p>
        </Reveal>
        {children && <Reveal delay={180}>{children}</Reveal>}
      </div>
    </div>
  )
}

/** Previous / next page navigation at the foot of every content page. */
export function PageNav({
  prev,
  next,
}: {
  prev?: { to: string; label: string; kicker: string }
  next?: { to: string; label: string; kicker: string }
}) {
  if (!prev && !next) return null
  return (
    <div className="wrap pb-16">
      <nav aria-label="Page navigation" className="nextprev">
        {prev ? (
          <Link to={prev.to} className="nextprev-link" data-dir="prev">
            <span className="font-mono text-[0.62rem] tracking-[0.18em] text-plasma-dim uppercase">
              ← {prev.kicker}
            </span>
            <span className="text-[0.95rem] font-medium text-white">{prev.label}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link to={next.to} className="nextprev-link" data-dir="next">
            <span className="font-mono text-[0.62rem] tracking-[0.18em] text-plasma-dim uppercase">
              {next.kicker} →
            </span>
            <span className="text-[0.95rem] font-medium text-white">{next.label}</span>
          </Link>
        )}
      </nav>
    </div>
  )
}
