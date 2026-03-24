import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import SectionHeading from './SectionHeading'

describe('SectionHeading', () => {
  it('renders eyebrow text', () => {
    render(<SectionHeading eyebrow="Our Menu" title="Featured Dishes" />)
    expect(screen.getByText('Our Menu')).toBeInTheDocument()
  })

  it('renders title', () => {
    render(<SectionHeading eyebrow="Our Menu" title="Featured Dishes" />)
    expect(screen.getByText('Featured Dishes')).toBeInTheDocument()
  })

  it('renders optional subtitle', () => {
    render(<SectionHeading eyebrow="E" title="T" subtitle="Sub text here" />)
    expect(screen.getByText('Sub text here')).toBeInTheDocument()
  })

  it('renders without subtitle when not provided', () => {
    render(<SectionHeading eyebrow="E" title="T" />)
    expect(screen.queryByRole('paragraph')).toBeNull()
  })
})
