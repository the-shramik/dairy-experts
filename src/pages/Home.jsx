import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowUpRight, BookOpen, CheckCircle2, Download, Droplets, HardHat, MapPin, PencilRuler, PlayCircle, ShieldCheck, Timer, Truck } from 'lucide-react'
import { useId, useRef } from 'react'
import { Link } from 'react-router-dom'
import CTABand from '../components/CTABand'
import Counter from '../components/Counter'
import HeroMedia from '../components/HeroMedia'
import Icon from '../components/Icon'
import MilkJourney from '../components/MilkJourney'
import { Reveal, Stagger, StaggerItem } from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import Wave from '../components/Wave'
import SpareCard from '../components/SpareCard'
import { company, heroVideo, machines, makes, partners, process, services, solutions, spareParts, stats } from '../data/site'
import { asset } from '../lib/asset'

const ease = [0.22, 1, 0.36, 1]

function RotatingBadge({ className = 'h-36 w-36' }) {
  const ring = `ring-${useId().replace(/:/g, '')}`
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 animate-[spin_24s_linear_infinite]" aria-hidden="true">
        <defs>
          <path id={ring} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-white font-display text-[14px] font-semibold uppercase">
          <textPath href={`#${ring}`} textLength="480" lengthAdjust="spacing">
            The Dairy Experts • Kolhapur • India •
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-[19%] grid place-items-center rounded-full bg-white shadow-2xl">
        <img src={asset('/images/logo-emblem.svg')} alt="" className="h-[68%] w-[68%]" />
      </div>
    </div>
  )
}

const steps = [
  { t: 'Design', i: PencilRuler },
  { t: 'Erection', i: HardHat },
  { t: 'Commission', i: PlayCircle },
]

// Glass card. Never animate opacity/clip-path on it or its parents: browsers switch the
// backdrop blur off until such an animation ends, which makes the blur "pop" in.
// Instead the blur strength and glass tint are animated directly.
function TurnkeyCard() {
  const fade = (d) => ({ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: d, ease } })
  return (
    <motion.div
      initial={{ y: 40, backdropFilter: 'blur(0px)', WebkitBackdropFilter: 'blur(0px)', backgroundColor: 'rgba(255,255,255,0)', borderColor: 'rgba(255,255,255,0)' }}
      animate={{ y: 0, backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)', backgroundColor: 'rgba(255,255,255,0.10)', borderColor: 'rgba(255,255,255,0.18)' }}
      transition={{ duration: 1.4, delay: 0.4, ease }}
      className="w-[22rem] overflow-hidden rounded-3xl border text-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]"
    >
      <motion.div {...fade(0.7)} className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-2.5">
          <img src={asset('/images/logo-emblem.svg')} alt="" className="h-8 w-8" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-sky-300">Turnkey projects</span>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Pan-India
        </span>
      </motion.div>
      <div className="px-6 pb-6 pt-5">
        <motion.div {...fade(0.85)}>
          <p className="text-xs font-medium text-white/60">Plant capacity (litres per day)</p>
          <div className="mt-1.5 flex items-baseline gap-2 font-display font-bold tracking-tight">
            <span className="text-[1.7rem]">1,000</span>
            <span className="text-sm font-semibold text-white/50">to</span>
            <span className="text-[1.7rem] text-sky-300">10,00,000</span>
          </div>
        </motion.div>
        <motion.div {...fade(1)}>
          <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-sky-200 via-sky-300 to-brand-500"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.6, delay: 1.2, ease }}
            />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] font-medium text-white/55">
            <span>Village chilling</span>
            <span>Mega dairy</span>
          </div>
        </motion.div>

        <ol className="relative mt-6 grid grid-cols-3">
          <span className="absolute left-[16.6%] right-[16.6%] top-5 h-px bg-white/15" aria-hidden="true" />
          {steps.map(({ t, i: I }, k) => (
            <motion.li key={t} {...fade(1.3 + k * 0.15)} className="relative flex flex-col items-center gap-2 text-center">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-sky-300 ring-1 ring-white/20">
                <I className="h-[18px] w-[18px]" />
              </span>
              <span className="text-xs font-semibold text-white/90">{t}</span>
            </motion.li>
          ))}
        </ol>
      </div>
      <motion.div {...fade(1.7)}>
        <Link
          to="/projects#planner"
          className="group flex items-center justify-between border-t border-white/10 bg-white/[0.06] px-6 py-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-white/15"
        >
          Plan your plant in a minute
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </motion.div>
  )
}

