/** Keep in-app hrefs on the trailing-slash form used by canonical URLs. */
export function withTrailingSlash(path) {
  if (!path) return '/'
  if (path.startsWith('http') || path.startsWith('mailto:') || path.startsWith('tel:')) return path
  const hashIndex = path.indexOf('#')
  const queryIndex = path.indexOf('?')
  let splitAt = -1
  if (hashIndex >= 0 && queryIndex >= 0) splitAt = Math.min(hashIndex, queryIndex)
  else if (hashIndex >= 0) splitAt = hashIndex
  else if (queryIndex >= 0) splitAt = queryIndex
  const pathname = splitAt >= 0 ? path.slice(0, splitAt) : path
  const rest = splitAt >= 0 ? path.slice(splitAt) : ''
  if (pathname === '/') return `/${rest}`
  const slashed = pathname.endsWith('/') ? pathname : `${pathname}/`
  return `${slashed}${rest}`
}
