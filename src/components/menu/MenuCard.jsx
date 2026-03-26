import { motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'

function formatPrice(price) {
  return `₦${(price || 0).toLocaleString('en-NG')}`
}

export default function MenuCard({ item, index }) {
  const { items, addItem, updateQty } = useCart()
  const cartItem = items.find(i => i._id === item._id)
  const qty = cartItem?.quantity ?? 0

  return (
    <motion.article
      className="bg-white border border-beige rounded-sm hover:bg-cream transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
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
          {qty === 0 ? (
            <button
              onClick={() => addItem(item)}
              aria-label={`Add ${item.name} to cart`}
              className="text-xs font-body font-medium text-charcoal border border-beige2 py-1.5 px-4 rounded-sm hover:bg-charcoal hover:text-white transition-colors"
            >
              + Add
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQty(item._id, qty - 1)}
                aria-label="Decrease quantity"
                className="w-6 h-6 flex items-center justify-center border border-beige2 text-charcoal rounded-sm hover:bg-beige2 transition-colors font-medium"
              >
                −
              </button>
              <span className="font-body text-sm text-charcoal w-4 text-center">{qty}</span>
              <button
                onClick={() => addItem(item)}
                aria-label="Increase quantity"
                className="w-6 h-6 flex items-center justify-center border border-beige2 text-charcoal rounded-sm hover:bg-beige2 transition-colors font-medium"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  )
}
