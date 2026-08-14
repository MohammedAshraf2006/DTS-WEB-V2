const DEFAULT_CONTACT_EMAIL = 'support@dts-eg.com'
const SIGNATURE_CONTACT_EMAIL = 'tawqe3y_10thoframadan@dts-eg.com'

function buildMailto(payload, toEmail) {
  const lines = [
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`
  ]
  if (payload.company) lines.push(`Company: ${payload.company}`)
  if (payload.nationalId) lines.push(`National ID: ${payload.nationalId}`)
  if (payload.serviceType) lines.push(`Service type: ${payload.serviceType}`)
  lines.push('', payload.message || '')

  const subject = encodeURIComponent(payload._subject || `DTS contact — ${payload.name}`)
  const body = encodeURIComponent(lines.join('\n'))
  return `mailto:${toEmail}?subject=${subject}&body=${body}`
}

export async function sendContactMessage(payload, options = {}) {
  const toEmail = options.to || DEFAULT_CONTACT_EMAIL
  const formSubmitUrl = `https://formsubmit.co/ajax/${toEmail}`
  const subject = payload._subject || `DTS contact — ${payload.name}`

  try {
    const body = {
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      message: payload.message,
      _subject: subject,
      _template: 'table',
      _captcha: false,
      _honey: payload.honeypot || ''
    }

    if (payload.company) body.company = payload.company
    if (payload.nationalId) body.nationalId = payload.nationalId
    if (payload.serviceType) body.serviceType = payload.serviceType

    const res = await fetch(formSubmitUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(body)
    })

    if (res.ok) return { ok: true, via: 'formsubmit' }
  } catch {
    // fall through to mailto
  }

  window.location.href = buildMailto({ ...payload, _subject: subject }, toEmail)
  return { ok: true, via: 'mailto' }
}

export { DEFAULT_CONTACT_EMAIL, SIGNATURE_CONTACT_EMAIL }
