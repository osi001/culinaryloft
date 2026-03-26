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

export default function CartBar({ whatsappNumber }) {
  const { items, total } = useCart()
  if (items.length === 0) return null

  const count = items.reduce((sum, i) => sum + i.quantity, 0)
  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(buildCartMessage(items))}`

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-charcoal text-white px-4 md:px-8 py-3 flex items-center justify-between gap-4">
      <span className="font-body text-sm">
        🛒 {count} {count === 1 ? 'item' : 'items'} · ₦{total.toLocaleString('en-NG')}
      </span>
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Send order on WhatsApp"
        className="bg-green text-white font-body font-medium text-xs py-2 px-5 rounded-sm hover:opacity-90 transition-opacity whitespace-nowrap"
      >
        Send order on WhatsApp →
      </a>
    </div>
  )
}
