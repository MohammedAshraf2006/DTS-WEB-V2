import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { canonicalUrl, OG_IMAGE, resolveSeo } from '@/data/seo'
import { getArticle } from '@/data/knowledge.generated.js'

function setMeta(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setHreflang(hreflang, href) {
  let el = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'alternate')
    el.setAttribute('hreflang', hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function usePageSeo() {
  const route = useRoute()
  const { locale } = useI18n()

  function apply() {
    const lang = locale.value === 'en' ? 'en' : 'ar'
    let meta = null
    if (route.name === 'knowledge-article' || route.name === 'fix-error-3008') {
      const article = getArticle(route.meta.articleSlug || route.params.slug, lang)
      if (article) {
        meta = {
          title: `${article.title} | DTS`,
          description: article.description,
          path: article.path || `/knowledge/${article.slug}`
        }
      }
    } else {
      meta = resolveSeo(lang, route.name, route.params)
    }
    if (!meta) return

    const url = canonicalUrl(meta.path)
    const is404 = route.name === 'not-found'
    document.title = meta.title
    document.documentElement.lang = lang === 'en' ? 'en' : 'ar'

    setMeta('name', 'description', meta.description)
    setMeta('name', 'robots', is404 ? 'noindex' : 'index,follow')
    setCanonical(url)
    setHreflang('ar', url)
    setHreflang('x-default', url)

    setMeta('property', 'og:title', meta.title)
    setMeta('property', 'og:description', meta.description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:type', route.name === 'knowledge-article' || route.name === 'fix-error-3008' ? 'article' : 'website')
    setMeta('property', 'og:image', OG_IMAGE)
    setMeta('property', 'og:locale', lang === 'en' ? 'en_US' : 'ar_EG')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', meta.title)
    setMeta('name', 'twitter:description', meta.description)
    setMeta('name', 'twitter:image', OG_IMAGE)
  }

  watch([() => route.fullPath, locale], apply, { immediate: true })
}
