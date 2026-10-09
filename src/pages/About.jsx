import { Compass, Eye, Gauge, HeartHandshake, MapPin, ShieldCheck, Sparkles, Target } from 'lucide-react'
import CTABand from '../components/CTABand'
import IndiaMap from '../components/IndiaMap'
import PageHero from '../components/PageHero'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { company, partners } from '../data/site'
import { asset } from '../lib/asset'

const specialties = [
  {
    t: 'Specialized Machinery Solutions',
    d: 'Deep expertise in the critical machinery at the heart of any dairy plant, from high-capacity centrifugal separators to advanced high-pressure homogenizers.',
  },
  {
    t: 'Precision Spare Parts & Sourcing',
    d: 'Rapid sourcing and supply of highly specific, matched-set industrial components such as drive gears and wheels, keeping heavy machinery reliable.',
  },
  {
    t: 'Engineering & Maintenance Support',
    d: 'Comprehensive maintenance strategies and hands-on troubleshooting, working closely with plant managers on upgrades and preventive maintenance.',
  },
  {
    t: 'End-to-End Operational Consultancy',
    d: 'Strategic insight to modernize dairy facilities, bridging traditional processing with scalable, modern technology for sustainable growth.',
  },
]

const values = [
  { i: Gauge, t: 'Peak efficiency', d: 'Plants tuned to run at maximum throughput.' },
  { i: ShieldCheck, t: 'Uncompromised hygiene', d: 'Strictest dairy hygiene standards, always.' },
  { i: HeartHandshake, t: 'Partnership', d: 'We work alongside producers and processors.' },
  { i: Sparkles, t: 'Innovation', d: 'Modern, scalable production technologies.' },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Your trusted partner in"
        accent="modern dairy"
        text="Rooted in the industrial heartland of Kolhapur, we empower the Indian dairy sector with reliable infrastructure, precision engineering and specialized technical support."
        image={asset('/images/process-hall.webp')}
      />

      {/* Story */}
      <section className="container-x grid gap-14 py-16 lg:grid-cols-12 lg:py-24">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Who we are" title="Reliable infrastructure is the" accent="backbone of dairy" />
          <Reveal delay={0.1} className="mt-10 grid grid-cols-2 gap-4">
            <img src={asset('/images/silo-branded.webp')} alt="Milk storage silo" loading="lazy" className="aspect-[3/4] w-full rounded-2xl object-cover" />
            <img src={asset('/images/phe-plates.webp')} alt="Plate heat exchanger plates" loading="lazy" className="mt-10 aspect-[3/4] w-full rounded-2xl object-cover" />
          </Reveal>
        </div>
        <Reveal delay={0.1} className="space-y-5 text-[15px] leading-relaxed text-muted sm:text-base lg:col-span-7 lg:pt-10 lg:text-[17px]">
          <p>
            <strong className="font-semibold text-navy-900">{company.name}</strong> is a premier engineering and
            solutions provider dedicated to empowering the Indian dairy sector. We specialize in the sourcing,
            maintenance and optimization of critical plant machinery, with deep technical expertise in advanced milk
            pasteurizers, centrifugal separators and high-pressure homogenizers.
          </p>
          <p>
            Our mission goes beyond equipment supply. We deliver comprehensive, end-to-end engineering solutions
            designed to maximize plant efficiency, minimize downtime and uphold the strictest hygiene standards.
            Whether you are upgrading legacy systems or optimizing daily operations, our team ensures your production
            lines run flawlessly.
          </p>
          <blockquote className="border-l-4 border-brand-500 bg-ice-50 py-4 pl-5 pr-4 font-display text-base font-semibold leading-snug text-navy-900 sm:py-5 sm:pl-6 sm:text-lg">
            "We bridge the gap between traditional practices and modern, scalable production technologies."
          </blockquote>
          <p>
            From conceptualizing cutting-edge dairy facilities to troubleshooting complex processing challenges, our
            services cover every aspect of the dairy value chain. We partner closely with producers and processors to
            enhance product quality, improve yield and drive sustainable growth.
          </p>
        </Reveal>
      </section>

      {/* Mission / Vision */}
      <section className="bg-ice-50 py-16 sm:py-20 lg:py-24">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <Reveal className="relative overflow-hidden rounded-3xl bg-navy-900 p-7 text-white sm:p-9 lg:p-12">
            <img src={asset('/images/logo-emblem.svg')} alt="" className="absolute -bottom-10 -right-10 h-56 w-56 opacity-10" />
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-sky-300">
              <Target className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-xl font-bold text-white sm:mt-6 sm:text-2xl">Our Mission</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-white/75 sm:text-base">
              To empower the Indian dairy sector by delivering precision engineering solutions, high-performance
              machinery and specialized technical support. We are committed to optimizing plant operations,
              minimizing downtime and ensuring peak efficiency and product quality every single day.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="card relative overflow-hidden p-7 sm:p-9 lg:p-12">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-ice-100 text-brand-600">
              <Eye className="h-6 w-6" />
            </span>
            <h3 className="mt-5 text-xl font-bold sm:mt-6 sm:text-2xl">Our Vision</h3>
            {/* TODO(client): confirm vision statement */}
            <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-base">
              To be India's most trusted single destination for complete dairy solutions, building plants that are
              efficient and hygienic, from village-level chilling centres to large processing facilities.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Specialties */}
      <section className="container-x py-16 sm:py-20 lg:py-28">
        <SectionHeading eyebrow="Our specialties" title="Where our expertise" accent="makes the difference" />
        <Stagger className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-navy-900/5 ring-1 ring-navy-900/5 md:grid-cols-2">
          {specialties.map((s, i) => (
            <StaggerItem key={s.t} className="group bg-white p-6 transition-colors hover:bg-ice-50 sm:p-8 lg:p-10">
              <span className="font-display text-4xl font-bold text-ice-100 sm:text-5xl transition-colors group-hover:text-sky-200">
                0{i + 1}
              </span>
              <h3 className="mt-3 text-lg font-bold sm:mt-4 sm:text-xl">{s.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted sm:text-base">{s.d}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Values */}
      <section className="container-x pb-20">
        <Stagger className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {values.map(({ i: I, t, d }) => (
            <StaggerItem key={t} className="card p-4 sm:p-6">
              <I className="h-6 w-6 text-brand-500 sm:h-7 sm:w-7" />
              <h4 className="mt-3 text-[15px] font-bold sm:mt-4 sm:text-base">{t}</h4>
              <p className="mt-1 text-[13px] text-muted sm:text-sm">{d}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Where we are */}
      <section className="relative isolate overflow-hidden bg-navy-900 py-20 text-white lg:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              light
              eyebrow="Where we are"
              title="Headquartered in"
              accent="Kolhapur"
              text="A region renowned for its rich agricultural heritage and thriving dairy industry. Our central location gives us the logistical advantage to swiftly deploy machinery, dispatch critical spare parts and send engineering teams to plants across Maharashtra and the rest of India."
            />
            <Reveal delay={0.1} className="mt-8 flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-sky-300" />
              <div className="text-sm leading-relaxed text-white/80">
                <span className="mb-1 block font-display font-semibold text-white">Head Office</span>
                {company.address.join(' ')}
              </div>
            </Reveal>
            <Reveal delay={0.15} className="mt-4 flex items-center gap-4 rounded-2xl bg-brand-500 p-5">
              <Compass className="h-8 w-8 shrink-0" />
              <p className="font-display text-lg font-semibold leading-snug">100% of our sales span all states of India</p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="mx-auto w-full max-w-lg rounded-3xl bg-white/[0.04] p-4 ring-1 ring-white/10 sm:p-6">
            <IndiaMap />
          </Reveal>
        </div>
      </section>

      {/* Group */}
      <section className="container-x py-16 sm:py-20 lg:py-28">
        <SectionHeading align="center" eyebrow="Our network" title="Group companies &" accent="partners" />
        <Stagger className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {[...partners.marketing.filter((p) => p.logo), ...partners.group].map((p) => (
            <StaggerItem key={p.name} className="card flex h-32 flex-col items-center justify-center gap-3 p-5">
              <img src={p.logo} alt={p.name} loading="lazy" className="max-h-12 w-auto mix-blend-multiply" />
              <span className="text-center text-xs font-medium text-muted">{p.name}</span>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CTABand />
    </>
  )
}
