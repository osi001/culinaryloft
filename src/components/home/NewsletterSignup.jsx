import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        const data = await res.json()
        setErrorMsg(data.error || 'Something went wrong. Try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Connection error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section className="bg-cream py-20 px-4 md:px-8 border-t border-beige">
      <div className="max-w-xl mx-auto text-center">
        <span className="eyebrow">Stay in the loop</span>
        <span className="block w-12 h-px bg-tan mt-3 mb-6 mx-auto" />
        <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-3">
          Fresh menu drops, straight to your inbox
        </h2>
        <p className="text-mid font-body text-sm mb-8">
          Be the first to know about new specials, seasonal dishes, and exclusive offers.
        </p>

        {status === 'success' ? (
          <p className="font-body text-green text-base">
            Thank you for subscribing! Check your inbox soon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-white border border-beige2 text-charcoal font-body text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-tan"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="bg-charcoal text-white font-body font-medium text-sm py-3 px-7 rounded-sm hover:bg-mid transition-colors disabled:opacity-60"
            >
              {status === 'loading' ? 'Subscribing\u2026' : 'Subscribe'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p role="alert" className="mt-3 text-sm font-body text-red-600">{errorMsg}</p>
        )}

        <p className="mt-4 text-xs font-body text-mid">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
