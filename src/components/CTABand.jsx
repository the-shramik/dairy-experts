import { ArrowRight, Phone, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { company, tel } from '../data/site'
import { Reveal } from './Reveal'
import { asset } from '../lib/asset'

function ContactTile({ href, icon: I, label, value, iconClass }) {
  return (
    <a
      href={href}
      className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 text-white ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-white/15"
    >
      <span className={`grid h-11 w-11 place-items-center rounded-xl ${iconClass}`}>
        <I className="h-5 w-5" />
      </span>
      <span>
        <span className="block text-xs uppercase tracking-widest text-white/70">{label}</span>
        <span className="font-display text-base font-semibold sm:text-lg">{value}</span>
      </span>
    </a>
  )
}

export default function CTABand() {
  return (
    <section className="container-x">
      <Reveal className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-brand-500 via-brand-600 to-navy-800 px-5 py-10 sm:rounded-[2rem] sm:px-12 sm:py-14 lg:px-16 lg:py-16">
        <img
          src={asset('/images/logo-emblem.svg')}
          alt=""
          className="absolute -right-16 -top-16 -z-10 h-80 w-80 opacity-[0.08] lg:h-[28rem] lg:w-[28rem]"
        />
        <div className="absolute -bottom-24 -left-24 -z-10 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-[1.6rem] font-bold leading-[1.2] text-white sm:text-[2.1rem]">
              Planning a new plant or need a spare part urgently?
            </h2>
            <p className="mt-4 max-w-xl text-[15px] text-white/80 sm:text-base">
              Send us your plant capacity, product mix or part number. Our engineers will get back to you with the
              right solution.
            </p>
            <Link to="/contact" className="btn mt-8 bg-white text-navy-900 hover:-translate-y-0.5 hover:bg-ice-50">
              Request a Quote <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3">
            <ContactTile
              href={tel(company.phones.sales[0])}
              icon={Phone}
              label="Sales enquiry"
              value={company.phones.sales[0]}
              iconClass="bg-white text-brand-600"
            />
            <ContactTile
              href={tel(company.phones.service[0])}
              icon={Wrench}
              label="Service support"
              value={company.phones.service[0]}
              iconClass="bg-gold-400 text-navy-900"
            />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
