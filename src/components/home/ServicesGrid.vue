<script setup>
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/icons/AppIcon.vue'

const { t, tm } = useI18n()

// Icon mapping for each service (same as before)
const icons = ['invoice', 'layers', 'signature', 'chart', 'link', 'clipboard', 'academic', 'support']
</script>

<template>
  <section id="services" class="bg-surface py-20 lg:py-28">
    <div class="mx-auto max-w-7xl px-5 lg:px-10">
      <!-- Section Header -->
      <div class="reveal mx-auto max-w-3xl text-center">
        <h2 class="font-heading text-3xl font-bold text-text-base sm:text-4xl lg:text-5xl">
          {{ t('home.services.title') }}
        </h2>
        <p class="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
          {{ t('home.services.subtitle') }}
        </p>
      </div>

      <!-- Services Grid -->
      <div class="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <div
          v-for="(service, i) in tm('home.services.items')"
          :key="i"
          class="reveal group rounded-2xl border border-border bg-surface-alt p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg sm:p-10 lg:p-12"
          :style="{ transitionDelay: `${(i % 3) * 0.08}s` }"
        >
          <!-- Icon Container -->
          <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-light text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-text-onprimary">
            <AppIcon
              :name="icons[i] || 'invoice'"
              class="h-6 w-6"
            />
          </div>

          <!-- Service Title -->
          <h3 class="mt-6 font-heading text-lg font-bold text-text-base group-hover:text-primary transition-colors duration-200 sm:text-xl">
            {{ service.title }}
          </h3>

          <!-- Description -->
          <p class="mt-3 text-sm leading-relaxed text-text-subtle sm:text-base lg:text-[15px]">
            {{ service.description }}
          </p>

          <!-- Learn More Link -->
          <a
            href="#"
            class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors duration-200 hover:text-primary-hover"
          >
            Learn more
            <AppIcon
              name="arrowRight"
              class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>

      <!-- View All Services CTA -->
      <div class="reveal mt-12 text-center lg:mt-16" style="transition-delay: .2s">
        <RouterLink
          to="/#services"
          class="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-bold text-text-base transition-all duration-200 hover:border-primary hover:text-primary"
        >
          {{ t('home.services.cta') || 'View all services' }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Smooth animations */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Ensure proper grid layout on all screens */
@media (max-width: 640px) {
  :deep(.group) {
    &:hover {
      transform: translateY(-4px);
    }
  }
}
</style>