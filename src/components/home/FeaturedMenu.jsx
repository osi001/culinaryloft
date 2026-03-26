import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { UtensilsCrossed } from 'lucide-react'
import SectionHeading from '../shared/SectionHeading'
import { urlFor } from '../../lib/imageUrl'

function formatPrice(price) {
  return `₦${price.toLocaleString('en-NG')}`
}

function buildOrderMessage(item) {
  return `Hi, I'd like to order:\n- ${item.name} x1 — ${formatPrice(item.price)}\n\nTotal: ${formatPrice(item.price)}\n\nPlease confirm availability and delivery details.`
}

function MenuCard({ item, whatsappNumber, index }) {
  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(buildOrderMessage(item))}`
  const imageUrl = item.image ? urlFor(item.image).width(400).height(300).fit('crop').url() : null

  return (
    <motion.article
      className="bg-white border border-beige rounded-sm overflow-hidden hover:bg-cream transition-colors group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
    >
      <div className="aspect-[4/3] bg-beige2 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img src={imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <UtensilsCrossed size={32} className="text-tan" aria-hidden="true" />
        )}
      </div>
      <div className="p-5 flex flex-col gap-2">
        {item.categoryName && (
          <span className="eyebrow">{item.categoryName}</span>
        )}
        <h3 className="font-display text-xl text-charcoal">{item.name}</h3>
        {item.description && (
          <p className="text-mid text-sm font-body leading-relaxed line-clamp-2">{item.description}</p>
        )}
        <div className="flex items-center justify-between mt-3">
          <span className="font-display text-xl text-brown">{formatPrice(item.price)}</span>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Order ${item.name}`}
            className="text-xs font-body font-medium text-charcoal border border-beige2 py-1.5 px-4 rounded-sm hover:bg-charcoal hover:text-white transition-colors"
          >
            Order
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function FeaturedMenu({ items = [], whatsappNumber }) {
  return (
    <section className="bg-cream py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="This Week"
          title="Featured Specials"
          subtitle="Seasonal dishes made with care. Order directly on WhatsApp."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <MenuCard key={item._id} item={item} whatsappNumber={whatsappNumber} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/menu"
            className="inline-block border border-beige2 text-charcoal font-body font-medium text-sm py-3 px-8 rounded-sm hover:bg-beige2 transition-colors"
          >
            See Full Menu
          </Link>
        </div>
      </div>
    </section>
  )
}
