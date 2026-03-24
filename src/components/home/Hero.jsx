import { motion } from 'framer-motion'
import Logo from '../../assets/Logo.png'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export default function Hero({ whatsappNumber, settings }) {
  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi, I'd like to place an order from Culinaryloft.")}`
  const menuHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hi, I'd like to see your menu and specials.")}`

  return (
    <section className="bg-beige min-h-[90vh] flex items-center pt-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-16 md:py-24">

          <motion.div
            className="flex flex-col gap-6"
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            initial="hidden"
            animate="show"
          >
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-1.5 bg-green/10 text-green text-xs font-body font-medium px-3 py-1.5 rounded-full w-fit"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green" />
              Health-forward cuisine
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl md:text-6xl lg:text-7xl text-charcoal leading-tight"
            >
              Food that{' '}
              <em className="italic text-brown not-italic">nourishes</em>
              <br />
              the soul
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-mid font-body text-base md:text-lg leading-relaxed max-w-md"
            >
              {settings?.tagline || 'Artisanal dishes crafted with wholesome ingredients. Order on WhatsApp, delivered to your door in Lagos.'}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mt-2">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Order on WhatsApp"
                className="bg-charcoal text-white font-body font-medium text-sm py-3 px-7 rounded-sm hover:bg-mid transition-colors"
              >
                Order on WhatsApp
              </a>
              <a
                href={menuHref}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-beige2 text-charcoal font-body font-medium text-sm py-3 px-7 rounded-sm hover:bg-beige2 transition-colors"
              >
                View Menu
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="w-full aspect-[4/5] md:aspect-[3/4] max-h-[560px] bg-cream rounded-sm overflow-hidden flex items-center justify-center border border-beige2">
              <img
                src={Logo}
                alt="Culinaryloft"
                className="w-2/3 max-w-[220px] opacity-30 object-contain"
              />
            </div>
            <div className="absolute bottom-6 -left-4 bg-white shadow-md border border-beige px-4 py-3 rounded-sm">
              <p className="font-body text-xs text-mid">Specials from</p>
              <p className="font-display text-2xl text-brown">₦12,000</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
