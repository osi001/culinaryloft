import { render, screen, fireEvent } from '@testing-library/react'
import { CartProvider, useCart } from '../../context/CartContext'
import CartBar from './CartBar'

const ITEM = { _id: 'item1', name: 'Taco Trio', price: 15000 }

function Wrapper({ whatsappNumber = '2348000000000' }) {
  return (
    <CartProvider>
      <Inner whatsappNumber={whatsappNumber} />
    </CartProvider>
  )
}

function Inner({ whatsappNumber }) {
  const { addItem } = useCart()
  return (
    <>
      <button onClick={() => addItem(ITEM)}>add item</button>
      <CartBar whatsappNumber={whatsappNumber} />
    </>
  )
}

test('renders nothing when cart is empty', () => {
  const { container } = render(<Wrapper />)
  expect(container.querySelector('a')).not.toBeInTheDocument()
})

test('shows bar with item count and total after adding item', () => {
  render(<Wrapper />)
  fireEvent.click(screen.getByText('add item'))
  expect(screen.getByText(/1 item/)).toBeInTheDocument()
  expect(screen.getByText(/15,000/)).toBeInTheDocument()
})

test('WhatsApp href contains wa.me number', () => {
  render(<Wrapper />)
  fireEvent.click(screen.getByText('add item'))
  const link = screen.getByRole('link', { name: /send order on whatsapp/i })
  expect(link.getAttribute('href')).toContain('wa.me/2348000000000')
})

test('WhatsApp message includes item name and line total', () => {
  render(<Wrapper />)
  fireEvent.click(screen.getByText('add item'))
  const link = screen.getByRole('link', { name: /send order on whatsapp/i })
  const decoded = decodeURIComponent(link.getAttribute('href'))
  expect(decoded).toContain('Taco Trio')
  expect(decoded).toContain('15,000')
})
