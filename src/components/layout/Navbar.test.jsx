import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../../context/CartContext'
import Navbar from './Navbar'

function renderNav() {
  return render(
    <CartProvider>
      <MemoryRouter>
        <Navbar whatsappNumber="2348012345678" />
      </MemoryRouter>
    </CartProvider>
  )
}

describe('Navbar', () => {
  it('renders brand name', () => {
    renderNav()
    expect(screen.getByText(/culinary loft/i)).toBeInTheDocument()
  })

  it('renders nav links', () => {
    renderNav()
    expect(screen.getByRole('link', { name: /menu/i })).toBeInTheDocument()
  })

  it('shows mobile menu toggle button', () => {
    renderNav()
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument()
  })

  it('shows cart button', () => {
    renderNav()
    expect(screen.getByRole('button', { name: /open cart/i })).toBeInTheDocument()
  })

  it('opens mobile menu on toggle click', async () => {
    const user = userEvent.setup()
    renderNav()
    await user.click(screen.getByRole('button', { name: /open menu/i }))
    expect(screen.getByRole('navigation', { name: /mobile/i })).toBeInTheDocument()
  })
})
