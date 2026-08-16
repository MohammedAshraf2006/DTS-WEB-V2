<script setup>
import { nextTick, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '@/composables/useScrollReveal'
import SignatureSealPanels from '@/components/services/SignatureSealPanels.vue'
import SignatureBenefits from '@/components/services/SignatureBenefits.vue'
import SignatureRequestForm from '@/components/services/SignatureRequestForm.vue'
import AppIcon from '@/components/icons/AppIcon.vue'

const { t } = useI18n()

const showForm = ref(false)

function openForm() {
  showForm.value = true
  nextTick(() => {
    document.getElementById('signature-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

useScrollReveal()
</script>

<template>
  <article class="relative overflow-hidden bg-transparent pb-16 pt-28 lg:pb-20 lg:pt-32">
    <div class="mx-auto max-w-7xl px-5 lg:px-10">
      <!-- Hero -->
      <div class="reveal mx-auto max-w-3xl text-center">
        <p class="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {{ t('services.signaturePage.heroEyebrow') }}
        </p>
        <h1 class="mt-3 font-heading text-3xl font-bold tracking-tight text-text-base sm:text-4xl lg:text-5xl">
          {{ t('services.signaturePage.heroTitle') }}
        </h1>
        <p class="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
          {{ t('services.signaturePage.heroSubtitle') }}
        </p>
        <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            class="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-text-onprimary shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary-hover"
            @click="openForm"
          >
            {{ t('services.signaturePage.heroCta') }}
            <AppIcon name="arrowLeft" class="h-4 w-4 rtl:block ltr:hidden" />
            <AppIcon name="arrowRight" class="h-4 w-4 ltr:block rtl:hidden" />
          </button>
          <a
            :href="t('services.signaturePage.whatsappHref')"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-full border border-border bg-surface-alt px-7 py-3.5 text-sm font-bold text-text-base transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
          >
            {{ t('services.signaturePage.heroSecondaryCta') }}
          </a>
        </div>
      </div>

      <!-- Signature / Seal panels -->
      <div class="reveal mt-14 lg:mt-16">
        <div class="mx-auto max-w-3xl text-center">
          <h2 class="font-heading text-2xl font-bold text-text-base sm:text-3xl">
            {{ t('services.signaturePage.panelsTitle') }}
          </h2>
          <p class="mt-3 text-base text-text-muted">
            {{ t('services.signaturePage.panelsSubtitle') }}
          </p>
        </div>
        <div class="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-8">
          <SignatureSealPanels kind="signature" icon="/images/services/signature-token.webp" />
          <SignatureSealPanels kind="seal" icon="/images/services/seal.webp" />
        </div>
      </div>

      <!-- Benefits -->
      <div class="reveal mt-14 lg:mt-16">
        <SignatureBenefits />
      </div>

      <!-- Request form -->
      <div v-if="showForm" id="signature-form" class="mt-14 scroll-mt-28 lg:mt-16">
        <div class="mx-auto max-w-3xl text-center">
          <h2 class="font-heading text-2xl font-bold text-text-base sm:text-3xl">
            {{ t('services.signaturePage.form.title') }}
          </h2>
          <p class="mt-3 text-base text-text-muted">
            {{ t('services.signaturePage.form.subtitle') }}
          </p>
        </div>
        <div class="mx-auto mt-8 max-w-xl rounded-2xl border border-border bg-surface-alt p-6 sm:p-8">
          <SignatureRequestForm />
        </div>
      </div>
    </div>
  </article>
</template>
