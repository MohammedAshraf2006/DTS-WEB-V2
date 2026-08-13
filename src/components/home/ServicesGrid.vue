<script setup>
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/icons/AppIcon.vue'

const { t, tm } = useI18n()

// أيقونة لكل خدمة بنفس ترتيب services.items في home.json
const icons = ['invoice', 'layers', 'signature', 'chart', 'link', 'clipboard', 'academic', 'support']
</script>

<template>
  <section id="services" class="bg-surface-alt py-20 lg:py-28">
    <div class="mx-auto max-w-7xl px-5 lg:px-10">
      <div class="reveal mx-auto max-w-2xl text-center">
        <h2 class="font-heading text-3xl font-extrabold text-text-base sm:text-4xl">
          {{ t('home.services.title') }}
        </h2>
        <p class="mt-4 text-base text-text-muted">{{ t('home.services.subtitle') }}</p>
      </div>

      <div class="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(service, i) in tm('home.services.items')"
          :key="i"
          class="reveal group rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
          :style="{ transitionDelay: `${(i % 4) * 0.06}s` }"
        >
          <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary transition-transform group-hover:scale-110">
            <AppIcon :name="icons[i] || 'invoice'" class="h-5 w-5" />
          </span>
          <h3 class="mt-4 text-base font-bold text-text-base">{{ service.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-text-subtle">{{ service.description }}</p>
        </div>
      </div>

      <div class="reveal mt-10 text-center">
        <RouterLink
          to="/#services"
          class="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-bold text-text-base transition-all hover:border-primary hover:text-primary"
        >
          {{ t('home.services.cta') }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>
