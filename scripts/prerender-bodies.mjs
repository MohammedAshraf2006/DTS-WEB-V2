import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { socialLinks } from '../src/data/socialLinks.js'
import { getPartnersList } from '../src/data/partners.js'
import { PRODUCT_KEYS } from '../src/data/products.js'
import { SERVICE_KEYS } from '../src/data/services.js'
import {
  RECEIPT_ARTICLE_SLUGS,
  SIGNATURE_ARTICLE_SLUGS,
  articlePublicPath,
  relatedArticleSlugs,
  servicePathForSlug
} from '../src/data/knowledgeLinks.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')

function load(name) {
  return JSON.parse(readFileSync(join(root, 'src/locales/ar', name), 'utf8'))
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function p(text) {
  return `<p>${escapeHtml(text)}</p>`
}

function h(level, text) {
  return `<h${level}>${escapeHtml(text)}</h${level}>`
}

function articleAnchors(slugs, articles) {
  const items = slugs
    .map((slug) => articles.find((item) => item.slug === slug))
    .filter(Boolean)
  if (!items.length) return ''
  return `<ul>${items
    .map((item) => `<li><a href="${articlePublicPath(item)}">${escapeHtml(item.ar.title)}</a></li>`)
    .join('')}</ul>`
}

function serviceLabelForSlug(slug) {
  const href = servicePathForSlug(slug)
  const services = load('services.json')
  if (href === '/contact/') return load('contact.json').title
  if (href.startsWith('/services/signature')) return services.items.signature.title
  if (href.startsWith('/services/')) return services.items.einvoicing.title
  return load('services.json').title
}

function homeBody(articles = []) {
  const home = load('home.json')
  const common = load('common.json')
  const latest = [...articles]
    .sort((a, b) => String(b.ar?.published || '').localeCompare(String(a.ar?.published || '')))
    .slice(0, 6)
    .map((item) => {
      const href = item.path ? `${String(item.path).replace(/\/$/, '')}/` : `/knowledge/${item.slug}/`
      return `<li><a href="${href}">${escapeHtml(item.ar.title)}</a></li>`
    })
    .join('')
  const ess = home.products.tabs.ess
  const services = home.services
  return [
    h(1, `${home.hero.titlePrefix} ${home.hero.rotatingWords.invoice} ${home.hero.titleSuffix}`),
    p(home.hero.subtitle),
    p(home.hero.badge),
    h(2, home.products.title),
    p(home.products.subtitle),
    h(3, ess.title),
    p(ess.description),
    `<ul>${ess.features.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`,
    h(3, home.products.tabs.esa.title),
    p(home.products.tabs.esa.description),
    `<ul>${home.products.tabs.esa.features.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`,
    p(home.products.esaComplement),
    p(`${home.products.ersQuiet} ${home.products.ersCta}`),
    h(2, services.title),
    p(services.subtitle),
    p(services.signatureHighlight.subtitle),
    ...services.items.map((card, index) => {
      const slugs = index === 0 ? RECEIPT_ARTICLE_SLUGS : index === 2 ? SIGNATURE_ARTICLE_SLUGS : []
      const guides = slugs.length ? `${p(knowledgeGuides())}${articleAnchors(slugs, articles)}` : ''
      return `${h(3, card.title)}${p(card.description)}${guides}`
    }),
    h(2, home.articles.title),
    p(home.articles.subtitle),
    `<ul>${latest}</ul>`,
    knowledgeIndex(articles),
    p(common.footer.description),
    p(`${common.footer.hours}. ${common.footer.address}`)
  ].join('\n')
}

function productsBody() {
  const products = load('products.json')
  const blocks = PRODUCT_KEYS.map((key) => {
    const item = products.items[key]
    const features = (item.features || []).map((row) => `<li><strong>${escapeHtml(row.title)}</strong> — ${escapeHtml(row.detail)}</li>`).join('')
    return `${h(2, `${key.toUpperCase()} — ${item.title}`)}${p(item.description)}${features ? `<ul>${features}</ul>` : ''}`
  })
  return [h(1, products.title), p(products.subtitle), ...blocks].join('\n')
}

function productDetailBody(key) {
  const products = load('products.json')
  const item = products.items[key]
  if (!item) return ''
  const features = (item.features || []).map((row) => `<li><strong>${escapeHtml(row.title)}</strong> — ${escapeHtml(row.detail)}</li>`).join('')
  return `${h(1, item.title)}${p(item.description)}${features ? `<ul>${features}</ul>` : ''}`
}

function knowledgeGuides() {
  return load('knowledge.json').guides
}

function knowledgeIndex(articles) {
  const knowledge = load('knowledge.json')
  const common = load('common.json')
  return [
    h(2, knowledge.indexTitle),
    p(knowledge.indexSubtitle),
    articleAnchors(articles.map((item) => item.slug), articles),
    `<p><a href="/contact/">${escapeHtml(common.nav.contact)}</a></p>`
  ].join('')
}

function servicesBody(articles = []) {
  const services = load('services.json')
  const blocks = SERVICE_KEYS.map((key) => {
    const item = services.items[key]
    if (!item) return ''
    const bullets = (item.bullets || []).map((row) => `<li>${escapeHtml(row)}</li>`).join('')
    const slugs = key === 'signature' ? SIGNATURE_ARTICLE_SLUGS : key === 'einvoicing' ? RECEIPT_ARTICLE_SLUGS : []
    const guides = slugs.length ? `${p(knowledgeGuides())}${articleAnchors(slugs, articles)}` : ''
    return `${h(2, item.title)}${p(item.detail || item.shortDescription)}${bullets ? `<ul>${bullets}</ul>` : ''}${guides}`
  })
  return [h(1, services.title), p(services.subtitle), p(services.featuredSubtitle), ...blocks, knowledgeIndex(articles)].join('\n')
}

export function articleCrawlFooter(article, articles) {
  const knowledge = load('knowledge.json')
  const related = articleAnchors(relatedArticleSlugs(article.slug), articles)
  const href = servicePathForSlug(article.slug)
  return [
    related ? `${h(2, knowledge.more)}${related}` : '',
    h(2, knowledge.serviceLabel),
    `<p><a href="${href}">${escapeHtml(serviceLabelForSlug(article.slug))}</a></p>`
  ].join('')
}

function partnersBody() {
  const partners = load('partners.json')
  const blocks = getPartnersList().map((row) => {
    const item = partners.items[row.key]
    if (!item) return ''
    return `${h(2, item.name)}${p(item.role)}${p(item.description)}`
  })
  return [h(1, partners.title), p(partners.subtitle), ...blocks].join('\n')
}

function contactBody() {
  const contact = load('contact.json')
  const common = load('common.json')
  return [
    h(1, contact.title),
    p(contact.subtitle),
    p(contact.inboxNote.replace('{email}', 'sales@dts-eg.com')),
    p(common.footer.address),
    p(common.footer.hours),
    p(`${common.footer.taxIdLabel}: ${common.footer.taxId}`),
    p(common.footer.numbers.join(' · ')),
    h(2, common.social.title),
    `<ul>${socialLinks.map((item) => `<li><a href="${item.href}">${escapeHtml(common.social[item.key])}</a></li>`).join('')}</ul>`,
    p(common.footer.description)
  ].join('\n')
}

function clientsBody() {
  const clients = load('clients.json')
  const names = Object.values(clients.items || {})
    .map((item) => `<li>${escapeHtml(item.name)} — ${escapeHtml(item.industry)}</li>`)
    .join('')
  return `${h(1, clients.title)}${p(clients.subtitle)}${h(2, clients.gridTitle)}${p(clients.gridSubtitle)}<ul>${names}</ul>`
}

function signatureBody() {
  const services = load('services.json')
  const page = services.signaturePage || {}
  const item = services.items.signature
  return [
    h(1, page.title || item.title),
    p(page.subtitle || item.detail),
    p(item.shortDescription),
    p(item.detail)
  ].join('\n')
}

function knowledgeHubBody(articles) {
  const knowledge = load('knowledge.json')
  const list = articles
    .map((item) => {
      const href = item.path ? `${item.path.replace(/\/$/, '')}/` : `/knowledge/${item.slug}/`
      return `<li><a href="${href}">${escapeHtml(item.ar.title)}</a> — ${escapeHtml(item.ar.description)}</li>`
    })
    .join('')
  return `${h(1, knowledge.title)}${p(knowledge.subtitle)}<ul>${list}</ul>`
}

export function prerenderBody(path, articles = []) {
  if (path === '/') return homeBody(articles)
  if (path === '/products') return productsBody()
  if (path === '/products/ess') return productDetailBody('ess')
  if (path === '/products/esa') return productDetailBody('esa')
  if (path === '/products/ers') return productDetailBody('ers')
  if (path === '/services') return servicesBody(articles)
  if (path === '/services/signature') return signatureBody()
  if (path === '/partners') return partnersBody()
  if (path === '/contact') return contactBody()
  if (path === '/clients') return clientsBody()
  if (path === '/knowledge') return knowledgeHubBody(articles)
  return ''
}
