<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { articlePath, listArticles } from '@/data/knowledge.generated.js'

const props = defineProps({
  slugs: { type: Array, default: null },
  layout: { type: String, default: 'stack' }
})

const { locale } = useI18n()

const items = computed(() => {
  const list = listArticles(locale.value)
  const source = Array.isArray(props.slugs)
    ? props.slugs.map((slug) => list.find((item) => item.slug === slug)).filter(Boolean)
    : list
  return source.map((item) => ({
    slug: item.slug,
    title: item.title,
    to: articlePath(item)
  }))
})
</script>

<template>
  <ul
    class="text-start"
    :class="layout === 'grid'
      ? 'grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2'
      : 'space-y-1.5'"
  >
    <li v-for="item in items" :key="item.slug">
      <RouterLink
        :to="item.to"
        class="text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
      >
        {{ item.title }}
      </RouterLink>
    </li>
  </ul>
</template>
