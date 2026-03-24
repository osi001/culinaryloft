import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Hero from './Hero'

describe('Hero', () => {
  it('renders main headline', () => {
    render(<Hero whatsappNumber="2348000000000" />)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders WhatsApp CTA button', () => {
    render(<Hero whatsappNumber="2348000000000" />)
    const link = screen.getByRole('link', { name: /order/i })
    expect(link.href).toContain('wa.me')
  })

  it('renders a green health badge', () => {
    render(<Hero whatsappNumber="2348000000000" />)
    expect(screen.getByText(/health/i)).toBeInTheDocument()
  })
})
