import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Wave from './Wave'
import { asset } from '../lib/asset'

const ease = [0.22, 1, 0.36, 1]

export default function PageHero({ eyebrow, title, accent, text, image = asset('/images/plant-floor.webp') }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 pb-24 pt-32 sm:pb-32 lg:pb-36 lg:pt-48">
      <motion.img
        src={image}
        alt=""
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease }}
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-900/90 to-navy-900/40" />
      <div className="absolute -right-32 top-10 -z-10 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />

      <div className="container-x">
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-xs font-medium text-white/60"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-sky-300">{eyebrow}</span>
        </motion.nav>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="mt-4 max-w-3xl text-[2rem] font-extrabold leading-[1.12] tracking-[-0.025em] text-white sm:mt-5 sm:text-[2.6rem] lg:text-[3.25rem]"
        >
          {title} {accent && <span className="text-sky-300">{accent}</span>}
        </motion.h1>
        {text && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease }}
            className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/75 sm:mt-6 sm:text-[17px]"
          >
            {text}
          </motion.p>
        )}
      </div>
      <Wave />
    </section>
  )
}
