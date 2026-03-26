import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, ShoppingBag } from 'lucide-react'
import MobileMenu from './MobileMenu'
import { useCart } from '../../context/CartContext'
import logo from '../../assets/logo-chef.png'

const NAV_LINKS = [
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar({ whatsappNumber }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { items, openDrawer } = useCart()
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const barHeight = scrolled ? 'top-0' : 'top-8'

  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi, I'd like to reserve a table at Culinary Loft.")}`

  return (
    <>
      <header
        className={`fixed ${barHeight} left-0 right-0 z-30 h-16 transition-all duration-500 ${
          scrolled ? 'bg-cream border-b border-beige2' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto h-full px-8 md:px-16 flex items-center justify-between">

          <Link to="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <img src={logo} alt="" className="w-14 h-14 object-contain" />
            <span className="font-display text-xl text-brown tracking-wide">Culinary Loft</span>
          </Link>

          <nav className="hidden md:flex items-center gap-10" aria-label="main navigation">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="font-body text-xs text-mid hover:text-charcoal transition-colors tracking-widest uppercase"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block font-body text-xs text-brown border border-brown px-5 py-2 rounded-sm hover:bg-brown hover:text-cream transition-colors tracking-wide"
            >
              Reserve
            </a>
            {/* Cart icon — always visible */}
            <button
              onClick={openDrawer}
              aria-label={`Open cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
              className="relative text-brown hover:opacity-70 transition-opacity"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-charcoal text-white text-[10px] font-body font-medium rounded-full flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="open menu"
              className="md:hidden text-brown"
            >
              <Menu size={20} />
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
