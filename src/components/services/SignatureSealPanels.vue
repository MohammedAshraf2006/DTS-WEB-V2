<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCardTilt } from '@/composables/useCardTilt'
import AppIcon from '@/components/icons/AppIcon.vue'

const props = defineProps({
  kind: { type: String, required: true },
  icon: { type: String, required: true }
})

const { t, tm, locale } = useI18n()
const { root, tilt, onMove, onLeave } = useCardTilt({ maxX: 6, maxY: 8 })

const points = computed(() => {
  void locale.value
  const raw = tm(`services.signaturePage.${props.kind}.points`)
  return Array.isArray(raw) ? raw : []
})
</script>

<template>
  <div
    ref="root"
    class="sculpt-wrap h-full"
    @mousemove="onMove"
    @mouseleave="onLeave"
  >
    <div
      class="sculpt-panel relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-alt p-6 sm:p-8"
      :style="{
        transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`
      }"
    >
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-light/25 via-transparent to-accent/10 dark:from-primary-light/35" />
      <div class="relative z-10 flex flex-1 flex-col">
        <div class="mb-5 flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl bg-white/50 dark:bg-white/5">
          <img :src="icon" alt="" class="h-20 w-20 object-contain drop-shadow-lg" loading="lazy" decoding="async" />
        </div>
        <h3 class="font-heading text-xl font-bold text-text-base sm:text-2xl">
          {{ t(`services.signaturePage.${kind}.title`) }}
        </h3>
        <p class="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">
          {{ t(`services.signaturePage.${kind}.subtitle`) }}
        </p>
        <ul class="mt-5 space-y-2.5 text-sm text-text-subtle">
          <li
            v-for="(point, i) in points"
            :key="`${locale}-${i}`"
            class="flex items-start gap-2"
          >
            <AppIcon name="shield" class="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{{ point }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
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
    0 8px 20px -12px rgba(27, 115, 159, 0.18);
}

.dark .sculpt-panel {
  box-shadow:
    0 1px 0 rgba(0, 232, 240, 0.12) inset,
    0 -1px 0 rgba(0, 0, 0, 0.45) inset,
    0 26px 52px -22px rgba(0, 0, 0, 0.65),
    0 10px 24px -14px rgba(0, 0, 0, 0.45);
}

@media (prefers-reduced-motion: reduce) {
  .sculpt-panel {
    transition: none;
    transform: none !important;
  }
}
</style>
