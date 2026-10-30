<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { articlePath, getArticle, listArticles } from '@/data/knowledge.generated.js'
import { trackEvent } from '@/analytics/track.js'
import AppIcon from '@/components/icons/AppIcon.vue'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()

const article = computed(() => getArticle(route.meta.articleSlug || route.params.slug, locale.value))
const bodyEl = ref(null)

function onDownload() {
  trackEvent('file_download_3008', { file_name: 'Fix-ITIDA-WebSign.bat' })
}

function onBodyClick(event) {
  const link = event.target.closest?.('a')
  if (!link?.href?.includes('wa.me')) return
  trackEvent('click_whatsapp', { path: route.fullPath })
}

function withLtrPhrase(text) {
  return String(text || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll(
      '3008 Error in verifying License',
      '<span dir="ltr">3008 Error in verifying License</span>'
    )
}

async function copyCode(pre, button) {
  const code = pre.querySelector('code')
  const text = (code || pre).innerText
  try {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text)
  } catch {
    /* clipboard can be unavailable; the click is still tracked */
  }
  trackEvent('copy_code_3008')
  button.textContent = t('knowledge.copied')
}

function mountCopyButtons() {
  const root = bodyEl.value
  if (!root || article.value?.slug !== 'fix-error-3008-itida-websign') return
  root.querySelectorAll('pre').forEach((pre) => {
    pre.setAttribute('dir', 'ltr')
    const code = pre.querySelector('code')
    if (code) code.setAttribute('dir', 'ltr')
    if (pre.closest('.code-scroll')) return
    const box = document.createElement('div')
    box.className = 'code-scroll'
    const parent = pre.parentNode
    parent.insertBefore(box, pre)
    box.appendChild(pre)
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'copy-code'
    button.textContent = t('knowledge.copyCode')
    button.addEventListener('click', () => copyCode(pre, button))
    box.insertBefore(button, pre)
  })
}

const related = computed(() => {
  if (!article.value) return []
  return listArticles(locale.value)
    .filter((item) => item.slug !== article.value.slug && item.topic === article.value.topic)
    .slice(0, 3)
})

const publishedLabel = computed(() => {
  if (!article.value?.published) return ''
  try {
    return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-GB' : 'ar-EG', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(`${article.value.published}T00:00:00`))
  } catch {
    return article.value.published
  }
})

watch(
  article,
  (value) => {
    if (!value) {
      router.replace({ name: 'not-found' })
      return
    }
    trackEvent('view_knowledge_article', { article_slug: value.slug })
    if (value.slug === 'fix-error-3008-itida-websign') {
      trackEvent('article_view_3008', { article_slug: value.slug })
    }
    nextTick(() => mountCopyButtons())
  },
  { immediate: true }
)

onMounted(() => mountCopyButtons())
</script>

<template>
  <article v-if="article" class="relative overflow-x-hidden bg-transparent pb-12 pt-20 lg:pb-16 lg:pt-24">
    <div class="mx-auto min-w-0 max-w-[88rem] px-4 sm:px-6 lg:px-8">
      <RouterLink
        to="/knowledge/"
        class="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover"
      >
        <AppIcon name="arrowRight" class="h-4 w-4 rtl:block ltr:hidden" />
        <AppIcon name="arrowLeft" class="h-4 w-4 ltr:block rtl:hidden" />
        {{ t('knowledge.back') }}
      </RouterLink>

      <p class="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        {{ article.category }}
      </p>
      <h1
        class="mt-2 break-words font-heading text-2xl font-extrabold tracking-tight text-text-base sm:text-4xl"
        v-html="withLtrPhrase(article.title)"
      />
      <p
        class="mt-3 text-sm font-medium leading-relaxed text-text-base sm:text-lg"
        v-html="withLtrPhrase(article.description)"
      />
      <p class="mt-3 text-xs text-text-muted sm:text-sm">
        {{ t('knowledge.byline', { date: publishedLabel }) }}
      </p>

      <div v-if="article.video" class="mx-auto mt-5 w-full max-w-[80rem] sm:mt-8">
        <div class="product-stage overflow-hidden rounded-2xl border border-border bg-surface-alt">
          <video
            class="block h-auto w-full object-contain"
            :src="article.video"
            :poster="article.poster || undefined"
            controls
            playsinline
            preload="metadata"
          />
        </div>
        <div v-if="article.download" class="mt-4 flex flex-col items-center gap-2">
          <a
            :href="article.download"
            download="Fix-ITIDA-WebSign.bat"
            class="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-text-onprimary shadow-[0_0_24px_rgba(35,184,193,0.55)] transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_0_32px_rgba(35,184,193,0.75)]"
            @click="onDownload"
          >
            <AppIcon name="download" class="h-5 w-5" />
            {{ t('knowledge.downloadCta') }}
          </a>
          <p class="text-center text-sm text-text-subtle">{{ t('knowledge.downloadHint') }}</p>
        </div>
      </div>
      <div v-else-if="article.cover" class="mt-5 overflow-hidden rounded-xl bg-surface sm:mt-8 sm:rounded-2xl">
        <img
          :src="article.cover"
          :alt="article.title"
          class="h-44 w-full object-cover sm:h-72 lg:h-[22rem]"
        />
      </div>

      <div
        ref="bodyEl"
        class="knowledge-body mt-6 min-w-0 max-w-full text-[1.05rem] font-medium leading-[1.8] text-text-base sm:mt-10 sm:text-[1.2rem] sm:leading-[1.9]"
        v-html="article.html"
        @click="onBodyClick"
      />

      <div v-if="related.length" class="mt-12 border-t border-border pt-8">
        <h2 class="font-heading text-xl font-bold text-text-base">{{ t('knowledge.more') }}</h2>
        <ul class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <li v-for="item in related" :key="item.slug">
            <RouterLink
              :to="articlePath(item)"
              class="block rounded-xl border border-border bg-surface-alt p-4 hover:border-primary"
            >
              <span class="font-heading text-base font-bold text-text-base">{{ item.title }}</span>
              <span class="mt-1 line-clamp-2 block text-sm text-text-muted">{{ item.description }}</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>

