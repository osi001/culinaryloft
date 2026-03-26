import { motion } from 'framer-motion'
import photoHero from '../../assets/photo-hero.jpeg'
import photoStory from '../../assets/photo-story.jpeg'
import photoSetting from '../../assets/photo-setting.jpeg'
import photoSteam from '../../assets/photo-steam.jpeg'
import photoEmpty from '../../assets/photo-empty.jpeg'

const PHOTOS = [
  { src: photoSteam, alt: 'Steam rising from a dish', className: 'col-span-1 row-span-2' },
  { src: photoHero, alt: 'Chef finishing a plate', className: 'col-span-1 row-span-1' },
  { src: photoStory, alt: 'Candlelit table', className: 'col-span-1 row-span-1' },
  { src: photoEmpty, alt: 'Empty plate after the meal', className: 'col-span-1 row-span-1' },
  { src: photoSetting, alt: 'Place setting with wine', className: 'col-span-1 row-span-1' },
]

export default function Glimpses() {
  return (
    <section className="bg-cream py-14 md:py-18 px-8 md:px-16">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="font-display text-4xl md:text-5xl text-brown">Glimpses</h2>
          <span className="editorial-rule" />
          <p className="font-body text-sm text-tan tracking-wide mt-2">
            No explanation. Only fragments—
          </p>
          <p className="font-display italic text-mid text-lg mt-3">
            Steam. Hands. Light. Silence.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[200px] md:auto-rows-[260px] gap-3">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={i}
              className={`overflow-hidden rounded-sm ${photo.className}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.9 }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
