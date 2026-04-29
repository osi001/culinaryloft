import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

import photoSteam   from '../assets/photo-steam.jpeg'
import photoHero    from '../assets/photo-hero.jpeg'
import photoStory   from '../assets/photo-story.jpeg'
import photoSetting from '../assets/photo-setting.jpeg'
import photoEmpty   from '../assets/photo-empty.jpeg'

const PHOTOS = [
  { src: photoSteam,   alt: 'Steam rising from a dish',   category: 'Kitchen',    span: 'md:col-span-2 md:row-span-2' },
  { src: photoHero,    alt: 'Chef finishing a plate',      category: 'Kitchen',    span: '' },
  { src: photoStory,   alt: 'Candlelit table setting',     category: 'Setting',    span: '' },
  { src: photoSetting, alt: 'Place setting with wine',     category: 'Atmosphere', span: 'md:col-span-2' },
  { src: photoEmpty,   alt: 'Empty plate after the meal',  category: 'Details',    span: '' },
]

const CATEGORIES = ['All', 'Kitchen', 'Setting', 'Atmosphere', 'Details']

export default function Gallery() {
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState(null) // photo object or null

  const filtered = active === 'All' ? PHOTOS : PHOTOS.filter(p => p.category === active)

  const closeLightbox = useCallback(() => setLightbox(null), [])

  // Close on Escape key
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => { if (e.key === 'Escape') closeLightbox() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, closeLightbox])

  return (
    <div className="bg-cream min-h-screen">

      {/* Hero */}
      <section className="bg-cream pt-24 pb-8 text-center">
        <h1 className="font-display text-5xl md:text-6xl text-brown">Glimpses</h1>
        <p className="font-body text-sm text-tan italic mt-3">No explanation. Only fragments.</p>
      </section>

      {/* Category filter tabs */}
      <div className="sticky top-16 z-20 bg-cream border-b border-beige2">
        <div className="max-w-6xl mx-auto px-8 md:px-16 overflow-x-auto">
          <div className="flex gap-0 min-w-max">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`font-body text-xs tracking-widest uppercase px-5 py-4 transition-colors ${
                  active === cat
                    ? 'text-charcoal border-b-2 border-charcoal'
                    : 'text-tan hover:text-mid border-b-2 border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Photo grid */}
      <div className="max-w-6xl mx-auto px-8 md:px-16 py-12 bg-cream">
        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[220px] md:auto-rows-[280px] gap-3">
          {filtered.map((photo) => (
            <div
              key={photo.alt}
              className={`overflow-hidden rounded-sm cursor-pointer ${photo.span}`}
              onClick={() => setLightbox(photo)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-charcoal/90 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              aria-label="Close lightbox"
              className="absolute top-5 right-5 text-cream hover:opacity-70 transition-opacity"
            >
              <X size={28} />
            </button>

            {/* Photo + caption */}
            <div
              className="flex flex-col items-center gap-4 px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-sm"
              />
              <p className="font-body text-xs text-beige2 tracking-widest uppercase text-center">
                {lightbox.alt}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
