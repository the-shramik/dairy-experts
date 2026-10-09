import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { Suspense, lazy, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import MobileActionBar from './components/MobileActionBar'
import WhatsAppFab from './components/WhatsAppFab'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Projects = lazy(() => import('./pages/Projects'))
const Services = lazy(() => import('./pages/Services'))
const SpareParts = lazy(() => import('./pages/SpareParts'))
const Team = lazy(() => import('./pages/Team'))
const titles = {
  '/': 'The Dairy Experts (India) Pvt. Ltd. | Complete Dairy Solutions',
  '/about': 'About Us | The Dairy Experts',
  '/services': 'Services & Supply | The Dairy Experts',
  '/spare-parts': 'Spare Parts | The Dairy Experts',
  '/projects': 'Turnkey Projects | The Dairy Experts',
  '/team': 'Our Team | The Dairy Experts',
  '/contact': 'Contact Us | The Dairy Experts',
  '/privacy': 'Privacy Policy | The Dairy Experts',
}

function useScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    document.title = titles[pathname] ?? 'The Dairy Experts'
    if (hash) {
      const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 450)
      return () => clearTimeout(t)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
}

export default function App() {
  const location = useLocation()
  useScrollManager()

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Suspense fallback={<div className="min-h-screen bg-white" />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/spare-parts" element={<SpareParts />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
      <WhatsAppFab />
      <MobileActionBar />
    </MotionConfig>
  )
}
