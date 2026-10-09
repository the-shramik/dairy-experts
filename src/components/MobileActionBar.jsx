import { MessageCircle, Phone, Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import { company, tel } from '../data/site'

// Sticky quick actions for phones: call, WhatsApp, enquiry.
export default function MobileActionBar() {
  const wa = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent('Hello The Dairy Experts, I would like to enquire about ')}`
  const item = 'flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold'
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-navy-900/10 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-12px_rgba(6,38,82,0.25)] backdrop-blur-xl lg:hidden"
    >
      <a href={tel(company.phones.sales[0])} className={`${item} text-navy-900`}>
        <Phone className="h-5 w-5 text-brand-500" /> Call
      </a>
      <a href={wa} target="_blank" rel="noreferrer" className={`${item} text-navy-900`}>
        <MessageCircle className="h-5 w-5 text-[#25D366]" /> WhatsApp
      </a>
      <Link to="/contact" className={`${item} m-1.5 rounded-xl bg-navy-900 text-white`}>
        <Send className="h-5 w-5 text-sky-300" /> Get Quote
      </Link>
    </nav>
  )
}
