import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import SectionHeading from '../shared/SectionHeading'
import { urlFor } from '../../lib/imageUrl'

const FALLBACK = [
  { _id: 'f1', name: 'Adaeze O.', quote: 'The Curry Del Mare is absolutely divine. Delivery was fast and everything arrived piping hot.', image: null },
  { _id: 'f2', name: 'Kola B.', quote: 'Best jollof in Lagos, hands down. The charred ember jollof is a game changer.', image: null },
  { _id: 'f3', name: 'Temi A.', quote: 'Healthy food that actually tastes amazing. Culinaryloft has ruined regular restaurants for me.', image: null },
]

function TestimonialCard({ testimonial, index }) {
  const imageUrl = testimonial.image
    ? urlFor(testimonial.image).width(80).height(80).fit('crop').url()
    : null

  return (
    <motion.blockquote
      className="bg-white border border-beige rounded-sm p-6 flex flex-col gap-4"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Quote size={18} className="text-tan" aria-hidden="true" />
      <p className="font-body text-mid text-sm leading-relaxed flex-1">"{testimonial.quote}"</p>
      <footer className="flex items-center gap-3 mt-auto pt-4 border-t border-beige">
        {imageUrl ? (
          <img src={imageUrl} alt={testimonial.name} className="w-9 h-9 rounded-full object-cover" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-beige2 flex items-center justify-center text-tan text-sm font-display">
            {testimonial.name[0]}
          </div>
        )}
        <span className="font-body text-sm font-medium text-charcoal">{testimonial.name}</span>
      </footer>
    </motion.blockquote>
  )
}

export default function Testimonials({ testimonials }) {
  const items = testimonials?.length ? testimonials : FALLBACK

  return (
    <section className="bg-beige py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Our Customers"
          title="What Lagos is saying"
          center
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {items.map((t, i) => (
            <TestimonialCard key={t._id} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
