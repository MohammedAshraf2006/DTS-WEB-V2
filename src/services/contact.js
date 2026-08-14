const CONTACT_EMAIL = 'support@dts-eg.com'
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`

function buildMailto(payload) {
  const subject = encodeURIComponent(`DTS contact — ${payload.name}`)
  const body = encodeURIComponent(
    `Name: ${payload.name}\nPhone: ${payload.phone}\nEmail: ${payload.email}\n\n${payload.message}`
  )
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
}

export async function sendContactMessage(payload) {
  try {
    const res = await fetch(FORMSUBMIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        message: payload.message,
        _subject: `DTS contact — ${payload.name}`,
        _template: 'table',
        _captcha: false,
        _honey: payload.honeypot || ''
      })
    })

    if (res.ok) return { ok: true, via: 'formsubmit' }
  } catch {
    // fall through to mailto
  }

  window.location.href = buildMailto(payload)
  return { ok: true, via: 'mailto' }
}
