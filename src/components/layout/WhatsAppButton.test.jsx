import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import WhatsAppButton from './WhatsAppButton'

describe('WhatsAppButton', () => {
  it('renders a link to wa.me', () => {
    render(<WhatsAppButton number="2348012345678" />)
    const link = screen.getByRole('link')
    expect(link.href).toContain('wa.me/2348012345678')
  })

  it('includes default greeting message in the link', () => {
    render(<WhatsAppButton number="2348012345678" />)
    const link = screen.getByRole('link')
    expect(link.href).toContain('Culinaryloft')
  })

  it('has accessible label', () => {
    render(<WhatsAppButton number="2348012345678" />)
    expect(screen.getByLabelText(/whatsapp/i)).toBeInTheDocument()
  })
})
