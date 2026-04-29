import { useState } from 'react'

const INPUT_CLASSES = 'w-full bg-cream border border-beige2 text-charcoal font-body text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-tan'
const LABEL_CLASSES = 'block font-body text-xs text-mid mb-1.5'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle')

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/xvzdejgr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', phone: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="font-body text-green text-base py-6">
        Message sent! We'll be in touch shortly.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className={LABEL_CLASSES} htmlFor="name">Name</label>
        <input id="name" name="name" type="text" required value={form.name}
          onChange={handleChange} placeholder="Your full name" className={INPUT_CLASSES} />
      </div>
      <div>
        <label className={LABEL_CLASSES} htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required value={form.email}
          onChange={handleChange} placeholder="your@email.com" className={INPUT_CLASSES} />
      </div>
      <div>
        <label className={LABEL_CLASSES} htmlFor="phone">
          Phone <span className="text-tan">(optional)</span>
        </label>
        <input id="phone" name="phone" type="tel" value={form.phone}
          onChange={handleChange} placeholder="+234 ..." className={INPUT_CLASSES} />
      </div>
      <div>
        <label className={LABEL_CLASSES} htmlFor="message">Message</label>
        <textarea id="message" name="message" required rows={5} value={form.message}
          onChange={handleChange} placeholder="How can we help?"
          className={`${INPUT_CLASSES} resize-none`} />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-charcoal text-white font-body font-medium text-sm py-3 px-7 rounded-sm hover:bg-mid transition-colors disabled:opacity-60 w-fit"
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
      {status === 'error' && (
        <p role="alert" className="text-sm font-body text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  )
}
