import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from './Footer'

function renderFooter(settings = {}) {
  return render(<MemoryRouter><Footer settings={settings} /></MemoryRouter>)
}

describe('Footer', () => {
  it('renders brand name', () => {
    renderFooter()
    expect(screen.getByText('Culinaryloft')).toBeInTheDocument()
  })

  it('renders fallback tagline when no settings', () => {
    renderFooter()
    expect(screen.getByText(/health-forward cuisine/i)).toBeInTheDocument()
  })

  it('renders tagline from settings when provided', () => {
    renderFooter({ tagline: 'Custom tagline text' })
    expect(screen.getByText('Custom tagline text')).toBeInTheDocument()
  })

  it('renders WhatsApp link to correct number when provided', () => {
    renderFooter({ whatsappNumber: '2348012345678' })
    const waLink = screen.getByRole('link', { name: /whatsapp/i })
    expect(waLink.href).toContain('wa.me/2348012345678')
  })

  it('renders email link when email provided', () => {
    renderFooter({ email: 'hello@culinaryloft.ng' })
    const emailLink = screen.getByRole('link', { name: /hello@culinaryloft/i })
    expect(emailLink.href).toContain('mailto:')
  })

  it('does not render email link when email not provided', () => {
    renderFooter({})
    expect(screen.queryByRole('link', { name: /mailto/i })).toBeNull()
  })
})
