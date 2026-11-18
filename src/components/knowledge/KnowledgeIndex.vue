<script setup>
import { useI18n } from 'vue-i18n'
import ArticleLinkList from '@/components/knowledge/ArticleLinkList.vue'

const { t } = useI18n()
</script>

<template>
  <div class="border-t border-border pt-10">
    <h2 class="font-heading text-3xl font-bold text-text-base sm:text-4xl">
      {{ t('knowledge.indexTitle') }}
    </h2>
    <p class="mt-3 max-w-2xl text-base leading-relaxed text-text-muted">
      {{ t('knowledge.indexSubtitle') }}
    </p>
    <ArticleLinkList layout="grid" class="mt-6" />
    <RouterLink
      to="/contact/"
      class="mt-6 inline-flex text-sm font-bold text-primary transition-colors hover:text-primary-hover"
    >
      {{ t('common.nav.contact') }}
    </RouterLink>
  </div>
</template>
