import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import settingPhoto from '../../assets/photo-setting.jpeg'

const EXPERIENCES = [
  {
    title: 'Private Dining',
    body: 'A table set with intention.\nCourses that unfold, not rush.',
  },
  {
    title: 'Curated Tables',
    body: 'Gatherings shaped quietly.\nLayered, personal, unforced.',
  },
  {
    title: 'Intimate Celebrations',
    body: 'Moments that matter—\nheld gently, without excess.',
  },
]

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
}

export default function Experiences() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">

      {/* Full-bleed photo */}
      <img
        src={settingPhoto}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Diagonal gradient — cream left, photo bleeds bottom-right */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(125deg, #DCDCDC 38%, rgba(220,220,220,0.82) 58%, rgba(220,220,220,0.25) 80%, transparent 100%)',
        }}
      />

      {/* Top fade — matches Our Story bottom */}
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #DCDCDC 0%, transparent 100%)' }}
      />

      {/* Bottom fade into Glimpses */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #E9E9E9 0%, transparent 100%)' }}
      />

      {/* Content — left side */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8 md:px-16">
        <div className="max-w-sm">

          <motion.div
            className="mb-5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="font-display text-3xl md:text-4xl text-brown">Experiences</h2>
            <span className="block w-8 h-px bg-beige2 mt-4 mb-3" />
            <p className="font-display italic text-base text-mid">Nothing here is repeated.</p>
            <p className="font-body text-xs text-tan">Only remembered.</p>
          </motion.div>

          <motion.div
            className="flex flex-col divide-y divide-beige2/60"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          >
            {EXPERIENCES.map((exp) => (
              <motion.div key={exp.title} className="py-3 first:pt-0" variants={fadeIn}>
                <h3 className="font-display text-lg text-brown mb-0.5">{exp.title}</h3>
                <p className="font-body text-xs text-mid leading-relaxed whitespace-pre-line">{exp.body}</p>
              </motion.div>
            ))}

            <motion.div className="pt-5" variants={fadeIn}>
              <Link
                to="/contact"
                className="font-body text-xs text-brown border border-brown px-6 py-2.5 rounded-sm hover:bg-brown hover:text-cream transition-colors tracking-wide"
              >
                Request an Experience
              </Link>
            </motion.div>
          </motion.div>

          <motion.p
            className="font-display italic text-mid text-base mt-5"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            Each table is its own story.
          </motion.p>

        </div>
      </div>

    </section>
  )
}
