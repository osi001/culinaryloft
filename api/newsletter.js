// Vercel serverless function — Mailchimp subscribe
// MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID, MAILCHIMP_SERVER_PREFIX are set in Vercel env (never VITE_ prefixed)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email address required' })
  }

  const { MAILCHIMP_API_KEY, MAILCHIMP_LIST_ID, MAILCHIMP_SERVER_PREFIX } = process.env
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID || !MAILCHIMP_SERVER_PREFIX) {
    console.error('Missing Mailchimp env vars')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`
  const credentials = Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')

  try {
    const mailchimpRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        tags: ['website-signup'],
      }),
    })

    const data = await mailchimpRes.json()

    if (mailchimpRes.ok || data.title === 'Member Exists') {
      return res.status(200).json({ success: true })
    }

    console.error('Mailchimp error:', data)
    return res.status(400).json({ error: data.detail || 'Subscription failed' })
  } catch (err) {
    console.error('Newsletter handler error:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}
