import { motion } from 'framer-motion'
import { Leaf, Flame, Heart } from 'lucide-react'
import Logo from '../../assets/Logo.png'

const VALUES = [
  { icon: Leaf, title: 'Wholesome Ingredients', body: 'Every dish starts with fresh, locally sourced produce chosen for quality and nutrition.' },
  { icon: Flame, title: 'Crafted with Fire', body: 'From ember-jollof to pepper-soup — bold Nigerian flavours elevated with artisanal technique.' },
  { icon: Heart, title: 'Made for You', body: 'Each order is prepared fresh. No mass batches, no compromise on quality.' },
]

export default function BrandTeaser() {
  return (
    <section className="bg-charcoal text-white py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="eyebrow text-tan">Our Story</span>
            <span className="block w-12 h-px bg-tan mt-3 mb-6" />
            <h2 className="font-display text-4xl md:text-5xl leading-tight mb-5">
              Rooted in Lagos,<br />
              <em className="text-tan">nourishing</em> every table
            </h2>
            <p className="text-white/70 font-body text-base leading-relaxed max-w-md">
              Culinaryloft was born from a simple belief: that healthy food should never taste like a compromise. We take the bold, vibrant flavours of Nigerian cuisine and build them around ingredients your body loves.
            </p>
          </motion.div>

          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-48 h-48 rounded-full border-2 border-white/20 flex items-center justify-center bg-white/5">
              <img src={Logo} alt="Culinaryloft" className="w-36 h-36 object-contain opacity-80" />
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-white/10 pt-12">
          {VALUES.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Icon size={20} className="text-tan" />
              <h3 className="font-display text-xl text-white">{title}</h3>
              <p className="text-white/60 font-body text-sm leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