<style scoped>
.knowledge-body :deep(h2) {
  margin-top: 1.5rem;
  margin-bottom: 0.35rem;
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--color-text-base);
}

@media (min-width: 640px) {
  .knowledge-body :deep(h2) {
    margin-top: 2rem;
    font-size: 1.4rem;
  }
}

.knowledge-body :deep(h3) {
  margin-top: 1.35rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text-base);
}

.knowledge-body :deep(p),
.knowledge-body :deep(ul),
.knowledge-body :deep(ol),
.knowledge-body :deep(blockquote),
.knowledge-body :deep(pre) {
  margin-top: 0.85rem;
}

.knowledge-body :deep(ul) {
  list-style: disc;
  padding-inline-start: 1.35rem;
}

.knowledge-body :deep(ol) {
  list-style: decimal;
  padding-inline-start: 1.35rem;
}

.knowledge-body :deep(blockquote) {
  border-inline-start: 3px solid var(--color-primary);
  padding-inline-start: 0.9rem;
  color: var(--color-text-muted);
}

.knowledge-body :deep(.code-scroll) {
  position: relative;
  max-width: 100%;
  min-width: 0;
  margin-top: 0.85rem;
}

.knowledge-body :deep(.copy-code) {
  position: absolute;
  top: 0.45rem;
  right: 0.45rem;
  z-index: 1;
  border: 1px solid rgba(232, 244, 255, 0.22);
  border-radius: 0.4rem;
  background: #16324a;
  padding: 0.12rem 0.45rem;
  font-size: 0.68rem;
  font-weight: 700;
  line-height: 1.4;
  color: #d7fbff;
  white-space: nowrap;
}

.knowledge-body :deep(.code-scroll pre) {
  margin-top: 0;
  padding-top: 2.15rem;
}

.knowledge-body :deep(pre) {
  direction: ltr;
  text-align: left;
  unicode-bidi: isolate;
  max-width: 100%;
  overflow-x: auto;
  border-radius: 0.75rem;
  background: #0b1b2b;
  padding: 1rem;
  color: #e8f4ff;
  font-size: 0.82rem;
  line-height: 1.55;
}

.knowledge-body :deep(pre code) {
  display: block;
  direction: ltr;
  text-align: left;
  unicode-bidi: isolate;
  width: max-content;
  min-width: 100%;
  white-space: pre;
}

.knowledge-body :deep(code) {
  font-family: ui-monospace, Consolas, monospace;
  direction: ltr;
  unicode-bidi: isolate;
}

.knowledge-body :deep(p code) {
  border-radius: 0.3rem;
  background: color-mix(in srgb, var(--color-primary) 12%, transparent);
  padding: 0.1rem 0.35rem;
}

.product-stage {
  box-shadow: 0 24px 48px -28px rgba(15, 23, 42, 0.35);
}

.knowledge-body :deep(li + li) {
  margin-top: 0.4rem;
}

.knowledge-body :deep(a) {
  font-weight: 600;
  color: var(--color-primary);
}

.knowledge-body {
  overflow-wrap: break-word;
}
</style>