function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  const line = (d) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: d, ease },
  })

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-navy-950">
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <HeroMedia
          poster={asset('/images/hero-plant.webp')}
          video={heroVideo}
          alt="Modern dairy processing plant with separator, homogenizer and pasteurizer"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-900/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />

      <div className="container-x relative grid min-h-[100svh] items-center gap-10 pb-36 pt-32 sm:pb-40 lg:grid-cols-[1.25fr_1fr] lg:pt-44">
        <div>
          <motion.span {...line(0.1)} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-sky-200">
            <MapPin className="h-3.5 w-3.5" /> Kolhapur, Maharashtra · Serving all of India
          </motion.span>
          <motion.h1 {...line(0.2)} className="mt-6 text-[2.1rem] font-extrabold leading-[1.1] tracking-[-0.025em] text-white sm:text-5xl lg:text-[3.4rem] xl:text-[3.9rem]">
            The Ultimate Destination for{' '}
            <span className="relative whitespace-nowrap text-sky-300">
              Complete Dairy
              <svg viewBox="0 0 300 12" className="absolute -bottom-2 left-0 w-full" aria-hidden="true" preserveAspectRatio="none">
                <motion.path
                  d="M2 8 C 75 2, 150 2, 298 7"
                  fill="none"
                  stroke="#f2c45a"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 1, ease }}
                />
              </svg>
            </span>{' '}
            Solutions
          </motion.h1>
          <motion.p {...line(0.35)} className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/75 sm:text-[17px]">
            Machinery supply, spare parts, turnkey plants and on-site engineering for milk pasteurizers,
            centrifugal separators, high-pressure homogenizers and butter machines.
          </motion.p>
          <motion.div {...line(0.5)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link to="/services" className="btn-primary">
              Explore Solutions <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="flex flex-col items-stretch gap-2 sm:items-start">
              <a href={company.brochure} download className="btn-ghost">
                <Download className="h-4 w-4" /> Download Brochure
              </a>
              <a href={asset('/brochure')} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 py-1 text-[13px] font-semibold text-sky-200 hover:text-white sm:justify-start sm:pl-2">
                <BookOpen className="h-4 w-4" /> View Brochure
              </a>
            </div>
          </motion.div>
          {/* Checklist + (phones/tablets) logo badge side by side, in normal flow so they can never overlap */}
          <div className="mt-8 flex items-end justify-between gap-3 sm:mt-10">
            <motion.ul {...line(0.65)} className="flex min-w-0 flex-col gap-y-2.5 text-[13px] text-white/70 sm:text-sm lg:flex-row lg:flex-wrap lg:gap-x-6">
              {['Erection & Commissioning', 'Project Layouts & Design', 'On-site Reconditioning'].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" /> {t}
                </li>
              ))}
            </motion.ul>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.9, ease }}
              className="pointer-events-none shrink-0 lg:hidden"
            >
              <div className="animate-float">
                <RotatingBadge className="h-24 w-24 sm:h-28 sm:w-28" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative hidden justify-self-end lg:block">
          <TurnkeyCard />
          <div className="hero-badge-desktop absolute -bottom-40 -left-20 animate-float xl:bottom-auto xl:-left-60 xl:top-6">
            <RotatingBadge />
          </div>
        </div>
      </div>

      <Wave />
    </section>
  )
}

