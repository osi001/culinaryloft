import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import photoHero from '../../assets/photo-hero.jpeg'
import photoStory from '../../assets/photo-story.jpeg'
import photoSetting from '../../assets/photo-setting.jpeg'
import photoSteam from '../../assets/photo-steam.jpeg'
import photoEmpty from '../../assets/photo-empty.jpeg'
import photoGlimpse6 from '../../assets/photo-glimpse6.jpeg'

const PHOTOS = [
  { src: photoSteam, alt: 'Steam rising from a dish' },
  { src: photoHero, alt: 'Chef finishing a plate' },
  { src: photoStory, alt: 'Candlelit table' },
  { src: photoEmpty, alt: 'Empty plate after the meal' },
  { src: photoSetting, alt: 'Place setting with wine' },
  { src: photoGlimpse6, alt: 'Seafood spread' },
]

export default function Glimpses() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % PHOTOS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

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

        {/* Slideshow — landscape, no crop */}
        <div className="relative overflow-hidden rounded-sm aspect-video">
          <AnimatePresence mode="sync">
            <motion.img
              key={current}
              src={PHOTOS[current].src}
              alt={PHOTOS[current].alt}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </AnimatePresence>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? 'w-5 bg-cream' : 'w-1.5 bg-cream/50'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
