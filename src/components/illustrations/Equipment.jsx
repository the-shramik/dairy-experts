// Hand-built technical illustrations of dairy equipment (steel look, brand accents).
// Each takes `animate` so the moving parts only run when the card is in view or hovered.
import { motion } from 'framer-motion'
import { useId } from 'react'

const NAVY = '#0b3570'
const LINE = { stroke: NAVY, strokeOpacity: 0.55, strokeWidth: 1.2, strokeLinejoin: 'round' }

function Steel({ id, dir = 'h' }) {
  const v = dir === 'v'
  return (
    <linearGradient id={id} x1="0" y1="0" x2={v ? 0 : 1} y2={v ? 1 : 0}>
      <stop offset="0" stopColor="#f5f8fb" />
      <stop offset="0.35" stopColor="#dfe6ed" />
      <stop offset="0.7" stopColor="#a9b8c6" />
      <stop offset="1" stopColor="#e6ecf1" />
    </linearGradient>
  )
}

function Shadow({ cx = 80, cy = 106, rx = 60 }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry="5" fill={NAVY} opacity="0.12" />
}

const spin = (on, dur = 2) => (on ? { rotate: 360, transition: { repeat: Infinity, ease: 'linear', duration: dur } } : { rotate: 0 })

export function Tanker({ animate }) {
  const id = useId()
  return (
    <svg viewBox="0 0 160 120" className="h-full w-full" aria-hidden="true">
      <defs>
        <Steel id={`${id}s`} dir="v" />
      </defs>
      <Shadow cx="82" rx="70" />
      <rect x="14" y="76" width="132" height="8" rx="2" fill="#5b6b80" />
      <rect x="18" y="36" width="100" height="42" rx="21" fill={`url(#${id}s)`} {...LINE} />
      <rect x="18" y="52" width="100" height="5" fill="#3a93c3" opacity="0.85" />
      <text x="68" y="71" textAnchor="middle" fontSize="8" fontWeight="700" fill={NAVY} fontFamily="Montserrat, sans-serif">
        MILK
      </text>
      <rect x="60" y="30" width="16" height="7" rx="2" fill="#cfd8e1" {...LINE} />
      <path d="M122 48 h14 l8 14 v18 h-22 z" fill="#3a93c3" {...LINE} />
      <path d="M126 52 h8 l5 9 h-13 z" fill="#e3f1f8" />
      {[40, 62, 132].map((cx) => (
        <motion.g key={cx} style={{ originX: 0.5, originY: 0.5 }} animate={spin(animate, 1.4)}>
          <circle cx={cx} cy="88" r="9" fill="#1f2a37" />
          <circle cx={cx} cy="88" r="4" fill="#cfd8e1" />
          <rect x={cx - 0.8} y="80" width="1.6" height="6" fill="#cfd8e1" />
        </motion.g>
      ))}
    </svg>
  )
}

export function Chiller({ animate }) {
  const id = useId()
  return (
    <svg viewBox="0 0 160 120" className="h-full w-full" aria-hidden="true">
      <defs>
        <Steel id={`${id}s`} />
      </defs>
      <Shadow />
      {[40, 116].map((x) => (
        <rect key={x} x={x} y="92" width="5" height="12" fill="#8796a5" />
      ))}
      <rect x="28" y="42" width="104" height="54" rx="20" fill={`url(#${id}s)`} {...LINE} />
      <ellipse cx="62" cy="43" rx="14" ry="4" fill="#cfd8e1" {...LINE} />
      <rect x="92" y="18" width="40" height="24" rx="3" fill="#e3e9ef" {...LINE} />
      <circle cx="104" cy="30" r="8" fill="#fff" {...LINE} />
      <motion.g style={{ originX: 0.5, originY: 0.5 }} animate={spin(animate, 1)}>
        <path d="M104 23 v14 M97 30 h14" stroke={NAVY} strokeOpacity="0.6" strokeWidth="1.6" />
      </motion.g>
      {[118, 124].map((x) => (
        <rect key={x} x={x} y="23" width="3" height="14" rx="1" fill="#a9b8c6" />
      ))}
      <motion.g
        style={{ originX: 0.5, originY: 0.5 }}
        animate={animate ? { rotate: [0, 60], opacity: [0.7, 1, 0.7] } : { rotate: 0 }}
        transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
      >
        <path d="M64 60 v20 M55.3 65 l17.4 10 M55.3 75 l17.4 -10" stroke="#3a93c3" strokeWidth="2.2" strokeLinecap="round" />
      </motion.g>
      <text x="96" y="76" fontSize="9" fontWeight="700" fill={NAVY} fontFamily="Montserrat, sans-serif">
        4°C
      </text>
    </svg>
  )
}

