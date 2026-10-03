import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Scrolls to the top on route change, or to the hash target when present.
 * Runs after paint so the target element is already mounted.
 */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      // Wait a frame so the destination page has rendered its anchors.
      const raf = requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
      return () => cancelAnimationFrame(raf)
    }

    window.scrollTo({ top: 0, left: 0, behavior: key === undefined ? 'auto' : 'auto' })
  }, [pathname, hash, key])

  return null
}
