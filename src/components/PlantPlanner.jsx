import { motion } from 'framer-motion'
import { Check, Info, MessageCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { company } from '../data/site'
import { asset } from '../lib/asset'

const fmt = (n) => Math.round(n).toLocaleString('en-IN')
const LPH = [500, 1000, 2000, 3000, 5000, 6000, 8000, 10000, 15000, 20000, 25000, 30000, 40000, 50000]
const SILO = [1000, 2000, 5000, 10000, 15000, 20000, 30000, 50000, 75000, 100000, 150000]

const stdLph = (v) => {
  if (v <= LPH[LPH.length - 1]) return { n: 1, size: LPH.find((s) => s >= v) }
  const n = Math.ceil(v / 40000)
  return { n, size: LPH.find((s) => s >= v / n) }
}
const lphText = ({ n, size }) => `${n > 1 ? `${n} × ` : ''}${fmt(size)} LPH`

const silos = (total) => {
  for (const size of [...SILO].reverse()) {
    const n = Math.ceil(total / size)
    if (n >= 2 && n <= 6) return { n, size }
  }
  return { n: Math.max(1, Math.ceil(total / SILO[0])), size: SILO[0] }
}

const PRODUCTS = [
  { id: 'pouch', label: 'Pouch milk', line: 'Pouch filling & packing machine', homog: true },
  { id: 'curd', label: 'Curd / Dahi', line: 'Curd incubation room & cup filling', homog: true },
  { id: 'paneer', label: 'Paneer', line: 'Paneer vat & pneumatic press' },
  { id: 'ghee', label: 'Ghee', line: 'Ghee boiler & ghee clarifier' },
  { id: 'butter', label: 'Butter', line: 'Butter churn / continuous butter making' },
  { id: 'lassi', label: 'Lassi / Buttermilk', line: 'Mixing tank & cup filling', homog: true },
  { id: 'icecream', label: 'Ice cream', line: 'Ageing vats, continuous freezer & hardening', homog: true },
  { id: 'cheese', label: 'Cheese', line: 'Cheese vat & moulding' },
]

const PRESETS = [5000, 25000, 100000, 500000]
const MIN = Math.log10(1000)
const MAX = Math.log10(1000000)

function CapacityScale({ lpd }) {
  const pos = ((Math.log10(lpd) - MIN) / (MAX - MIN)) * 100
  const ticks = [
    { v: 1000, t: '1K' },
    { v: 10000, t: '10K' },
    { v: 100000, t: '1 Lakh' },
    { v: 1000000, t: '10 Lakh' },
  ]
  return (
    <svg viewBox="0 0 400 54" className="h-auto w-full" aria-hidden="true">
      <defs>
        <linearGradient id="cap-g" x1="0" x2="1">
          <stop offset="0" stopColor="#b5ddef" />
          <stop offset="1" stopColor="#062652" />
        </linearGradient>
      </defs>
      <rect x="10" y="14" width="380" height="10" rx="5" fill="url(#cap-g)" />
      {ticks.map((k) => {
        const x = 10 + ((Math.log10(k.v) - MIN) / (MAX - MIN)) * 380
        return (
          <g key={k.t}>
            <line x1={x} y1="28" x2={x} y2="34" stroke="#5b6b80" />
            <text x={x} y="48" textAnchor="middle" fontSize="10" fill="#5b6b80" fontFamily="DM Sans, sans-serif">
              {k.t}
            </text>
          </g>
        )
      })}
      <motion.g animate={{ x: (pos / 100) * 380 }} transition={{ type: 'spring', stiffness: 200, damping: 26 }}>
        <circle cx="10" cy="19" r="9" fill="#f2c45a" stroke="#fff" strokeWidth="3" />
      </motion.g>
    </svg>
  )
}

// Silo row sized to the recommended raw-milk storage.
function SiloRow({ n, size }) {
  const h = 34 + Math.min(1, Math.log10(size) / 5.2) * 46
  const w = Math.min(46, 300 / n - 10)
  return (
    <svg viewBox="0 0 320 110" className="mx-auto h-auto w-full max-w-[18rem]" aria-hidden="true">
      <defs>
        <linearGradient id="silo-g" x1="0" x2="1">
          <stop offset="0" stopColor="#f5f8fb" />
          <stop offset="0.4" stopColor="#dfe6ed" />
          <stop offset="0.75" stopColor="#a9b8c6" />
          <stop offset="1" stopColor="#e6ecf1" />
        </linearGradient>
      </defs>
      <ellipse cx="160" cy="102" rx="150" ry="5" fill="#062652" opacity="0.1" />
      {Array.from({ length: n }, (_, i) => {
        const x = 160 - (n * (w + 10)) / 2 + i * (w + 10) + 5
        return (
          <motion.g key={`${n}-${i}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <path d={`M${x} ${100 - h + 6} Q${x + w / 2} ${100 - h - 6} ${x + w} ${100 - h + 6} V100 H${x} Z`} fill="url(#silo-g)" stroke="#0b3570" strokeOpacity="0.5" />
            <rect x={x + 4} y={100 - h + 14} width="3" height={h - 22} rx="1" fill="#3a93c3" opacity="0.7" />
          </motion.g>
        )
      })}
    </svg>
  )
}

export default function PlantPlanner() {
  const [lpd, setLpd] = useState(25000)
  const [hours, setHours] = useState(16)
  const [picked, setPicked] = useState(['pouch', 'curd', 'paneer'])

  const plan = useMemo(() => {
    const proc = stdLph(lpd / hours)
    const recv = stdLph(lpd / 6)
    const raw = silos(lpd)
    const past = silos(lpd * 0.5)
    const lines = PRODUCTS.filter((p) => picked.includes(p.id))
    const homog = lines.some((p) => p.homog)
    return {
      rows: [
        { k: 'Milk reception & chilling', v: lphText(recv), note: 'Based on a 6-hour collection window' },
        { k: 'Raw milk storage', v: `${raw.n} × ${fmt(raw.size)} L silos`, note: 'About one day of intake' },
        { k: 'Cream separator / clarifier', v: lphText(proc), note: `For ${hours}-hour processing` },
        { k: 'Pasteurizer (HTST, PHE)', v: lphText(proc), note: 'With holding tube and hot water set' },
        ...(homog ? [{ k: 'Homogenizer', v: lphText(proc), note: 'Needed for your selected products' }] : []),
        { k: 'Pasteurized milk storage', v: `${past.n} × ${fmt(past.size)} L tanks`, note: 'About half a day of output' },
      ],
      lines: lines.map((p) => p.line),
      raw,
      proc,
    }
  }, [lpd, hours, picked])

  const toggle = (id) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))
  const sliderVal = ((Math.log10(lpd) - MIN) / (MAX - MIN)) * 1000
  const onSlide = (e) => {
    const v = 10 ** (MIN + (Number(e.target.value) / 1000) * (MAX - MIN))
    const step = v < 10000 ? 500 : v < 100000 ? 5000 : 25000
    setLpd(Math.max(1000, Math.round(v / step) * step))
  }

  const message = [
    'Hello The Dairy Experts, I would like a plant proposal.',
    `Capacity: ${fmt(lpd)} LPD, ${hours} h processing`,
    `Products: ${PRODUCTS.filter((p) => picked.includes(p.id)).map((p) => p.label).join(', ') || 'Milk only'}`,
    '',
    'Indicative plan from your website:',
    ...plan.rows.map((r) => `- ${r.k}: ${r.v}`),
    ...plan.lines.map((l) => `- ${l}`),
    '',
    'Location: ',
  ].join('\n')

  return (
    <div className="grid overflow-hidden rounded-3xl bg-white ring-1 ring-navy-900/8 shadow-[0_30px_60px_-30px_rgba(6,38,82,0.3)] lg:grid-cols-[1fr_1.15fr]">
      {/* Inputs */}
      <div className="p-5 sm:p-8">
        <label htmlFor="lpd" className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
          Milk handled per day
        </label>
        <p className="mt-2 font-display text-3xl font-bold text-navy-900 sm:text-4xl">
          {fmt(lpd)} <span className="text-base font-semibold text-muted">LPD</span>
        </p>
        <input
          id="lpd"
          type="range"
          min="0"
          max="1000"
          value={sliderVal}
          onChange={onSlide}
          className="mt-5 w-full accent-brand-500"
          aria-valuetext={`${fmt(lpd)} litres per day`}
        />
        <CapacityScale lpd={lpd} />
        <div className="mt-3 flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p}
              onClick={() => setLpd(p)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${lpd === p ? 'bg-navy-900 text-white' : 'bg-ice-50 text-navy-900 ring-1 ring-navy-900/10 hover:ring-brand-500'}`}
            >
              {fmt(p)} LPD
            </button>
          ))}
        </div>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Processing hours per day</p>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {[8, 12, 16, 20].map((h) => (
            <button
              key={h}
              onClick={() => setHours(h)}
              className={`rounded-xl py-2.5 text-sm font-semibold transition ${hours === h ? 'bg-navy-900 text-white' : 'bg-ice-50 text-navy-900 ring-1 ring-navy-900/10 hover:ring-brand-500'}`}
            >
              {h} h
            </button>
          ))}
        </div>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Products you want to make</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {PRODUCTS.map((p) => {
            const on = picked.includes(p.id)
            return (
              <button
                key={p.id}
                onClick={() => toggle(p.id)}
                aria-pressed={on}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-medium transition ${
                  on ? 'bg-brand-500 text-white' : 'bg-white text-navy-900 ring-1 ring-navy-900/12 hover:ring-brand-500'
                }`}
              >
                {on && <Check className="h-3.5 w-3.5" />} {p.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Output */}
      <div className="relative bg-ice-50 p-5 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">Indicative plant plan</p>
            <p className="mt-1 text-sm text-muted">
              Main processing line: <strong className="text-navy-900">{lphText(plan.proc)}</strong>
            </p>
          </div>
          <img src={asset('/images/logo-emblem.svg')} alt="" className="h-10 w-10 opacity-90" />
        </div>
        <div className="mt-4 rounded-2xl bg-white p-3 ring-1 ring-navy-900/5">
          <SiloRow n={plan.raw.n} size={plan.raw.size} />
          <p className="text-center text-[11px] text-muted">
            Raw milk silos: {plan.raw.n} × {fmt(plan.raw.size)} L
          </p>
        </div>
        <dl className="mt-4 divide-y divide-navy-900/8 rounded-2xl bg-white ring-1 ring-navy-900/5">
          {plan.rows.map((r) => (
            <div key={r.k} className="flex items-start justify-between gap-4 px-4 py-3">
              <dt className="text-[13px] text-navy-900">
                <span className="font-semibold">{r.k}</span>
                <span className="block text-[11px] text-muted">{r.note}</span>
              </dt>
              <dd className="shrink-0 text-right font-display text-[13px] font-bold text-brand-700 sm:text-sm">{r.v}</dd>
            </div>
          ))}
        </dl>
        {plan.lines.length > 0 && (
          <div className="mt-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Product lines</p>
            <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {plan.lines.map((l) => (
                <li key={l} className="flex items-start gap-2 text-[13px] text-navy-900">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" /> {l}
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className="mt-3 text-[13px] text-navy-900">
          <span className="font-semibold">Utilities:</span> CIP system, boiler, refrigeration and effluent treatment.
        </p>
        <p className="mt-4 flex gap-2 rounded-xl bg-white/70 p-3 text-[11px] leading-relaxed text-muted ring-1 ring-navy-900/5">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
          These are indicative sizes based on common practice. Our engineers finalise the design after studying your site, milk
          collection and product mix.
        </p>
        <a
          href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noreferrer"
          className="btn-primary mt-5 w-full"
        >
          <MessageCircle className="h-4 w-4" /> Send this plan to our engineers
        </a>
      </div>
    </div>
  )
}
