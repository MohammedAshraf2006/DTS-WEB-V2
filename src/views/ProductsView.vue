<script setup>
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { productsCatalog } from '@/data/products'
import ProductSculptCard from '@/components/products/ProductSculptCard.vue'

const { t } = useI18n()

useScrollReveal()

const listingKeys = [
  { key: 'ess', featured: true, compact: false },
  { key: 'esa', featured: false, compact: true }
]
</script>

<template>
  <section class="relative overflow-x-hidden bg-transparent pb-12 pt-20 sm:pb-16 sm:pt-24 lg:pb-20 lg:pt-28">
    <div class="mx-auto max-w-7xl px-4 sm:px-5 lg:px-10">
      <div class="reveal mx-auto max-w-3xl text-center">
        <h1 class="font-heading text-2xl font-bold tracking-tight text-text-base sm:text-4xl lg:text-5xl">
          {{ t('products.title') }}
        </h1>
        <p class="mt-3 text-sm leading-relaxed text-text-muted sm:mt-4 sm:text-lg">
          {{ t('products.subtitle') }}
        </p>
      </div>

      <div class="mt-8 grid grid-cols-1 gap-5 sm:mt-10 lg:mt-12 lg:grid-cols-5 lg:items-stretch lg:gap-6">
        <ProductSculptCard
          v-for="(item, i) in listingKeys"
          :key="item.key"
          :product-key="item.key"
          :product="productsCatalog[item.key]"
          :compact="item.compact"
          :featured="item.featured"
          :delay="i * 0.05"
          :class="item.featured ? 'lg:col-span-3' : 'lg:col-span-2'"
        />
      </div>
    </div>
  </section>
</template>
