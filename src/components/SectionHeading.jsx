import { Reveal } from './Reveal'

export default function SectionHeading({ eyebrow, title, accent, text, align = 'left', light = false, className = '' }) {
  const center = align === 'center'
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <span className={`eyebrow ${center ? 'justify-center' : ''} ${light ? 'text-sky-300 before:bg-sky-300' : ''}`}>{eyebrow}</span>}
      <h2 className={`mt-3 text-[1.6rem] font-bold leading-[1.2] sm:mt-4 sm:text-[2rem] lg:text-[2.4rem] ${light ? 'text-white' : ''}`}>
        {title} {accent && <span className={light ? 'text-sky-300' : 'text-brand-500'}>{accent}</span>}
      </h2>
      {text && <p className={`mt-4 text-[15px] leading-relaxed sm:mt-5 sm:text-base lg:text-[17px] ${light ? 'text-white/70' : 'text-muted'}`}>{text}</p>}
    </Reveal>
  )
}
