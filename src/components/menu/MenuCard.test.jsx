import { render, screen, fireEvent } from '@testing-library/react'
import { CartProvider } from '../../context/CartContext'
import MenuCard from './MenuCard'

const ITEM = {
  _id: 'item1',
  name: 'Taco Trio',
  description: 'Three artisan tacos',
  price: 15000,
  image: null,
  categoryName: 'Specials',
}

function renderCard(item = ITEM) {
  return render(
    <CartProvider>
      <MenuCard item={item} index={0} />
    </CartProvider>
  )
}

test('renders item name and formatted price', () => {
  renderCard()
  expect(screen.getByText('Taco Trio')).toBeInTheDocument()
  expect(screen.getByText('₦15,000')).toBeInTheDocument()
})

test('renders category eyebrow', () => {
  renderCard()
  expect(screen.getByText('Specials')).toBeInTheDocument()
})

test('renders description', () => {
  renderCard()
  expect(screen.getByText('Three artisan tacos')).toBeInTheDocument()
})

test('renders + Add button when item not in cart', () => {
  renderCard()
  expect(screen.getByRole('button', { name: /add taco trio/i })).toBeInTheDocument()
})

test('shows qty stepper after clicking + Add', () => {
  renderCard()
  fireEvent.click(screen.getByRole('button', { name: /add taco trio/i }))
  expect(screen.getByRole('button', { name: /increase quantity/i })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /decrease quantity/i })).toBeInTheDocument()
  expect(screen.getByText('1')).toBeInTheDocument()
})

test('renders placeholder icon when no image', () => {
  const { container } = renderCard()
  expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument()
})
