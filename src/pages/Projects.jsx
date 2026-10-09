import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ClipboardList, Expand, HardHat, PencilRuler, PlayCircle, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import CTABand from '../components/CTABand'
import Counter from '../components/Counter'
import PageHero from '../components/PageHero'
import PlantPlanner from '../components/PlantPlanner'
import VideoGallery from '../components/VideoGallery'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { gallery, solutions } from '../data/site'
import { asset } from '../lib/asset'

const capabilities = [
  { i: ClipboardList, t: 'Consultation', d: 'Feasibility, product mix and capacity planning.' },
  { i: PencilRuler, t: 'Layouts & Design', d: 'Plant layouts, process flow and utilities design.' },
  { i: HardHat, t: 'Erection', d: 'Equipment installation, SS piping and utilities.' },
  { i: PlayCircle, t: 'Commissioning', d: 'Trial runs, operator training and handover.' },
]

const cats = ['All', ...new Set(gallery.map((g) => g.cat))]

function Lightbox({ items, index, onClose, onMove }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onMove(1)
      if (e.key === 'ArrowLeft') onMove(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onMove])

  const it = items[index]
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/95 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={it.title}
    >
      <button className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Close">
        <X className="h-5 w-5" />
      </button>
      <button
        onClick={(e) => (e.stopPropagation(), onMove(-1))}
        className="absolute left-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={(e) => (e.stopPropagation(), onMove(1))}
        className="absolute right-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      <motion.figure key={it.src} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <img src={it.src} alt={it.title} className="max-h-[78vh] w-auto rounded-2xl object-contain" />
        <figcaption className="mt-4 text-center text-sm text-white/80">
          <span className="mr-2 rounded-full bg-brand-500 px-2.5 py-0.5 text-xs text-white">{it.cat}</span>
          {it.title}
        </figcaption>
      </motion.figure>
    </motion.div>
  )
}

export default function Projects() {
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState(null)
  const items = cat === 'All' ? gallery : gallery.filter((g) => g.cat === cat)
  const move = useCallback((d) => setOpen((i) => (i + d + items.length) % items.length), [items.length])
  const close = useCallback(() => setOpen(null), [])

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Turnkey dairy projects from"
        accent="1,000 to 10,00,000 LPD"
        text="Complete dairy projects, erection and commissioning, project layouts, designs and consultation at one destination."
        image={asset('/images/aerial-plant.webp')}
      />

      {/* Capacity + capabilities */}
      <section className="container-x grid gap-12 py-16 lg:grid-cols-[1fr_1.3fr] lg:py-24">
        <div>
          <SectionHeading eyebrow="Turnkey capability" title="From plant layout" accent="to commissioning" />
          <Reveal delay={0.1} className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4">
            <div className="rounded-2xl bg-ice-50 p-5 sm:p-6">
              <p className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">
                <Counter value={1000} />
              </p>
              <p className="mt-1 text-sm text-muted">LPD starting capacity</p>
            </div>
            <div className="rounded-2xl bg-navy-900 p-5 text-white sm:p-6">
              <p className="font-display text-2xl font-bold sm:text-3xl">
                <Counter value={1000000} />
              </p>
              <p className="mt-1 text-sm text-white/60">LPD for large plants</p>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Solutions we deliver</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {solutions.map((s) => (
                <span key={s} className="rounded-full bg-ice-100 px-3.5 py-1.5 text-sm font-medium text-navy-900">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid gap-5">
          <Reveal className="group relative overflow-hidden rounded-[2rem] bg-white ring-1 ring-navy-900/5">
            <img src={asset('/images/plant-layout.webp')} alt="Dairy processing plant layout drawing" loading="lazy" className="aspect-[16/9] w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
            <div className="absolute inset-x-4 bottom-4 rounded-xl bg-white/95 px-4 py-3 text-sm">
              <span className="font-display font-semibold text-navy-900">In-house plant layout & process design</span>
            </div>
          </Reveal>
          <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {capabilities.map(({ i: I, t, d }) => (
              <StaggerItem key={t} className="card p-5">
                <I className="h-6 w-6 text-brand-500" />
                <h4 className="mt-3 text-sm font-bold">{t}</h4>
                <p className="mt-1 text-xs leading-relaxed text-muted">{d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Planner */}
      <section id="planner" className="container-x scroll-mt-24 pb-16 sm:pb-20 lg:pb-28">
        <SectionHeading
          eyebrow="Plant planner"
          title="Size your dairy plant"
          accent="in a minute"
          text="Choose your daily milk volume, working hours and products. You get an indicative equipment list you can send straight to our engineers."
        />
        <Reveal className="mt-10">
          <PlantPlanner />
        </Reveal>
      </section>

      {/* Gallery */}
      <section className="bg-ice-50 py-16 sm:py-20 lg:py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Gallery" title="Plants, lines &" accent="installations" />
            <div className="flex flex-wrap gap-2">
              {cats.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${cat === c ? 'text-white' : 'bg-white text-navy-900 ring-1 ring-navy-900/10 hover:ring-brand-500'}`}
                >
                  {cat === c && <motion.span layoutId="cat-pill" className="absolute inset-0 -z-0 rounded-full bg-navy-900" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  <span className="relative">{c}</span>
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="mt-12 grid grid-flow-dense auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {items.map((g, i) => (
                <motion.button
                  layout
                  key={g.src}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setOpen(i)}
                  className={`group relative overflow-hidden rounded-2xl text-left ${i % 5 === 0 ? 'sm:row-span-2' : ''}`}
                >
                  <img src={g.src} alt={g.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-white">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-sky-300">{g.cat}</span>
                      <p className="font-display font-semibold">{g.title}</p>
                    </div>
                    <Expand className="h-5 w-5 shrink-0 translate-y-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100" />
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <VideoGallery />

      <AnimatePresence>{open !== null && <Lightbox items={items} index={open} onClose={close} onMove={move} />}</AnimatePresence>

      <div className="pt-20">
        <CTABand />
      </div>
    </>
  )
}
