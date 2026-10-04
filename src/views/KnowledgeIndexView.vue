<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { listArticles } from '@/data/knowledge.generated.js'

const { t, locale } = useI18n()
const route = useRoute()

useScrollReveal()

const articles = computed(() => {
  void locale.value
  void route.fullPath
  return listArticles(locale.value)
})
</script>

<template>
  <article class="relative overflow-hidden bg-transparent pb-16 pt-28 lg:pb-20 lg:pt-32">
    <div class="mx-auto max-w-3xl px-5 lg:px-10">
      <div class="reveal">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {{ t('knowledge.eyebrow') }}
        </p>
        <h1 class="mt-4 font-heading text-3xl font-bold tracking-tight text-text-base sm:text-4xl">
          {{ t('knowledge.title') }}
        </h1>
        <p class="mt-4 text-base leading-relaxed text-text-muted">
          {{ t('knowledge.subtitle') }}
        </p>
      </div>

      <ul class="mt-10 space-y-4">
        <li v-for="(article, i) in articles" :key="article.slug" class="reveal" :style="{ transitionDelay: `${i * 0.05}s` }">
          <RouterLink
            :to="`/knowledge/${article.slug}`"
            class="block rounded-2xl border border-border bg-surface-alt px-5 py-4 transition-colors hover:border-primary"
          >
            <span class="block font-heading text-lg font-bold text-text-base">{{ article.title }}</span>
            <span class="mt-1 block text-sm leading-relaxed text-text-muted">{{ article.description }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </article>
</template>
