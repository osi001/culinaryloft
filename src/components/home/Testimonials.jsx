import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const IG_ICON = (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="shrink-0">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const REVIEWS = [
  {
    id: 1,
    handle: '@chizzyddiva',
    quote: 'Had this yummy dirty jollof rice and iced coffee from @culinaryloft and it was so amazing. For your lunch packs you can pre order from them.',
  },
  {
    id: 2,
    handle: '@ladyzcch',
    quote: '@culinaryloft got the best pasta.... can\'t wait to try out other food on the menu.',
  },
  {
    id: 3,
    handle: '@instablog9ja',
    quote: '@culinaryloft got the best pasta.... can\'t wait to try out other food on the menu.',
  },
  {
    id: 4,
    handle: '@lexxiaa',
    quote: 'The salad omg!! I\'m in love, I\'m obsessed. Perfect ratio of lettuce to croutons to chicken. So balanced and yummy.',
  },
  {
    id: 5,
    name: 'Amaka T.',
    quote: 'Thank you for this executive pasta. My stomach is happy.',
  },
  {
    id: 6,
    name: 'Biodun K.',
    quote: 'Then that sandwich — it\'s the best I\'ve had in my life. I can\'t even lie. I need more.',
  },
  {
    id: 7,
    name: 'Seun O.',
    quote: 'On point. I\'m turning it round to check how they infused the egg into sliced bread.',
  },
  {
    id: 8,
    handle: '@ladyzcch',
    quote: '@culinaryloft got all my money. Sure love my loft pasta.',
  },
  {
    id: 9,
    handle: '@Halileads',
    quote: 'Straight from the Airport to an amazing meal. The pasta was rich, flavorful, and perfectly cooked, and the sandwich was fresh, well-seasoned, and so satisfying. But let me talk about that iced coffee 😍 hands down the BEST I\'ve had in my life. So Smooth, refreshing, and just the right balance of flavor. Everything was 10/10. Great food, great taste, and definitely a spot I\'ll keep coming back to. Highly recommend 👌',
  },
]

export default function Testimonials({ reviews }) {
  const list = (reviews && reviews.length > 0) ? reviews : REVIEWS
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    setIndex(0)
  }, [list])

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setIndex(i => (i + 1) % list.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [list])

  const review = list[index]

  return (
    <section className="bg-beige py-20 px-4 md:px-8">
      <div className="max-w-2xl mx-auto text-center">

        <p className="font-body text-xs text-tan tracking-widest uppercase mb-2">Our Customers</p>
        <h2 className="font-display text-3xl md:text-4xl text-brown mb-10">What Lagos is saying</h2>

        <div className="relative min-h-[160px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={review._id || review.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-4"
            >
              <p className="font-display italic text-xl md:text-2xl text-brown leading-relaxed max-w-xl">
                "{review.quote}"
              </p>
              <div className="flex items-center gap-1.5 font-body text-xs text-tan tracking-wide">
                {review.handle ? (
                  <>
                    {IG_ICON}
                    <span>{review.handle}</span>
                  </>
                ) : (
                  <span>— {review.name}</span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {list.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i) }}
              aria-label={`Go to review ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'bg-brown w-4' : 'bg-beige2'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