function StatsStrip() {
  return (
    <section className="container-x relative z-10 -mt-12 sm:-mt-16">
      <Stagger className="card grid grid-cols-2 divide-navy-900/5 overflow-hidden lg:grid-cols-4 lg:divide-x">
        {stats.map((s) => (
          <StaggerItem key={s.label} className="border-navy-900/5 px-3 py-5 text-center odd:border-r max-lg:[&:nth-child(-n+2)]:border-b sm:p-7 lg:border-0">
            <div className="whitespace-nowrap font-display text-[1.6rem] font-bold text-navy-900 sm:text-[2.1rem]">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <p className="mt-1.5 text-[11px] font-medium leading-snug text-muted sm:text-sm">{s.label}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}

function Makes() {
  return (
    <section className="py-8 sm:py-14">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted">
        Spares & service expertise across leading equipment makes
      </p>
      <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max animate-marquee gap-14 hover:[animation-play-state:paused]">
          {[...makes, ...makes].map((m, i) => (
            <span key={i} className="whitespace-nowrap font-display text-2xl font-bold text-navy-900/25 transition-colors hover:text-brand-500">
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutPreview() {
  return (
    <section className="container-x grid items-center gap-14 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
      <Reveal x={-30} y={0} className="relative">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] sm:aspect-[5/5]">
          <img src={asset('/images/plant-hall.webp')} alt="Dairy processing plant by The Dairy Experts" className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="absolute -bottom-8 -right-2 w-36 overflow-hidden rounded-2xl border-[5px] border-white shadow-2xl sm:-right-8 sm:w-64 sm:border-[6px]">
          <img src={asset('/images/homogenizer-skid.webp')} alt="High pressure homogenizer" className="aspect-[4/3] w-full object-cover" loading="lazy" />
        </div>
        <div className="absolute -left-3 top-8 hidden items-center gap-3 sm:flex rounded-2xl bg-white p-3 pr-5 shadow-xl sm:-left-8">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-ice-100 text-brand-600">
            <Droplets className="h-5 w-5" />
          </span>
          <span className="text-sm">
            <span className="block font-display font-bold text-navy-900">Rooted in Kolhapur</span>
            <span className="text-muted">India's dairy heartland</span>
          </span>
        </div>
      </Reveal>

      <div>
        <SectionHeading
          eyebrow="About The Dairy Experts"
          title="Engineering the future of"
          accent="Indian dairy"
          text="A premier engineering and solutions provider specializing in the sourcing, maintenance and optimization of critical plant machinery, with deep expertise in pasteurizers, centrifugal separators and high-pressure homogenizers."
        />
        <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { i: Timer, t: 'Minimal downtime', d: 'Rapid spares & on-site response' },
            { i: ShieldCheck, t: 'Hygiene standards', d: 'Built to strict dairy norms' },
            { i: Truck, t: 'Pan-India reach', d: 'Deployed across all states' },
            { i: Droplets, t: 'End-to-end', d: 'From layout to commissioning' },
          ].map(({ i: I, t, d }) => (
            <StaggerItem key={t} className="flex gap-4 rounded-2xl border border-navy-900/5 bg-ice-50 p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-brand-500 shadow-sm">
                <I className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-sm font-bold text-navy-900">{t}</span>
                <span className="text-sm text-muted">{d}</span>
              </span>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={0.2}>
          <Link to="/about" className="btn-navy mt-9">
            More about us <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

function ServicesGrid() {
  return (
    <section className="relative bg-ice-50 py-16 sm:py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="What we do" title="End-to-end solutions for" accent="dairy plants" />
          <Reveal>
            <Link to="/services" className="btn-outline">
              All services <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <Stagger className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {services.map((s, idx) => (
            <StaggerItem key={s.id} className={idx === 0 ? 'lg:row-span-2' : ''}>
              <Link
                to={`/services#${s.id}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-5 ring-1 ring-navy-900/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(6,38,82,0.3)]"
              >
                {idx === 0 && (
                  <div className="-mx-5 -mt-5 mb-5 aspect-[16/9] overflow-hidden sm:-mx-7 sm:-mt-7 sm:mb-7 lg:aspect-auto lg:flex-1">
                    <img src={s.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                )}
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-ice-100 text-brand-600 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white sm:h-12 sm:w-12">
                  <Icon name={s.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 text-[17px] font-bold sm:mt-6 sm:text-lg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-brand-600 sm:mt-6 sm:text-sm">
                  Learn more <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-500 to-sky-300 transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

function MachineShowcase() {
  return (
    <section className="container-x py-16 sm:py-20 lg:py-28">
      <SectionHeading
        align="center"
        eyebrow="Equipment we supply"
        title="Dairy machinery"
        accent="we supply"
        text="Homogenizers, separators, pasteurizers, high-pressure pumps and chilling systems, with spares and service support."
      />
      <Stagger className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 lg:grid-cols-4 lg:grid-rows-2">
        {machines.map((m, i) => (
          <StaggerItem key={m.name} className={i === 0 ? 'col-span-2 lg:row-span-2' : ''}>
            <Link
              to="/services#supply"
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-b from-ice-50 to-ice-100 p-4 ring-1 ring-navy-900/5 sm:rounded-3xl sm:p-6"
            >
              <div className="absolute left-1/2 top-[45%] aspect-square w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 blur-2xl transition-transform duration-700 group-hover:scale-110" />
              <div className={`relative flex flex-1 items-center justify-center ${i === 0 ? 'min-h-56 py-4 sm:min-h-72 lg:min-h-0' : 'min-h-28 sm:min-h-44'}`}>
                <img
                  src={m.image}
                  alt={m.name}
                  loading="lazy"
                  className={`w-auto object-contain drop-shadow-[0_20px_25px_rgba(6,38,82,0.25)] transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-105 ${
                    i === 0 ? 'max-h-56 sm:max-h-80 lg:max-h-[22rem]' : 'max-h-24 sm:max-h-40'
                  }`}
                />
              </div>
              <div className="relative mt-4 flex items-end justify-between gap-4">
                <div>
                  <span className="hidden text-[11px] font-semibold uppercase tracking-widest text-brand-600 sm:block">{m.tag}</span>
                  <h3 className={`mt-1 font-semibold leading-snug ${i === 0 ? 'text-lg sm:text-2xl' : 'text-[13px] sm:text-base'}`}>{m.name}</h3>
                </div>
                <span className="hidden h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-navy-900 shadow-sm transition-all duration-500 group-hover:bg-navy-900 group-hover:text-white sm:grid">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}

function Turnkey() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-24 text-white lg:py-32">
      <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-1/2">
        <img src={asset('/images/aerial-plant.webp')} alt="" loading="lazy" className="h-full w-full object-cover opacity-40 lg:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/70 to-transparent" />
      </div>
      <Wave flip color="#ffffff" />
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div className="min-w-0">
          <SectionHeading
            light
            eyebrow="Turnkey dairy projects"
            title="Complete dairy plants,"
            accent="one destination"
            text="Project layouts, designs, consultation, erection and commissioning, all handled by one team."
          />
          <Reveal delay={0.1} className="mt-10 flex items-end gap-4">
            <span className="font-display text-[2.6rem] font-bold leading-none tracking-tight text-white sm:text-6xl">
              <Counter value={1000000} />
            </span>
            <span className="pb-2 text-sm text-white/60">
              LPD
              <br />
              max capacity
            </span>
          </Reveal>
          <Reveal delay={0.15} className="mt-3 text-sm text-white/60">
            Plants from 1,000 LPD to 10,00,000 LPD
          </Reveal>

          <Reveal delay={0.2} className="mt-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Product lines we set up</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {solutions.map((s) => (
                <span key={s} className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/85 transition hover:border-sky-300 hover:text-white">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link to="/projects#planner" className="btn-primary">
                Plan your plant <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/projects" className="btn-ghost">
                View projects
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
      <Wave />
    </section>
  )
}

function Process() {
  return (
    <section className="container-x py-16 sm:py-20 lg:py-28">
      <SectionHeading align="center" eyebrow="How we work" title="Our project" accent="process" />
      <div className="relative mt-12 sm:mt-16">
        <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-0.5 bg-ice-100 lg:block">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-brand-500 to-sky-300"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1.6, ease }}
          />
        </div>
        <Stagger gap={0.18} className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {process.map((p, i) => (
            <StaggerItem key={p.title} className="relative text-center">
              <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-full bg-white font-display text-lg font-bold text-brand-600 shadow-[0_0_0_8px_#f3f9fc] ring-2 ring-brand-500">
                0{i + 1}
              </span>
              <h3 className="mt-5 text-[15px] font-bold sm:text-lg">{p.title}</h3>
              <p className="mx-auto mt-2 max-w-60 text-[13px] leading-relaxed text-muted sm:text-sm">{p.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}

const featuredSpares = ['valve-block', 'bowl', 'pistons', 'phe-plate', 'connecting-rods', 'disc-stack', 'gears', 'pump-head'].map(
  (k) => spareParts.find((p) => p.img?.endsWith(`sp-${k}.webp`)),
)

function SparesShowcase() {
  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Spare parts"
            title="Spares for homogenizers,"
            accent="separators & PHE"
            text="Matched-set parts for critical dairy machines, supplied from Kolhapur to plants across India."
          />
          <Reveal>
            <Link to="/spare-parts" className="btn-navy">
              View all spare parts <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {featuredSpares.map((p, i) => (
            <Reveal key={p.name} delay={(i % 4) * 0.06} className="w-[58%] shrink-0 snap-start sm:w-auto">
              <Link to="/spare-parts" className="block h-full">
                <SpareCard part={p} compact />
              </Link>
            </Reveal>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted sm:hidden">Swipe to see more parts</p>
      </div>
    </section>
  )
}

function Partners() {
  return (
    <section className="container-x py-16 sm:py-20 lg:py-28">
      <SectionHeading align="center" eyebrow="Our network" title="Partners &" accent="group companies" />
      <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 lg:grid-cols-[1fr_1.6fr]">
        <Reveal className="card p-5 sm:p-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Authorised For</span>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-4 lg:grid-cols-1">
            {partners.marketing.map((p) => (
              <div key={p.name} className="flex h-20 items-center justify-center rounded-2xl bg-ice-50 px-3 text-center sm:h-24 sm:px-6">
                {p.logo ? (
                  <img src={p.logo} alt={p.name} loading="lazy" className="max-h-9 w-auto sm:max-h-12" />
                ) : (
                  <span className="font-display text-sm font-bold text-navy-900 sm:text-lg">{p.name}</span>
                )}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1} className="card p-5 sm:p-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Dairy Experts group companies</span>
          <div className="mt-5 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-4">
            {partners.group.map((p) => (
              <div key={p.name} className="group flex flex-col items-center justify-center gap-2 rounded-xl bg-ice-50 p-3 text-center transition hover:bg-white hover:shadow-lg sm:gap-4 sm:rounded-2xl sm:p-6">
                <div className="flex h-12 items-center sm:h-20">
                  <img src={p.logo} alt={p.name} loading="lazy" className="max-h-10 w-auto mix-blend-multiply transition-transform duration-500 group-hover:scale-105 sm:max-h-16" />
                </div>
                <span className="text-[11px] font-semibold leading-tight text-navy-900 sm:text-sm">{p.name}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Makes />
      <AboutPreview />
      <ServicesGrid />
      <SparesShowcase />
      <MachineShowcase />
      <MilkJourney />
      <Turnkey />
      <Process />
      <Partners />
      <CTABand />
    </>
  )
}
