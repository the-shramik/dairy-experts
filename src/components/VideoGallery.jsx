import { AnimatePresence, motion } from 'framer-motion'
import { Play, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { videos } from '../data/site'
import { Stagger, StaggerItem } from './Reveal'
import SectionHeading from './SectionHeading'

function Player({ v, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-950/95 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={v.title}
    >
      <button className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Close">
        <X className="h-5 w-5" />
      </button>
      <motion.div initial={{ scale: 0.96, y: 10 }} animate={{ scale: 1, y: 0 }} className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <div className="aspect-video overflow-hidden rounded-2xl bg-black">
          {v.youtube ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${v.youtube}?autoplay=1&rel=0&modestbranding=1`}
              title={v.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          ) : (
            <video src={v.src} poster={v.poster} controls autoPlay playsInline className="h-full w-full" />
          )}
        </div>
        <p className="mt-4 text-center text-sm text-white/80">{v.title}</p>
      </motion.div>
    </motion.div>
  )
}

// Renders nothing until the client's videos are added to `videos` in site.js.
export default function VideoGallery() {
  const [open, setOpen] = useState(null)
  if (!videos.length) return null
  return (
    <section className="container-x py-16 sm:py-20 lg:py-24">
      <SectionHeading eyebrow="Watch" title="Our work" accent="in action" />
      <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <StaggerItem key={v.title}>
            <button onClick={() => setOpen(v)} className="group block w-full text-left">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-navy-900">
                <img src={v.poster} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-navy-950/30 transition-colors group-hover:bg-navy-950/45" />
                <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-brand-600 shadow-xl transition-transform duration-300 group-hover:scale-110">
                  <Play className="ml-1 h-6 w-6 fill-current" />
                </span>
                {v.duration && <span className="absolute bottom-3 right-3 rounded-md bg-black/70 px-2 py-0.5 text-xs font-semibold text-white">{v.duration}</span>}
              </div>
              <h3 className="mt-3 text-[15px] font-bold">{v.title}</h3>
              {v.text && <p className="mt-1 text-[13px] text-muted">{v.text}</p>}
            </button>
          </StaggerItem>
        ))}
      </Stagger>
      <AnimatePresence>{open && <Player v={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  )
}
