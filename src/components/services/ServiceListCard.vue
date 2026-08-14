<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCardTilt } from '@/composables/useCardTilt'
import AppIcon from '@/components/icons/AppIcon.vue'

const props = defineProps({
  serviceKey: { type: String, required: true },
  icon: { type: String, required: true },
  href: { type: String, required: true },
  featured: { type: Boolean, default: false },
  delay: { type: Number, default: 0 }
})

const { t, tm, locale } = useI18n()
const { root, tilt, onMove, onLeave } = useCardTilt({ maxX: 5, maxY: 7 })

const bullets = computed(() => {
  void locale.value
  const raw = tm(`services.items.${props.serviceKey}.bullets`)
  return Array.isArray(raw) ? raw : []
})
</script>

<template>
  <article
    class="reveal group"
    :class="featured ? 'featured-service' : ''"
    :style="{ transitionDelay: `${delay}s` }"
  >
    <div
      ref="root"
      class="sculpt-wrap h-full"
      @mousemove="onMove"
      @mouseleave="onLeave"
    >
      <div
        class="sculpt-panel relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 sm:flex-row sm:items-start sm:gap-6 sm:p-8"
        :class="featured
          ? 'featured-panel border-[#1b739f] bg-gradient-to-br from-[#e4f3fb] via-surface-alt to-[#c9fbfe] ring-2 ring-[#23b8c1]/45 dark:border-[#00e8f0]/70 dark:from-[#062a32] dark:via-surface-alt dark:to-[#0a1528] dark:ring-[#00e8f0]/40'
          : 'border-border bg-surface-alt'"
        :style="{
          transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`
        }"
      >
        <div
          v-if="featured"
          class="pointer-events-none absolute -end-10 -top-10 h-44 w-44 rounded-full bg-[#23b8c1]/30 blur-3xl dark:bg-[#00e8f0]/28"
        />
        <div
          v-if="featured"
          class="pointer-events-none absolute -bottom-12 -start-8 h-40 w-40 rounded-full bg-[#1b739f]/22 blur-3xl dark:bg-[#1b739f]/35"
        />

        <div
          class="icon-well relative mx-auto mb-5 flex shrink-0 items-center justify-center sm:mx-0 sm:mb-0"
          :class="featured ? 'h-32 w-32' : 'h-24 w-24'"
          aria-hidden="true"
        >
          <div
            class="absolute inset-0 rounded-2xl"
            :class="featured
              ? 'bg-gradient-to-br from-[#afdefc] via-white to-[#c9fbfe] shadow-inner dark:from-[#0b5f75]/50 dark:via-[#0a1528] dark:to-[#23b8c1]/25'
              : 'bg-gradient-to-br from-primary-light via-surface to-accent/10 dark:from-primary-light/40'"
          />
          <img
            :src="icon"
            alt=""
            class="relative z-10 object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
            :class="featured ? 'h-[6.5rem] w-[6.5rem]' : 'h-16 w-16'"
          />
        </div>

        <div class="sculpt-content relative z-10 min-w-0 flex-1 text-center sm:text-start">
          <span
            v-if="featured"
            class="mb-3 inline-flex items-center rounded-full bg-[#1b739f] px-3 py-1 text-[11px] font-bold tracking-wide text-white shadow-md dark:bg-[#00e8f0] dark:text-[#050a18]"
          >
            {{ t('services.featuredEyebrow') }}
          </span>
          <h2
            class="font-heading font-bold transition-colors"
            :class="featured
              ? 'text-2xl text-[#0b5f75] group-hover:text-[#1b739f] dark:text-[#c9fbfe] dark:group-hover:text-[#00e8f0] sm:text-[1.7rem]'
              : 'text-xl text-text-base group-hover:text-primary sm:text-2xl'"
          >
            {{ t(`services.items.${serviceKey}.title`) }}
          </h2>
          <p class="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">
            {{ t(`services.items.${serviceKey}.detail`) }}
          </p>
          <ul v-if="bullets.length" class="mt-4 space-y-2 text-start text-sm text-text-subtle">
            <li v-for="(b, i) in bullets" :key="`${locale}-${i}`" class="flex items-start gap-2">
              <span
                class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                :class="featured ? 'bg-[#23b8c1]' : 'bg-primary'"
              />
              <span>{{ b }}</span>
            </li>
          </ul>
          <RouterLink
            :to="href"
            class="sculpt-cta mt-6 inline-flex items-center gap-2 text-sm font-bold transition-colors"
            :class="featured
              ? 'text-[#1b739f] hover:text-[#0b5f75] dark:text-[#00e8f0] dark:hover:text-[#c9fbfe]'
              : 'text-primary hover:text-primary-hover'"
          >
            {{ featured ? t('services.featuredCta') : t('services.requestCta') }}
            <AppIcon name="arrowLeft" class="h-4 w-4 rtl:block ltr:hidden" />
            <AppIcon name="arrowRight" class="h-4 w-4 ltr:block rtl:hidden" />
          </RouterLink>
        </div>
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
    0 8px 20px -12px rgba(27, 115, 159, 0.18);
}

.dark .sculpt-panel {
  box-shadow:
    0 1px 0 rgba(0, 232, 240, 0.12) inset,
    0 -1px 0 rgba(0, 0, 0, 0.45) inset,
    0 26px 52px -22px rgba(0, 0, 0, 0.65),
    0 10px 24px -14px rgba(0, 0, 0, 0.45);
}

.featured-panel {
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.85) inset,
    0 0 0 2px rgba(35, 184, 193, 0.35),
    0 22px 48px -18px rgba(27, 115, 159, 0.45),
    0 10px 28px -8px rgba(35, 184, 193, 0.4) !important;
}

.dark .featured-panel {
  box-shadow:
    0 1px 0 rgba(0, 232, 240, 0.35) inset,
    0 -1px 0 rgba(0, 0, 0, 0.45) inset,
    0 0 0 2px rgba(0, 232, 240, 0.4),
    0 26px 52px -16px rgba(0, 0, 0, 0.75),
    0 0 48px -8px rgba(0, 232, 240, 0.45) !important;
}

.featured-service:hover .featured-panel {
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.9) inset,
    0 0 0 2px rgba(35, 184, 193, 0.5),
    0 28px 56px -14px rgba(27, 115, 159, 0.5),
    0 14px 32px -8px rgba(35, 184, 193, 0.48) !important;
}

.dark .featured-service:hover .featured-panel {
  box-shadow:
    0 1px 0 rgba(0, 232, 240, 0.45) inset,
    0 -1px 0 rgba(0, 0, 0, 0.5) inset,
    0 0 0 2px rgba(0, 232, 240, 0.55),
    0 32px 60px -14px rgba(0, 0, 0, 0.8),
    0 0 56px -6px rgba(0, 232, 240, 0.55) !important;
}

.icon-well {
  transform: translateZ(28px);
  transform-style: preserve-3d;
}

.sculpt-content {
  transform: translateZ(16px);
}

.sculpt-cta {
  transform: translateZ(24px);
}

@media (prefers-reduced-motion: reduce) {
  .sculpt-panel {
    transition: none;
    transform: none !important;
  }
}
</style>
