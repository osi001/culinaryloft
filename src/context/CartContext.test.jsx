import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartProvider, useCart } from './CartContext'

function TestConsumer() {
  const { items, addItem, removeItem, total } = useCart()
  return (
    <div>
      <span data-testid="count">{items.length}</span>
      <span data-testid="total">{total}</span>
      <button onClick={() => addItem({ _id: '1', name: 'Taco Trio', price: 15000, quantity: 1 })}>
        Add
      </button>
      <button onClick={() => removeItem('1')}>Remove</button>
    </div>
  )
}

describe('CartContext', () => {
  it('starts with empty cart', () => {
    render(<CartProvider><TestConsumer /></CartProvider>)
    expect(screen.getByTestId('count').textContent).toBe('0')
    expect(screen.getByTestId('total').textContent).toBe('0')
  })

  it('adds an item and updates total', async () => {
    const user = userEvent.setup()
    render(<CartProvider><TestConsumer /></CartProvider>)
    await user.click(screen.getByText('Add'))
    expect(screen.getByTestId('count').textContent).toBe('1')
    expect(screen.getByTestId('total').textContent).toBe('15000')
  })

  it('removes an item', async () => {
    const user = userEvent.setup()
    render(<CartProvider><TestConsumer /></CartProvider>)
    await user.click(screen.getByText('Add'))
    await user.click(screen.getByText('Remove'))
    expect(screen.getByTestId('count').textContent).toBe('0')
  })
})
