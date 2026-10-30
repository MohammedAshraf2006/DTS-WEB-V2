<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { articlePath, listArticles } from '@/data/knowledge.generated.js'
import { articleMark } from '@/data/articleFresh.js'
import AppIcon from '@/components/icons/AppIcon.vue'

const { t, locale } = useI18n()
const activeTopic = ref('all')

const articles = computed(() => {
  void locale.value
  return listArticles(locale.value)
})

const topics = ['all', 'signature', 'token', 'ess', 'receipt']

const visibleArticles = computed(() => {
  if (activeTopic.value === 'all') return articles.value
  return articles.value.filter((item) => item.topic === activeTopic.value)
})

const featured = computed(() => visibleArticles.value[0] || null)
const rest = computed(() => visibleArticles.value.slice(1))
</script>

<template>
  <section class="relative overflow-x-hidden bg-transparent pb-12 pt-20 lg:pb-16 lg:pt-24">
    <div class="mx-auto max-w-[88rem] px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <p class="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
          {{ t('knowledge.eyebrow') }}
        </p>
        <h1 class="mt-2 font-heading text-2xl font-extrabold tracking-tight text-text-base sm:text-4xl">
          {{ t('knowledge.title') }}
        </h1>
        <p class="mt-3 text-sm leading-relaxed text-text-muted sm:text-lg">
          {{ t('knowledge.subtitle') }}
        </p>
      </div>

      <nav
        class="mt-6 border-b border-border sm:mt-8"
        :aria-label="t('knowledge.section')"
      >
        <ul
          class="flex gap-0 overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
        >
          <li v-for="topic in topics" :key="topic">
            <button
              type="button"
              role="tab"
              class="-mb-px inline-flex shrink-0 items-center whitespace-nowrap border-b-2 px-2.5 py-2.5 text-[13px] transition-colors sm:px-4 sm:py-3 sm:text-base"
              :class="activeTopic === topic
                ? 'border-primary font-extrabold text-primary'
                : 'border-transparent font-semibold text-text-muted hover:text-text-base'"
              :aria-selected="activeTopic === topic"
              @click="activeTopic = topic"
            >
              {{ t(`knowledge.topics.${topic}`) }}
            </button>
          </li>
        </ul>
      </nav>

      <div v-if="featured" class="mt-5 sm:mt-8">
        <RouterLink
          :to="articlePath(featured)"
          class="grid overflow-hidden rounded-2xl border bg-surface-alt transition-colors hover:border-primary lg:grid-cols-[1.15fr_0.85fr]"
          :class="articleMark(featured) === 'plain'
            ? 'border-border'
            : 'border-[#1b739f] bg-gradient-to-br from-[#e4f3fb] via-surface-alt to-[#c9fbfe] ring-2 ring-[#23b8c1]/45 dark:border-[#00e8f0]/70 dark:from-[#062a32] dark:via-surface-alt dark:to-[#0a1528] dark:ring-[#00e8f0]/40'"
        >
          <div class="relative h-40 bg-surface sm:h-auto sm:min-h-[18rem]">
            <img
              v-if="featured.cover"
              :src="featured.cover"
              :alt="featured.title"
              class="h-full w-full object-cover sm:absolute sm:inset-0"
            />
          </div>
          <div class="flex flex-col justify-center p-4 sm:p-8">
            <span
              v-if="articleMark(featured) !== 'plain'"
              class="mb-3 inline-flex w-fit items-center rounded-full bg-[#1b739f] px-3 py-1 text-[11px] font-bold tracking-wide text-white dark:bg-[#00e8f0] dark:text-[#050a18]"
            >
              {{ t(articleMark(featured) === 'featured' ? 'knowledge.featured' : 'knowledge.fresh') }}
            </span>
            <p v-if="featured.category" class="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary sm:text-xs">
              {{ featured.category }}
            </p>
            <h2 class="mt-1 font-heading text-lg font-extrabold leading-snug text-text-base sm:mt-2 sm:text-3xl">
              {{ featured.title }}
            </h2>
            <p class="mt-2 line-clamp-3 text-sm leading-relaxed text-text-muted sm:mt-3 sm:line-clamp-none sm:text-base">
              {{ featured.description }}
            </p>
            <span class="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary sm:mt-5">
              {{ t('knowledge.read') }}
              <AppIcon name="arrowLeft" class="h-4 w-4 rtl:block ltr:hidden" />
              <AppIcon name="arrowRight" class="h-4 w-4 ltr:block rtl:hidden" />
            </span>
          </div>
        </RouterLink>
      </div>

      <ul v-if="rest.length" class="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface-alt sm:mt-6">
        <li v-for="article in rest" :key="article.slug">
          <RouterLink
            :to="articlePath(article)"
            class="flex items-start gap-3 px-3 py-3 transition-colors hover:bg-primary-light/40 sm:items-center sm:gap-5 sm:px-6 sm:py-4"
            :class="articleMark(article) === 'fresh'
              ? 'bg-gradient-to-br from-[#e4f3fb] via-surface-alt to-[#c9fbfe] dark:from-[#062a32] dark:via-surface-alt dark:to-[#0a1528]'
              : ''"
          >
            <img
              v-if="article.cover"
              :src="article.cover"
              :alt="article.title"
              class="h-14 w-[4.5rem] shrink-0 rounded-lg object-cover sm:h-20 sm:w-32"
              loading="lazy"
              decoding="async"
            />
            <span class="min-w-0 flex-1">
              <span
                v-if="articleMark(article) === 'fresh'"
                class="mb-1 inline-flex items-center rounded-full bg-[#1b739f] px-2.5 py-0.5 text-[11px] font-bold text-white dark:bg-[#00e8f0] dark:text-[#050a18]"
              >
                {{ t('knowledge.fresh') }}
              </span>
              <span v-if="article.category" class="block text-[11px] font-semibold text-primary sm:text-xs">
                {{ article.category }}
              </span>
              <span class="mt-0.5 block font-heading text-[15px] font-bold leading-snug text-text-base sm:text-lg">
                {{ article.title }}
              </span>
              <span class="mt-1 line-clamp-2 hidden text-sm text-text-muted sm:block">
                {{ article.description }}
              </span>
            </span>
            <AppIcon name="arrowLeft" class="mt-1 hidden h-4 w-4 shrink-0 text-primary sm:rtl:block" />
            <AppIcon name="arrowRight" class="mt-1 hidden h-4 w-4 shrink-0 text-primary sm:ltr:block" />
          </RouterLink>
        </li>
      </ul>
    </div>
  </section>
</template>
