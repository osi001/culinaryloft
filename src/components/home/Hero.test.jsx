import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Hero from './Hero'

describe('Hero', () => {
  it('renders main headline', () => {
    render(<MemoryRouter><Hero /></MemoryRouter>)
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders brand name in headline', () => {
    render(<MemoryRouter><Hero /></MemoryRouter>)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/culinary loft/i)
  })

  it('renders tagline', () => {
    render(<MemoryRouter><Hero /></MemoryRouter>)
    expect(screen.getByText(/where food becomes memory/i)).toBeInTheDocument()
  })
})
