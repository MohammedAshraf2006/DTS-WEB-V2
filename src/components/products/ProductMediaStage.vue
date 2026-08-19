<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { galleryWithSrc } from '@/data/products'

const props = defineProps({
  product: { type: Object, required: true },
  title: { type: String, default: '' }
})

const { t } = useI18n()

const videoItems = computed(() => {
  const allItems = galleryWithSrc(props.product)
  return allItems.filter(item => item.type === 'video')
})

const firstVideo = computed(() => videoItems.value[0] || null)
</script>

<template>
  <div>
    <div class="product-stage relative overflow-hidden rounded-2xl border border-border bg-surface-alt">
      <video
        v-if="firstVideo"
        :key="firstVideo.src"
        class="block h-auto w-full object-contain"
        :src="firstVideo.src"
        :poster="firstVideo.poster || undefined"
        controls
        playsinline
        preload="none"
      />
      <div
        v-else
        class="absolute inset-0 flex min-h-[220px] flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary-light/30 via-surface to-surface-alt px-6 text-center"
      >
        <span class="logo-well flex h-16 w-16 items-center justify-center rounded-2xl">
          <img :src="product.logo" alt="" class="h-10 w-auto object-contain" />
        </span>
        <p class="text-sm font-medium text-text-subtle">{{ t('products.noVideoAvailable') }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-stage {
  box-shadow: 0 24px 48px -28px rgba(15, 23, 42, 0.35);
}

.dark .product-stage {
  box-shadow:
    0 1px 0 rgba(0, 232, 240, 0.1) inset,
    0 24px 48px -24px rgba(0, 0, 0, 0.55);
}
</style>
