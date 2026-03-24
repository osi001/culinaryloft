import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewsletterSignup from './NewsletterSignup'

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
})

describe('NewsletterSignup', () => {
  it('renders email input and submit button', () => {
    render(<NewsletterSignup />)
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument()
  })

  it('shows success message on successful submission', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) })
    const user = userEvent.setup()
    render(<NewsletterSignup />)
    await user.type(screen.getByPlaceholderText(/email/i), 'test@example.com')
    await user.click(screen.getByRole('button', { name: /subscribe/i }))
    await waitFor(() => expect(screen.getByText(/thank you/i)).toBeInTheDocument())
  })

  it('shows error message on failed submission', async () => {
    fetch.mockResolvedValueOnce({ ok: false, json: async () => ({ error: 'Failed' }) })
    const user = userEvent.setup()
    render(<NewsletterSignup />)
    await user.type(screen.getByPlaceholderText(/email/i), 'bad@example.com')
    await user.click(screen.getByRole('button', { name: /subscribe/i }))
    await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument())
  })
})
