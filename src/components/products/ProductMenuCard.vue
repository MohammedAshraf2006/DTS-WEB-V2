<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCardTilt } from '@/composables/useCardTilt'

const props = defineProps({
  productKey: { type: String, required: true },
  tint: { type: String, default: 'ess' }
})

const emit = defineEmits(['navigate'])

const { t } = useI18n()
const { root, tilt, onMove, onLeave } = useCardTilt({ maxX: 8, maxY: 10 })

const tintClass = computed(() => {
  if (props.tint === 'ers') {
    return 'from-[#c9fbfe]/70 to-surface-alt dark:from-[#23b8c1]/20 dark:to-surface-raised'
  }
  if (props.tint === 'esa') {
    return 'from-gold-light to-surface-alt dark:from-[#e0b84d]/32 dark:to-surface-raised'
  }
  return 'from-[#afdefc]/65 to-surface-alt dark:from-[#1b739f]/22 dark:to-surface-raised'
})
</script>

<template>
  <div
    ref="root"
    class="menu-card-wrap h-full"
    @mousemove="onMove"
    @mouseleave="onLeave"
  >
    <RouterLink
      :to="`/products/${productKey}`"
      class="flex h-full"
      @click="emit('navigate')"
    >
      <div
        class="menu-card relative flex h-full min-h-[9.25rem] w-full flex-col overflow-hidden rounded-2xl border border-border p-3.5"
        :style="{
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`
        }"
      >
        <div class="pointer-events-none absolute inset-0 bg-gradient-to-br" :class="tintClass" />
        <span class="logo-well relative z-10 mb-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl p-0.5 shadow-sm">
          <img
            :src="`/images/Products/${productKey}-logo.png`"
            :alt="t(`common.products.${productKey}.name`)"
            class="h-full w-full object-contain"
          />
        </span>
        <span class="relative z-10 text-base font-bold leading-snug text-text-base">
          {{ t(`common.products.${productKey}.name`) }}
        </span>
        <span class="relative z-10 mt-1 line-clamp-2 min-h-[2rem] text-sm leading-snug text-text-subtle">
          {{ t(`common.products.${productKey}.tagline`) }}
        </span>
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.menu-card-wrap {
  transform-style: preserve-3d;
}

.menu-card {
  transform-style: preserve-3d;
  transition: transform 0.18s ease-out, box-shadow 0.25s ease;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.75) inset,
    0 16px 32px -20px rgba(15, 23, 42, 0.32);
}

.dark .menu-card {
  box-shadow:
    0 1px 0 rgba(35, 184, 193, 0.14) inset,
    0 -1px 0 rgba(0, 0, 0, 0.4) inset,
    0 18px 36px -18px rgba(0, 0, 0, 0.6);
}

.menu-card-wrap:hover .menu-card {
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.85) inset,
    0 22px 40px -16px rgba(27, 115, 159, 0.28);
}

.dark .menu-card-wrap:hover .menu-card {
  box-shadow:
    0 1px 0 rgba(35, 184, 193, 0.2) inset,
    0 -1px 0 rgba(0, 0, 0, 0.45) inset,
    0 24px 44px -16px rgba(0, 0, 0, 0.7),
    0 0 24px -8px rgba(35, 184, 193, 0.18);
}

@media (prefers-reduced-motion: reduce) {
  .menu-card {
    transition: none;
    transform: none !important;
  }
}
</style>
