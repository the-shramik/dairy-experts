import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { faqs } from '../data/site'
import { Reveal } from './Reveal'
import SectionHeading from './SectionHeading'

export default function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="container-x py-16 sm:py-20 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions dairy owners"
          accent="often ask"
          text="Can't find your answer? Call our sales team or send us a WhatsApp message."
        />
        <Reveal className="divide-y divide-navy-900/8 rounded-2xl bg-white ring-1 ring-navy-900/8">
          {faqs.map((f, i) => {
            const on = open === i
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(on ? -1 : i)}
                  aria-expanded={on}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                >
                  <span className="font-display text-[15px] font-semibold text-navy-900 sm:text-base">{f.q}</span>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${on ? 'rotate-45 bg-brand-500 text-white' : 'bg-ice-100 text-brand-600'}`}>
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted sm:px-6">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
