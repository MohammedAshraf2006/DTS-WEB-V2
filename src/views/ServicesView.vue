<script setup>
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { getServicesList } from '@/data/services'
import ServiceListCard from '@/components/services/ServiceListCard.vue'
import AppIcon from '@/components/icons/AppIcon.vue'

const { t } = useI18n()
const services = getServicesList()

useScrollReveal()
</script>

<template>
  <section class="relative overflow-hidden bg-transparent pb-16 pt-28 lg:pb-20 lg:pt-32">
    <div class="mx-auto max-w-7xl px-5 lg:px-10">
      <div class="reveal mx-auto max-w-3xl text-center">
        <h1 class="font-heading text-3xl font-bold tracking-tight text-text-base sm:text-4xl lg:text-5xl">
          {{ t('services.title') }}
        </h1>
        <p class="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
          {{ t('services.subtitle') }}
        </p>
      </div>

      <div class="mt-10 space-y-5 lg:mt-12 lg:space-y-6">
        <ServiceListCard
          v-for="(svc, i) in services"
          :key="svc.key"
          :service-key="svc.key"
          :icon="svc.icon"
          :href="svc.href"
          :featured="!!svc.featured"
          :delay="i * 0.05"
        />
      </div>

      <div class="reveal mt-12 text-center">
        <RouterLink
          to="/contact"
          class="inline-flex items-center gap-2 rounded-full border border-border bg-surface-alt px-6 py-3 text-sm font-bold text-text-base transition-all hover:border-primary hover:text-primary"
        >
          {{ t('services.contactCta') }}
          <AppIcon name="arrowLeft" class="h-4 w-4 rtl:block ltr:hidden" />
          <AppIcon name="arrowRight" class="h-4 w-4 ltr:block rtl:hidden" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>
