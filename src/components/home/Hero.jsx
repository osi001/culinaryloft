import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="w-full h-screen min-h-[560px] bg-cream flex flex-col items-center justify-center text-center px-8">

      <motion.h1
        className="font-display text-5xl md:text-6xl lg:text-7xl text-brown leading-none mb-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Culinary Loft
      </motion.h1>

      <motion.p
        className="font-display italic text-lg md:text-xl text-mid leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
      >
        Where food becomes memory.
      </motion.p>

    </section>
  )
}
