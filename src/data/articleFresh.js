const FRESH_MS = 7 * 24 * 60 * 60 * 1000

export function isFreshArticle(published, now = new Date()) {
  if (!published) return false
  const start = new Date(`${published}T00:00:00`)
  if (Number.isNaN(start.getTime())) return false
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const age = today.getTime() - start.getTime()
  return age >= 0 && age < FRESH_MS
}

export function articleMark(article, now = new Date()) {
  if (article?.featured) return 'featured'
  if (isFreshArticle(article?.published, now)) return 'fresh'
  return 'plain'
}
