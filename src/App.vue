<script setup>
import { RouterView } from 'vue-router'
import AppLoader from '@/components/AppLoader.vue'
import WhatsAppFloat from '@/components/WhatsAppFloat.vue'
</script>

<template>
  <AppLoader />
  <RouterView />
  <WhatsAppFloat />
</template>
