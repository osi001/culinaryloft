import nodemailer from 'nodemailer'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const NOTIFY_TO = 'hello@theculinaryloft.com'

let transporter = null

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('[api/newsletter] Missing SMTP environment variables')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  const { email } = req.body ?? {}

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Email is required' })
  }

  const trimmed = email.trim()

  if (trimmed.length > 254 || !EMAIL_RE.test(trimmed)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  if (!transporter) {
    const port = Number(process.env.SMTP_PORT) || 587
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: NOTIFY_TO,
      subject: 'New newsletter subscriber',
      text: `New subscriber: ${trimmed}`,
    })
    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('[api/newsletter] Failed to send:', err)
    return res.status(500).json({ error: 'Could not process subscription' })
  }
}