export function Separator({ animate }) {
  const id = useId()
  return (
    <svg viewBox="0 0 160 120" className="h-full w-full" aria-hidden="true">
      <defs>
        <Steel id={`${id}s`} />
        <clipPath id={`${id}c`}>
          <path d="M50 66 C50 42 64 28 80 28 C96 28 110 42 110 66 Z" />
        </clipPath>
      </defs>
      <Shadow />
      <rect x="22" y="84" width="34" height="16" rx="7" fill={`url(#${id}s)`} {...LINE} />
      <rect x="18" y="86" width="4" height="12" rx="1" fill="#8796a5" />
      <path d="M52 100 L60 70 H100 L108 100 Z" fill={`url(#${id}s)`} {...LINE} />
      <rect x="48" y="98" width="64" height="6" rx="2" fill="#8796a5" />
      <path d="M50 66 C50 42 64 28 80 28 C96 28 110 42 110 66 Z" fill={`url(#${id}s)`} {...LINE} />
      {/* cut-away window showing the disc stack */}
      <g clipPath={`url(#${id}c)`}>
        <rect x="64" y="38" width="32" height="28" fill="#eef4f8" />
        <motion.g animate={animate ? { y: [0, -3.2] } : { y: 0 }} transition={{ repeat: Infinity, duration: 0.45, ease: 'linear' }}>
          {Array.from({ length: 9 }, (_, i) => (
            <path key={i} d={`M64 ${44 + i * 3.2} L80 ${38 + i * 3.2} L96 ${44 + i * 3.2}`} fill="none" stroke="#7f93a6" strokeWidth="1" />
          ))}
        </motion.g>
      </g>
      <rect x="64" y="38" width="32" height="28" fill="none" {...LINE} />
      <rect x="76" y="10" width="8" height="20" rx="1.5" fill="#cfd8e1" {...LINE} />
      <path d="M106 50 H140 M106 58 H134" stroke="#7f93a6" strokeWidth="6" strokeLinecap="round" />
      <path d="M106 50 H140 M106 58 H134" stroke="#dfe6ed" strokeWidth="3.6" strokeLinecap="round" />
      <circle cx="142" cy="50" r="3" fill="#fffdf6" stroke="#3a93c3" />
      <circle cx="136" cy="58" r="3" fill="#f2c45a" stroke="#c99a2e" />
    </svg>
  )
}

