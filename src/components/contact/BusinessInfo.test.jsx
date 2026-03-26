import { render, screen } from '@testing-library/react'
import BusinessInfo from './BusinessInfo'

const SETTINGS = {
  address: '1 Finance Crescent, VI, Lagos',
  phone: '+234 801 234 5678',
  email: 'hello@culinaryloft.com',
  hours: 'Mon–Sat: 10am–9pm',
}

test('renders address, phone, email and hours', () => {
  render(<BusinessInfo settings={SETTINGS} />)
  expect(screen.getByText(SETTINGS.address)).toBeInTheDocument()
  expect(screen.getByText(SETTINGS.phone)).toBeInTheDocument()
  expect(screen.getByText(SETTINGS.email)).toBeInTheDocument()
  expect(screen.getByText(SETTINGS.hours)).toBeInTheDocument()
})

test('phone is a tel link', () => {
  render(<BusinessInfo settings={SETTINGS} />)
  expect(screen.getByRole('link', { name: SETTINGS.phone }))
    .toHaveAttribute('href', `tel:${SETTINGS.phone}`)
})

test('email is a mailto link', () => {
  render(<BusinessInfo settings={SETTINGS} />)
  expect(screen.getByRole('link', { name: SETTINGS.email }))
    .toHaveAttribute('href', `mailto:${SETTINGS.email}`)
})

test('renders nothing when settings is null', () => {
  const { container } = render(<BusinessInfo settings={null} />)
  expect(container.firstChild).toBeNull()
})
