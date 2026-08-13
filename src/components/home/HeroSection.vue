<script setup>
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/icons/AppIcon.vue'

const { t } = useI18n()
</script>

<template>
  <section class="relative overflow-hidden bg-surface pb-20 pt-40 lg:pb-28 lg:pt-48">
    <!-- خلفية متدرجة هادئة -->
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary-light/60 via-transparent to-transparent"></div>

    <div class="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 lg:grid-cols-2 lg:gap-10 lg:px-10">
      <!-- النص -->
      <div class="text-center lg:text-start">
        <span
          class="reveal inline-flex items-center gap-2 rounded-full border border-border bg-surface-alt px-4 py-1.5 text-xs font-bold text-primary shadow-sm"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow"></span>
          {{ t('home.hero.badge') }}
        </span>

        <h1
          class="reveal mt-6 font-heading text-4xl font-extrabold leading-tight text-text-base sm:text-5xl lg:text-[3.25rem]"
          style="transition-delay: .08s"
        >
          {{ t('home.hero.title') }}
        </h1>

        <p
          class="reveal mx-auto mt-5 max-w-xl text-lg leading-relaxed text-text-muted lg:mx-0"
          style="transition-delay: .16s"
        >
          {{ t('home.hero.subtitle') }}
        </p>

        <div class="reveal mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start" style="transition-delay: .24s">
          <RouterLink
            to="/#contact"
            class="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-text-onprimary shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg"
          >
            {{ t('home.hero.ctaPrimary') }}
            <AppIcon name="arrowLeft" class="h-4 w-4 rtl:block ltr:hidden" />
            <AppIcon name="arrowRight" class="h-4 w-4 ltr:block rtl:hidden" />
          </RouterLink>
          <RouterLink
            to="/#products"
            class="inline-flex items-center gap-2 rounded-full border border-border bg-surface-alt px-7 py-3.5 text-sm font-bold text-text-base transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
          >
            {{ t('home.hero.ctaSecondary') }}
          </RouterLink>
        </div>

        <p class="reveal mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-text-subtle lg:justify-start" style="transition-delay: .3s">
          <AppIcon name="shield" class="h-4 w-4 text-primary" />
          {{ t('home.hero.trustBadge') }}
        </p>
      </div>

      <!-- الرسمة/الأنيميشن الحي -->
      <div class="reveal relative mx-auto flex h-72 w-72 items-center justify-center sm:h-96 sm:w-96" style="transition-delay: .2s">
        <!-- الهالة الخلفية -->
        <div class="absolute inset-0 rounded-full bg-primary/10 blur-3xl animate-pulse-glow"></div>

        <!-- مدار دوّار -->
        <div class="absolute inset-4 rounded-full border border-dashed border-primary/25 animate-spin-slow"></div>
        <div class="absolute inset-12 rounded-full border border-primary/15"></div>

        <!-- بطاقة مركزية -->
        <div class="relative z-10 flex h-40 w-40 items-center justify-center rounded-3xl border border-border bg-surface-alt shadow-xl sm:h-48 sm:w-48">
          <img src="/images/DTS.png" alt="DTS" class="h-16 w-auto sm:h-20" />
        </div>

        <!-- بطاقات عائمة صغيرة -->
        <div
          class="absolute -start-2 top-6 flex items-center gap-2 rounded-2xl border border-border bg-surface-alt px-4 py-3 shadow-lg animate-float-slow sm:-start-6"
        >
          <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light text-primary">
            <AppIcon name="invoice" class="h-4 w-4" />
          </span>
          <span class="text-xs font-bold text-text-base">ESS</span>
        </div>

        <div
          class="absolute bottom-8 -end-2 flex items-center gap-2 rounded-2xl border border-border bg-surface-alt px-4 py-3 shadow-lg animate-float-slower sm:-end-8"
        >
          <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-light text-primary">
            <AppIcon name="signature" class="h-4 w-4" />
          </span>
          <span class="text-xs font-bold text-text-base">ESA</span>
        </div>

        <div
          class="absolute -bottom-2 start-10 flex items-center gap-2 rounded-2xl border border-border bg-surface-alt px-3 py-2.5 shadow-lg animate-float-slow"
          style="animation-delay: 1.2s"
        >
          <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-light text-primary">
            <AppIcon name="pos" class="h-3.5 w-3.5" />
          </span>
          <span class="text-[11px] font-bold text-text-base">ERS</span>
        </div>
      </div>
    </div>
  </section>
</template>
