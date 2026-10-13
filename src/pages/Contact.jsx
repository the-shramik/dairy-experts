import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send, Wrench } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import FAQ from '../components/FAQ'
import PageHero from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { company, tel } from '../data/site'
import { asset } from '../lib/asset'

const topics = ['New machinery', 'Spare parts', 'Turnkey project', 'Service / maintenance', 'Consultancy', 'Other']

const field =
  'w-full rounded-xl border border-navy-900/10 bg-ice-50 px-4 py-3 text-sm text-navy-900 outline-none transition placeholder:text-navy-900/35 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10'

function InfoCard({ icon: I, title, children, accent = false }) {
  return (
    <div className={`flex gap-4 rounded-2xl p-5 ${accent ? 'bg-navy-900 text-white' : 'bg-white ring-1 ring-navy-900/5'}`}>
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${accent ? 'bg-white/10 text-sky-300' : 'bg-ice-100 text-brand-600'}`}>
        <I className="h-5 w-5" />
      </span>
      <div className="text-sm">
        <p className={`font-display font-semibold ${accent ? 'text-white' : 'text-navy-900'}`}>{title}</p>
        <div className={`mt-1 space-y-1 ${accent ? 'text-white/75' : 'text-muted'}`}>{children}</div>
      </div>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', topic: topics[0], message: '' })
  const [sent, setSent] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  // No backend yet: the enquiry is handed to WhatsApp with all details prefilled.
  // TODO(backend): POST to /api/enquiry once the Node API is added.
  const submit = (e) => {
    e.preventDefault()
    const text = [
      `New enquiry: ${form.topic}`,
      `Name: ${form.name}`,
      form.company && `Company: ${form.company}`,
      `Phone: ${form.phone}`,
      form.email && `Email: ${form.email}`,
      `\n${form.message}`,
    ]
      .filter(Boolean)
      .join('\n')
    window.open(`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    setSent(true)
  }

  const mailto = `mailto:${company.email}?subject=${encodeURIComponent(`Enquiry: ${form.topic}`)}&body=${encodeURIComponent(
    `Name: ${form.name}\nCompany: ${form.company}\nPhone: ${form.phone}\n\n${form.message}`,
  )}`

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact"
        accent="us"
        text="Tell us about your plant, machine or spare part requirement. Our sales and service teams cover all of India."
        image={asset('/images/silo-row.webp')}
      />

      <section className="container-x grid gap-10 py-16 lg:grid-cols-[1fr_1.4fr] lg:py-24">
        <Reveal className="space-y-4">
          <InfoCard icon={Phone} title="Sales & Enquiry" accent>
            {company.phones.sales.map((p) => (
              <a key={p} href={tel(p)} className="block hover:text-white">
                {p}
              </a>
            ))}
          </InfoCard>
          <InfoCard icon={Wrench} title="Service Support">
            {company.phones.service.map((p) => (
              <a key={p} href={tel(p)} className="block hover:text-brand-600">
                {p}
              </a>
            ))}
          </InfoCard>
          <InfoCard icon={Mail} title="Email">
            <a href={`mailto:${company.email}`} className="hover:text-brand-600">
              {company.email}
            </a>
          </InfoCard>
          <InfoCard icon={MapPin} title="Head Office">
            <span>{company.address.join(' ')}</span>
            <a href={company.mapLink} target="_blank" rel="noreferrer" className="mt-1 inline-flex font-semibold text-brand-600 hover:underline">
              Get directions on Google Maps
            </a>
          </InfoCard>
          <InfoCard icon={Clock} title="Working Hours">
            <span>{company.hours}</span>
          </InfoCard>
        </Reveal>

        <Reveal delay={0.1} className="card relative overflow-hidden p-6 sm:p-10">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div key="ok" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-96 flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-16 w-16 text-brand-500" />
                <h2 className="mt-6 text-2xl font-bold">Thank you, {form.name.split(' ')[0] || 'there'}!</h2>
                <p className="mt-3 max-w-sm text-muted">Your enquiry has been prepared in WhatsApp. Hit send there and our team will get back to you shortly.</p>
                <button onClick={() => setSent(false)} className="btn-outline mt-8">
                  Send another enquiry
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h2 className="text-2xl font-bold sm:text-3xl">Send us an enquiry</h2>
                <p className="mt-2 text-sm text-muted">Fields marked * are required.</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-navy-900">Full name *</span>
                    <input required value={form.name} onChange={set('name')} className={field} placeholder="Your name" autoComplete="name" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-navy-900">Company / Dairy</span>
                    <input value={form.company} onChange={set('company')} className={field} placeholder="Company name" autoComplete="organization" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-navy-900">Phone *</span>
                    <input required type="tel" value={form.phone} onChange={set('phone')} className={field} placeholder="+91" autoComplete="tel" pattern="[0-9+\-\s]{8,}" />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-navy-900">Email</span>
                    <input type="email" value={form.email} onChange={set('email')} className={field} placeholder="you@company.com" autoComplete="email" />
                  </label>
                </div>

                <fieldset className="mt-6">
                  <legend className="mb-2 text-xs font-semibold text-navy-900">I'm interested in</legend>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setForm((f) => ({ ...f, topic: t }))}
                        className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                          form.topic === t ? 'bg-navy-900 text-white' : 'bg-ice-50 text-navy-900 ring-1 ring-navy-900/10 hover:ring-brand-500'
                        }`}
                        aria-pressed={form.topic === t}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <label className="mt-6 block">
                  <span className="mb-1.5 block text-xs font-semibold text-navy-900">Requirement *</span>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={set('message')}
                    className={`${field} resize-none`}
                    placeholder="Plant capacity (LPD), machine make & model, part number, location…"
                  />
                </label>

                <p className="mt-6 text-xs text-muted">
                  By sending this enquiry you agree that we may contact you about it. See our{' '}
                  <Link to="/privacy" className="font-semibold text-brand-600 hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <button type="submit" className="btn-primary flex-1">
                    <Send className="h-4 w-4" /> Send via WhatsApp
                  </button>
                  <a href={mailto} className="btn-outline flex-1">
                    <Mail className="h-4 w-4" /> Send via Email
                  </a>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </section>

      <section className="container-x">
        <Reveal className="overflow-hidden rounded-[2rem] ring-1 ring-navy-900/5">
          <iframe
            title="Map to The Dairy Experts, MIDC Shiroli, Kolhapur"
            src={`https://maps.google.com/maps?q=${company.geo.lat},${company.geo.lng}&z=17&output=embed`}
            className="h-[26rem] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </section>

      <FAQ />
    </>
  )
}
