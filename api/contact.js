// api/contact.js
// Vercel serverless function — POST /api/contact
// Reads body: { name, email, phone, message }
// Validates required fields: name, email, message
// Sends email via nodemailer using SMTP env vars
// Returns JSON { ok: true } on success, { error: "..." } on failure

import nodemailer from 'nodemailer';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Lazy-initialised so the env guard runs before the transporter is created
let transporter = null;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Guard — verify all required env vars are present before anything else
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS ||
    !process.env.CONTACT_TO
  ) {
    console.warn('[api/contact] Missing required environment variables (SMTP_HOST, SMTP_USER, SMTP_PASS, CONTACT_TO)');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Reuse transporter across warm invocations
  if (!transporter) {
    const port = Number(process.env.SMTP_PORT) || 587;
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
  }

  const { name, email, phone, message } = req.body ?? {};

  // Existing presence check
  if (
    !name || typeof name !== 'string' || name.trim() === '' ||
    !email || typeof email !== 'string' || email.trim() === '' ||
    !message || typeof message !== 'string' || message.trim() === ''
  ) {
    return res.status(400).json({ error: 'name, email and message are required' });
  }

  // Fix #2: Reject inputs containing newline characters
  if (
    /[\r\n]/.test(name) ||
    /[\r\n]/.test(email) ||
    /[\r\n]/.test(message) ||
    (phone && /[\r\n]/.test(phone))
  ) {
    return res.status(400).json({ error: 'Invalid characters in input' });
  }

  // Fix #2: Basic email format validation
  if (!EMAIL_RE.test(email.trim())) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Fix #3: Input length limits
  if (name.trim().length > 100) {
    return res.status(400).json({ error: 'Input too long' });
  }
  if (email.trim().length > 254) {
    return res.status(400).json({ error: 'Input too long' });
  }
  if (message.trim().length > 5000) {
    return res.status(400).json({ error: 'Input too long' });
  }
  if (phone && phone.trim().length > 30) {
    return res.status(400).json({ error: 'Input too long' });
  }

  const from = process.env.CONTACT_FROM || process.env.SMTP_USER;
  const to = process.env.CONTACT_TO;

  const textBody = [
    `Name: ${name.trim()}`,
    `Email: ${email.trim()}`,
    phone && phone.trim() ? `Phone: ${phone.trim()}` : null,
    '',
    `Message:\n${message.trim()}`,
  ]
    .filter((line) => line !== null)
    .join('\n');

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo: email.trim(), // Fix #5: Allow recipients to reply directly to the form submitter
      subject: `New enquiry from ${name.trim()}`,
      text: textBody,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[api/contact] Failed to send email:', err);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
