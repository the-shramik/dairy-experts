import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Mail, MapPin, Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { company, nav, tel } from '../data/site'
import Logo from './Logo'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar */}
      <div
        className={`hidden bg-navy-950 text-white/75 transition-all duration-500 lg:block ${scrolled ? 'h-0 overflow-hidden opacity-0' : 'h-10 opacity-100'}`}
      >
        <div className="container-x flex h-10 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-sky-300" /> MIDC Shiroli, Kolhapur, Maharashtra
            </span>
            <a href={`mailto:${company.email}`} className="flex items-center gap-2 hover:text-white">
              <Mail className="h-3.5 w-3.5 text-sky-300" /> {company.email}
            </a>
          </div>
          <div className="flex items-center gap-6">
            <a href={tel(company.phones.sales[0])} className="flex items-center gap-2 hover:text-white">
              <Phone className="h-3.5 w-3.5 text-sky-300" /> Sales: {company.phones.sales[0]}
            </a>
            <a href={tel(company.phones.service[0])} className="flex items-center gap-2 hover:text-white">
              <Phone className="h-3.5 w-3.5 text-sky-300" /> Service: {company.phones.service[0]}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <nav
        className={`transition-all duration-500 ${
          scrolled ? 'bg-white/90 shadow-[0_8px_30px_-12px_rgba(6,38,82,0.25)] backdrop-blur-xl' : 'bg-white'
        }`}
      >
        <div className={`container-x flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>
          <Logo />

          <ul className="hidden items-center xl:flex">
            {nav.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  end={n.to === '/'}
                  className={({ isActive }) =>
                    `relative rounded-full px-3.5 py-2 text-[14px] font-medium transition-colors ${
                      isActive ? 'text-brand-600' : 'text-navy-900/80 hover:text-navy-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {n.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-500"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link to="/contact" className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
              Get a Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              onClick={() => setOpen((o) => !o)}
              className="grid h-11 w-11 place-items-center rounded-full bg-ice-100 text-navy-900 xl:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-navy-900/5 bg-white xl:hidden"
          >
            <ul className="container-x flex flex-col py-4">
              {nav.map((n, i) => (
                <motion.li key={n.to} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <NavLink
                    to={n.to}
                    end={n.to === '/'}
                    className={({ isActive }) =>
                      `flex items-center justify-between border-b border-navy-900/5 py-3.5 font-display text-base font-semibold ${
                        isActive ? 'text-brand-500' : 'text-navy-900'
                      }`
                    }
                  >
                    {n.label} <ArrowRight className="h-4 w-4 opacity-40" />
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <div className="container-x space-y-3 pb-10">
              <a href={tel(company.phones.sales[0])} className="btn-navy w-full">
                <Phone className="h-4 w-4" /> Sales: {company.phones.sales[0]}
              </a>
              <a href={tel(company.phones.service[0])} className="btn-outline w-full">
                <Phone className="h-4 w-4" /> Service: {company.phones.service[0]}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
