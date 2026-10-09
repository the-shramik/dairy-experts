import PageHero from '../components/PageHero'
import { company } from '../data/site'

const sections = [
  {
    h: 'What we collect',
    p: 'When you send an enquiry through this website, WhatsApp, email or phone, we receive the details you share with us: your name, company, phone number, email address and your requirement. We do not use advertising trackers on this website.',
  },
  {
    h: 'How we use it',
    p: 'We use these details only to reply to your enquiry, prepare quotations, supply machinery or spare parts, provide service and keep records required by law. We do not sell or rent your personal data.',
  },
  {
    h: 'Who we share it with',
    p: 'Only with our own team and, where needed to fulfil your order, our group companies, transport partners or manufacturers. Messages sent on WhatsApp are also handled under WhatsApp’s own terms.',
  },
  {
    h: 'How long we keep it',
    p: 'We keep enquiry and customer records for as long as needed for the purpose above and for the period required by tax and company law.',
  },
  {
    h: 'Your choices',
    p: 'You can ask us to see, correct or delete your personal data, or withdraw consent for further contact, by writing to the email below. We will respond within a reasonable time as required under the Digital Personal Data Protection Act, 2023.',
  },
]

export default function Privacy() {
  return (
    <>
      <PageHero eyebrow="Privacy Policy" title="Privacy" accent="Policy" text={`How ${company.short} handles the information you share with us.`} />
      <section className="container-x max-w-3xl py-14 sm:py-20">
        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-xl font-bold">{s.h}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.p}</p>
            </div>
          ))}
          <div className="rounded-2xl bg-ice-50 p-6 text-[15px] leading-relaxed text-navy-900">
            <p className="font-semibold">Contact for privacy requests</p>
            <p className="mt-1 text-muted">
              {company.name}, {company.address.join(' ')}
              <br />
              Email:{' '}
              <a href={`mailto:${company.email}`} className="font-semibold text-brand-600">
                {company.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
