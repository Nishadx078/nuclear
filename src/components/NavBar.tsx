import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { BRAND, NAV_GROUPS, STANDALONE_LINKS } from '../data/nav'

export function BrandMark({ size = 'h-9 w-9' }: { size?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={size} aria-hidden="true">
      <circle cx="24" cy="24" r="5" fill="#38f0ff" opacity=".45" className="animate-pulse-slow" />
      <circle cx="24" cy="24" r="4.5" fill="#9df7ff" />
      <g fill="none" stroke="#38f0ff" strokeWidth="1.3" opacity=".85">
        <ellipse cx="24" cy="24" rx="21" ry="8">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 24 24"
            to="360 24 24"
            dur="11s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse cx="24" cy="24" rx="21" ry="8">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 24 24"
            to="0 24 24"
            dur="11s"
            repeatCount="indefinite"
          />
        </ellipse>
        <ellipse cx="24" cy="24" rx="8" ry="21" opacity=".55">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 24 24"
            to="360 24 24"
            dur="16s"
            repeatCount="indefinite"
          />
        </ellipse>
      </g>
    </svg>
  )
}

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<number | null>(null)

  /* Any navigation closes everything. Derived from location so it needs no effect. */
  const menuKey = `${location.pathname}${location.hash}`
  const [lastMenuKey, setLastMenuKey] = useState(menuKey)
  if (lastMenuKey !== menuKey) {
    setLastMenuKey(menuKey)
    if (mobileOpen) setMobileOpen(false)
    if (openGroup) setOpenGroup(null)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  /* Escape closes the desktop flyout; click-away also dismisses it. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenGroup(null)
    }
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current)
    }
  }, [])

  const hoverOpen = (id: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    setOpenGroup(id)
  }
  const hoverClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenGroup(null), 140)
  }

  const isGroupActive = (to: string) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-edge/80 bg-abyss/90 shadow-[0_10px_40px_-28px_#000] backdrop-blur-xl'
          : 'border-b border-transparent bg-abyss/40 backdrop-blur-sm'
      }`}
    >
      <nav ref={navRef} className="wrap" aria-label="Primary">
        <div className="flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
          {/* Brand */}
          <Link to="/" className="group flex shrink-0 items-center gap-3">
            <span className="transition-transform duration-500 group-hover:scale-105">
              <BrandMark />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold tracking-tight text-white sm:text-[0.95rem]">
                {BRAND.title}
              </span>
              <span className="block font-mono text-[0.6rem] tracking-[0.16em] text-plasma-dim uppercase">
                {BRAND.subtitle}
              </span>
            </span>
          </Link>

          {/* Desktop */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV_GROUPS.map((g) => {
              const active = isGroupActive(g.to)
              const expanded = openGroup === g.id
              return (
                <li
                  key={g.id}
                  className="relative"
                  onMouseEnter={() => hoverOpen(g.id)}
                  onMouseLeave={hoverClose}
                >
                  <NavLink
                    to={g.to}
                    aria-current={active ? 'page' : undefined}
                    aria-expanded={expanded}
                    aria-haspopup="true"
                    className={`nav-link flex items-center gap-1.5 ${
                      active ? 'is-active' : ''
                    }`}
                    onFocus={() => hoverOpen(g.id)}
                  >
                    {g.label}
                    <svg
                      viewBox="0 0 12 12"
                      aria-hidden="true"
                      className={`h-2.5 w-2.5 stroke-current transition-transform duration-300 ${
                        expanded ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      strokeWidth="1.6"
                    >
                      <path d="M2 4.5 6 8.5 10 4.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </NavLink>

                  {/* Flyout */}
                  <div
                    className={`nav-flyout ${expanded ? 'is-open' : ''}`}
                    hidden={!expanded}
                  >
                    <ul className="grid gap-1 p-2">
                      {g.children.map((c) => (
                        <li key={c.to + c.num}>
                          <NavLink
                            to={c.to}
                            end={c.to === '/'}
                            className={({ isActive }) =>
                              `flyout-link ${isActive ? 'is-active' : ''}`
                            }
                          >
                            <span className="flyout-num">{c.num}</span>
                            <span className="min-w-0">
                              <span className="block text-[0.82rem] font-medium">{c.label}</span>
                              <span className="block text-[0.7rem] leading-snug text-slate-500">
                                {c.desc}
                              </span>
                            </span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            })}

            <li>
              <NavLink
                to="/safety"
                className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
              >
                Safety
              </NavLink>
            </li>
          </ul>

          {/* Desktop CTA */}
          <Link to="/cycle" className="btn btn-primary btn-sm hidden shrink-0 lg:inline-flex">
            Cycle diagram
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-edge/80 bg-hull/60 lg:hidden"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <span
              className={`block h-0.5 w-5 rounded-full bg-plasma transition-transform duration-300 ${
                mobileOpen ? 'translate-y-[4px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-plasma transition-opacity duration-200 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 rounded-full bg-plasma transition-transform duration-300 ${
                mobileOpen ? '-translate-y-[4px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        className={`border-t border-edge bg-trench/97 backdrop-blur-xl transition-[max-height,opacity] duration-400 ease-out lg:hidden ${
          mobileOpen ? 'max-h-[calc(100dvh-4rem)] opacity-100' : 'max-h-0 overflow-hidden opacity-0'
        }`}
      >
        <div className="wrap max-h-[calc(100dvh-4rem)] overflow-y-auto py-4">
          {NAV_GROUPS.map((g) => (
            <div key={g.id} className="mb-4 last:mb-0">
              <NavLink
                to={g.to}
                end={g.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `mb-1.5 flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.2em] uppercase ${
                    isActive ? 'text-plasma' : 'text-slate-500'
                  }`
                }
              >
                <span className="h-px w-4 bg-current" />
                {g.label}
              </NavLink>
              <ul className="grid gap-1 pl-1">
                {g.children.map((c) => (
                  <li key={c.to + c.num}>
                    <NavLink
                      to={c.to}
                      end={c.to === '/'}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${
                          isActive
                            ? 'border-plasma/45 bg-plasma/10 text-plasma'
                            : 'border-edge/70 bg-hull/40 text-slate-300'
                        }`
                      }
                    >
                      <span className="font-mono text-[0.6rem] text-plasma-dim">{c.num}</span>
                      <span className="min-w-0">
                        <span className="block text-[0.85rem]">{c.label}</span>
                        <span className="block truncate text-[0.68rem] text-slate-500">
                          {c.desc}
                        </span>
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="border-t border-edge pt-3">
            {STANDALONE_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors ${
                    isActive
                      ? 'border-plasma/45 bg-plasma/10 text-plasma'
                      : 'border-edge/70 bg-hull/40 text-slate-300'
                  }`
                }
              >
                <span className="font-mono text-[0.6rem] text-plasma-dim">{l.num}</span>
                <span className="text-[0.85rem]">{l.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
