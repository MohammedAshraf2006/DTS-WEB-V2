<script setup>
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/icons/AppIcon.vue'
import StatCounter from './StatCounter.vue'

const { t, tm } = useI18n()
</script>

<template>
  <section class="relative overflow-hidden bg-primary py-20 lg:py-24">
    <div class="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
    <div class="pointer-events-none absolute -start-24 -bottom-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

    <div class="relative mx-auto max-w-7xl px-5 lg:px-10">
      <!-- Stats -->
      <div class="reveal grid grid-cols-1 gap-8 border-b border-white/15 pb-14 sm:grid-cols-3">
        <div v-for="(stat, i) in tm('home.stats.items')" :key="i" class="[&_*]:text-white">
          <StatCounter :value="stat.value" :label="stat.label" />
        </div>
      </div>

      <!-- CTA -->
      <div id="contact" class="reveal mt-14 text-center" style="transition-delay: .1s">
        <h2 class="font-heading text-3xl font-extrabold text-white sm:text-4xl">
          {{ t('home.cta.title') }}
        </h2>
        <p class="mx-auto mt-4 max-w-lg text-white/80">{{ t('home.cta.subtitle') }}</p>

        <a
          href="mailto:Info@dts-eg.net"
          class="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-primary shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
        >
          {{ t('home.cta.button') }}
          <AppIcon name="arrowLeft" class="h-4 w-4 rtl:block ltr:hidden" />
          <AppIcon name="arrowRight" class="h-4 w-4 ltr:block rtl:hidden" />
        </a>
      </div>
    </div>
  </section>
</template>
