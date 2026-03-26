import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MESSAGES = [
  'Free delivery on orders over ₦50,000',
  'Order via WhatsApp for same-day delivery',
  'Fresh ingredients, crafted daily',
]

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % MESSAGES.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full bg-charcoal text-cream h-8 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          className="font-body text-xs tracking-widest uppercase text-center"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          {MESSAGES[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}