export function PHE({ animate }) {
  const id = useId()
  return (
    <svg viewBox="0 0 160 120" className="h-full w-full" aria-hidden="true">
      <defs>
        <Steel id={`${id}s`} dir="v" />
        <linearGradient id={`${id}h`} x1="0" x2="1">
          <stop offset="0" stopColor="#3a93c3" />
          <stop offset="1" stopColor="#e56b4e" />
        </linearGradient>
      </defs>
      <Shadow />
      <rect x="16" y="22" width="132" height="4" rx="2" fill="#8796a5" />
      <rect x="16" y="94" width="132" height="4" rx="2" fill="#8796a5" />
      <rect x="18" y="18" width="16" height="86" rx="2" fill={`url(#${id}s)`} {...LINE} />
      {Array.from({ length: 19 }, (_, i) => (
        <rect key={i} x={37 + i * 3.6} y="26" width="2.6" height="68" fill={i % 2 ? '#c3ced8' : '#e8edf2'} stroke={NAVY} strokeOpacity="0.25" strokeWidth="0.5" />
      ))}
      <rect x="106" y="22" width="12" height="76" rx="2" fill={`url(#${id}s)`} {...LINE} />
      <rect x="140" y="18" width="8" height="86" rx="2" fill="#a9b8c6" {...LINE} />
      {[34, 82].map((y) => (
        <rect key={y} x="118" y={y} width="22" height="3" fill="#7f93a6" />
      ))}
      {[[26, 36], [26, 84], [12, 36], [12, 84]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4.2" fill={i < 2 ? '#fff' : '#cfd8e1'} {...LINE} />
      ))}
      <motion.rect
        x="37"
        y="56"
        height="6"
        rx="3"
        fill={`url(#${id}h)`}
        initial={{ width: 0 }}
        animate={animate ? { width: [0, 68, 68], opacity: [0.9, 0.9, 0] } : { width: 0 }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      />
      <text x="62" y="114" textAnchor="middle" fontSize="8" fontWeight="700" fill="#e56b4e" fontFamily="Montserrat, sans-serif">
        72°C · 15 s
      </text>
    </svg>
  )
}

export function Homogenizer({ animate }) {
  const id = useId()
  const needle = (cx, cy, from, to) => (
    <motion.line
      x1={cx}
      y1={cy}
      x2={cx}
      y2={cy - 6}
      stroke="#e56b4e"
      strokeWidth="1.4"
      strokeLinecap="round"
      style={{ originX: 0.5, originY: 1 }}
      animate={animate ? { rotate: [from, to, from] } : { rotate: from }}
      transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
    />
  )
  return (
    <svg viewBox="0 0 160 120" className="h-full w-full" aria-hidden="true">
      <defs>
        <Steel id={`${id}s`} />
      </defs>
      <Shadow />
      <rect x="18" y="98" width="128" height="6" rx="2" fill="#8796a5" />
      <path d="M44 40 L58 30 H138 V98 H44 Z" fill={`url(#${id}s)`} {...LINE} />
      <path d="M58 30 V40 H44" fill="none" {...LINE} />
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} x="100" y={60 + i * 6} width="30" height="2.4" rx="1" fill="#8796a5" opacity="0.7" />
      ))}
      <rect x="16" y="54" width="30" height="30" rx="3" fill="#dfe6ed" {...LINE} />
      {[60, 69, 78].map((y, i) => (
        <motion.g
          key={y}
          animate={animate ? { translateX: [0, 4, 0] } : { translateX: 0 }}
          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2, ease: 'easeInOut' }}
        >
          <rect x="46" y={y - 2} width="16" height="4" rx="1.5" fill="#cfd8e1" {...LINE} />
        </motion.g>
      ))}
      <rect x="22" y="36" width="10" height="18" fill="#cfd8e1" {...LINE} />
      <circle cx="27" cy="32" r="7" fill="none" stroke="#3a93c3" strokeWidth="2.2" />
      <path d="M20 32 h14 M27 25 v14" stroke="#3a93c3" strokeWidth="1.4" />
      {[[72, 46], [96, 46]].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="9" fill="#fff" {...LINE} />
          <circle cx={cx} cy={cy} r="1.6" fill={NAVY} />
          {needle(cx, cy, -60, 40 + i * 10)}
        </g>
      ))}
      <text x="84" y="92" textAnchor="middle" fontSize="7" fontWeight="700" fill={NAVY} fontFamily="Montserrat, sans-serif">
        150–200 bar
      </text>
    </svg>
  )
}

