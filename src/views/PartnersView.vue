<script setup>
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { getPartnersList } from '@/data/partners'
import PartnerCard from '@/components/partners/PartnerCard.vue'

const { t } = useI18n()
const partners = getPartnersList()

useScrollReveal()
</script>

<template>
  <article class="relative bg-transparent pb-20 pt-28 lg:pb-24 lg:pt-32">
    <div class="mx-auto max-w-6xl px-5 lg:px-10">
      <div class="reveal mx-auto max-w-3xl text-center">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {{ t('partners.eyebrow') }}
        </p>
        <h1 class="mt-3 font-heading text-3xl font-bold tracking-tight text-text-base sm:text-4xl lg:text-5xl">
          {{ t('partners.title') }}
        </h1>
        <p class="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
          {{ t('partners.subtitle') }}
        </p>
      </div>

      <div class="mt-12 space-y-8 lg:mt-16 lg:space-y-12">
        <PartnerCard
          v-for="(partner, i) in partners"
          :key="partner.key"
          :partner-key="partner.key"
          :logo="partner.logo"
          :url="partner.url"
          :tint="partner.tint"
          :reverse="i % 2 === 1"
          :delay="i * 0.08"
        />
      </div>
    </div>
  </article>
</template>
