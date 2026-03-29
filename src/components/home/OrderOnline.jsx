import { motion } from 'framer-motion'

const PLATFORMS = [
  {
    name: 'Chowdeck',
    url: 'https://store.chowdeck.com/agungi/restaurants/culinary-loft-agungilrryea',
    bg: '#FF5722',
    logo: (
      <svg viewBox="0 0 80 24" fill="none" className="h-5 w-auto" aria-hidden="true">
        <text x="0" y="18" fontFamily="sans-serif" fontWeight="700" fontSize="18" fill="white">Chowdeck</text>
      </svg>
    ),
  },
  {
    name: 'Glovo',
    url: 'https://glovo.go.link/open?link_type=store&store_id=516574&adjust_t=s321jkn',
    bg: '#FFC244',
    logo: (
      <svg viewBox="0 0 52 24" fill="none" className="h-5 w-auto" aria-hidden="true">
        <text x="0" y="18" fontFamily="sans-serif" fontWeight="700" fontSize="18" fill="white">Glovo</text>
      </svg>
    ),
  },
]

export default function OrderOnline() {
  return (
    <section className="bg-beige py-16 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <p className="font-body text-xs text-tan tracking-widest uppercase mb-3">Can't make it in?</p>
          <h2 className="font-display text-4xl md:text-5xl text-brown mb-3">Order Online</h2>
          <span className="block w-8 h-px bg-beige2 mx-auto mb-4" />
          <p className="font-body text-sm text-mid">
            We deliver across Lagos — find us on your favourite platform.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          {PLATFORMS.map(p => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-sm font-body text-sm font-semibold text-white tracking-wide transition-opacity hover:opacity-90 min-w-[200px] justify-center"
              style={{ backgroundColor: p.bg }}
            >
              <span>Order on {p.name}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
