import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 text-center pt-16">
      <span className="eyebrow mb-2">404</span>
      <h1 className="font-display text-5xl text-charcoal mb-4">Page not found</h1>
      <p className="text-mid font-body text-base mb-8 max-w-xs">
        The page you're looking for doesn't exist. Let's get you back on track.
      </p>
      <Link
        to="/"
        className="bg-charcoal text-white font-body font-medium text-sm py-3 px-7 rounded-sm hover:bg-mid transition-colors"
      >
        Go Home
      </Link>
    </main>
  )
}
