import { AnimatePresence, motion } from 'framer-motion'
import { X, Trash2 } from 'lucide-react'
import { useCart } from '../../context/CartContext'

function buildCartMessage(items) {
  const lines = items.map(
    i => `- ${i.name} x${i.quantity} — ₦${(i.price * i.quantity).toLocaleString('en-NG')}`
  )
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  return [
    "Hi, I'd like to order:",
    ...lines,
    '',
    `Total: ₦${total.toLocaleString('en-NG')}`,
    '',
    'Please confirm availability and delivery details.',
  ].join('\n')
}

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || ''

export default function CartDrawer() {
  const { items, updateQty, removeItem, clearCart, total, drawerOpen, closeDrawer } = useCart()
  const count = items.reduce((sum, i) => sum + i.quantity, 0)
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildCartMessage(items))}`

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-charcoal/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-cream flex flex-col shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-beige2">
              <div>
                <h2 className="font-display text-xl text-charcoal">Your Order</h2>
                {count > 0 && (
                  <p className="font-body text-xs text-tan mt-0.5">{count} {count === 1 ? 'item' : 'items'}</p>
                )}
              </div>
              <button
                onClick={closeDrawer}
                aria-label="Close cart"
                className="text-mid hover:text-charcoal transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                  <p className="font-display text-lg text-mid">Nothing added yet.</p>
                  <p className="font-body text-sm text-tan">Browse the menu and add your picks.</p>
                </div>
              ) : (
                <ul className="flex flex-col divide-y divide-beige">
                  {items.map(item => (
                    <li key={item._id} className="py-4 flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-base text-charcoal leading-snug">{item.name}</p>
                        <p className="font-body text-sm text-tan mt-0.5">
                          ₦{(item.price * item.quantity).toLocaleString('en-NG')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => updateQty(item._id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-7 h-7 flex items-center justify-center border border-beige2 text-charcoal rounded-sm hover:bg-beige transition-colors font-medium text-sm"
                        >
                          −
                        </button>
                        <span className="font-body text-sm text-charcoal w-4 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item._id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-7 h-7 flex items-center justify-center border border-beige2 text-charcoal rounded-sm hover:bg-beige transition-colors font-medium text-sm"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item._id)}
                          aria-label={`Remove ${item.name}`}
                          className="ml-1 text-tan hover:text-charcoal transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-beige2 px-6 py-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-body text-sm text-mid">Total</span>
                  <span className="font-display text-xl text-brown">₦{total.toLocaleString('en-NG')}</span>
                </div>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-charcoal text-white font-body text-sm font-medium py-3 px-6 rounded-sm hover:bg-mid transition-colors text-center"
                >
                  Send order on WhatsApp →
                </a>
                <button
                  onClick={clearCart}
                  className="font-body text-xs text-tan hover:text-mid transition-colors text-center"
                >
                  Clear order
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
