import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import FeaturedMenu from './FeaturedMenu'

const MOCK_ITEMS = [
  { _id: '1', name: 'Taco Trio', price: 15000, description: 'Three delicious tacos', image: null },
  { _id: '2', name: 'Curry Del Mare', price: 20000, description: 'Seafood curry', image: null },
]

describe('FeaturedMenu', () => {
  it('renders all items', () => {
    render(<FeaturedMenu items={MOCK_ITEMS} whatsappNumber="2348000000000" />)
    expect(screen.getByText('Taco Trio')).toBeInTheDocument()
    expect(screen.getByText('Curry Del Mare')).toBeInTheDocument()
  })

  it('formats price with ₦ and commas', () => {
    render(<FeaturedMenu items={MOCK_ITEMS} whatsappNumber="2348000000000" />)
    expect(screen.getByText('₦15,000')).toBeInTheDocument()
    expect(screen.getByText('₦20,000')).toBeInTheDocument()
  })

  it('renders order links pointing to WhatsApp', () => {
    render(<FeaturedMenu items={MOCK_ITEMS} whatsappNumber="2348000000000" />)
    const orderLinks = screen.getAllByRole('link', { name: /order/i })
    orderLinks.forEach(link => expect(link.href).toContain('wa.me'))
  })

  it('renders icon placeholder when item has no image', () => {
    const { container } = render(<FeaturedMenu items={MOCK_ITEMS} whatsappNumber="2348000000000" />)
    const placeholderDivs = container.querySelectorAll('.bg-beige2')
    expect(placeholderDivs.length).toBe(MOCK_ITEMS.length)
  })
})
