<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// ملحوظة: مفيش لوجوهات صور للشركاء اتبعتت لحد دلوقتي، فبنعرض الاسم كـ pill نصي
// مؤقتًا. لما تدي لوجوهات فيكسد مصر / توقيعي / M.T.S هنستبدلها بالصور مباشرة.
const partners = ['فيكسد مصر', 'توقيعي', 'M.T.S']
const loopPartners = [...partners, ...partners, ...partners]
</script>

<template>
  <section class="reveal border-y border-border bg-surface-alt py-10">
    <p class="mb-6 text-center text-xs font-bold uppercase tracking-wide text-text-subtle">
      {{ t('home.trustBar.label') }}
    </p>

    <div class="group relative overflow-hidden">
      <div class="pointer-events-none absolute inset-y-0 start-0 z-10 w-16 bg-gradient-to-r from-surface-alt to-transparent"></div>
      <div class="pointer-events-none absolute inset-y-0 end-0 z-10 w-16 bg-gradient-to-l from-surface-alt to-transparent"></div>

      <div class="flex w-max gap-4 animate-marquee rtl:animate-marquee-rtl group-hover:[animation-play-state:paused]">
        <span
          v-for="(partner, i) in loopPartners"
          :key="i"
          class="flex shrink-0 items-center rounded-full border border-border bg-surface px-6 py-3 text-sm font-bold text-text-subtle grayscale transition-all hover:grayscale-0 hover:text-primary hover:border-primary/40"
        >
          {{ partner }}
        </span>
      </div>
    </div>
  </section>
</template>
