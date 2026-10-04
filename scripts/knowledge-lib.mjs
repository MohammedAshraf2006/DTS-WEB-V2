import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import MarkdownIt from 'markdown-it'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const contentRoot = join(root, 'content', 'knowledge')
const md = new MarkdownIt({ html: false, linkify: true })

const ARTICLE_ORDER = ['request-signature', 'what-is-ess', 'contact-hours']

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
      html: md.render(parsed.body)
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
  return slugs.map((slug) => ({
    slug,
    ar: ar.get(slug),
    en: en.get(slug)
  }))
}
