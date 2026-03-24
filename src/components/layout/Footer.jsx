import { Link } from 'react-router-dom'
import Logo from '../../assets/Logo.png'

export default function Footer({ settings }) {
  const year = new Date().getFullYear()
  const waHref = settings?.whatsappNumber
    ? `https://wa.me/${settings.whatsappNumber}`
    : '#'

  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full border border-white/20 overflow-hidden bg-beige flex items-center justify-center">
              <img src={Logo} alt="Culinaryloft" className="w-8 h-8 object-contain" />
            </div>
            <span className="font-display text-xl">Culinaryloft</span>
          </div>
          <p className="text-white/60 text-sm font-body leading-relaxed">
            {settings?.tagline || 'Health-forward cuisine, made with intention.'}
          </p>
        </div>

        <div>
          <p className="eyebrow text-white/40 mb-4">Navigate</p>
          <ul className="flex flex-col gap-2">
            {[['/', 'Home'], ['/menu', 'Menu'], ['/about', 'About'], ['/blog', 'Blog'], ['/contact', 'Contact']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-white/70 hover:text-white text-sm font-body transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-white/40 mb-4">Contact</p>
          <div className="flex flex-col gap-2 text-sm font-body text-white/70">
            {settings?.address && <p>{settings.address}</p>}
            {settings?.phone && <p>{settings.phone}</p>}
            {settings?.email && (
              <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                {settings.email}
              </a>
            )}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green hover:text-white transition-colors mt-1"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-white/30 text-xs font-body">
        &copy; {year} Culinaryloft Lagos. All rights reserved.
      </div>
    </footer>
  )
}
