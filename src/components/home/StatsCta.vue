<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import StatCard from '@/components/home/StatCard.vue'
import { useCardTilt } from '@/composables/useCardTilt'

const { t, tm, locale } = useI18n()

// Visual sparkline shapes (not translated)
const sparkSeries = [
  [42, 48, 46, 55, 62, 70, 78, 86],
  [50, 54, 52, 60, 58, 72, 80, 92],
  [88, 82, 78, 70, 64, 58, 52, 46]
]

const stats = computed(() => {
  void locale.value
  const raw = tm('home.stats.items')
  return Array.isArray(raw) ? raw : []
})

const {
  root: ctaRoot,
  tilt: ctaTilt,
  onMove: onCtaMove,
  onLeave: onCtaLeave
} = useCardTilt({ maxX: 5, maxY: 7 })
</script>

<template>
  <section id="about" class="relative overflow-hidden bg-transparent py-12 lg:py-16">
    <!-- Ambient 3D orbs -->
    <div class="pointer-events-none absolute -end-24 top-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
    <div class="pointer-events-none absolute -start-20 bottom-0 h-96 w-96 rounded-full bg-success/10 blur-3xl animate-float-slower" />

    <div class="relative mx-auto max-w-7xl px-5 lg:px-10">
      <div class="reveal mx-auto mb-8 max-w-3xl text-center lg:mb-10">
        <h2 class="font-heading text-3xl font-bold tracking-tight text-text-base sm:text-4xl lg:text-5xl">
          {{ t('home.stats.title') }}
        </h2>
        <p class="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
          {{ t('home.stats.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <StatCard
          v-for="(stat, i) in stats"
          :key="`${locale}-${i}`"
          :value="stat.value"
          :label="stat.label"
          :growth="stat.growth"
          :trend="stat.trend"
          :hint="stat.hint"
          :points="sparkSeries[i] || sparkSeries[0]"
          :delay="i * 0.1"
        />
      </div>

      <!-- CTA with depth + tilt -->
      <div
        ref="ctaRoot"
        class="sculpt-wrap reveal relative mt-10 sm:mt-12"
        style="transition-delay: .15s"
        @mousemove="onCtaMove"
        @mouseleave="onCtaLeave"
      >
        <div
          class="sculpt-panel cta-3d relative overflow-hidden rounded-2xl border border-primary/25 bg-surface-alt p-8 text-center dark:border-border sm:p-10 lg:p-12"
          :style="{
            transform: `perspective(1100px) rotateX(${ctaTilt.x + 2}deg) rotateY(${ctaTilt.y}deg) translateZ(0)`
          }"
        >
          <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-light/25 via-transparent to-surface-alt dark:from-primary-light/45" />
          <div class="pointer-events-none absolute -end-10 top-0 h-40 w-40 rounded-full bg-primary/20 blur-2xl" />
          <div class="pointer-events-none absolute -bottom-12 -start-8 h-36 w-36 rounded-full bg-accent/15 blur-2xl" />
          <div class="sculpt-content relative z-10">
            <h2 class="font-heading text-2xl font-bold text-text-base sm:text-3xl lg:text-4xl">
              {{ t('home.cta.title') }}
            </h2>
            <p class="mx-auto mt-4 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg">
              {{ t('home.cta.subtitle') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
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

.sculpt-wrap:hover .sculpt-panel {
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.8) inset,
    0 30px 56px -22px rgba(27, 115, 159, 0.3),
    0 12px 28px -12px rgba(15, 23, 42, 0.22);
}

.dark .sculpt-wrap:hover .sculpt-panel {
  box-shadow:
    0 1px 0 rgba(0, 232, 240, 0.18) inset,
    0 -1px 0 rgba(0, 0, 0, 0.5) inset,
    0 32px 60px -20px rgba(0, 0, 0, 0.75),
    0 12px 28px -12px rgba(0, 232, 240, 0.12);
}

.sculpt-content {
  transform: translateZ(22px);
}

@media (prefers-reduced-motion: reduce) {
  .sculpt-panel {
    transition: none;
    transform: none !important;
  }
}
</style>
