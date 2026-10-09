import { AnimatePresence, motion } from 'framer-motion'
import { Clock, PackageCheck, Search, ShieldCheck, Truck } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import CTABand from '../components/CTABand'
import MachineDiagram from '../components/MachineDiagram'
import PageHero from '../components/PageHero'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import SpareCard from '../components/SpareCard'
import { makes, moreSpares, spareCategories, spareParts } from '../data/site'
import { asset } from '../lib/asset'

const tabs = [{ id: 'all', label: 'All Parts' }, ...spareCategories]

const promises = [
  { i: PackageCheck, t: 'Matched-set parts', d: 'Made to fit your machine model' },
  { i: Clock, t: 'Quick sourcing', d: 'Critical spares to cut downtime' },
  { i: Truck, t: 'Pan-India dispatch', d: 'Shipped from Kolhapur' },
  { i: ShieldCheck, t: 'Fitment support', d: 'Our engineers help on site' },
]

export default function SpareParts() {
  const [cat, setCat] = useState('all')
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    const term = q.trim().toLowerCase()
    return spareParts.filter((p) => (cat === 'all' || p.cat === cat) && (!term || p.name.toLowerCase().includes(term)))
  }, [cat, q])

  return (
    <>
      <PageHero
        eyebrow="Spare Parts"
        title="Spare parts for"
        accent="dairy machinery"
        text="Homogenizer, high-pressure pump, separator, clarifier and PHE spares. Send us the machine make, model and part name and we will quote quickly."
        image={asset('/images/spares-workshop.webp')}
      />

      <section className="container-x -mt-10 relative z-10 sm:-mt-14">
        <Stagger className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {promises.map(({ i: I, t, d }) => (
            <StaggerItem key={t} className="card flex flex-col items-start gap-3 p-4 sm:flex-row sm:p-5">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ice-100 text-brand-600">
                <I className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-[13px] font-semibold text-navy-900 sm:text-sm">{t}</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-muted">{d}</span>
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="container-x pt-14 sm:pt-20">
        <SectionHeading eyebrow="Know your machine" title="Not sure of the part name?" accent="Point to it." />
        <Reveal className="mt-8">
          <MachineDiagram
            onShow={(name) => {
              setCat('all')
              setQ(name)
              document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
          />
        </Reveal>
      </section>

      <section id="catalogue" className="container-x scroll-mt-24 py-14 sm:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="Catalogue" title="Browse our" accent="spare parts" />
          <label className="relative block w-full lg:w-80">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search a part, e.g. plunger"
              className="w-full rounded-full border border-navy-900/10 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10"
              aria-label="Search spare parts"
            />
          </label>
        </div>

        <div className="-mx-4 mt-8 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
          <div className="flex w-max gap-2">
            {tabs.map((t) => {
              const count = t.id === 'all' ? spareParts.length : spareParts.filter((p) => p.cat === t.id).length
              return (
                <button
                  key={t.id}
                  onClick={() => setCat(t.id)}
                  className={`relative whitespace-nowrap rounded-full px-4 py-2.5 text-[13px] font-medium transition-colors sm:px-5 sm:text-sm ${
                    cat === t.id ? 'text-white' : 'bg-white text-navy-900 ring-1 ring-navy-900/10 hover:ring-brand-500'
                  }`}
                >
                  {cat === t.id && (
                    <motion.span layoutId="spare-pill" className="absolute inset-0 rounded-full bg-navy-900" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                  )}
                  <span className="relative">
                    {t.label} <span className="opacity-60">({count})</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <motion.div layout className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.div
                layout
                key={p.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <SpareCard part={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && (
          <p className="mt-10 rounded-2xl bg-ice-50 p-8 text-center text-sm text-muted">
            No photo for this part yet, but we can still source it.{' '}
            <Link to="/contact" className="font-semibold text-brand-600 hover:underline">
              Send an enquiry
            </Link>
          </p>
        )}
      </section>

      <section className="bg-ice-50 py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading
            eyebrow="Also available"
            title="More parts on"
            accent="request"
            text="Share the part number or a photo of the old part. We source parts for most homogenizer, separator and PHE models used in Indian dairies."
          />
          <Reveal className="flex flex-wrap content-start gap-2">
            {moreSpares.map((s) => (
              <span key={s} className="rounded-full bg-white px-4 py-2 text-[13px] font-medium text-navy-900 ring-1 ring-navy-900/8">
                {s}
              </span>
            ))}
          </Reveal>
        </div>
        <div className="container-x mt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Makes we source spares for</p>
          <div className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
            {makes.map((m) => (
              <span key={m} className="font-display text-base font-semibold text-navy-900/40 sm:text-lg">
                {m}
              </span>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-muted">Brand names belong to their respective owners and are used only to show compatibility.</p>
        </div>
      </section>

      <div className="pt-20">
        <CTABand />
      </div>
    </>
  )
}
