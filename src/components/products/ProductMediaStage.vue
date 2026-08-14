<script setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { galleryWithSrc } from '@/data/products'

const props = defineProps({
  product: { type: Object, required: true },
  title: { type: String, default: '' }
})

const { t } = useI18n()

const items = computed(() => galleryWithSrc(props.product))
const activeIndex = ref(0)

watch(
  items,
  (list) => {
    if (activeIndex.value >= list.length) activeIndex.value = 0
  },
  { immediate: true }
)

const active = computed(() => items.value[activeIndex.value] || null)
</script>

<template>
  <div>
    <div class="product-stage relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface-alt">
      <video
        v-if="active?.type === 'video'"
        :key="active.src"
        class="h-full w-full object-cover"
        :src="active.src"
        :poster="active.poster || undefined"
        controls
        playsinline
        preload="metadata"
      />
      <img
        v-else-if="active"
        :key="active.src"
        :src="active.src"
        :alt="title"
        class="h-full w-full object-cover"
      />
      <div
        v-else
        class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary-light/30 via-surface to-surface-alt px-6 text-center"
      >
        <span class="logo-well flex h-16 w-16 items-center justify-center rounded-2xl">
          <img :src="product.logo" alt="" class="h-10 w-auto object-contain" />
        </span>
        <p class="text-sm font-medium text-text-subtle">{{ t('products.mediaPlaceholder') }}</p>
      </div>
    </div>

    <div v-if="items.length > 1" class="mt-3 flex flex-wrap gap-2">
      <button
        v-for="(item, i) in items"
        :key="`${item.type}-${item.src}-${i}`"
        type="button"
        class="h-16 w-24 overflow-hidden rounded-lg border transition-all"
        :class="i === activeIndex ? 'border-primary ring-2 ring-primary/30' : 'border-border opacity-70 hover:opacity-100'"
        @click="activeIndex = i"
      >
        <video
          v-if="item.type === 'video'"
          class="h-full w-full object-cover"
          :src="item.src"
          :poster="item.poster || undefined"
          muted
          playsinline
          preload="metadata"
        />
        <img v-else :src="item.src" alt="" class="h-full w-full object-cover" />
      </button>
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
