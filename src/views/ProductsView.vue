<script setup>
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { productsCatalog } from '@/data/products'
import ProductSculptCard from '@/components/products/ProductSculptCard.vue'
import AppIcon from '@/components/icons/AppIcon.vue'

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

      <div class="mt-10 lg:mt-12">
        <ProductSculptCard
          product-key="ess"
          :product="productsCatalog.ess"
        />
      </div>

      <div class="mt-6 max-w-3xl">
        <ProductSculptCard
          product-key="esa"
          :product="productsCatalog.esa"
          :delay="0.08"
        />
      </div>

      <p class="reveal mt-8 text-sm text-text-subtle">
        <span>{{ t('products.ersQuiet') }}</span>
        <RouterLink to="/products/ers" class="ms-2 inline-flex items-center gap-1 font-semibold text-text-muted hover:text-primary">
          {{ t('products.ersCta') }}
          <AppIcon name="arrowLeft" class="h-3.5 w-3.5 rtl:block ltr:hidden" />
          <AppIcon name="arrowRight" class="h-3.5 w-3.5 ltr:block rtl:hidden" />
        </RouterLink>
      </p>
    </div>
  </section>
</template>
