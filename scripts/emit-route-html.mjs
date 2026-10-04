import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadArticles } from './knowledge-lib.mjs'
import { staticHtmlRoutes, SITE_ORIGIN } from '../src/data/seo.js'

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist')

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function applyMeta(html, { title, description, path }) {
  const canonical = `${SITE_ORIGIN}${path === '/' ? '/' : path}`
  let next = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
  next = next.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(description)}" />`
  )
  const canonicalTag = `<link rel="canonical" href="${canonical}" />`
  if (next.includes('rel="canonical"')) {
    next = next.replace(/<link\s+rel="canonical"[^>]*>/, canonicalTag)
  } else {
    next = next.replace('</head>', `    ${canonicalTag}\n  </head>`)
  }
  return next
}

const shell = readFileSync(join(dist, 'index.html'), 'utf8')
const routes = [
  ...staticHtmlRoutes(),
  ...loadArticles().map((article) => ({
    path: `/knowledge/${article.slug}`,
    title: `${article.ar.title} | DTS`,
    description: article.ar.description
  }))
]

for (const route of routes) {
  const html = applyMeta(shell, route)
  if (route.path === '/') {
    writeFileSync(join(dist, 'index.html'), html)
    continue
  }
  const dir = join(dist, route.path.slice(1))
  mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
}

console.log(`Wrote HTML shells for ${routes.length} routes`)
