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
          <a
            href="https://instagram.com/culinaryloft"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3 font-body text-xs text-mid hover:text-charcoal transition-colors tracking-wide"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            @culinaryloft
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
