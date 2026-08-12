<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 py-20 text-center">
    <h1 class="text-3xl font-bold">{{ t('home.title') }}</h1>
  </section>
</template>
