<script setup>
import { RouterView } from 'vue-router'
import AppLoader from '@/components/AppLoader.vue'
import WhatsAppFloat from '@/components/WhatsAppFloat.vue'
import { usePageSeo } from '@/composables/usePageSeo'

usePageSeo()
</script>

<template>
  <AppLoader />
  <RouterView />
  <WhatsAppFloat />
</template>
