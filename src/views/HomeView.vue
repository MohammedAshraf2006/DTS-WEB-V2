<script setup>
import { useScrollReveal } from '@/composables/useScrollReveal'
import HeroSection from '@/components/home/HeroSection.vue'
import TrustBar from '@/components/home/TrustBar.vue'
import ProductTabs from '@/components/home/ProductTabs.vue'
import ServicesGrid from '@/components/home/ServicesGrid.vue'
import StatsCta from '@/components/home/StatsCta.vue'

useScrollReveal()
</script>

<template>
  <div class="relative overflow-hidden">
    <!-- Soft orbs only in dark mode (avoid light-mode haze) -->
    <div
      class="ambient-orb -start-24 top-[18%] hidden h-64 w-64 bg-primary/25 dark:block"
      aria-hidden="true"
    />
    <div
      class="ambient-orb end-[-4rem] top-[42%] hidden h-72 w-72 bg-accent/20 dark:block"
      style="animation-delay: -4s"
      aria-hidden="true"
    />
    <div
      class="ambient-orb start-1/3 bottom-[8%] hidden h-56 w-56 bg-primary/15 dark:block"
      style="animation-delay: -7s"
      aria-hidden="true"
    />

    <HeroSection />
    <TrustBar />
    <ProductTabs />
    <ServicesGrid />
    <StatsCta />
  </div>
</template>
