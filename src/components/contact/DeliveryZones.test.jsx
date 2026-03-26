import { render, screen } from '@testing-library/react'
import DeliveryZones from './DeliveryZones'

test('renders a chip for each zone', () => {
  render(<DeliveryZones zones={['Victoria Island', 'Ikoyi', 'Lekki']} />)
  expect(screen.getByText('Victoria Island')).toBeInTheDocument()
  expect(screen.getByText('Ikoyi')).toBeInTheDocument()
  expect(screen.getByText('Lekki')).toBeInTheDocument()
})

test('renders nothing when zones is empty array', () => {
  const { container } = render(<DeliveryZones zones={[]} />)
  expect(container.firstChild).toBeNull()
})

test('renders nothing when zones is undefined', () => {
  const { container } = render(<DeliveryZones zones={undefined} />)
  expect(container.firstChild).toBeNull()
})
