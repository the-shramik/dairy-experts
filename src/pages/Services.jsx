import { ArrowRight, Check, Milk, Package } from 'lucide-react'
import { Link } from 'react-router-dom'
import CTABand from '../components/CTABand'
import Icon from '../components/Icon'
import PageHero from '../components/PageHero'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import SpareCard from '../components/SpareCard'
import { equipment, machines, services, spareParts, tradingProducts } from '../data/site'
import { asset } from '../lib/asset'

const tabs = [
  { href: '#services', label: 'Services' },
  { href: '#supply', label: 'Equipment Supply' },
  { href: '#spares-list', label: 'Spare Parts' },
  { href: '#trading', label: 'Trading' },
]

function SubNav() {
  return (
    <div className="sticky top-16 z-30 border-b border-navy-900/5 bg-white/90 backdrop-blur-xl">
      <div className="container-x flex gap-1 overflow-x-auto py-3 [scrollbar-width:none]">
        {tabs.map((t) => (
          <a
            key={t.href}
            href={t.href}
            className="whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-navy-900/70 transition hover:bg-ice-100 hover:text-navy-900"
          >
            {t.label}
          </a>
        ))}
      </div>
    </div>
  )
}

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services & Supply"
        title="Dairy machinery, spares"
        accent="and service"
        text="Machinery sourcing, spare parts, consultancy, installation and on-site reconditioning for dairy plants."
        image={asset('/images/homogenizer-unit.webp')}
      />
      <SubNav />

      {/* Services */}
      <section id="services" className="container-x scroll-mt-32 py-14 sm:py-16 lg:py-24">
        <SectionHeading eyebrow="Our services" title="Engineering support across the" accent="dairy value chain" />
        <div className="mt-12 space-y-16 sm:mt-16 sm:space-y-20 lg:space-y-28">
          {services.map((s, i) => (
            <article id={s.id} key={s.id} className="grid scroll-mt-36 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal x={i % 2 ? 30 : -30} y={0} className={`relative ${i % 2 ? 'lg:order-2' : ''}`}>
                <div className="overflow-hidden rounded-2xl sm:rounded-[2rem]">
                  <img src={s.image} alt={s.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-1000 hover:scale-105" />
                </div>
                <span className={`absolute -bottom-6 grid h-16 w-16 place-items-center rounded-2xl bg-brand-500 text-white shadow-xl shadow-brand-500/30 ${i % 2 ? '-left-3 sm:-left-6' : '-right-3 sm:-right-6'}`}>
                  <Icon name={s.icon} className="h-7 w-7" />
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <span className="font-display text-sm font-bold text-brand-500">0{i + 1}</span>
                <h3 className="mt-2 text-[1.4rem] font-bold sm:text-[1.75rem]">{s.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">{s.body}</p>
                <ul className="mt-6 space-y-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm font-medium text-navy-900">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-ice-100 text-brand-600">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="btn-outline mt-8">
                  Enquire now <ArrowRight className="h-4 w-4" />
                </Link>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      {/* Supply */}
      <section id="supply" className="scroll-mt-32 bg-ice-50 py-16 sm:py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Equipment supply"
            title="Sales of complete"
            accent="dairy machinery"
            text="New and reconditioned processing equipment, plus all types of spares for the equipment we supply."
          />
          <Stagger className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
            {machines.map((m) => (
              <StaggerItem key={m.name} className="group rounded-2xl bg-white p-4 ring-1 ring-navy-900/5 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="flex h-28 items-center justify-center sm:h-36">
                  <img src={m.image} alt={m.name} loading="lazy" className="max-h-24 w-auto object-contain sm:max-h-32 drop-shadow-lg transition-transform duration-500 group-hover:scale-105" />
                </div>
                <h4 className="mt-4 text-sm font-bold">{m.name}</h4>
                <p className="text-xs text-muted">{m.tag}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Stagger gap={0.04} className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {equipment.map((e) => (
              <StaggerItem key={e} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 text-sm font-medium text-navy-900 ring-1 ring-navy-900/5">
                <Package className="h-4 w-4 shrink-0 text-brand-500" /> {e}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Spares */}
      <section id="spares-list" className="container-x scroll-mt-32 py-16 sm:py-16 sm:py-20 lg:py-28">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Spare parts"
            title="Spare parts for"
            accent="dairy machinery"
            text="Matched-set components for homogenizers, high-pressure pumps, separators, clarifiers and plate heat exchangers."
          />
          <Reveal>
            <Link to="/spare-parts" className="btn-navy">
              Full spare parts catalogue <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <Stagger className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
          {spareParts.slice(0, 8).map((p) => (
            <StaggerItem key={p.name}>
              <SpareCard part={p} />
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-8 rounded-2xl border border-dashed border-brand-500/40 bg-ice-50 p-5 text-center text-sm text-muted sm:p-6">
          Part not listed? Send us the machine make, model and part number and we will source it.{' '}
          <Link to="/contact" className="font-semibold text-brand-600 hover:underline">
            Send a spare enquiry
          </Link>
        </Reveal>
      </section>

      {/* Trading */}
      <section id="trading" className="container-x scroll-mt-32 pb-20">
        <Reveal className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-navy-900 p-8 text-white sm:p-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-sky-300">
              <Milk className="h-7 w-7" />
            </span>
            <h3 className="mt-6 text-2xl font-bold text-white sm:text-3xl">Specialties Trading</h3>
            <p className="mt-3 text-white/70">We also trade in quality milk products and milk-related products.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {tradingProducts.map((p) => (
              <span key={p} className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-medium ring-1 ring-white/15">
                {p}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      <CTABand />
    </>
  )
}
