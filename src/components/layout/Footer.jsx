import { Link } from 'react-router-dom'

const PHONES = ['+2347025538333', '+2349134661110']
const EMAILS = ['hello@theculinaryloft.com', 'orders@theculinaryloft.com']
const WA_NUMBER = '2349134661110'
const HOURS = [
  { days: 'Monday – Saturday', time: '8:00 AM – 9:00 PM' },
  { days: 'Sunday', time: '10:00 AM – 6:00 PM' },
]

export default function Footer() {
  const waHref = `https://wa.me/${WA_NUMBER}`

  return (
    <footer className="bg-beige border-t border-beige2 pt-14 pb-8 px-8 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">

        {/* Brand */}
        <div className="md:col-span-1">
          <p className="font-display text-2xl text-brown">Culinary Loft</p>
          <p className="font-body text-xs text-tan tracking-widest uppercase mt-1 mb-4">Lagos, Nigeria</p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-body text-xs text-brown border border-brown px-5 py-2 rounded-sm hover:bg-brown hover:text-cream transition-colors tracking-wide"
          >
            WhatsApp Us
          </a>
        </div>

        {/* Nav */}
        <div>
          <p className="font-body text-xs text-tan tracking-widest uppercase mb-4">Pages</p>
          <nav className="flex flex-col gap-3">
            {[['/', 'Home'], ['/menu', 'Menu'], ['/about', 'About'], ['/contact', 'Contact']].map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className="font-body text-xs text-mid hover:text-charcoal transition-colors tracking-wide"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contact */}
        <div>
          <p className="font-body text-xs text-tan tracking-widest uppercase mb-4">Contact</p>
          <div className="flex flex-col gap-2">
            {PHONES.map(phone => (
              <a
                key={phone}
                href={`tel:${phone}`}
                className="font-body text-xs text-mid hover:text-charcoal transition-colors tracking-wide"
              >
                {phone}
              </a>
            ))}
            <span className="block w-8 h-px bg-beige2 my-1" />
            {EMAILS.map(email => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="font-body text-xs text-mid hover:text-charcoal transition-colors tracking-wide"
              >
                {email}
              </a>
            ))}
          </div>
        </div>

        {/* Hours */}
        <div>
          <p className="font-body text-xs text-tan tracking-widest uppercase mb-4">Hours</p>
          <div className="flex flex-col gap-3">
            {HOURS.map(({ days, time }) => (
              <div key={days}>
                <p className="font-body text-xs text-charcoal">{days}</p>
                <p className="font-body text-xs text-tan mt-0.5">{time}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-beige2">
        <p className="font-body text-xs text-tan text-center tracking-widest">
          © {new Date().getFullYear()} Culinary Loft. All rights reserved. · Cooking memories, one plate at a time.
        </p>
      </div>
    </footer>
  )
}
