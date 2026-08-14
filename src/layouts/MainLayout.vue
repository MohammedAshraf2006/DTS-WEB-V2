<script setup>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import SiteBackground from '@/components/SiteBackground.vue'
</script>

<template>
  <div class="relative flex min-h-screen flex-col bg-transparent">
    <SiteBackground />

    <div class="relative z-10 flex min-h-screen flex-col bg-transparent">
      <AppHeader />
      <main class="relative flex-1 bg-transparent">
        <RouterView />
      </main>
      <AppFooter />
    </div>
  </div>
</template>
