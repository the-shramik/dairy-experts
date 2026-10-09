import { motion } from 'framer-motion'
import { useState } from 'react'
import { indiaStates, indiaViewBox } from '../data/indiaMap'

// Positions in map units, projected from lat/long (Mercator fitted to the state outlines).
const HQ = { name: 'Kolhapur', x: 127.6, y: 483.3 }
const cities = [
  { name: 'Mumbai', x: 99.4, y: 430.4 },
  { name: 'Pune', x: 119.7, y: 442.7 },
  { name: 'Ahmedabad', x: 92.9, y: 342.6 },
  { name: 'Delhi', x: 189.3, y: 213.9, label: true },
  { name: 'Chandigarh', x: 180.4, y: 163.1 },
  { name: 'Jaipur', x: 159.8, y: 254.6 },
  { name: 'Lucknow', x: 267.0, y: 256.0 },
  { name: 'Patna', x: 354.1, y: 283.8 },
  { name: 'Kolkata', x: 421.0, y: 352.1, label: true },
  { name: 'Guwahati', x: 491.3, y: 271.1 },
  { name: 'Bhubaneswar', x: 368.3, y: 402.6 },
  { name: 'Bhopal', x: 193.5, y: 337.6 },
  { name: 'Hyderabad', x: 215.9, y: 468.0, label: true },
  { name: 'Bengaluru', x: 197.2, y: 562.9, label: true },
  { name: 'Chennai', x: 252.9, y: 560.7 },
  { name: 'Kochi', x: 169.8, y: 627.2 },
]

const arc = (c) => {
  const mx = (HQ.x + c.x) / 2
  const my = (HQ.y + c.y) / 2
  const dx = c.x - HQ.x
  const dy = c.y - HQ.y
  const len = Math.hypot(dx, dy) || 1
  const bend = Math.min(60, len * 0.22)
  return `M${HQ.x},${HQ.y} Q${mx + (dy / len) * bend},${my - (dx / len) * bend} ${c.x},${c.y}`
}

export default function IndiaMap({ className = '' }) {
  const [hover, setHover] = useState(null)
  return (
    <figure className={`relative ${className}`}>
      <svg viewBox={indiaViewBox} className="h-auto w-full" role="img" aria-label="Map of India showing our Kolhapur head office and supply reach across all states">
        <defs>
          <radialGradient id="map-glow" cx="0.2" cy="0.7" r="0.8">
            <stop offset="0" stopColor="#7cc4e2" stopOpacity="0.35" />
            <stop offset="1" stopColor="#7cc4e2" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="612" height="696" fill="url(#map-glow)" />
        <g>
          {indiaStates.map((s, i) => (
            <motion.path
              key={s.id}
              d={s.d}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.015 * i }}
              onMouseEnter={() => setHover(s.name)}
              onMouseLeave={() => setHover(null)}
              className={`cursor-default transition-colors duration-300 ${
                s.id === 'mh' ? 'fill-brand-500/70' : hover === s.name ? 'fill-sky-300/55' : 'fill-white/[0.13]'
              }`}
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="0.7"
            >
              <title>{s.name}</title>
            </motion.path>
          ))}
        </g>

        <g fill="none" stroke="#7cc4e2" strokeWidth="1.4" strokeLinecap="round">
          {cities.map((c, i) => (
            <motion.path
              key={c.name}
              d={arc(c)}
              strokeDasharray="5 7"
              className="animate-[dash_1.4s_linear_infinite]"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.85 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.6 + i * 0.08, ease: 'easeOut' }}
            />
          ))}
        </g>

        {cities.map((c, i) => (
          <motion.g
            key={c.name}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4 + i * 0.08, type: 'spring', stiffness: 300, damping: 18 }}
            style={{ originX: `${c.x}px`, originY: `${c.y}px` }}
          >
            <circle cx={c.x} cy={c.y} r="4.2" fill="#ffffff" />
            <circle cx={c.x} cy={c.y} r="7.5" fill="#ffffff" opacity="0.18" />
            {c.label && (
              <text x={c.x + 10} y={c.y + 4} fontSize="14" fontWeight="600" fill="#ffffff" fillOpacity="0.85" fontFamily="DM Sans, sans-serif">
                {c.name}
              </text>
            )}
          </motion.g>
        ))}

        {/* HQ pin */}
        <g>
          <circle cx={HQ.x} cy={HQ.y} r="10" fill="#f2c45a" opacity="0.5">
            <animate attributeName="r" values="10;30;10" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx={HQ.x} cy={HQ.y} r="8" fill="#f2c45a" stroke="#ffffff" strokeWidth="3" />
          <g transform={`translate(4 ${HQ.y + 18})`}>
            <rect width="120" height="38" rx="8" fill="#ffffff" />
            <text x="12" y="16" fontSize="12.5" fontWeight="700" fill="#062652" fontFamily="Montserrat, sans-serif">
              Kolhapur HQ
            </text>
            <text x="12" y="30" fontSize="10.5" fill="#5b6b80" fontFamily="DM Sans, sans-serif">
              MIDC Shiroli
            </text>
          </g>
        </g>
      </svg>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-white/60">
        <span className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-gold-400" /> Head office
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white" /> Supply & service reach
          </span>
        </span>
        <span className="font-medium text-sky-300">{hover ?? 'Hover a state'}</span>
      </figcaption>
    </figure>
  )
}
