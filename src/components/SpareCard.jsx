import { MessageCircle } from 'lucide-react'
import { company } from '../data/site'

const spareEnquiryLink = (name) =>
  `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Hello, I need a quotation for: ${name}\nMachine make / model: \nQuantity: `)}`

export default function SpareCard({ part, compact = false }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-navy-900/8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(6,38,82,0.35)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-ice-50">
        <img
          src={part.img}
          alt={part.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className={`flex flex-1 flex-col ${compact ? 'p-3.5 sm:p-4' : 'p-4 sm:p-5'}`}>
        <h3 className={`font-display font-semibold leading-snug text-navy-900 ${compact ? 'text-[13px] sm:text-sm' : 'text-sm sm:text-[15px]'}`}>
          {part.name}
        </h3>
        {!compact && <p className="mt-1 text-xs leading-relaxed text-muted sm:text-[13px]">{part.note}</p>}
        {!compact && (
          <a
            href={spareEnquiryLink(part.name)}
            target="_blank"
            rel="noreferrer"
            className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-semibold text-brand-600 transition-colors hover:text-navy-900 sm:text-[13px]"
          >
            <MessageCircle className="h-4 w-4" /> <span className="sm:hidden">Enquire</span>
            <span className="hidden sm:inline">Enquire on WhatsApp</span>
          </a>
        )}
      </div>
    </article>
  )
}
