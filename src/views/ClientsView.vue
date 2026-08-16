<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useCountUp } from '@/composables/useCountUp'
import { getClientsList } from '@/data/clients'
import ClientCard from '@/components/clients/ClientCard.vue'

const { t } = useI18n()
const clients = getClientsList()
const countEl = ref(null)
const { displayValue } = useCountUp(countEl, t('clients.count'))

useScrollReveal()
</script>

<template>
  <article class="relative overflow-hidden bg-transparent pb-16 pt-28 lg:pb-20 lg:pt-32">
    <div class="mx-auto max-w-7xl px-5 lg:px-10">
      <div class="reveal mx-auto max-w-3xl text-center">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {{ t('clients.eyebrow') }}
        </p>
        <p
          ref="countEl"
          class="mt-4 font-heading text-6xl font-bold tracking-tight text-primary sm:text-7xl lg:text-8xl"
        >
          {{ displayValue }}
        </p>
        <h1 class="mt-3 font-heading text-2xl font-bold tracking-tight text-text-base sm:text-3xl lg:text-4xl">
          {{ t('clients.title') }}
        </h1>
        <p class="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
          {{ t('clients.subtitle') }}
        </p>
      </div>

      <div class="reveal mt-14 text-center lg:mt-16">
        <h2 class="font-heading text-2xl font-bold text-text-base sm:text-3xl">
          {{ t('clients.gridTitle') }}
        </h2>
        <p class="mx-auto mt-3 max-w-xl text-base text-text-muted">
          {{ t('clients.gridSubtitle') }}
        </p>
      </div>

      <div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-6">
        <ClientCard
          v-for="(client, i) in clients"
          :key="client.key"
          :client-key="client.key"
          :logo="client.logo"
          :delay="(i % 6) * 0.04"
        />
      </div>
    </div>
  </article>
</template>