export function SiloPacking({ animate }) {
  const id = useId()
  return (
    <svg viewBox="0 0 160 120" className="h-full w-full" aria-hidden="true">
      <defs>
        <Steel id={`${id}s`} />
      </defs>
      <Shadow cx="84" rx="68" />
      <path d="M22 22 Q42 6 62 22" fill={`url(#${id}s)`} {...LINE} />
      <rect x="22" y="20" width="40" height="80" rx="3" fill={`url(#${id}s)`} {...LINE} />
      <rect x="26" y="40" width="5" height="56" rx="2" fill="#e3f1f8" {...LINE} />
      <motion.rect
        x="27"
        width="3"
        rx="1"
        fill="#3a93c3"
        animate={animate ? { y: [90, 46, 90], height: [5, 49, 5] } : { y: 60, height: 35 }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
      />
      {Array.from({ length: 7 }, (_, i) => (
        <rect key={i} x="64" y={30 + i * 10} width="8" height="1.6" fill="#8796a5" />
      ))}
      <path d="M64 28 V100 M72 28 V100" stroke="#8796a5" strokeWidth="1.4" />
      <rect x="84" y="40" width="44" height="40" rx="4" fill="#e3e9ef" {...LINE} />
      <rect x="92" y="47" width="28" height="12" rx="2" fill="#0b3570" />
      <rect x="94" y="49" width="10" height="8" rx="1" fill="#7cc4e2" />
      <rect x="80" y="86" width="74" height="6" rx="3" fill="#5b6b80" />
      <motion.g animate={animate ? { x: [0, 26] } : { x: 0 }} transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}>
        {[96, 122].map((x) => (
          <g key={x}>
            <rect x={x} y="72" width="12" height="14" rx="3" fill="#fff" {...LINE} />
            <rect x={x} y="77" width="12" height="3.4" fill="#3a93c3" />
          </g>
        ))}
      </motion.g>
      <path d="M62 60 H84" stroke="#a9b8c6" strokeWidth="4" />
    </svg>
  )
}

export function ButterChurn({ animate }) {
  const id = useId()
  return (
    <svg viewBox="0 0 160 120" className="h-full w-full" aria-hidden="true">
      <defs>
        <Steel id={`${id}s`} dir="v" />
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe9a6" />
          <stop offset="1" stopColor="#f2c45a" />
        </linearGradient>
      </defs>
      <Shadow />
      {/* stand */}
      <path d="M38 100 L56 58 L62 58 L46 100 Z M122 100 L104 58 L98 58 L114 100 Z" fill="#a9b8c6" {...LINE} />
      <rect x="30" y="98" width="100" height="6" rx="2" fill="#8796a5" />
      {/* rotating drum */}
      <motion.g style={{ originX: 0.5, originY: 0.5 }} animate={animate ? { rotate: [0, 360] } : { rotate: 0 }} transition={{ repeat: Infinity, duration: 3.2, ease: 'linear' }}>
        <path d="M80 26 L101 35 L110 56 L101 77 L80 86 L59 77 L50 56 L59 35 Z" fill={`url(#${id}s)`} {...LINE} />
        <path d="M80 26 L80 86 M50 56 L110 56" stroke={NAVY} strokeOpacity="0.2" strokeWidth="1" />
        <rect x="74" y="28" width="12" height="7" rx="2" fill="#cfd8e1" {...LINE} />
      </motion.g>
      <circle cx="80" cy="56" r="5" fill="#cfd8e1" {...LINE} />
      {/* gear motor */}
      <rect x="112" y="48" width="22" height="16" rx="3" fill="#3a93c3" {...LINE} />
      <rect x="104" y="53" width="8" height="6" fill="#8796a5" />
      {/* butter blocks in tray */}
      <rect x="16" y="86" width="30" height="8" rx="2" fill="#dfe6ed" {...LINE} />
      <rect x="19" y="78" width="11" height="9" rx="1.5" fill={`url(#${id}b)`} stroke="#c99a2e" strokeWidth="0.8" />
      <rect x="31" y="80" width="11" height="7" rx="1.5" fill={`url(#${id}b)`} stroke="#c99a2e" strokeWidth="0.8" />
    </svg>
  )
}
