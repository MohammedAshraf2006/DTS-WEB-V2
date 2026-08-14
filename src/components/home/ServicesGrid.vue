<script setup>
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/icons/AppIcon.vue'
import { useCardTilt } from '@/composables/useCardTilt'

const { t, tm } = useI18n()

// Home shows only the top 3 services
const icons = ['invoice', 'layers', 'signature']

const {
  root: signatureRoot,
  tilt: signatureTilt,
  onMove: onSignatureMove,
  onLeave: onSignatureLeave
} = useCardTilt({ maxX: 6, maxY: 8 })
</script>

<template>
  <section id="services" class="bg-transparent py-12 lg:py-16">
    <div class="mx-auto max-w-7xl px-5 lg:px-10">
      <!-- Section belongs to Services: title first -->
      <div class="reveal mx-auto max-w-3xl text-center">
        <h2 class="font-heading text-3xl font-bold text-text-base sm:text-4xl lg:text-5xl">
          {{ t('home.services.title') }}
        </h2>
        <p class="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
          {{ t('home.services.subtitle') }}
        </p>
      </div>

      <!-- Signature highlight — sculpted 3D panel -->
      <div
        ref="signatureRoot"
        class="sculpt-wrap reveal mt-8 sm:mt-10"
        @mousemove="onSignatureMove"
        @mouseleave="onSignatureLeave"
      >
        <div
          class="sculpt-panel relative overflow-hidden rounded-2xl border border-primary/25 bg-surface-alt px-6 py-7 dark:border-border sm:px-10 sm:py-8 lg:px-12"
          :style="{
            transform: `perspective(1100px) rotateX(${signatureTilt.x}deg) rotateY(${signatureTilt.y}deg) translateZ(0)`
          }"
        >
          <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary-light/30 via-transparent to-accent/10 dark:from-primary-light/40" />
          <div class="pointer-events-none absolute -end-16 -top-16 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />
          <div class="pointer-events-none absolute -bottom-20 -start-10 h-40 w-40 rounded-full bg-accent/15 blur-3xl" />

          <div class="relative z-10 flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div class="sculpt-content max-w-2xl">
              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {{ t('home.services.signatureHighlight.eyebrow') }}
              </p>
              <h3 class="mt-2 font-heading text-2xl font-bold tracking-tight text-text-base sm:text-3xl">
                {{ t('home.services.signatureHighlight.title') }}
              </h3>
              <p class="mt-3 text-base leading-relaxed text-text-muted">
                {{ t('home.services.signatureHighlight.subtitle') }}
              </p>
            </div>
            <RouterLink
              to="/contact"
              class="sculpt-cta inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-text-onprimary shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg"
            >
              {{ t('home.services.signatureHighlight.cta') }}
              <AppIcon name="arrowLeft" class="h-4 w-4 rtl:block ltr:hidden" />
              <AppIcon name="arrowRight" class="h-4 w-4 ltr:block rtl:hidden" />
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Top 3 services -->
      <div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-6">
        <article
          v-for="(service, i) in tm('home.services.items')"
          :key="i"
          class="reveal group rounded-2xl border border-border bg-surface-alt p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg sm:p-10"
          :style="{ transitionDelay: `${i * 0.08}s` }"
        >
          <div
            class="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-light text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-text-onprimary"
          >
            <AppIcon :name="icons[i] || 'invoice'" class="h-6 w-6" />
          </div>

          <h3 class="mt-6 font-heading text-lg font-bold text-text-base transition-colors duration-200 group-hover:text-primary sm:text-xl">
            {{ service.title }}
          </h3>

          <p class="mt-3 text-sm leading-relaxed text-text-subtle sm:text-base">
            {{ service.description }}
          </p>

          <RouterLink
            to="/contact"
            class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors duration-200 hover:text-primary-hover"
          >
            {{ t('home.services.learnMore') }}
            <AppIcon name="arrowLeft" class="h-4 w-4 rtl:block ltr:hidden" />
            <AppIcon
              name="arrowRight"
              class="h-4 w-4 transition-transform duration-200 ltr:block ltr:group-hover:translate-x-1 rtl:hidden"
            />
          </RouterLink>
        </article>
      </div>

      <div class="reveal mt-8 text-center lg:mt-10" style="transition-delay: .15s">
        <RouterLink
          to="/services"
          class="inline-flex items-center gap-2 rounded-full border border-border bg-surface-alt px-6 py-3 text-sm font-bold text-text-base transition-all duration-200 hover:border-primary hover:text-primary"
        >
          {{ t('home.services.cta') }}
          <AppIcon name="arrowLeft" class="h-4 w-4 rtl:block ltr:hidden" />
          <AppIcon name="arrowRight" class="h-4 w-4 ltr:block rtl:hidden" />
        </RouterLink>
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
  transform: translateZ(24px);
}

.sculpt-cta {
  transform: translateZ(36px);
}

@media (prefers-reduced-motion: reduce) {
  .sculpt-panel {
    transition: none;
    transform: none !important;
  }
}
</style>
