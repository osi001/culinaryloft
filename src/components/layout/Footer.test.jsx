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
    expect(screen.getByText('Culinary Loft')).toBeInTheDocument()
  })

  it('renders location text', () => {
    renderFooter()
    expect(screen.getByText(/lagos/i)).toBeInTheDocument()
  })

  it('renders nav links', () => {
    renderFooter()
    expect(screen.getByRole('link', { name: /menu/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('renders WhatsApp link to correct number when provided', () => {
    renderFooter({ whatsappNumber: '2348012345678' })
    const waLink = screen.getByRole('link', { name: /whatsapp/i })
    expect(waLink.href).toContain('wa.me/2348012345678')
  })

  it('renders copyright notice', () => {
    renderFooter()
    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument()
  })
})
