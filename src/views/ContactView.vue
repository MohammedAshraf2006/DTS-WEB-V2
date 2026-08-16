<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollReveal } from '@/composables/useScrollReveal'
import ContactForm from '@/components/contact/ContactForm.vue'
import AppIcon from '@/components/icons/AppIcon.vue'
import { SALES_EMAIL, SUPPORT_EMAIL, SIGNATURE_EMAIL } from '@/data/contactEmails'

const { t, tm, locale } = useI18n()

const contactNumbers = computed(() => {
  void locale.value
  const raw = tm('common.footer.numbers')
  return Array.isArray(raw) ? raw : []
})

useScrollReveal()
</script>

<template>
  <article class="relative overflow-hidden bg-transparent pb-16 pt-28 lg:pb-20 lg:pt-32">
    <div class="mx-auto max-w-7xl px-5 lg:px-10">
      <div class="reveal mx-auto max-w-2xl text-center">
        <h1 class="font-heading text-3xl font-bold tracking-tight text-text-base sm:text-4xl lg:text-5xl">
          {{ t('contact.title') }}
        </h1>
        <p class="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
          {{ t('contact.subtitle') }}
        </p>
      </div>

      <div class="reveal mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-8 lg:mt-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-12">
        <aside class="rounded-2xl border border-border bg-surface-alt p-6 sm:p-8">
          <ul class="space-y-3 text-sm leading-relaxed text-text-muted">
            <li class="flex items-start gap-3">
              <AppIcon name="mail" class="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <a
                :href="`mailto:${SALES_EMAIL}`"
                dir="ltr"
                class="inline-block transition-colors hover:text-primary [unicode-bidi:isolate]"
              >
                {{ SALES_EMAIL }}
              </a>
            </li>
            <li class="flex items-start gap-3">
              <AppIcon name="support" class="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <a
                :href="`mailto:${SUPPORT_EMAIL}`"
                dir="ltr"
                class="inline-block transition-colors hover:text-primary [unicode-bidi:isolate]"
              >
                {{ SUPPORT_EMAIL }}
              </a>
            </li>
            <li class="flex items-start gap-3">
              <AppIcon name="usbFlash" class="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <a
                :href="`mailto:${SIGNATURE_EMAIL}`"
                dir="ltr"
                class="inline-block break-all transition-colors hover:text-primary [unicode-bidi:isolate]"
              >
                {{ SIGNATURE_EMAIL }}
              </a>
            </li>
            <li>
              <ul class="space-y-2 ps-8">
                <li v-for="(num, i) in contactNumbers" :key="`${locale}-${i}`">
                  <a
                    :href="`tel:${String(num).replace(/[^\d+]/g, '')}`"
                    dir="ltr"
                    class="inline-block transition-colors hover:text-primary [unicode-bidi:isolate]"
                  >
                    {{ num }}
                  </a>
                </li>
              </ul>
            </li>
            <li class="flex items-start gap-3">
              <AppIcon name="mapPin" class="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span>{{ t('common.footer.address') }}</span>
            </li>
          </ul>
        </aside>

        <div class="rounded-2xl border border-border bg-surface-alt p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  </article>
</template>
