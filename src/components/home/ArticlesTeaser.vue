<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/icons/AppIcon.vue'
import { articlePath, listArticles } from '@/data/knowledge.generated.js'
import { articleMark } from '@/data/articleFresh.js'

const { t, locale } = useI18n()

const articles = computed(() => {
  const list = listArticles(locale.value)
  return [...list]
    .sort((a, b) => String(b.published).localeCompare(String(a.published)))
    .slice(0, 3)
})

const highlightClass =
  'border-[#1b739f] bg-gradient-to-br from-[#e4f3fb] via-surface-alt to-[#c9fbfe] shadow-[0_0_0_1px_rgba(35,184,193,0.25),0_12px_32px_-16px_rgba(27,115,159,0.65)] hover:border-[#23b8c1] dark:border-[#00e8f0]/70 dark:from-[#062a32] dark:via-surface-alt dark:to-[#0a1528] dark:shadow-[0_0_0_1px_rgba(0,232,240,0.28),0_12px_32px_-16px_rgba(0,232,240,0.35)]'
</script>

<template>
  <section id="articles" class="bg-transparent py-12 lg:py-16">
    <div class="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl">
        <h2 class="font-heading text-4xl font-bold text-text-base sm:text-5xl">
          {{ t('home.articles.title') }}
        </h2>
        <p class="mt-3 text-base leading-relaxed text-text-muted">
          {{ t('home.articles.subtitle') }}
        </p>
      </div>

      <ul class="mt-8 flex flex-col gap-4">
        <li v-for="article in articles" :key="article.slug">
          <RouterLink
            :to="articlePath(article)"
            class="flex items-center gap-4 rounded-2xl border px-4 py-4 transition-colors sm:gap-5 sm:px-6"
            :class="articleMark(article) === 'plain'
              ? 'border-border bg-surface-alt hover:border-primary/40'
              : highlightClass"
          >
            <img
              v-if="article.cover"
              :src="article.cover"
              :alt="article.title"
              class="h-14 w-20 shrink-0 rounded-lg object-cover sm:h-16 sm:w-24"
              loading="lazy"
              decoding="async"
            />
            <span class="min-w-0 flex-1">
              <span
                v-if="articleMark(article) !== 'plain'"
                class="mb-1 inline-flex items-center rounded-full bg-[#1b739f] px-2.5 py-0.5 text-[11px] font-bold text-white dark:bg-[#00e8f0] dark:text-[#050a18]"
              >
                {{ t(articleMark(article) === 'featured' ? 'knowledge.featured' : 'knowledge.fresh') }}
              </span>
              <span class="block font-heading text-base font-bold text-text-base sm:text-lg">
                {{ article.title }}
              </span>
              <span class="mt-1 line-clamp-2 block text-sm text-text-muted">
                {{ article.description }}
              </span>
            </span>
            <AppIcon name="arrowLeft" class="h-4 w-4 shrink-0 text-primary rtl:block ltr:hidden" />
            <AppIcon name="arrowRight" class="h-4 w-4 shrink-0 text-primary ltr:block rtl:hidden" />
          </RouterLink>
        </li>
      </ul>
      <RouterLink
        to="/knowledge/"
        class="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-border bg-surface-alt px-4 py-4 text-base font-bold text-primary transition-colors hover:border-primary/40 sm:px-6 sm:text-lg"
      >
        {{ t('home.articles.cta') }}
        <AppIcon name="arrowLeft" class="h-5 w-5 rtl:block ltr:hidden" />
        <AppIcon name="arrowRight" class="h-5 w-5 ltr:block rtl:hidden" />
      </RouterLink>
    </div>
  </section>
</template>
