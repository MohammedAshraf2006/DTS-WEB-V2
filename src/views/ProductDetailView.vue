<script setup>
import { computed, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { PRODUCT_KEYS, getProduct } from '@/data/products'
import ProductMediaStage from '@/components/products/ProductMediaStage.vue'
import ProductFeatureCards from '@/components/products/ProductFeatureCards.vue'
import AppIcon from '@/components/icons/AppIcon.vue'

const { t, tm, locale } = useI18n()
const route = useRoute()

useScrollReveal()

const key = computed(() => route.params.key)
const product = computed(() => getProduct(key.value))

const features = computed(() => {
  void locale.value
  const raw = tm(`products.items.${key.value}.features`)
  if (!Array.isArray(raw)) return []
  return raw
    .map((item) => {
      if (item && typeof item === 'object') {
        return { title: item.title, detail: item.detail }
      }
      return null
    })
    .filter((item) => item?.title)
})

const liteUrl = computed(() => {
  const url = product.value?.liteDownloadUrl
  return typeof url === 'string' && url.trim() ? url.trim() : ''
})

const others = computed(() => PRODUCT_KEYS.filter((k) => k !== key.value))

watch(key, async () => {
  await nextTick()
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))
})
</script>

<template>
  <article v-if="product" class="relative overflow-hidden bg-transparent pb-16 pt-28 lg:pb-20 lg:pt-32">
    <div class="mx-auto max-w-7xl px-5 lg:px-10">
      <div class="reveal grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div class="flex items-center gap-4">
            <span class="logo-well flex h-16 w-16 items-center justify-center rounded-2xl border border-border shadow-sm">
              <img :src="product.logo" :alt="t(`products.items.${key}.title`)" class="h-10 w-auto object-contain" />
            </span>
            <h1 class="font-heading text-3xl font-bold tracking-tight text-text-base sm:text-4xl">
              {{ t(`products.items.${key}.title`) }}
            </h1>
          </div>

          <p class="mt-6 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
            {{ t(`products.items.${key}.description`) }}
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <RouterLink
              to="/contact"
              class="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-text-onprimary shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary-hover"
            >
              {{ t('products.contactCta') }}
            </RouterLink>
            <a
              v-if="liteUrl"
              :href="liteUrl"
              class="inline-flex items-center gap-2 rounded-full border border-border bg-surface-alt px-6 py-3 text-sm font-bold text-text-base transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AppIcon name="download" class="h-4 w-4" />
              {{ t('products.lite.cta') }}
            </a>
          </div>
          <p v-if="liteUrl" class="mt-3 text-sm text-text-subtle">
            {{ t('products.lite.hint') }}
          </p>
        </div>

        <ProductMediaStage :product="product" :title="t(`products.items.${key}.title`)" />
      </div>

      <ProductFeatureCards :product-key="key" :features="features" />

      <div class="reveal mt-14">
        <h2 class="font-heading text-lg font-bold text-text-base">{{ t('products.otherProducts') }}</h2>
        <div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <RouterLink
            v-for="other in others"
            :key="other"
            :to="`/products/${other}`"
            class="group flex items-center gap-4 rounded-2xl border border-border bg-surface-alt p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40"
          >
            <span class="logo-well flex h-12 w-12 items-center justify-center rounded-xl">
              <img :src="`/images/Products/${other}-logo.png`" :alt="t(`common.products.${other}.name`)" class="h-8 w-auto object-contain" />
            </span>
            <div>
              <p class="font-bold text-text-base group-hover:text-primary">{{ t(`common.products.${other}.name`) }}</p>
              <p class="mt-0.5 text-sm text-text-subtle">{{ t(`common.products.${other}.tagline`) }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </article>
</template>
