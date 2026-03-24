import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import FeaturedMenu from './FeaturedMenu'

const MOCK_ITEMS = [
  { _id: '1', name: 'Taco Trio', price: 15000, description: 'Three delicious tacos', image: null },
  { _id: '2', name: 'Curry Del Mare', price: 20000, description: 'Seafood curry', image: null },
]

describe('FeaturedMenu', () => {
  it('renders all items', () => {
    render(<MemoryRouter><FeaturedMenu items={MOCK_ITEMS} whatsappNumber="2348000000000" /></MemoryRouter>)
    expect(screen.getByText('Taco Trio')).toBeInTheDocument()
    expect(screen.getByText('Curry Del Mare')).toBeInTheDocument()
  })

  it('formats price with ₦ and commas', () => {
    render(<MemoryRouter><FeaturedMenu items={MOCK_ITEMS} whatsappNumber="2348000000000" /></MemoryRouter>)
    expect(screen.getByText('₦15,000')).toBeInTheDocument()
    expect(screen.getByText('₦20,000')).toBeInTheDocument()
  })

  it('renders order links pointing to WhatsApp', () => {
    render(<MemoryRouter><FeaturedMenu items={MOCK_ITEMS} whatsappNumber="2348000000000" /></MemoryRouter>)
    const orderLinks = screen.getAllByRole('link', { name: /order/i })
    orderLinks.forEach(link => expect(link.href).toContain('wa.me'))
  })

  it('renders icon placeholder when item has no image', () => {
    const { container } = render(<MemoryRouter><FeaturedMenu items={MOCK_ITEMS} whatsappNumber="2348000000000" /></MemoryRouter>)
    const placeholderDivs = container.querySelectorAll('.bg-beige2')
    expect(placeholderDivs.length).toBe(MOCK_ITEMS.length)
  })
})
