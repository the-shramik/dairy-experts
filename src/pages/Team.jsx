import { Briefcase, Headset, Mail, Phone, Wrench } from 'lucide-react'
import CTABand from '../components/CTABand'
import PageHero from '../components/PageHero'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { company, team, tel } from '../data/site'
import { asset } from '../lib/asset'

const desks = [
  { i: Briefcase, t: 'Sales & Turnkey', d: 'New machinery, turnkey plants and quotations.', phones: company.phones.sales },
  { i: Wrench, t: 'Service & Spares', d: 'Breakdowns, maintenance, reconditioning and spares.', phones: company.phones.service },
]

export default function Team() {
  return (
    <>
      <PageHero
        eyebrow="Team"
        title="Our"
        accent="team"
        text="A team of industry specialists working with dairy plants across India: engineers, project leads and service technicians."
        image={asset('/images/spares-workshop.webp')}
      />

      <section className="container-x py-14 sm:py-16 lg:py-24">
        <SectionHeading align="center" eyebrow="Leadership & key people" title="Meet our" accent="experts" />
        <Stagger className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-6 lg:grid-cols-3">
          {team.map((m, i) => (
            <StaggerItem key={i}>
              <article className="group relative overflow-hidden rounded-2xl bg-white sm:rounded-3xl ring-1 ring-navy-900/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-25px_rgba(6,38,82,0.35)]">
                <div className="relative aspect-[4/4] overflow-hidden bg-gradient-to-b from-ice-100 to-ice-50">
                  <img src={m.photo} alt={`${m.name}, ${m.role}`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <img src={asset('/images/logo-emblem.svg')} alt="" className="absolute right-2.5 top-2.5 h-7 w-7 rounded-full bg-white p-0.5 shadow-md sm:right-4 sm:top-4 sm:h-10 sm:w-10 sm:p-1" />
                </div>
                <div className="relative p-4 sm:p-6">
                  <span className="absolute -top-0.5 left-4 h-1 w-10 sm:left-6 sm:w-12 rounded-full bg-brand-500 transition-all duration-500 group-hover:w-24" />
                  <h3 className="text-[15px] font-bold sm:text-lg">{m.name}</h3>
                  <p className="mt-0.5 text-xs font-medium text-brand-600 sm:mt-1 sm:text-sm">{m.role}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-ice-50 py-16 sm:py-20 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
          <SectionHeading
            eyebrow="Contact the right team"
            title="Dedicated teams for"
            accent="sales & service"
            text="Call our sales or service team directly. Each team has its own phone lines."
          />
          <Stagger className="grid gap-5 sm:grid-cols-2">
            {desks.map(({ i: I, t, d, phones }) => (
              <StaggerItem key={t} className="card p-7">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy-900 text-sky-300">
                  <I className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{t}</h3>
                <p className="mt-1 text-sm text-muted">{d}</p>
                <ul className="mt-5 space-y-2">
                  {phones.map((p) => (
                    <li key={p}>
                      <a href={tel(p)} className="flex items-center gap-2 text-sm font-semibold text-navy-900 hover:text-brand-600">
                        <Phone className="h-4 w-4 text-brand-500" /> {p}
                      </a>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="container-x py-20">
        <Reveal className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-navy-900/10 p-8 text-center sm:p-10 md:flex-row md:text-left">
          <div className="flex flex-col items-center gap-5 md:flex-row">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-ice-100 text-brand-600">
              <Headset className="h-7 w-7" />
            </span>
            <div>
              <h3 className="text-xl font-bold">Want to join The Dairy Experts?</h3>
              <p className="mt-1 text-sm text-muted">Dairy engineers and service technicians can send us their CV.</p>
            </div>
          </div>
          <a href={`mailto:${company.email}?subject=Career%20enquiry`} className="btn-navy shrink-0">
            <Mail className="h-4 w-4" /> Send your CV
          </a>
        </Reveal>
      </section>

      <CTABand />
    </>
  )
}
