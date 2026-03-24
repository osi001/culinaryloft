import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Hero from './Hero'

describe('Hero', () => {
  it('renders main headline', () => {
    render(<MemoryRouter><Hero whatsappNumber="2348000000000" /></MemoryRouter>)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders WhatsApp CTA button', () => {
    render(<MemoryRouter><Hero whatsappNumber="2348000000000" /></MemoryRouter>)
    const link = screen.getByRole('link', { name: /order/i })
    expect(link.href).toContain('wa.me')
  })

  it('renders a green health badge', () => {
    render(<MemoryRouter><Hero whatsappNumber="2348000000000" /></MemoryRouter>)
    expect(screen.getByText(/health/i)).toBeInTheDocument()
  })
})
