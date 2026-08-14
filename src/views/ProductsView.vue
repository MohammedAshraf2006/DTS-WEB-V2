<script setup>
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { PRODUCT_KEYS, productsCatalog } from '@/data/products'
import ProductSculptCard from '@/components/products/ProductSculptCard.vue'

const { t } = useI18n()

useScrollReveal()
</script>

<template>
  <section class="relative overflow-hidden bg-transparent pb-16 pt-28 lg:pb-20 lg:pt-32">
    <div class="mx-auto max-w-7xl px-5 lg:px-10">
      <div class="reveal mx-auto max-w-3xl text-center">
        <h1 class="font-heading text-3xl font-bold tracking-tight text-text-base sm:text-4xl lg:text-5xl">
          {{ t('products.title') }}
        </h1>
        <p class="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
          {{ t('products.subtitle') }}
        </p>
      </div>

      <div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-8">
        <ProductSculptCard
          v-for="(key, i) in PRODUCT_KEYS"
          :key="key"
          :product-key="key"
          :product="productsCatalog[key]"
          :delay="i * 0.08"
        />
      </div>
    </div>
  </section>
</template>
