import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import MarkdownIt from 'markdown-it'
import { withTrailingSlash } from '../src/utils/trailingSlash.js'

function slashInternalHrefs(html) {
  return html.replace(/href="(\/[^"]+)"/g, (_, href) => `href="${withTrailingSlash(href)}"`)
}

function prepareArticleHtml(html) {
  let next = slashInternalHrefs(html)
  next = next.replace(/<pre>/g, '<pre dir="ltr">')
  next = next.replace(/<pre dir="ltr"><code/g, '<pre dir="ltr"><code dir="ltr"')
  next = next.replaceAll(
    '<code>3008 Error in verifying License</code>',
    '<span dir="ltr">3008 Error in verifying License</span>'
  )
  next = next.replace(
    /<a href="(https:\/\/wa\.me\/[^"]*)">/g,
    '<a href="$1" dir="ltr" target="_blank" rel="noopener noreferrer">'
  )
  return next
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const contentRoot = join(root, 'content', 'knowledge')
const md = new MarkdownIt({ html: false, linkify: true })

const ARTICLE_ORDER = [
  'fix-error-3008-itida-websign',
  'what-is-e-signature',
  'signature-characteristics',
  'signature-services',
  'signature-applications',
  'e-seal-steps',
  'e-seal-vs-signature',
  'signature-faq',
  'usb-token',
  'request-signature',
  'what-is-ess',
  'what-is-e-invoice',
  'what-is-e-receipt',
  'invoice-vs-receipt',
  'e-receipt-steps',
  'e-receipt-faq',
  'contact-hours'
]

function topicFromSlug(slug) {
  if (slug === 'usb-token') return 'token'
  if (slug === 'what-is-ess') return 'ess'
  if (slug === 'contact-hours') return 'contact'
  if (
    slug === 'what-is-e-receipt' ||
    slug === 'invoice-vs-receipt' ||
    slug === 'e-receipt-steps' ||
    slug === 'what-is-e-invoice' ||
    slug === 'e-receipt-faq'
  ) {
    return 'receipt'
  }
  return 'signature'
}

function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) {
    throw new Error('Knowledge article is missing frontmatter')
  }
  const data = {}
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    data[key] = line.slice(idx + 1).trim()
  }
  return { data, body: match[2].trim() }
}

function readLocale(locale) {
  const dir = join(contentRoot, locale)
  const files = readdirSync(dir).filter((name) => name.endsWith('.md'))
  const bySlug = new Map()
  for (const name of files) {
    const parsed = parseFrontmatter(readFileSync(join(dir, name), 'utf8'))
    const slug = parsed.data.slug
    if (!slug || !parsed.data.title || !parsed.data.description) {
      throw new Error(`Incomplete frontmatter in ${locale}/${name}`)
    }
    bySlug.set(slug, {
      title: parsed.data.title,
      description: parsed.data.description,
      cover: parsed.data.cover || '',
      category: parsed.data.category || '',
      published: parsed.data.published || '2026-10-16',
      updated: parsed.data.updated || parsed.data.published || '2026-10-16',
      topic: parsed.data.topic || topicFromSlug(slug),
      path: parsed.data.path || '',
      featured: parsed.data.featured === 'true',
      video: parsed.data.video || '',
      poster: parsed.data.poster || '',
      download: parsed.data.download || '',
      html: prepareArticleHtml(md.render(parsed.body))
    })
  }
  return bySlug
}

export function loadArticles() {
  const ar = readLocale('ar')
  const en = readLocale('en')
  const slugs = ARTICLE_ORDER.filter((slug) => ar.has(slug) && en.has(slug))
  for (const slug of ar.keys()) {
    if (!slugs.includes(slug) && en.has(slug)) slugs.push(slug)
  }
  return slugs.map((slug) => {
    const arabic = ar.get(slug)
    return {
      slug,
      path: arabic.path || '',
      featured: Boolean(arabic.featured),
      video: arabic.video || '',
      poster: arabic.poster || '',
      download: arabic.download || '',
      ar: arabic,
      en: en.get(slug)
    }
  })
}
