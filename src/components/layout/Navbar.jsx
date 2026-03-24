import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Logo from '../../assets/Logo.png'
import MobileMenu from './MobileMenu'

const NAV_LINKS = [
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar({ whatsappNumber }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi, I'd like to order from Culinaryloft.")}`

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 h-16 transition-shadow ${
          scrolled ? 'bg-white shadow-sm' : 'bg-white'
        }`}
      >
        <div className="max-w-6xl mx-auto h-full px-4 md:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full border border-beige2 overflow-hidden flex items-center justify-center bg-cream">
              <img src={Logo} alt="Culinaryloft" className="w-8 h-8 object-contain" />
            </div>
            <span className="font-display text-lg text-charcoal tracking-wide hidden sm:block">
              Culinaryloft
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="main navigation">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="font-body text-sm text-mid hover:text-charcoal transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 bg-charcoal text-white text-xs font-body font-medium py-2 px-4 rounded-sm hover:bg-mid transition-colors"
            >
              Order Now
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="open menu"
              className="md:hidden text-charcoal"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        whatsappNumber={whatsappNumber}
      />
    </>
  )
}
