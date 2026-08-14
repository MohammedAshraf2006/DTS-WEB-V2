<script setup>
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/icons/AppIcon.vue'

const { t, tm } = useI18n()

// Home shows only the top 3 services
const icons = ['invoice', 'layers', 'signature']
</script>

<template>
  <section id="services" class="bg-surface py-20 lg:py-28">
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

      <!-- Signature highlight — still inside Services, above the 3 cards -->
      <div
        class="reveal mt-12 overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary-light/40 via-surface-alt to-surface-alt px-6 py-8 sm:mt-14 sm:px-10 sm:py-10 lg:px-12"
      >
        <div class="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div class="max-w-2xl">
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
            to="/#contact"
            class="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-text-onprimary shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg"
          >
            {{ t('home.services.signatureHighlight.cta') }}
            <AppIcon name="arrowLeft" class="h-4 w-4 rtl:block ltr:hidden" />
            <AppIcon name="arrowRight" class="h-4 w-4 ltr:block rtl:hidden" />
          </RouterLink>
        </div>
      </div>

      <!-- Top 3 services -->
      <div class="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-8">
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
            to="/#contact"
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

      <div class="reveal mt-12 text-center lg:mt-16" style="transition-delay: .15s">
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
@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.01ms !important;
  }
}
</style>
