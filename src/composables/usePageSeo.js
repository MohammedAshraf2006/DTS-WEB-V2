import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { SITE_ORIGIN, resolveSeo } from '@/data/seo'
import { getArticle } from '@/data/knowledge.generated.js'

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
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

export function usePageSeo() {
  const route = useRoute()
  const { locale } = useI18n()

  function apply() {
    const lang = locale.value === 'en' ? 'en' : 'ar'
    let meta = null
    if (route.name === 'knowledge-article') {
      const article = getArticle(route.params.slug, lang)
      if (article) {
        meta = {
          title: `${article.title} | DTS`,
          description: article.description,
          path: `/knowledge/${article.slug}`
        }
      }
    } else {
      meta = resolveSeo(lang, route.name, route.params)
    }
    if (!meta) return
    document.title = meta.title
    setMeta('description', meta.description)
    const path = meta.path === '/' ? '/' : meta.path
    setCanonical(`${SITE_ORIGIN}${path}`)
  }

  watch([() => route.fullPath, locale], apply, { immediate: true })
}
