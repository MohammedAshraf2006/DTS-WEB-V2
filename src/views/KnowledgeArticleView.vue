<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getArticle } from '@/data/knowledge.generated.js'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()

const article = computed(() => getArticle(route.params.slug, locale.value))

watch(article, (value) => {
  if (!value) router.replace({ name: 'not-found' })
}, { immediate: true })
</script>

<template>
  <article v-if="article" class="relative overflow-hidden bg-transparent pb-16 pt-28 lg:pb-20 lg:pt-32">
    <div class="mx-auto max-w-3xl px-5 lg:px-10">
      <RouterLink to="/knowledge" class="text-sm font-semibold text-primary hover:underline">
        {{ t('knowledge.back') }}
      </RouterLink>
      <h1 class="mt-4 font-heading text-3xl font-bold tracking-tight text-text-base sm:text-4xl">
        {{ article.title }}
      </h1>
      <div class="knowledge-body mt-8 text-base leading-relaxed text-text-muted" v-html="article.html" />
    </div>
  </article>
</template>

<style scoped>
.knowledge-body :deep(h2) {
  margin-top: 1.75rem;
  font-family: inherit;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-base);
}

.knowledge-body :deep(p) {
  margin-top: 0.9rem;
}

.knowledge-body :deep(ul) {
  margin-top: 0.9rem;
  list-style: disc;
  padding-inline-start: 1.25rem;
}

.knowledge-body :deep(li + li) {
  margin-top: 0.35rem;
}

.knowledge-body :deep(a) {
  font-weight: 600;
  color: var(--color-primary);
}
</style>
