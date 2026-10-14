import { ArrowUpRight, BookOpen, Download, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { company, nav, services, tel } from '../data/site'
import { asset } from '../lib/asset'
import Logo from './Logo'
import Wave from './Wave'

export default function Footer() {
  return (
    <footer className="relative mt-24 bg-navy-950 pb-16 text-white/70 lg:pb-0">
      <div className="absolute inset-x-0 -top-16 h-16 sm:-top-24 sm:h-24">
        <Wave color="#03152f" />
      </div>

      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-10 pb-12 pt-14 sm:gap-12 lg:grid-cols-12 lg:pt-16">
        <div className="col-span-2 lg:col-span-4">
          <Logo light />
          <p className="mt-6 max-w-sm text-sm leading-relaxed">
            Engineering partner for the Indian dairy sector, based in Kolhapur. We supply machinery and spare parts,
            set up turnkey plants and provide on-site service across India.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={company.brochure} download className="btn-ghost !py-2.5 text-xs">
              <Download className="h-4 w-4" /> Download Brochure
            </a>
            <a href={asset('/brochure')} target="_blank" rel="noreferrer" className="btn-ghost !py-2.5 text-xs">
              <BookOpen className="h-4 w-4" /> View Brochure
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-white">Company</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="transition-colors hover:text-sky-300">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-white">What we do</h4>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.id}>
                <Link to={`/services#${s.id}`} className="transition-colors hover:text-sky-300">
                  {s.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/spare-parts" className="transition-colors hover:text-sky-300">
                Spare Parts Catalogue
              </Link>
            </li>
            <li>
              <Link to="/projects" className="transition-colors hover:text-sky-300">
                Turnkey Dairy Projects
              </Link>
            </li>
          </ul>
        </div>

        <div className="col-span-2 lg:col-span-3">
          <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-white">Reach us</h4>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
              <span>{company.address.join(' ')}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
              <span className="flex flex-col gap-1">
                <a href={tel(company.phones.sales[0])} className="hover:text-white">
                  Sales: {company.phones.sales[0]}
                </a>
                <a href={tel(company.phones.service[0])} className="hover:text-white">
                  Service: {company.phones.service[0]}
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
              <a href={`mailto:${company.email}`} className="hover:text-white">
                {company.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs sm:flex-row">
          <div className="text-center sm:text-left">
            <p>
              © {new Date().getFullYear()} {company.name} All rights reserved.
            </p>
            {(company.cin || company.gstin) && (
              <p className="mt-1 text-white/45">
                {company.cin && <>CIN: {company.cin}</>}
                {company.cin && company.gstin && ' · '}
                {company.gstin && <>GSTIN: {company.gstin}</>}
              </p>
            )}
          </div>
          <Link to="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-1 hover:text-white">
            Planning a dairy plant? Talk to us <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Developer credit */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 py-3.5 text-[11px] leading-none text-white/45">
          <span>Designed &amp; developed by</span>
          <a href="tel:+919561949009" className="group inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white">
            <img
              src={asset('/images/ps-freelance-logo.webp')}
              alt="PS Freelance Services"
              className="h-6 w-auto rounded-[4px] bg-white p-0.5"
              loading="lazy"
            />
            <span className="font-semibold">PS Freelance Services</span>
            <span className="text-white/30">·</span>
            <span className="tabular-nums text-sky-300/90 group-hover:text-sky-200">+91 95619 49009</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
