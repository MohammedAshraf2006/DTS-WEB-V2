<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <header class="bg-primary text-white">
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
      <RouterLink to="/" class="text-xl font-bold">DTS</RouterLink>
      <ul class="flex gap-6">
        <li><RouterLink to="/">{{ t('nav.home') }}</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>
