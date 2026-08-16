<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCardTilt } from '@/composables/useCardTilt'

const props = defineProps({
  clientKey: { type: String, required: true },
  logo: { type: String, default: '' },
  delay: { type: Number, default: 0 }
})

const { t } = useI18n()
const { root, tilt, onMove, onLeave } = useCardTilt({ maxX: 6, maxY: 8 })

const name = computed(() => t(`clients.items.${props.clientKey}.name`))
const industry = computed(() => t(`clients.items.${props.clientKey}.industry`))

const initials = computed(() => {
  const raw = name.value.trim()
  if (!raw) return 'DTS'
  const parts = raw.split(/\s+/).filter(Boolean)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
})
</script>

<template>
  <article
    class="reveal h-full"
    :style="{ transitionDelay: `${delay}s` }"
  >
    <div
      ref="root"
      class="sculpt-wrap h-full"
      @mousemove="onMove"
      @mouseleave="onLeave"
    >
      <div
        class="sculpt-panel flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-alt p-5"
        :style="{
          transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`
        }"
      >
        <div class="flex h-28 items-center justify-center rounded-xl bg-primary-light/40 p-4 dark:bg-surface-raised">
          <img
            v-if="logo"
            :src="logo"
            :alt="name"
            class="max-h-full max-w-full object-contain"
            loading="lazy"
            decoding="async"
          />
          <span
            v-else
            class="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 font-heading text-lg font-bold text-primary"
            aria-hidden="true"
          >
            {{ initials }}
          </span>
        </div>
        <h3 class="mt-4 font-heading text-lg font-bold leading-snug text-text-base">
          {{ name }}
        </h3>
        <p class="mt-1 text-sm text-text-muted">
          {{ industry }}
        </p>
      </div>
    </div>
  </article>
</template>

<style scoped>
.sculpt-panel {
  transition: transform 0.18s ease-out, box-shadow 0.25s ease;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.7) inset,
    0 18px 40px -24px rgba(15, 23, 42, 0.36);
}

.dark .sculpt-panel {
  box-shadow:
    0 1px 0 rgba(0, 232, 240, 0.12) inset,
    0 -1px 0 rgba(0, 0, 0, 0.45) inset,
    0 22px 44px -20px rgba(0, 0, 0, 0.65);
}

@media (prefers-reduced-motion: reduce) {
  .sculpt-panel {
    transition: none;
    transform: none !important;
  }
}
</style>
