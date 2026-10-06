import { useEffect } from 'react'
import type { ReactNode } from 'react'
import type { TopicId } from '../data/gamification'
import { useProgress } from '../hooks/useProgress'

/**
 * Marks a learning module as complete as soon as its page mounts.
 * `completeTopic` is idempotent — visiting a page again never double-awards.
 */
export default function TopicMarker({ topic, children }: { topic: TopicId; children: ReactNode }) {
  const { completeTopic } = useProgress()

  useEffect(() => {
    completeTopic(topic)
  }, [topic, completeTopic])

  return <>{children}</>
}