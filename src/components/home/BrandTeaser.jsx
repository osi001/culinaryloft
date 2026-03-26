import { motion } from 'framer-motion'
import storyPhoto from '../../assets/photo-story.jpeg'

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
}

export default function OurStory() {
  return (
    <section className="relative py-16 md:py-20 px-8 md:px-16 overflow-hidden">

      {/* Background photo */}
      <img
        src={storyPhoto}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Cream overlay */}
      <div className="absolute inset-0 bg-cream/80" />

      {/* Top fade — dissolves from manifesto's steam photo */}
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #E9E9E9 0%, transparent 100%)' }}
      />
      {/* Bottom fade — dissolves into Experiences */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #DCDCDC 0%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mb-5"
        >
          <h2 className="font-display text-3xl md:text-4xl text-brown">Our Story</h2>
          <span className="block w-8 h-px bg-beige2 mx-auto mt-4 mb-0" />
        </motion.div>

        <motion.div
          className="flex flex-col gap-3 text-mid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{ show: { transition: { staggerChildren: 0.2 } } }}
        >
          <motion.div variants={fadeIn}>
            <p className="font-display text-xl md:text-2xl leading-relaxed">He cooked in quiet ways.</p>
            <p className="font-body text-sm text-tan italic mt-1">Not for attention — but for love.</p>
          </motion.div>

          <motion.div variants={fadeIn} className="font-body text-sm text-mid leading-loose">
            <p>A father. A husband.</p>
            <p>A man who understood that food could hold memory.</p>
          </motion.div>

          <motion.div variants={fadeIn} className="border-l border-beige2 pl-5 text-left font-body text-sm text-mid leading-loose mx-auto max-w-sm">
            <p>We learned in that stillness.</p>
            <p className="mt-1">That recipes are not written — they are carried.</p>
            <p>Passed from hand to hand. From moment to moment.</p>
          </motion.div>

          <motion.div variants={fadeIn} className="font-body text-sm text-mid leading-loose">
            <p className="font-display text-lg text-brown">Culinary Loft lives there now.</p>
            <p className="mt-1">In the spaces between people.</p>
            <p>In the pause before the first bite.</p>
            <p>In the warmth that stays after.</p>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
