import { useState } from 'react'

const INPUT_CLASSES = 'w-full bg-cream border border-beige2 text-charcoal font-body text-sm px-4 py-3 rounded-sm focus:outline-none focus:border-tan'
const LABEL_CLASSES = 'block font-body text-xs text-mid mb-1.5'

const RECIPIENT = 'osidev001@gmail.com'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const subject = encodeURIComponent(`New enquiry from ${form.name.trim()}`)
    const body = encodeURIComponent(
      `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}${form.phone.trim() ? `\nPhone: ${form.phone.trim()}` : ''}\n\nMessage:\n${form.message.trim()}`
    )
    window.location.href = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`
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
        className="bg-charcoal text-white font-body font-medium text-sm py-3 px-7 rounded-sm hover:bg-mid transition-colors w-fit"
      >
        Send Message
      </button>
    </form>
  )
}
