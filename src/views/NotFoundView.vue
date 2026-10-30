<script setup>
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'

const { t } = useI18n()

onMounted(() => {
  document.title = t('common.notFound.title')
  let robots = document.querySelector('meta[name="robots"]')
  if (!robots) {
    robots = document.createElement('meta')
    robots.setAttribute('name', 'robots')
    document.head.appendChild(robots)
  }
  robots.setAttribute('content', 'noindex')
})
</script>

<template>
  <section class="flex min-h-screen flex-col items-center justify-center gap-4 px-5 text-center">
    <h1 class="font-heading text-4xl font-bold text-text-base">404</h1>
    <p class="text-text-muted">{{ t('common.notFound.message') }}</p>
    <RouterLink to="/" class="font-bold text-primary underline">{{ t('common.notFound.home') }}</RouterLink>
  </section>
</template>
