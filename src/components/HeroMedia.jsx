import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const ease = [0.22, 1, 0.36, 1]

// Shows the poster photo at once, then cross-fades to a muted looping video when one is set.
// The video is skipped on phones, data-saver connections and for reduced-motion users.
export default function HeroMedia({ poster, video, alt }) {
  const ref = useRef(null)
  const [ready, setReady] = useState(false)
  const [allowed] = useState(() => {
    if (!video || typeof window === 'undefined') return false
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia('(max-width: 767px)').matches
    const saveData = navigator.connection?.saveData
    return !reduce && !small && !saveData
  })

  useEffect(() => {
    if (allowed) ref.current?.play().catch(() => {})
  }, [allowed])

  return (
    <>
      <motion.img
        src={poster}
        alt={alt}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1.02 }}
        transition={{ duration: 2.6, ease }}
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      {allowed && (
        <video
          ref={ref}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1500ms] ${ready ? 'opacity-100' : 'opacity-0'}`}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onCanPlayThrough={() => setReady(true)}
        >
          {video.webm && <source src={video.webm} type="video/webm" />}
          {video.mp4 && <source src={video.mp4} type="video/mp4" />}
        </video>
      )}
    </>
  )
}
