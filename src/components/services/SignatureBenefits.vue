<script setup>
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/icons/AppIcon.vue'

const { t } = useI18n()

const benefitKeys = ['legal', 'ease', 'speed', 'organize', 'save', 'compliance']
const icons = {
  legal: 'shield',
  ease: 'layers',
  speed: 'chart',
  organize: 'clipboard',
  save: 'cloud',
  compliance: 'link'
}
</script>

<template>
  <div>
    <div class="mx-auto max-w-3xl text-center">
      <h2 class="font-heading text-2xl font-bold text-text-base sm:text-3xl">
        {{ t('services.signaturePage.benefitsTitle') }}
      </h2>
      <p class="mt-3 text-base text-text-muted">
        {{ t('services.signaturePage.benefitsSubtitle') }}
      </p>
    </div>
    <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      <article
        v-for="key in benefitKeys"
        :key="key"
        class="rounded-2xl border border-border bg-surface-alt p-6 transition-all hover:-translate-y-0.5 hover:border-primary/40"
      >
        <div class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-light text-primary">
          <AppIcon :name="icons[key]" class="h-5 w-5" />
        </div>
        <h3 class="mt-4 font-heading text-base font-bold text-text-base">
          {{ t(`services.signaturePage.benefits.${key}.title`) }}
        </h3>
        <p class="mt-2 text-sm leading-relaxed text-text-subtle">
          {{ t(`services.signaturePage.benefits.${key}.desc`) }}
        </p>
      </article>
    </div>
  </div>
</template>
