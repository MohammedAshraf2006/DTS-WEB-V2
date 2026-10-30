<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'
import AppIcon from '@/components/icons/AppIcon.vue'
import { getProduct, selectProductImage } from '@/data/products'

const { t, tm, locale } = useI18n()
const { isDark } = useTheme()

const essProduct = computed(() => getProduct('ess'))
const essMedia = computed(() => selectProductImage(essProduct.value, isDark.value, locale.value))

const essFeatures = computed(() => {
  void locale.value
  const raw = tm('home.products.tabs.ess.features')
  return Array.isArray(raw) ? raw : []
})
</script>

<template>
  <section id="products" class="bg-transparent py-12 lg:py-16">
    <div class="mx-auto max-w-7xl px-5 lg:px-10">
      <div class="reveal mx-auto max-w-3xl text-center">
        <h2 class="font-heading text-3xl font-bold tracking-tight text-text-base sm:text-4xl lg:text-5xl">
          {{ t('home.products.title') }}
        </h2>
        <p class="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
          {{ t('home.products.subtitle') }}
        </p>
      </div>

      <div class="reveal mt-10 grid grid-cols-1 items-center gap-12 lg:mt-12 lg:grid-cols-2 lg:gap-16">
        <div class="product-copy max-w-xl">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {{ t('common.products.ess.name') }}
          </p>
          <h3 class="mt-2 font-heading text-3xl font-bold tracking-tight text-text-base sm:text-4xl">
            {{ t('home.products.tabs.ess.title') }}
          </h3>
          <p class="mt-5 text-lg leading-relaxed text-text-muted">
            {{ t('home.products.tabs.ess.description') }}
          </p>

          <ul class="mt-8 divide-y divide-border border-y border-border">
            <li
              v-for="(feature, i) in essFeatures"
              :key="i"
              class="py-4 text-[15px] font-medium leading-snug text-text-base"
            >
              {{ feature }}
            </li>
          </ul>

          <RouterLink
            to="/products/ess/"
            class="mt-8 inline-flex items-center gap-2 text-base font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            {{ t('home.products.cta') }}
            <AppIcon name="arrowLeft" class="h-4 w-4 rtl:block ltr:hidden" />
            <AppIcon name="arrowRight" class="h-4 w-4 ltr:block rtl:hidden" />
          </RouterLink>
        </div>

        <div class="product-media relative h-[230px] w-full overflow-hidden rounded-xl bg-surface-alt sm:h-[280px] lg:h-[320px]">
          <img
            v-if="essMedia"
            :src="essMedia.src"
            :alt="t('home.products.tabs.ess.title')"
            class="h-full w-full object-contain"
            decoding="async"
          />
        </div>
      </div>

      <RouterLink
        to="/products/esa/"
        class="reveal mt-8 flex items-center gap-4 rounded-2xl border border-border bg-surface-alt p-4 transition-colors hover:border-primary sm:p-5"
      >
        <span class="logo-well flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
          <img src="/images/Products/esa-logo.webp" alt="" class="h-7 w-auto object-contain" />
        </span>
        <span class="min-w-0 flex-1">
          <span class="block font-heading text-lg font-bold text-text-base">
            {{ t('common.products.esa.name') }}
          </span>
          <span class="mt-1 block text-sm leading-relaxed text-text-muted">
            {{ t('home.products.esaComplement') }}
          </span>
        </span>
        <AppIcon name="arrowLeft" class="h-4 w-4 shrink-0 text-primary rtl:block ltr:hidden" />
        <AppIcon name="arrowRight" class="h-4 w-4 shrink-0 text-primary ltr:block rtl:hidden" />
      </RouterLink>

      <p class="reveal mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-sm text-text-subtle">
        <span>{{ t('home.products.ersQuiet') }}</span>
        <RouterLink to="/products/ers/" class="font-semibold text-text-muted underline-offset-4 hover:text-primary hover:underline">
          {{ t('home.products.ersCta') }}
        </RouterLink>
      </p>
    </div>
  </section>
</template>

<style scoped>
.product-media {
  box-shadow: 0 24px 48px -28px rgba(15, 23, 42, 0.35);
}

.dark .product-media {
  box-shadow: 0 24px 48px -24px rgba(0, 0, 0, 0.55);
}
</style>
