<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Drop real names + https URLs here as assets are added under /public/images/clients
const clients = [
  { name: 'Client 1', logo: '/images/clients/1.png', url: '' },
  { name: 'Client 2', logo: '/images/clients/2.png', url: 'https://orientalweavers.com' },
  { name: 'Client 3', logo: '/images/clients/3.png', url: 'https://www.bue.edu.eg' },
  { name: 'Client 4', logo: '/images/clients/4.png', url: 'https://https://www.ykk.com' },
  { name: 'Client 5', logo: '/images/clients/5.png', url: 'https://savco-eg.com' }
]

const loopClients = [...clients, ...clients]

function hasExternalUrl(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url.trim())
}

function staggerDelay(index) {
  return `${index * 0.1}s`
}

const logoImgClass =
  'h-12 max-w-[180px] object-contain opacity-55 grayscale transition-all duration-300 sm:h-14 sm:max-w-[200px] lg:h-16 lg:max-w-[220px] group-hover:opacity-100 group-hover:grayscale-0 group-focus-visible:opacity-100 group-focus-visible:grayscale-0'
</script>

<template>
  <section class="overflow-hidden border-y border-border bg-surface-alt dark:border-border dark:bg-surface-alt">
    <header class="trust-header reveal relative border-b border-border px-5 py-5 sm:py-6 lg:px-10 dark:border-border">
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-raised via-surface-alt to-surface-alt"
        aria-hidden="true"
      />
      <h2 class="trust-header-title relative z-10 mx-auto max-w-4xl text-center text-base font-semibold leading-snug tracking-normal text-text-base sm:text-lg lg:text-xl">
        {{ t('home.trustBar.label') }}
      </h2>
    </header>

    <!-- One always-in-flow reveal target; logos stagger when section enters view -->
    <div class="reveal trust-logos py-8 lg:py-10" style="transition-delay: 0.08s">
      <div class="mx-auto hidden max-w-6xl px-6 lg:block lg:px-10">
        <div class="flex flex-wrap items-center justify-center gap-x-16 gap-y-10 lg:gap-x-20">
          <template v-for="(client, index) in clients" :key="client.name">
            <a
              v-if="hasExternalUrl(client.url)"
              :href="client.url.trim()"
              :aria-label="client.name"
              target="_blank"
              rel="noopener noreferrer"
              class="trust-logo-item group inline-flex items-center justify-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              :style="{ transitionDelay: staggerDelay(index) }"
            >
              <img :src="client.logo" :alt="client.name" :class="logoImgClass" />
            </a>
            <span
              v-else
              class="trust-logo-item group inline-flex items-center justify-center"
              :aria-label="client.name"
              :style="{ transitionDelay: staggerDelay(index) }"
            >
              <img :src="client.logo" :alt="client.name" :class="logoImgClass" />
            </span>
          </template>
        </div>
      </div>

      <div class="group/marquee relative overflow-hidden lg:hidden">
        <div class="pointer-events-none absolute inset-y-0 start-0 z-10 w-12 bg-gradient-to-r from-surface-alt to-transparent sm:w-16" />
        <div class="pointer-events-none absolute inset-y-0 end-0 z-10 w-12 bg-gradient-to-l from-surface-alt to-transparent sm:w-16" />

        <div
          class="trust-logo-item flex w-max gap-14 animate-marquee px-4 rtl:animate-marquee-rtl group-hover/marquee:[animation-play-state:paused]"
        >
          <template v-for="(client, i) in loopClients" :key="`${client.name}-${i}`">
            <a
              v-if="hasExternalUrl(client.url)"
              :href="client.url.trim()"
              :aria-label="client.name"
              target="_blank"
              rel="noopener noreferrer"
              class="group inline-flex shrink-0 items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <img :src="client.logo" :alt="client.name" :class="logoImgClass" />
            </a>
            <span v-else class="group inline-flex shrink-0 items-center">
              <img :src="client.logo" :alt="client.name" :class="logoImgClass" />
            </span>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust-header {
  transform: perspective(900px) rotateX(3deg);
  transform-origin: center top;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.85),
    inset 0 -1px 0 rgba(15, 23, 42, 0.06),
    0 8px 20px -12px rgba(15, 23, 42, 0.28),
    0 2px 6px rgba(15, 23, 42, 0.06);
}

.dark .trust-header {
  transform: perspective(900px) rotateX(4deg);
  box-shadow:
    inset 0 1px 0 rgba(0, 232, 240, 0.14),
    inset 0 -2px 0 rgba(0, 0, 0, 0.55),
    0 18px 40px -16px rgba(0, 0, 0, 0.75),
    0 6px 16px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(0, 232, 240, 0.08);
}

.trust-header-title {
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.7),
    0 2px 4px rgba(15, 23, 42, 0.12),
    0 6px 14px rgba(15, 23, 42, 0.1);
}

.dark .trust-header-title {
  text-shadow:
    0 2px 10px rgba(0, 0, 0, 0.65),
    0 8px 22px rgba(0, 0, 0, 0.45);
}

/* Logos stay hidden until the strip scrolls into view, then stagger in */
.trust-logo-item {
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
}

.trust-logos.is-visible .trust-logo-item {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .trust-header {
    transform: none;
  }

  .trust-logo-item {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .animate-marquee,
  .animate-marquee-rtl {
    animation: none !important;
  }
}
</style>
