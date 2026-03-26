import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Hero from '../components/home/Hero'
import OurStory from '../components/home/BrandTeaser'
import Experiences from '../components/home/Experiences'
import Glimpses from '../components/home/Glimpses'
import Testimonials from '../components/home/Testimonials'
import NewsletterSignup from '../components/home/NewsletterSignup'
import steamPhoto from '../assets/photo-steam.jpeg'

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
}

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Manifesto — text right, photo bleeds left, mirrored from Experiences */}
      <section className="relative overflow-hidden py-16 md:py-24">

        {/* Full-bleed photo */}
        <img
          src={steamPhoto}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Diagonal gradient — cream floods from right, photo bleeds left */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(305deg, #E9E9E9 38%, rgba(233,233,233,0.82) 58%, rgba(233,233,233,0.25) 80%, transparent 100%)',
          }}
        />

        {/* Top fade */}
        <div
          className="absolute inset-x-0 top-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, #E9E9E9 0%, transparent 100%)' }}
        />
        {/* Bottom fade — matches Our Story top */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #E9E9E9 0%, transparent 100%)' }}
        />

        {/* Content — right side */}
        <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 flex justify-end">
          <div className="max-w-sm">
            <motion.div
              className="flex flex-col gap-3 font-body text-mid text-sm leading-loose"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ show: { transition: { staggerChildren: 0.18 } } }}
            >
              <motion.p variants={fadeIn} className="font-display text-2xl md:text-3xl text-brown">
                There is a table<br />
                you arrive at softly.
              </motion.p>

              <motion.span variants={fadeIn} className="block w-8 h-px bg-beige2" />

              <motion.p variants={fadeIn}>Nothing announces itself.</motion.p>
              <motion.p variants={fadeIn} className="text-tan">
                Not the flavours.<br />Not the moment.
              </motion.p>
              <motion.p variants={fadeIn}>Yet everything stays with you.</motion.p>

              <motion.span variants={fadeIn} className="block w-8 h-px bg-beige2" />

              <motion.p variants={fadeIn} className="font-display text-xl text-brown">
                Culinary Loft is not dining.<br />
                It is a feeling—
              </motion.p>
              <motion.p variants={fadeIn} className="text-tan">
                assembled with care,<br />and left to linger.
              </motion.p>

              <motion.div variants={fadeIn} className="mt-1">
                <Link
                  to="/menu"
                  className="font-body text-xs text-brown border border-brown px-8 py-3 rounded-sm hover:bg-brown hover:text-cream transition-colors tracking-widest uppercase"
                >
                  Enter
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

      </section>

      <OurStory />
      <Experiences />
      <Glimpses />
      <Testimonials />
      <NewsletterSignup />
    </main>
  )
}
