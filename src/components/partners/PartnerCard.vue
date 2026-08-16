<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/icons/AppIcon.vue'

const props = defineProps({
  partnerKey: { type: String, required: true },
  logo: { type: String, required: true },
  url: { type: String, default: '' },
  tint: { type: String, default: 'navy' },
  reverse: { type: Boolean, default: false },
  delay: { type: Number, default: 0 }
})

const { t } = useI18n()

const name = computed(() => t(`partners.items.${props.partnerKey}.name`))
const role = computed(() => t(`partners.items.${props.partnerKey}.role`))
const description = computed(() => t(`partners.items.${props.partnerKey}.description`))
const hasUrl = computed(() => Boolean(props.url && /^https?:\/\//i.test(props.url)))

const tintClass = computed(() => {
  if (props.tint === 'red') {
    return 'from-[#fde8e8]/80 via-surface-alt to-surface-alt'
  }
  if (props.tint === 'signature') {
    return 'from-[#fde8e8]/70 via-surface-alt to-[#e4f3fb]'
  }
  return 'from-[#d1dcee]/80 via-surface-alt to-surface-alt'
})

const ctaClass =
  'mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-text-onprimary shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg'
</script>

<template>
  <article
    class="reveal"
    :style="{ transitionDelay: `${delay}s` }"
  >
    <div
      class="sculpt-panel relative flex flex-col overflow-hidden rounded-3xl border border-border bg-gradient-to-br dark:bg-none dark:bg-surface-alt lg:min-h-[20rem]"
      :class="[tintClass, reverse ? 'lg:flex-row-reverse' : 'lg:flex-row']"
    >
      <div
        class="pointer-events-none flex min-h-[16rem] shrink-0 items-center justify-center bg-surface p-8 sm:min-h-[18rem] sm:p-10 lg:w-[42%] dark:bg-[#050a18]"
      >
        <img
          :src="logo"
          :alt="name"
          class="max-h-40 w-auto max-w-full object-contain sm:max-h-48"
        />
      </div>

      <div class="relative z-10 flex flex-1 flex-col justify-center p-7 sm:p-10 lg:p-12 pointer-events-auto">
        <p class="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          {{ role }}
        </p>
        <h2 class="mt-3 font-heading text-3xl font-bold tracking-tight text-text-base sm:text-4xl">
          {{ name }}
        </h2>
        <p class="mt-4 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
          {{ description }}
        </p>
        <a
          v-if="hasUrl"
          :href="url"
          target="_blank"
          rel="noopener noreferrer"
          class="relative z-20"
          :class="ctaClass"
        >
          {{ t('partners.visitSite') }}
          <AppIcon name="external" class="h-4 w-4" />
        </a>
        <span v-else :class="ctaClass">
          {{ t('partners.visitSite') }}
          <AppIcon name="external" class="h-4 w-4" />
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.sculpt-panel {
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.75) inset,
    0 28px 56px -24px rgba(15, 23, 42, 0.4),
    0 12px 28px -14px rgba(27, 115, 159, 0.22);
}

.dark .sculpt-panel {
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.04) inset,
    0 28px 56px -24px rgba(0, 0, 0, 0.55);
}
</style>
