<script setup>
import { useI18n } from 'vue-i18n'
import StatCard from '@/components/home/StatCard.vue'

const { t, tm } = useI18n()

// Visual sparkline shapes (not translated)
const sparkSeries = [
  [42, 48, 46, 55, 62, 70, 78, 86],
  [50, 54, 52, 60, 58, 72, 80, 92],
  [88, 82, 78, 70, 64, 58, 52, 46]
]
</script>

<template>
  <section id="about" class="relative overflow-hidden bg-surface py-20 lg:py-28">
    <!-- Ambient 3D orbs -->
    <div class="pointer-events-none absolute -end-24 top-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
    <div class="pointer-events-none absolute -start-20 bottom-0 h-96 w-96 rounded-full bg-success/10 blur-3xl animate-float-slower" />

    <div class="relative mx-auto max-w-7xl px-5 lg:px-10">
      <div class="reveal mx-auto mb-12 max-w-3xl text-center lg:mb-16">
        <h2 class="font-heading text-3xl font-bold tracking-tight text-text-base sm:text-4xl lg:text-5xl">
          {{ t('home.stats.title') }}
        </h2>
        <p class="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
          {{ t('home.stats.subtitle') }}
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <StatCard
          v-for="(stat, i) in tm('home.stats.items')"
          :key="i"
          :value="stat.value"
          :label="stat.label"
          :growth="stat.growth"
          :trend="stat.trend"
          :hint="stat.hint"
          :points="sparkSeries[i] || sparkSeries[0]"
          :delay="i * 0.1"
        />
      </div>

      <!-- CTA with depth -->
      <div
        class="cta-3d reveal relative mt-14 overflow-hidden rounded-2xl border border-primary/25 p-8 text-center sm:mt-16 sm:p-12 lg:p-16"
        style="transition-delay: .15s"
      >
        <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-light/50 via-surface-alt to-surface-alt" />
        <div class="pointer-events-none absolute -end-10 top-0 h-40 w-40 rounded-full bg-primary/20 blur-2xl" />
        <div class="relative z-10">
          <h2 class="font-heading text-2xl font-bold text-text-base sm:text-3xl lg:text-4xl">
            {{ t('home.cta.title') }}
          </h2>
          <p class="mx-auto mt-4 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg">
            {{ t('home.cta.subtitle') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-3d {
  transform: perspective(1000px) rotateX(2deg);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.55) inset,
    0 24px 50px -28px rgba(15, 23, 42, 0.4);
}

.dark .cta-3d {
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.04) inset,
    0 28px 56px -24px rgba(0, 0, 0, 0.55);
}

@media (prefers-reduced-motion: reduce) {
  .cta-3d {
    transform: none;
  }
}
</style>
