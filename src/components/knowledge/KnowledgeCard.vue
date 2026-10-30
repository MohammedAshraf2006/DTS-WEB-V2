<script setup>
import { useI18n } from 'vue-i18n'
import { useCardTilt } from '@/composables/useCardTilt'
import AppIcon from '@/components/icons/AppIcon.vue'

const props = defineProps({
  slug: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  cover: { type: String, default: '' },
  category: { type: String, default: '' },
  delay: { type: Number, default: 0 }
})

const { t } = useI18n()
const { root, tilt, onMove, onLeave } = useCardTilt({ maxX: 5, maxY: 7 })
</script>

<template>
  <li class="h-full">
    <RouterLink
      :to="`/knowledge/${slug}/`"
      class="sculpt-wrap block h-full"
    >
      <article
        ref="root"
        class="sculpt-panel flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-alt"
        :style="{
          transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`
        }"
        @mousemove="onMove"
        @mouseleave="onLeave"
      >
        <div class="relative h-36 overflow-hidden bg-surface sm:h-44">
          <img
            v-if="cover"
            :src="cover"
            :alt="title"
            class="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            v-else
            class="h-full w-full bg-gradient-to-br from-primary/25 via-surface-alt to-accent/20"
          />
        </div>
        <div class="flex flex-1 flex-col p-5">
          <p v-if="category" class="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {{ category }}
          </p>
          <h2 class="mt-2 font-heading text-lg font-bold leading-snug text-text-base">
            {{ title }}
          </h2>
          <p class="mt-2 flex-1 text-sm leading-relaxed text-text-muted line-clamp-3 sm:line-clamp-none">
            {{ description }}
          </p>
          <span class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
            {{ t('knowledge.read') }}
            <AppIcon name="arrowLeft" class="h-4 w-4 rtl:block ltr:hidden" />
            <AppIcon name="arrowRight" class="h-4 w-4 ltr:block rtl:hidden" />
          </span>
        </div>
      </article>
    </RouterLink>
  </li>
</template>

<style scoped>
.sculpt-panel {
  transition: transform 0.18s ease-out, box-shadow 0.25s ease, border-color 0.2s ease;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.7) inset,
    0 18px 40px -24px rgba(15, 23, 42, 0.36);
}

.dark .sculpt-panel {
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.04) inset,
    0 18px 40px -24px rgba(0, 0, 0, 0.5);
}

.sculpt-wrap:hover .sculpt-panel {
  border-color: var(--color-primary);
}

@media (hover: none), (prefers-reduced-motion: reduce) {
  .sculpt-panel {
    transform: none !important;
    transition: none;
  }
}
</style>
