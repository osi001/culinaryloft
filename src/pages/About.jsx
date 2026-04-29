import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import storyPhoto from '../assets/photo-story.jpeg'
import emptyPhoto from '../assets/photo-empty.jpeg'
import settingPhoto from '../assets/photo-setting.jpeg'
import chefLogo from '../assets/logo-chef.webp'

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
}

const VALUES = [
  {
    title: 'Intention',
    body: 'Every element chosen with purpose.\nNothing placed by accident.',
  },
  {
    title: 'Restraint',
    body: 'We do not add until there is nothing left to add.\nWe remove until there is nothing left to remove.',
  },
  {
    title: 'Memory',
    body: 'Food is not consumed.\nIt is kept — long after the plate is gone.',
  },
]

export default function About() {
  return (
    <main>

      {/* ── Hero ── */}
      <section className="w-full min-h-[55vh] bg-cream flex flex-col items-center justify-center text-center px-8 pt-24 pb-16">
        <motion.p
          className="font-body text-xs text-tan tracking-widest uppercase mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Our Story
        </motion.p>
        <motion.h1
          className="font-display text-5xl md:text-6xl lg:text-7xl text-brown leading-none mb-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Built on memory.
        </motion.h1>
        <motion.p
          className="font-display italic text-lg md:text-xl text-mid max-w-md leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Every table has a history.<br />Ours begins in a kitchen that never needed an audience.
        </motion.p>
      </section>

      {/* ── Origin Story — photo left, text right ── */}
      <section className="relative overflow-hidden py-16 md:py-24">

        <img
          src={storyPhoto}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(305deg, #E9E9E9 38%, rgba(233,233,233,0.82) 58%, rgba(233,233,233,0.25) 80%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, #E9E9E9 0%, transparent 100%)' }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #E9E9E9 0%, transparent 100%)' }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 flex justify-end">
          <motion.div
            className="max-w-sm flex flex-col gap-3 font-body text-mid text-sm leading-loose"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.18 } } }}
          >
            <motion.p variants={fadeIn} className="font-display text-2xl md:text-3xl text-brown">
              He cooked in quiet ways.
            </motion.p>
            <motion.span variants={fadeIn} className="block w-8 h-px bg-beige2" />
            <motion.p variants={fadeIn} className="text-tan italic">
              Not for attention — but for love.
            </motion.p>
            <motion.p variants={fadeIn}>
              A father. A husband.<br />
              A man who understood that food could hold memory.
            </motion.p>
            <motion.div
              variants={fadeIn}
              className="border-l border-beige2 pl-4 font-body text-sm text-mid leading-loose"
            >
              <p>We learned in that stillness.</p>
              <p className="mt-1">That recipes are not written — they are carried.</p>
              <p>Passed from hand to hand. From moment to moment.</p>
            </motion.div>
            <motion.p variants={fadeIn} className="font-display text-xl text-brown">
              Culinary Loft lives there now.
            </motion.p>
            <motion.p variants={fadeIn} className="text-tan">
              In the spaces between people.<br />
              In the pause before the first bite.<br />
              In the warmth that stays after.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Legacy section ── */}
      <section className="bg-cream py-16 md:py-24 px-8 md:px-16">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.16 } } }}
            className="flex flex-col items-center gap-4"
          >
            <motion.h2 variants={fadeIn} className="font-display text-3xl md:text-4xl text-brown">
              A Legacy of Love and Flavour
            </motion.h2>
            <motion.span variants={fadeIn} className="block w-8 h-px bg-beige2" />

            <motion.p variants={fadeIn} className="font-body text-sm text-mid leading-loose">
              Culinary Loft is more than just a kitchen. It is a quiet tribute to family, tradition,
              and the timeless power of food.
            </motion.p>

            <motion.p variants={fadeIn} className="font-body text-sm text-mid leading-loose">
              Inspired by my father — a loving husband and devoted dad — we honour the recipes,
              flavours, and memories that brought us together. Growing up, I watched him turn
              simple ingredients into moments of joy, teaching me that cooking is more than a
              skill. It is an expression of love.
            </motion.p>

            <motion.p variants={fadeIn} className="font-body text-sm text-mid leading-loose">
              Every dish we create carries that same warmth — a reflection of patience, creativity,
              and the joy of sharing a meal with those who matter most.
            </motion.p>

            <motion.span variants={fadeIn} className="block w-8 h-px bg-beige2" />

            <motion.div variants={fadeIn} className="flex flex-col items-center gap-3">
              <img src={chefLogo} alt="Culinary Loft mascot" className="w-24 h-24 object-contain opacity-80" />
              <p className="font-body text-xs text-tan leading-relaxed max-w-sm">
                Our mascot — the wise, cheerful grandpa giving the perfect sign — embodies this
                story. A gentle reminder that food made with love has the power to connect generations.
              </p>
            </motion.div>

            <motion.span variants={fadeIn} className="block w-8 h-px bg-beige2" />

            <motion.p variants={fadeIn} className="font-display italic text-xl md:text-2xl text-brown">
              Join us at the Loft, where every bite is a celebration of heritage,
              togetherness, and the art of cooking.
            </motion.p>
            <motion.p variants={fadeIn} className="font-body text-xs text-tan tracking-widest uppercase">
              Cooking memories, one plate at a time.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Values — photo right, text left ── */}
      <section className="relative overflow-hidden py-16 md:py-24">

        <img
          src={settingPhoto}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(125deg, #E9E9E9 38%, rgba(233,233,233,0.82) 58%, rgba(233,233,233,0.25) 80%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, #E9E9E9 0%, transparent 100%)' }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #E9E9E9 0%, transparent 100%)' }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16">
          <div className="max-w-sm">
            <motion.div
              className="mb-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="font-display text-3xl md:text-4xl text-brown">What we hold.</h2>
              <span className="block w-8 h-px bg-beige2 mt-4" />
            </motion.div>

            <motion.div
              className="flex flex-col divide-y divide-beige2/60"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ show: { transition: { staggerChildren: 0.15 } } }}
            >
              {VALUES.map(v => (
                <motion.div key={v.title} className="py-4 first:pt-0" variants={fadeIn}>
                  <h3 className="font-display text-lg text-brown mb-1">{v.title}</h3>
                  <p className="font-body text-xs text-mid leading-relaxed whitespace-pre-line">{v.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Closing photo strip ── */}
      <section className="bg-cream py-14 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 gap-3 h-[340px] md:h-[420px]">
            <div className="overflow-hidden rounded-sm">
              <img
                src={emptyPhoto}
                alt="An empty plate after the meal"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="overflow-hidden rounded-sm">
              <img
                src={storyPhoto}
                alt="A candlelit table"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <motion.div
            className="text-center mt-14"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="font-display text-3xl md:text-4xl text-brown mb-3">
              Come to the table.
            </p>
            <p className="font-body text-sm text-tan mb-8">
              No performance. Only presence.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                to="/menu"
                className="font-body text-xs text-brown border border-brown px-8 py-3 rounded-sm hover:bg-brown hover:text-cream transition-colors tracking-widest uppercase"
              >
                See the Menu
              </Link>
              <Link
                to="/contact"
                className="font-body text-xs text-charcoal border border-charcoal px-8 py-3 rounded-sm hover:bg-charcoal hover:text-cream transition-colors tracking-widest uppercase"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  )
}
