import { ChevronLeft, ChevronRight, Download, X } from 'lucide-react'
import { PageFlip } from 'page-flip'
import { useEffect, useRef, useState } from 'react'
import { company } from '../data/site'
import { asset } from '../lib/asset'

const RATIO = 1449 / 2031 // page width / height

// Fit one page (phones) or a two-page spread inside the space left by header and controls.
function fit() {
  const availH = window.innerHeight - 190
  const availW = window.innerWidth - (window.innerWidth < 640 ? 24 : 128)
  const spread = availW > availH * RATIO * 1.6
  const h = Math.max(240, Math.min(availH, (spread ? availW / 2 : availW) / RATIO))
  return { w: Math.floor(h * RATIO), h: Math.floor(h), spread }
}

const PAGES = Array.from({ length: 8 }, (_, i) => asset(`/images/brochure/page-${i + 1}.webp`))

// Full-screen flipbook of the company brochure (opened in a new tab).
export default function Brochure() {
  const host = useRef(null)
  const book = useRef(null)
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(fit)

  useEffect(() => {
    let t
    const onResize = () => {
      clearTimeout(t)
      t = setTimeout(() => setSize(fit()), 250)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.title = 'Company Brochure | The Dairy Experts'
    const el = host.current
    const pf = new PageFlip(el, {
      width: size.w,
      height: size.h,
      size: 'fixed',
      usePortrait: !size.spread,
      startPage: page,
      showCover: true,
      maxShadowOpacity: 0.45,
      mobileScrollSupport: false,
      flippingTime: 900,
    })
    el.style.width = `${size.spread ? size.w * 2 : size.w}px`
    el.style.height = `${size.h}px`
    // HTML pages (not canvas) so the browser draws the page images at full screen resolution and text stays sharp.
    const pages = PAGES.map((src, i) => {
      const d = document.createElement('div')
      d.className = 'bg-white'
      d.dataset.density = i === 0 || i === PAGES.length - 1 ? 'hard' : 'soft'
      const img = document.createElement('img')
      img.src = src
      img.alt = `Brochure page ${i + 1}`
      img.draggable = false
      img.style.cssText = 'width:100%;height:100%;object-fit:contain;display:block;user-select:none'
      d.appendChild(img)
      el.appendChild(d)
      return d
    })
    pf.loadFromHTML(pages)
    pf.on('flip', (e) => setPage(e.data))
    book.current = pf
    const onKey = (e) => {
      if (e.key === 'ArrowRight') pf.flipNext()
      if (e.key === 'ArrowLeft') pf.flipPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      try {
        pf.destroy()
      } catch {
        /* already torn down */
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size])

  const btn = 'grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition hover:bg-white/20 disabled:opacity-30'

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-[radial-gradient(ellipse_at_center,#0b3570_0%,#03152f_70%)]">
      <header className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <img src={asset('/images/logo-emblem.svg')} alt="" className="h-8 w-8" />
          <span className="font-display text-sm font-semibold text-white sm:text-base">Company Brochure</span>
        </div>
        <div className="flex items-center gap-2">
          <a href={company.brochure} download className="btn-ghost !px-4 !py-2 text-xs">
            <Download className="h-4 w-4" /> <span className="hidden sm:inline">Download PDF</span>
          </a>
          <button onClick={() => window.close()} className={btn} aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 items-center justify-center px-3 pb-4 sm:px-16">
        <div key={`${size.w}x${size.h}`} ref={host} className="mx-auto" />
      </div>

      <footer className="flex items-center justify-center gap-4 pb-5">
        <button onClick={() => book.current?.flipPrev()} disabled={page === 0} className={btn} aria-label="Previous page">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="min-w-24 text-center text-sm font-medium text-white/75">
          Page {page + 1} of {PAGES.length}
        </span>
        <button onClick={() => book.current?.flipNext()} disabled={page >= PAGES.length - 1} className={btn} aria-label="Next page">
          <ChevronRight className="h-5 w-5" />
        </button>
      </footer>
      <p className="pb-3 text-center text-[11px] text-white/40">Drag a page corner, click a page or use the arrow keys to turn pages.</p>
    </div>
  )
}
