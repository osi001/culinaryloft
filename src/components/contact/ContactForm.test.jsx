import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import ContactForm from './ContactForm'

describe('ContactForm', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders name, email, phone and message fields', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('renders Send Message button', () => {
    render(<ContactForm />)
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('shows success message after 200 response', async () => {
    global.fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) })
    render(<ContactForm />)
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Ada' } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'ada@test.com' } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello there' } })
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => expect(screen.getByText(/message sent/i)).toBeInTheDocument())
  })

  it('shows error alert after non-200 response', async () => {
    global.fetch.mockResolvedValueOnce({ ok: false, json: async () => ({ error: 'Server error' }) })
    render(<ContactForm />)
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Ada' } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'ada@test.com' } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello there' } })
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Server error'))
  })

  it('shows connection error on fetch failure', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'))
    render(<ContactForm />)
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Ada' } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'ada@test.com' } })
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello there' } })
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent(/connection error/i))
  })
})
