<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Updated to show client logos instead of text
// Each client has name, logo path, and optional URL
const clients = [
  {
    name: 'Client 1',
    logo: '/images/clients/client-1.svg',
    url: '#'
  },
  {
    name: 'Client 2',
    logo: '/images/clients/client-2.svg',
    url: '#'
  },
  {
    name: 'Client 3',
    logo: '/images/clients/client-3.svg',
    url: '#'
  },
  {
    name: 'Client 4',
    logo: '/images/clients/client-4.svg',
    url: '#'
  },
  {
    name: 'Client 5',
    logo: '/images/clients/client-5.svg',
    url: '#'
  }
]

// For mobile marquee effect if needed
const loopClients = [...clients, ...clients]
</script>

<template>
  <section class="reveal border-y border-border bg-surface-alt py-12 lg:py-16">
    <!-- Label -->
    <p class="mb-8 text-center text-xs font-bold uppercase tracking-widest text-text-subtle">
      {{ t('home.trustBar.label') }}
    </p>

    <!-- Desktop View: Static logo display -->
    <div class="mx-auto hidden max-w-7xl px-5 lg:block lg:px-10">
      <div class="flex flex-wrap items-center justify-center gap-8 sm:gap-10 lg:gap-12">
        <a
          v-for="client in clients"
          :key="client.name"
          :href="client.url"
          class="group flex items-center justify-center transition-all duration-300"
        >
          <img
            :src="client.logo"
            :alt="client.name"
            class="h-8 max-w-[120px] object-contain grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 sm:h-10 sm:max-w-[140px]"
          />
        </a>
      </div>
    </div>

    <!-- Mobile View: Marquee scroll -->
    <div class="group relative overflow-hidden lg:hidden">
      <div class="pointer-events-none absolute inset-y-0 start-0 z-10 w-12 bg-gradient-to-r from-surface-alt to-transparent sm:w-16"></div>
      <div class="pointer-events-none absolute inset-y-0 end-0 z-10 w-12 bg-gradient-to-l from-surface-alt to-transparent sm:w-16"></div>

      <div class="flex w-max gap-8 animate-marquee rtl:animate-marquee-rtl group-hover:[animation-play-state:paused]">
        <a
          v-for="(client, i) in loopClients"
          :key="`${client.name}-${i}`"
          :href="client.url"
          class="flex shrink-0 items-center transition-all duration-300"
        >
          <img
            :src="client.logo"
            :alt="client.name"
            class="h-8 max-w-[120px] object-contain grayscale transition-all duration-300 hover:grayscale-0"
          />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Ensure smooth animation */
@media (prefers-reduced-motion: reduce) {
  .animate-marquee,
  .animate-marquee-rtl {
    animation: none !important;
  }
}
</style>
