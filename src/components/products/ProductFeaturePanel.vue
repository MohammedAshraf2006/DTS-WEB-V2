<script setup>
import { useCardTilt } from '@/composables/useCardTilt'

defineProps({
  detail: { type: String, required: true },
  tintClass: { type: String, required: true }
})

const { root, tilt, onMove, onLeave } = useCardTilt({ maxX: 4, maxY: 6 })
</script>

<template>
  <div
    ref="root"
    class="sculpt-wrap mb-5"
    @mousemove="onMove"
    @mouseleave="onLeave"
  >
    <div
      class="sculpt-panel relative overflow-hidden rounded-2xl border border-border bg-surface-alt p-5 sm:p-6"
      :style="{
        transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`
      }"
    >
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-br" :class="tintClass" />
      <p class="sculpt-content relative z-10 whitespace-pre-line text-sm leading-relaxed text-text-muted sm:text-[15px]">
        {{ detail }}
      </p>
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
    0 8px 20px -12px rgba(27, 115, 159, 0.2);
}

.dark .sculpt-panel {
  box-shadow:
    0 1px 0 rgba(0, 232, 240, 0.12) inset,
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
    0 1px 0 rgba(0, 232, 240, 0.18) inset,
    0 -1px 0 rgba(0, 0, 0, 0.5) inset,
    0 32px 60px -20px rgba(0, 0, 0, 0.75),
    0 12px 28px -12px rgba(0, 232, 240, 0.12);
}

.sculpt-content {
  transform: translateZ(20px);
}

@media (prefers-reduced-motion: reduce) {
  .sculpt-panel {
    transition: none;
    transform: none !important;
  }
}
</style>
