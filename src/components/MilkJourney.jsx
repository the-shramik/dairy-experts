import { useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Chiller, Homogenizer, PHE, Separator, SiloPacking, Tanker } from './illustrations/Equipment'
import { Stagger, StaggerItem } from './Reveal'
import SectionHeading from './SectionHeading'

const stages = [
  { Art: Tanker, title: 'Reception', text: 'Milk tankers, testing and weighing at the dock.', supply: 'Milk reception', to: '/services#installation' },
  { Art: Chiller, title: 'Chilling', text: 'Bulk milk coolers bring milk down to 4°C.', supply: 'Bulk milk coolers', to: '/services#supply' },
  { Art: Separator, title: 'Separation', text: 'Cream separators and clarifiers standardize milk.', supply: 'Separators & spares', to: '/spare-parts' },
  { Art: PHE, title: 'Pasteurization', text: 'Plate heat exchangers heat-treat milk safely.', supply: 'PHE plates & gaskets', to: '/spare-parts' },
  { Art: Homogenizer, title: 'Homogenization', text: 'High-pressure homogenizers for uniform milk.', supply: 'Homogenizers & spares', to: '/spare-parts' },
  { Art: SiloPacking, title: 'Storage & Packing', text: 'Silos, pouch packing and product lines.', supply: 'Turnkey projects', to: '/projects' },
]

// Stainless pipe with milk flowing through it (CSS background animation).
function Pipe({ vertical = false }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute overflow-hidden rounded-full border border-navy-900/15 bg-gradient-to-b from-[#f5f8fb] via-[#cfd8e1] to-[#a9b8c6] ${
        vertical ? 'bottom-6 left-[2.6rem] top-6 w-3 sm:left-[3.38rem]' : 'left-[8%] right-[8%] top-[4.62rem] h-3'
      }`}
    >
      <div
        className={`absolute inset-[3px] rounded-full opacity-90 ${vertical ? 'animate-[milkflow-y_1.2s_linear_infinite]' : 'animate-[milkflow-x_1.2s_linear_infinite]'}`}
        style={{
          backgroundImage: vertical
            ? 'repeating-linear-gradient(180deg, #ffffff 0 10px, #e3f1f8 10px 18px)'
            : 'repeating-linear-gradient(90deg, #ffffff 0 10px, #e3f1f8 10px 18px)',
          backgroundSize: vertical ? '100% 18px' : '18px 100%',
        }}
      />
    </div>
  )
}

function Stage({ s, i, active }) {
  const [hover, setHover] = useState(false)
  const { Art } = s
  return (
    <StaggerItem className="h-full">
      <Link
        to={s.to}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="group relative flex h-full items-center gap-4 rounded-2xl bg-white p-3 ring-1 ring-navy-900/8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(6,38,82,0.35)] lg:flex-col lg:items-stretch lg:gap-0 lg:p-4"
      >
        <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 rounded-xl bg-gradient-to-b from-ice-50 to-ice-100 p-1 sm:h-24 sm:w-24 lg:h-32 lg:w-full lg:p-2">
          <Art animate={active || hover} />
          <span className="absolute -left-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-navy-900 font-display text-[10px] font-bold text-white ring-2 ring-white">
            {i + 1}
          </span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col lg:mt-4">
          <h3 className="text-[15px] font-bold sm:text-base">{s.title}</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-muted">{s.text}</p>
          <span className="mt-2 block text-xs font-semibold text-brand-600 lg:mt-auto lg:pt-3">
            {s.supply}
            <ArrowUpRight className="ml-1 inline h-3.5 w-3.5 align-[-2px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </StaggerItem>
  )
}

export default function MilkJourney() {
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-120px' })
  return (
    <section className="relative overflow-hidden bg-ice-50 py-16 sm:py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(#cfe3ef_1px,transparent_1px),linear-gradient(90deg,#cfe3ef_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />
      <div className="container-x relative">
        <SectionHeading
          align="center"
          eyebrow="From farm to pack"
          title="We cover every step of"
          accent="the milk line"
          text="Machinery, spares and service for each stage of a dairy plant, from the tanker dock to the packing hall."
        />
        <div ref={ref} className="relative mt-12 sm:mt-14">
          <div className="hidden lg:block">
            <Pipe />
          </div>
          <div className="lg:hidden">
            <Pipe vertical />
          </div>
          <Stagger gap={0.1} className="relative grid gap-3 sm:gap-4 lg:grid-cols-6">
            {stages.map((s, i) => (
              <Stage key={s.title} s={s} i={i} active={inView} />
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
