import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, Search } from 'lucide-react'
import { useState } from 'react'
import { company, spareParts } from '../data/site'

const L = '#9fd3ee' // blueprint line colour
const F = 'rgba(124,196,226,0.10)'
const line = { stroke: L, strokeWidth: 2, fill: F, strokeLinejoin: 'round' }
const thin = { stroke: L, strokeWidth: 1.2, fill: 'none', strokeOpacity: 0.7 }

function HomogenizerDrawing() {
  return (
    <g>
      <rect x="40" y="360" width="720" height="18" rx="3" {...line} />
      {/* motor */}
      <rect x="60" y="252" width="140" height="96" rx="12" {...line} />
      {Array.from({ length: 7 }, (_, i) => (
        <line key={i} x1={78 + i * 17} y1="262" x2={78 + i * 17} y2="338" {...thin} />
      ))}
      <rect x="92" y="348" width="76" height="12" {...line} />
      <line x1="200" y1="300" x2="214" y2="300" stroke={L} strokeWidth="5" />
      <circle cx="222" cy="300" r="18" {...line} />
      {/* belt */}
      <path d="M222 282 L330 254 M222 318 L330 346" {...thin} strokeWidth="2.4" />
      <motion.g style={{ originX: 0.5, originY: 0.5 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}>
        <circle cx="330" cy="300" r="46" {...line} />
        <circle cx="330" cy="300" r="10" {...line} />
        {[0, 60, 120].map((a) => (
          <line key={a} x1="330" y1="258" x2="330" y2="342" stroke={L} strokeWidth="2" transform={`rotate(${a} 330 300)`} />
        ))}
      </motion.g>
      {/* crankcase */}
      <rect x="370" y="228" width="172" height="124" rx="8" {...line} />
      <motion.g style={{ originX: 0.5, originY: 0.5 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}>
        <circle cx="420" cy="290" r="26" {...line} />
        <circle cx="440" cy="290" r="6" fill={L} />
      </motion.g>
      <path d="M436 282 L522 284 L522 296 L436 298 Z" {...line} />
      <rect x="400" y="352" width="44" height="10" {...line} />
      {/* plunger */}
      <motion.g animate={{ translateX: [0, 14, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}>
        <rect x="516" y="284" width="92" height="12" rx="2" {...line} />
      </motion.g>
      <rect x="590" y="270" width="22" height="40" rx="2" {...line} />
      {/* pump block with valves */}
      <rect x="612" y="228" width="90" height="124" rx="4" {...line} />
      <path d="M646 336 L656 318 L666 336 Z M646 262 L656 244 L666 262 Z" {...line} />
      <path d="M650 318 l6 -6 l6 6 l-6 -6 M650 244 l6 -6 l6 6" {...thin} />
      <line x1="656" y1="352" x2="656" y2="378" stroke={L} strokeWidth="6" strokeOpacity="0.6" />
      {/* homogenizing valve */}
      <rect x="640" y="178" width="50" height="50" rx="4" {...line} />
      <rect x="652" y="200" width="26" height="6" rx="2" stroke={L} fill="rgba(242,196,90,0.25)" strokeWidth="1.5" />
      <line x1="665" y1="178" x2="665" y2="156" stroke={L} strokeWidth="4" />
      <ellipse cx="665" cy="152" rx="32" ry="8" {...line} />
      <path d="M690 200 L770 200" stroke={L} strokeWidth="8" strokeOpacity="0.45" />
      <path d="M690 200 L770 200" stroke="#ffffff" strokeWidth="3" strokeDasharray="6 8" className="animate-[dash_0.8s_linear_infinite]" />
      {/* gauge */}
      <path d="M702 232 L722 214" stroke={L} strokeWidth="4" />
      <circle cx="728" cy="194" r="22" {...line} />
      <motion.line
        x1="728"
        y1="194"
        x2="728"
        y2="178"
        stroke="#f2c45a"
        strokeWidth="2.4"
        strokeLinecap="round"
        style={{ originX: 0.5, originY: 1 }}
        animate={{ rotate: [-40, 50, -40] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      />
      <text x="620" y="405" fill={L} fillOpacity="0.6" fontSize="13" fontFamily="DM Sans, sans-serif">
        Product in ↑
      </text>
      <text x="700" y="225" fill={L} fillOpacity="0.6" fontSize="13" fontFamily="DM Sans, sans-serif">
        Out →
      </text>
    </g>
  )
}

function SeparatorDrawing() {
  const discs = Array.from({ length: 9 }, (_, i) => 150 + i * 9)
  return (
    <g>
      <path d="M240 380 L280 252 H520 L560 380 Z" {...line} />
      <circle cx="268" cy="370" r="5" fill={L} />
      <circle cx="532" cy="370" r="5" fill={L} />
      {/* bowl hood */}
      <path d="M272 252 C272 150 330 80 400 74 C470 80 528 150 528 252" {...thin} strokeDasharray="8 6" />
      {/* bowl */}
      <path d="M300 244 C300 178 336 124 400 112 C464 124 500 178 500 244 Z" {...line} />
      <rect x="356" y="102" width="88" height="14" rx="3" {...line} fill="rgba(242,196,90,0.18)" />
      {discs.map((y) => (
        <path key={y} d={`M330 ${y + 32} L400 ${y} L470 ${y + 32}`} {...thin} />
      ))}
      <path d="M378 238 L400 202 L422 238 Z" {...line} />
      <line x1="300" y1="244" x2="500" y2="244" stroke="#f2c45a" strokeWidth="2.4" strokeOpacity="0.7" />
      {/* inlet / outlets */}
      <line x1="400" y1="22" x2="400" y2="102" stroke={L} strokeWidth="8" strokeOpacity="0.45" />
      <path d="M400 22 L400 100" stroke="#ffffff" strokeWidth="3" strokeDasharray="6 8" className="animate-[dash_0.8s_linear_infinite]" />
      {[58, 84].map((y, i) => (
        <g key={y}>
          <line x1="430" y1={y} x2="590" y2={y} stroke={L} strokeWidth="8" strokeOpacity="0.45" />
          <path d={`M430 ${y} L590 ${y}`} stroke={i ? '#f2c45a' : '#ffffff'} strokeWidth="3" strokeDasharray="6 8" className="animate-[dash_0.8s_linear_infinite]" />
        </g>
      ))}
      <text x="598" y="62" fill={L} fillOpacity="0.7" fontSize="13" fontFamily="DM Sans, sans-serif">
        Skim milk
      </text>
      <text x="598" y="88" fill={L} fillOpacity="0.7" fontSize="13" fontFamily="DM Sans, sans-serif">
        Cream
      </text>
      <text x="412" y="38" fill={L} fillOpacity="0.7" fontSize="13" fontFamily="DM Sans, sans-serif">
        Milk in
      </text>
      {/* spindle, bearings, worm drive */}
      <line x1="400" y1="244" x2="400" y2="362" stroke={L} strokeWidth="6" />
      {[262, 350].map((y) => (
        <rect key={y} x="388" y={y - 6} width="24" height="12" rx="2" {...line} />
      ))}
      <rect x="352" y="300" width="96" height="14" rx="2" {...line} />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={356 + i * 8} y1="300" x2={356 + i * 8} y2="314" {...thin} />
      ))}
      <line x1="300" y1="330" x2="566" y2="330" stroke={L} strokeWidth="5" />
      <motion.g animate={{ x: [0, 8] }} transition={{ repeat: Infinity, duration: 0.5, ease: 'linear' }}>
        {Array.from({ length: 5 }, (_, i) => (
          <path key={i} d={`M${372 + i * 12} 322 l8 16`} stroke={L} strokeWidth="2" />
        ))}
      </motion.g>
      <motion.g style={{ originX: 0.5, originY: 0.5 }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}>
        <circle cx="300" cy="330" r="22" {...line} />
        <line x1="300" y1="310" x2="300" y2="350" stroke={L} strokeWidth="1.6" />
      </motion.g>
      {/* motor */}
      <rect x="566" y="300" width="160" height="60" rx="12" {...line} />
      {Array.from({ length: 8 }, (_, i) => (
        <line key={i} x1={584 + i * 17} y1="306" x2={584 + i * 17} y2="354" {...thin} />
      ))}
      <rect x="600" y="360" width="90" height="16" {...line} />
    </g>
  )
}

const MACHINES = {
  homogenizer: {
    label: 'Homogenizer & HP pump',
    viewBox: '20 128 780 290',
    Drawing: HomogenizerDrawing,
    spots: [
      { x: 330, y: 300, name: 'Belts & Pulleys', part: 'Belts' },
      { x: 420, y: 262, name: 'Crankshaft', part: 'Crankshaft' },
      { x: 480, y: 270, name: 'Connecting Rods', part: 'Connecting Rods' },
      { x: 560, y: 318, name: 'Plungers', part: 'Plungers & Plunger Rods' },
      { x: 601, y: 258, name: 'Plunger Packing', part: 'Gaskets, O-Rings & Packing' },
      { x: 690, y: 300, name: 'Pump Head', part: 'Pump Head / Cylinder Block' },
      { x: 630, y: 336, name: 'Poppet Valves', part: 'Poppet Valves & Springs' },
      { x: 618, y: 160, name: 'Homogenizing Valve', part: 'Homogenizing Valve Block' },
      { x: 665, y: 203, name: 'Valve Seat & Impact Ring', part: 'Valve Seats & Impact Rings' },
      { x: 752, y: 176, name: 'Pressure Gauge', part: 'Pressure Gauges' },
      { x: 422, y: 380, name: 'Oil Pump Assembly', part: 'Oil Pump Assembly' },
    ],
  },
  separator: {
    label: 'Separator & clarifier',
    viewBox: '200 0 560 420',
    Drawing: SeparatorDrawing,
    spots: [
      { x: 482, y: 206, name: 'Separator Bowl', part: 'Separator Bowl' },
      { x: 400, y: 168, name: 'Disc Stack', part: 'Bowl Disc Stack' },
      { x: 400, y: 226, name: 'Distributor Cone', part: 'Distributor Cone' },
      { x: 456, y: 100, name: 'Lock Ring', part: 'Bowl Housing & Lock Ring' },
      { x: 320, y: 244, name: 'Bowl Gaskets', part: 'Gaskets, O-Rings & Packing' },
      { x: 520, y: 70, name: 'Paring Disc', part: 'Paring discs' },
      { x: 376, y: 270, name: 'Spindle', part: 'Spindle assembly' },
      { x: 424, y: 350, name: 'Bearings', part: 'Bearings' },
      { x: 462, y: 307, name: 'Worm Wheel & Gears', part: 'Drive Gears & Worm Wheels' },
      { x: 300, y: 300, name: 'Brake Drum', part: 'Brake Drum & Pulley' },
      { x: 532, y: 392, name: 'Fasteners', part: 'SS Fasteners' },
    ],
  },
}

export default function MachineDiagram({ onShow }) {
  const [machine, setMachine] = useState('homogenizer')
  const firstWithPhoto = (k) => Math.max(0, MACHINES[k].spots.findIndex((s) => spareParts.some((p) => p.name === s.part && p.img)))
  const [sel, setSel] = useState(() => firstWithPhoto('homogenizer'))
  const m = MACHINES[machine]
  const spot = m.spots[sel]
  const photo = spareParts.find((p) => p.name === spot.part && p.img)
  const wa = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Hello, I need a quotation for: ${spot.name} (${m.label})\nMachine make / model: \nQuantity: `)}`

  return (
    <div className="overflow-hidden rounded-3xl bg-navy-900 text-white ring-1 ring-navy-900/10">
      <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-300">Find a part on the machine</p>
          <p className="mt-1 text-sm text-white/70">Tap a number to see the part, then enquire or open it in the catalogue.</p>
        </div>
        <div className="flex rounded-full bg-white/10 p-1">
          {Object.entries(MACHINES).map(([k, v]) => (
            <button
              key={k}
              onClick={() => {
                setMachine(k)
                setSel(firstWithPhoto(k))
              }}
              className={`relative rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${machine === k ? 'text-navy-900' : 'text-white/80 hover:text-white'}`}
            >
              {machine === k && <motion.span layoutId="machine-pill" className="absolute inset-0 rounded-full bg-white" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
              <span className="relative">{v.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr]">
        <div className="relative p-3 sm:p-6">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(159,211,238,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(159,211,238,0.12)_1px,transparent_1px)] [background-size:24px_24px]"
          />
          <AnimatePresence mode="wait">
            <motion.svg
              key={machine}
              viewBox={m.viewBox}
              className="relative h-auto w-full"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              role="img"
              aria-label={`${m.label} cut-away drawing with numbered spare parts`}
            >
              <m.Drawing />
              {m.spots.map((s, i) => (
                <g key={s.name} onClick={() => setSel(i)} className="cursor-pointer" role="button" aria-label={s.name}>
                  {i === sel && (
                    <circle cx={s.x} cy={s.y} r="16" fill="#f2c45a" opacity="0.35">
                      <animate attributeName="r" values="16;28;16" dur="1.8s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0;0.4" dur="1.8s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle cx={s.x} cy={s.y} r="15" fill={i === sel ? '#f2c45a' : '#ffffff'} stroke="#062652" strokeWidth="3" />
                  <text x={s.x} y={s.y + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill="#062652" fontFamily="Montserrat, sans-serif">
                    {i + 1}
                  </text>
                </g>
              ))}
            </motion.svg>
          </AnimatePresence>
          <div className="relative mt-3 flex flex-wrap gap-1.5 lg:hidden">
            {m.spots.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setSel(i)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium ${i === sel ? 'bg-gold-400 text-navy-900' : 'bg-white/10 text-white/85'}`}
              >
                {i + 1}. {s.name}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 p-5 sm:p-6 lg:border-l lg:border-t-0">
          <AnimatePresence mode="wait">
            <motion.div key={machine + sel} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
              <span className="text-xs font-semibold text-sky-300">
                Part {sel + 1} of {m.spots.length}
              </span>
              <h3 className="mt-1 text-xl font-bold text-white">{spot.name}</h3>
              <div className="mt-4 aspect-[4/3] overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
                {photo ? (
                  <img src={photo.img} alt={spot.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="grid h-full place-items-center p-6 text-center text-sm text-white/60">
                    Photo coming soon. We supply this part on request.
                  </div>
                )}
              </div>
              {photo && <p className="mt-3 text-sm text-white/70">{photo.note}</p>}
              <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <a href={wa} target="_blank" rel="noreferrer" className="btn bg-[#25D366] text-white hover:brightness-95">
                  <MessageCircle className="h-4 w-4" /> Enquire
                </a>
                {photo && (
                  <button onClick={() => onShow?.(spot.part)} className="btn-ghost">
                    <Search className="h-4 w-4" /> In catalogue
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
