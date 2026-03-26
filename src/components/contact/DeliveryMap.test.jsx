import { render } from '@testing-library/react'
import DeliveryMap from './DeliveryMap'

test('renders iframe with correct src', () => {
  const url = 'https://www.google.com/maps/embed?pb=test'
  const { container } = render(<DeliveryMap mapEmbedUrl={url} />)
  const iframe = container.querySelector('iframe')
  expect(iframe).toBeInTheDocument()
  expect(iframe).toHaveAttribute('src', url)
})

test('renders nothing when mapEmbedUrl is null', () => {
  const { container } = render(<DeliveryMap mapEmbedUrl={null} />)
  expect(container.firstChild).toBeNull()
})

test('renders nothing when mapEmbedUrl is undefined', () => {
  const { container } = render(<DeliveryMap mapEmbedUrl={undefined} />)
  expect(container.firstChild).toBeNull()
})
