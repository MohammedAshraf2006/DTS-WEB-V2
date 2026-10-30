import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadArticles } from './knowledge-lib.mjs'
import { prerenderBody } from './prerender-bodies.mjs'
import { socialSameAs } from '../src/data/socialLinks.js'
import { canonicalUrl, OG_IMAGE, SITE_ORIGIN, staticHtmlRoutes } from '../src/data/seo.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const pub = join(root, 'public')
const articles = loadArticles()

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DTS',
    url: `${SITE_ORIGIN}/`,
    logo: `${SITE_ORIGIN}/images/DTS.webp`,
    image: `${SITE_ORIGIN}/icon-512.png`,
    email: 'sales@dts-eg.com',
    taxID: '769038883',
    sameAs: socialSameAs
  }
}

function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'DTS',
    url: `${SITE_ORIGIN}/`,
    sameAs: socialSameAs,
    telephone: '+201050992815',
    taxID: '769038883',
    vatID: '769038883',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Villa 136, District 44, Misr El Noor Road',
      addressLocality: '10th of Ramadan City',
      addressCountry: 'EG'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '09:00',
      closes: '17:00'
    }
  }
}

function extractFaq(html) {
  const blocks = []
  const re = /<h2>([\s\S]*?)<\/h2>\s*<p>([\s\S]*?)<\/p>/gi
  let match
  while ((match = re.exec(html))) {
    blocks.push({
      '@type': 'Question',
      name: match[1].replace(/<[^>]+>/g, '').trim(),
      acceptedAnswer: {
        '@type': 'Answer',
        text: match[2].replace(/<[^>]+>/g, '').trim()
      }
    })
  }
  return blocks
}

function applyHead(html, { title, description, url, type, image, jsonLd, noindex }) {
  let next = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
  next = next.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(description)}" />`
  )
  const extra = [
    `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="ar" href="${url}" />`,
    `<link rel="alternate" hreflang="x-default" href="${url}" />`,
    noindex ? '<meta name="robots" content="noindex" />' : '',
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:type" content="${type}" />`,
    `<meta property="og:image" content="${image}" />`,
    '<meta property="og:locale" content="ar_EG" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ...jsonLd.map((block) => `<script type="application/ld+json">${JSON.stringify(block)}</script>`)
  ].filter(Boolean)

  next = next.replace(/<link\s+rel="canonical"[^>]*>/g, '')
  next = next.replace(/<link\s+rel="alternate"[^>]*>/g, '')
  next = next.replace(/<meta\s+property="og:[^"]+"[\s\S]*?\/>/g, '')
  next = next.replace(/<meta\s+name="twitter:[^"]+"[\s\S]*?\/>/g, '')
  next = next.replace('</head>', `    ${extra.join('\n    ')}\n  </head>`)
  return next
}

function injectBody(html, inner) {
  return html.replace(/<div id="app"><\/div>/, `<div id="app">${inner}</div>`)
}

const shell = readFileSync(join(dist, 'index.html'), 'utf8')
const org = organizationJsonLd()
const local = localBusinessJsonLd()

const routes = [
  ...staticHtmlRoutes().map((route) => ({
    ...route,
    type: 'website',
    image: OG_IMAGE,
    jsonLd: route.path === '/' || route.path === '/contact' ? [org, local] : [org],
    body: `<article>${prerenderBody(route.path, articles) || `<h1>${escapeHtml(route.title)}</h1><p>${escapeHtml(route.description)}</p>`}</article>`
  })),
  ...articles.map((article) => {
    const urlPath = article.path || `/knowledge/${article.slug}`
    const image = article.ar.cover ? `${SITE_ORIGIN}${article.ar.cover}` : OG_IMAGE
    const jsonLd = [
      org,
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.ar.title,
        description: article.ar.description,
        image,
        datePublished: article.ar.published,
        dateModified: article.ar.updated,
        author: { '@type': 'Organization', name: 'فريق DTS' },
        publisher: { '@type': 'Organization', name: 'DTS', logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/images/DTS.webp` } }
      }
    ]
    if (article.slug.endsWith('-faq') || article.slug === 'signature-faq' || article.slug === 'e-receipt-faq') {
      jsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: extractFaq(article.ar.html)
      })
    }
    return {
      path: urlPath,
      title: `${article.ar.title} | DTS`,
      description: article.ar.description,
      type: 'article',
      image,
      jsonLd,
      body: `<article><h1>${escapeHtml(article.ar.title)}</h1><p>${escapeHtml(article.ar.description)}</p>${article.ar.html}</article>`
    }
  })
]

for (const route of routes) {
  const url = canonicalUrl(route.path)
  let html = applyHead(shell, {
    title: route.title,
    description: route.description,
    url,
    type: route.type,
    image: route.image,
    jsonLd: route.jsonLd,
    noindex: false
  })
  html = injectBody(html, route.body)
  if (route.path === '/') {
    writeFileSync(join(dist, 'index.html'), html)
    continue
  }
  const dir = join(dist, route.path.replace(/^\//, '').replace(/\/$/, ''))
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
}

const notFound = applyHead(shell, {
  title: 'الصفحة غير موجودة | DTS',
  description: 'هذه الصفحة غير موجودة على موقع DTS.',
  url: canonicalUrl('/'),
  type: 'website',
  image: OG_IMAGE,
  jsonLd: [org],
  noindex: true
})
writeFileSync(join(dist, '404.html'), injectBody(notFound, '<article><h1>الصفحة غير موجودة | DTS</h1></article>'))

const sitemapUrls = routes.map((route) => {
  const loc = canonicalUrl(route.path)
  const article = articles.find((item) => (item.path || `/knowledge/${item.slug}`) === route.path)
  const lastmod = article?.ar.updated || '2026-10-19'
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`
})
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.join('\n')}\n</urlset>\n`
writeFileSync(join(dist, 'sitemap.xml'), sitemapXml)
writeFileSync(join(pub, 'sitemap.xml'), sitemapXml)

const llmsArticles = articles
  .map((item) => `- ${item.en.title}: ${canonicalUrl(item.path || `/knowledge/${item.slug}`)}`)
  .join('\n')
const llmsTxt = `# DTS (Digital Transformation Services)

Official marketing site: ${SITE_ORIGIN}/

DTS helps Egyptian companies issue electronic invoices and receipts and use digital signatures, connected to the Egyptian Tax Authority (ETA).

## Products

- ESS — subscription for e-invoices and e-receipts: ${canonicalUrl('/products/ess')}
- ESA — signs and seals what ESS issues: ${canonicalUrl('/products/esa')}
- ERS — cashier point-of-sale e-receipts: ${canonicalUrl('/products/ers')}
- Product listing: ${canonicalUrl('/products')}

## Knowledge articles

${llmsArticles}

## Services

- Services: ${canonicalUrl('/services')}
- Signature and seal requests: ${canonicalUrl('/services/signature')}

## Other pages

- Clients: ${canonicalUrl('/clients')}
- Partners: ${canonicalUrl('/partners')}
- Contact (sales@dts-eg.com): ${canonicalUrl('/contact')}

Arabic is the default language (RTL). English is available via the language switch on the same URL. Indexable URLs are Arabic; there is no /en prefix.
`
writeFileSync(join(dist, 'llms.txt'), llmsTxt)
writeFileSync(join(pub, 'llms.txt'), llmsTxt)

const cnameSrc = existsSync(join(pub, 'CNAME')) ? join(pub, 'CNAME') : join(root, 'CNAME')
if (existsSync(cnameSrc)) copyFileSync(cnameSrc, join(dist, 'CNAME'))

console.log(`Wrote HTML shells for ${routes.length} routes`)
