import { render, screen, fireEvent } from '@testing-library/react'
import CategoryTabs from './CategoryTabs'

const CATS = [
  { _id: 'cat1', name: 'Specials', slug: { current: 'specials' } },
  { _id: 'cat2', name: 'Burgers', slug: { current: 'burgers' } },
]

test('renders All tab', () => {
  render(<CategoryTabs categories={CATS} activeId={null} onSelect={() => {}} />)
  expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument()
})

test('renders a button for each category', () => {
  render(<CategoryTabs categories={CATS} activeId={null} onSelect={() => {}} />)
  expect(screen.getByRole('button', { name: 'Specials' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Burgers' })).toBeInTheDocument()
})

test('calls onSelect(null) when All tab clicked', () => {
  const onSelect = vi.fn()
  render(<CategoryTabs categories={CATS} activeId="cat1" onSelect={onSelect} />)
  fireEvent.click(screen.getByRole('button', { name: 'All' }))
  expect(onSelect).toHaveBeenCalledWith(null)
})

test('calls onSelect with category _id when tab clicked', () => {
  const onSelect = vi.fn()
  render(<CategoryTabs categories={CATS} activeId={null} onSelect={onSelect} />)
  fireEvent.click(screen.getByRole('button', { name: 'Specials' }))
  expect(onSelect).toHaveBeenCalledWith('cat1')
})

test('active tab has bg-charcoal class', () => {
  render(<CategoryTabs categories={CATS} activeId="cat1" onSelect={() => {}} />)
  expect(screen.getByRole('button', { name: 'Specials' }).className).toContain('bg-charcoal')
})
