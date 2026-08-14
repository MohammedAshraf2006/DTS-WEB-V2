<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCardTilt } from '@/composables/useCardTilt'
import { firstMedia } from '@/data/products'
import AppIcon from '@/components/icons/AppIcon.vue'

const props = defineProps({
  productKey: { type: String, required: true },
  product: { type: Object, required: true },
  delay: { type: Number, default: 0 }
})

const { t } = useI18n()
const { root, tilt, onMove, onLeave } = useCardTilt({ maxX: 6, maxY: 8 })

const preview = computed(() => firstMedia(props.product))

const tintClass = computed(() => {
  if (props.product.tint === 'ers') {
    return 'from-[#c9fbfe]/55 to-surface-alt dark:from-[#23b8c1]/16 dark:to-surface-alt'
  }
  if (props.product.tint === 'esa') {
    return 'from-[#c0eefe]/55 to-surface-alt dark:from-[#0b5f75]/22 dark:to-surface-alt'
  }
  return 'from-[#afdefc]/50 to-surface-alt dark:from-[#1b739f]/18 dark:to-surface-alt'
})
</script>

<template>
  <article
    ref="root"
    class="sculpt-wrap reveal h-full"
    :style="{ transitionDelay: `${delay}s` }"
    @mousemove="onMove"
    @mouseleave="onLeave"
  >
    <div
      class="sculpt-panel relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-alt"
      :style="{
        transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`
      }"
    >
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-br"
        :class="tintClass"
      />

      <div class="relative z-10 flex flex-1 flex-col p-6 sm:p-8">
        <div class="sculpt-content flex items-center gap-3">
          <span class="flex h-14 w-14 items-center justify-center rounded-xl bg-surface-alt shadow-sm">
            <img :src="product.logo" :alt="t(`common.products.${productKey}.name`)" class="h-9 w-auto object-contain" />
          </span>
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <h2 class="font-heading text-xl font-bold text-text-base">
                {{ t(`common.products.${productKey}.name`) }}
              </h2>
              <span
                v-if="product.liteDownloadUrl"
                class="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary"
              >
                {{ t('products.lite.badge') }}
              </span>
            </div>
            <p class="mt-0.5 text-sm text-text-subtle">
              {{ t(`common.products.${productKey}.tagline`) }}
            </p>
          </div>
        </div>

        <p class="sculpt-content mt-5 text-sm leading-relaxed text-text-muted sm:text-base">
          {{ t(`products.items.${productKey}.shortDescription`) }}
        </p>

        <div class="product-preview relative mt-6 aspect-[16/10] overflow-hidden rounded-xl bg-surface">
          <video
            v-if="preview?.type === 'video'"
            class="h-full w-full object-cover"
            :src="preview.src"
            :poster="preview.poster || undefined"
            muted
            playsinline
            preload="metadata"
          />
          <img
            v-else-if="preview"
            :src="preview.src"
            :alt="t(`products.items.${productKey}.title`)"
            class="h-full w-full object-cover"
          />
          <div
            v-else
            class="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center"
          >
            <img :src="product.logo" alt="" class="h-10 w-auto object-contain opacity-70" />
            <p class="text-xs font-medium text-text-subtle">{{ t('products.mediaPlaceholder') }}</p>
          </div>
        </div>

        <RouterLink
          :to="`/products/${productKey}`"
          class="sculpt-cta mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-primary-hover"
        >
          {{ t('products.learnMore') }}
          <AppIcon name="arrowLeft" class="h-4 w-4 rtl:block ltr:hidden" />
          <AppIcon name="arrowRight" class="h-4 w-4 ltr:block rtl:hidden" />
        </RouterLink>
      </div>
    </div>
  </article>
</template>

<style scoped>
.sculpt-wrap {
  transform-style: preserve-3d;
}

.sculpt-panel {
  transform-style: preserve-3d;
  transition: transform 0.18s ease-out, box-shadow 0.25s ease;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.7) inset,
    0 22px 48px -26px rgba(15, 23, 42, 0.38),
    0 8px 20px -12px rgba(27, 115, 159, 0.2);
}

.dark .sculpt-panel {
  box-shadow:
    0 1px 0 rgba(35, 184, 193, 0.12) inset,
    0 -1px 0 rgba(0, 0, 0, 0.45) inset,
    0 26px 52px -22px rgba(0, 0, 0, 0.65),
    0 10px 24px -14px rgba(0, 0, 0, 0.45);
}

.sculpt-wrap:hover .sculpt-panel {
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.8) inset,
    0 30px 56px -22px rgba(27, 115, 159, 0.32),
    0 12px 28px -12px rgba(15, 23, 42, 0.25);
}

.dark .sculpt-wrap:hover .sculpt-panel {
  box-shadow:
    0 1px 0 rgba(35, 184, 193, 0.18) inset,
    0 -1px 0 rgba(0, 0, 0, 0.5) inset,
    0 32px 60px -20px rgba(0, 0, 0, 0.75),
    0 12px 28px -12px rgba(35, 184, 193, 0.12);
}

.sculpt-content {
  transform: translateZ(20px);
}

.sculpt-cta {
  transform: translateZ(28px);
}

@media (prefers-reduced-motion: reduce) {
  .sculpt-panel {
    transition: none;
    transform: none !important;
  }
}
</style>
