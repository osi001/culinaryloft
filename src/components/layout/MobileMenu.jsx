import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Menu' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function MobileMenu({ open, onClose, whatsappNumber }) {
  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi, I'd like to order from Culinaryloft.")}`

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-charcoal/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.nav
            aria-label="mobile navigation"
            className="fixed top-0 right-0 h-full w-72 bg-cream z-50 flex flex-col px-8 py-10 shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
          >
            <button
              onClick={onClose}
              aria-label="close menu"
              className="self-end mb-8 text-mid hover:text-charcoal"
            >
              <X size={24} />
            </button>
            <ul className="flex flex-col gap-6">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={onClose}
                    className="font-display text-2xl text-charcoal hover:text-brown transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto bg-green text-white font-body font-medium text-sm py-3 px-6 rounded-sm text-center hover:opacity-90 transition-opacity"
            >
              Order on WhatsApp
            </a>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
