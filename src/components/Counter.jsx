import { animate, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function Counter({ value, suffix = '', prefix = '', duration = 1.8 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, value, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {n.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}
