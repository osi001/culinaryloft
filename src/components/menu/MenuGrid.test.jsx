import { render, screen } from '@testing-library/react'
import { CartProvider } from '../../context/CartContext'
import MenuGrid from './MenuGrid'

const ITEMS = [
  { _id: 'i1', name: 'Taco Trio', price: 15000, image: null, categoryId: 'cat1', categoryName: 'Specials' },
  { _id: 'i2', name: 'Curry Del Mare', price: 20000, image: null, categoryId: 'cat1', categoryName: 'Specials' },
  { _id: 'i3', name: 'Beef Burger', price: 15000, image: null, categoryId: 'cat2', categoryName: 'Burgers' },
]

function renderGrid(props) {
  return render(
    <CartProvider>
      <MenuGrid {...props} />
    </CartProvider>
  )
}

test('renders all items when activeCategory is null', () => {
  renderGrid({ items: ITEMS, activeCategory: null })
  expect(screen.getByText('Taco Trio')).toBeInTheDocument()
  expect(screen.getByText('Curry Del Mare')).toBeInTheDocument()
  expect(screen.getByText('Beef Burger')).toBeInTheDocument()
})

test('filters items by categoryId', () => {
  renderGrid({ items: ITEMS, activeCategory: 'cat2' })
  expect(screen.queryByText('Taco Trio')).not.toBeInTheDocument()
  expect(screen.queryByText('Curry Del Mare')).not.toBeInTheDocument()
  expect(screen.getByText('Beef Burger')).toBeInTheDocument()
})

test('shows empty message when no items match category', () => {
  renderGrid({ items: ITEMS, activeCategory: 'cat99' })
  expect(screen.getByText(/no items available/i)).toBeInTheDocument()
})

test('renders empty message when items array is empty', () => {
  renderGrid({ items: [], activeCategory: null })
  expect(screen.getByText(/no items available/i)).toBeInTheDocument()
})
