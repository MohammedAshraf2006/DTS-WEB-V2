/** Crawl targets for knowledge articles. Paths stay on the trailing-slash canonical form. */

export const SIGNATURE_ARTICLE_SLUGS = [
  'what-is-e-signature',
  'signature-characteristics',
  'signature-services',
  'signature-applications',
  'e-seal-vs-signature',
  'e-seal-steps',
  'signature-faq',
  'usb-token',
  'request-signature',
  'fix-error-3008-itida-websign'
]

export const RECEIPT_ARTICLE_SLUGS = [
  'what-is-e-invoice',
  'what-is-e-receipt',
  'invoice-vs-receipt',
  'e-receipt-steps',
  'e-receipt-faq',
  'what-is-ess'
]

const CONTACT_RELATED_SLUGS = ['signature-faq', 'e-receipt-faq', 'request-signature']

export function articlePublicPath(article) {
  const raw = article?.path || `/knowledge/${article?.slug || ''}`
  if (!raw || raw === '/') return '/'
  return raw.endsWith('/') ? raw : `${raw}/`
}

export function servicePathForSlug(slug) {
  if (slug === 'contact-hours') return '/contact/'
  if (RECEIPT_ARTICLE_SLUGS.includes(slug)) return '/services/#service-einvoicing'
  if (SIGNATURE_ARTICLE_SLUGS.includes(slug)) return '/services/signature/'
  return '/services/'
}

export function relatedArticleSlugs(slug) {
  if (SIGNATURE_ARTICLE_SLUGS.includes(slug)) {
    return SIGNATURE_ARTICLE_SLUGS.filter((item) => item !== slug)
  }
  if (RECEIPT_ARTICLE_SLUGS.includes(slug)) {
    return RECEIPT_ARTICLE_SLUGS.filter((item) => item !== slug)
  }
  if (slug === 'contact-hours') return CONTACT_RELATED_SLUGS
  return []
}
