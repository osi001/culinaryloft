import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import photoSetting from '../../assets/photo-setting.jpeg'
import photoStory from '../../assets/photo-story.jpeg'
import photoSteam from '../../assets/photo-steam.jpeg'
import { urlFor } from '../../lib/imageUrl'

const SLIDES = [
  {
    id: 'private-dining',
    title: 'Private Dining',
    body: 'A table set with intention.\nCourses that unfold, not rush.',
    photo: photoSetting,
  },
  {
    id: 'curated-tables',
    title: 'Curated Tables',
    body: 'Gatherings shaped quietly.\nLayered, personal, unforced.',
    photo: photoStory,
  },
  {
    id: 'intimate-celebrations',
    title: 'Intimate Celebrations',
    body: 'Moments that matter—\nheld gently, without excess.',
    photo: photoSteam,
  },
]

export default function Experiences({ slides: cmsSlides }) {
  const slides = (cmsSlides && cmsSlides.length > 0)
    ? cmsSlides.map(s => ({
        id: s._id,
        title: s.title,
        body: s.body,
        photo: s.photo ? s.photo : null,
      }))
    : SLIDES

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    setCurrent(0)
  }, [slides.length])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % slides.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative overflow-hidden py-20 md:py-28">

      {/* Background photos */}
      {slides.map((s, i) => {
        const src = s.photo?.asset ? urlFor(s.photo).width(1600).auto('format').url() : s.photo
        return src ? (
          <motion.img
            key={s.id}
            src={src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center"
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
          />
        ) : null
      })}

      {/* Diagonal gradient — same as other sections */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(125deg, #DCDCDC 38%, rgba(220,220,220,0.82) 58%, rgba(220,220,220,0.25) 80%, transparent 100%)',
        }}
      />

      {/* Top fade */}
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #DCDCDC 0%, transparent 100%)' }}
      />

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #E9E9E9 0%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16">
        <div className="max-w-sm">

          <p className="font-body text-xs text-tan tracking-widest uppercase mb-6">Experiences</p>

          <AnimatePresence mode="wait">
            <motion.div
              key={slides[current].id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              className="flex flex-col gap-4"
            >
              <h2 className="font-display text-4xl md:text-5xl text-brown leading-tight">
                {slides[current].title}
              </h2>
              <span className="block w-8 h-px bg-beige2" />
              <p className="font-body text-sm text-mid leading-loose whitespace-pre-line">
                {slides[current].body}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex items-center gap-2 mt-8 mb-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? 'w-5 bg-brown' : 'w-1.5 bg-beige2'
                }`}
              />
            ))}
          </div>

          <Link
            to="/contact"
            className="font-body text-xs text-brown border border-brown px-6 py-2.5 rounded-sm hover:bg-brown hover:text-cream transition-colors tracking-wide"
          >
            Request an Experience
          </Link>

          <p className="font-display italic text-mid text-base mt-8">
            Each table is its own story.
          </p>

        </div>
      </div>

    </section>
  )
}
