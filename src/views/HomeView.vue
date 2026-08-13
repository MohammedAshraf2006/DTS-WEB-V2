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
  <div>
    <HeroSection />
    <TrustBar />
    <ProductTabs />
    <ServicesGrid />
    <StatsCta />
  </div>
</template>
