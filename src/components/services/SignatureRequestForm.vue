<script setup>
import { defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSignatureForm } from '@/composables/useSignatureForm'

const MailSuccessLottie = defineAsyncComponent(() =>
  import('@/components/contact/MailSuccessLottie.vue')
)

const { t } = useI18n()
const {
  form,
  errors,
  isSubmitting,
  showSuccess,
  sendError,
  handleSubmit,
  sendAnother
} = useSignatureForm()

const fieldClass =
  'w-full rounded-xl border bg-surface px-4 py-3 text-start text-sm text-text-base outline-none transition-colors placeholder:text-text-subtle focus:border-primary'
</script>

<template>
  <div v-if="showSuccess" class="flex flex-col items-center text-center">
    <MailSuccessLottie />
    <h2 class="mt-2 font-heading text-2xl font-bold text-text-base">
      {{ t('services.signaturePage.form.successTitle') }}
    </h2>
    <p class="mt-2 max-w-md text-sm leading-relaxed text-text-muted sm:text-base">
      {{ t('services.signaturePage.form.successMsg') }}
    </p>
    <button
      type="button"
      class="mt-6 rounded-full border border-border bg-surface-alt px-6 py-3 text-sm font-bold text-text-base transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
      @click="sendAnother"
    >
      {{ t('contact.again') }}
    </button>
  </div>

  <form v-else class="space-y-4" novalidate @submit.prevent="handleSubmit">
    <input
      v-model="form.honeypot"
      type="text"
      tabindex="-1"
      autocomplete="off"
      class="absolute -left-[9999px] h-0 w-0 opacity-0"
      aria-hidden="true"
    />

    <div>
      <input
        v-model="form.name"
        type="text"
        :placeholder="t('contact.fields.name')"
        :class="[fieldClass, errors.name ? 'border-danger' : 'border-border']"
        autocomplete="name"
      />
      <p v-if="errors.name" class="mt-1 text-xs text-danger">{{ errors.name }}</p>
    </div>

    <div>
      <input
        v-model="form.phone"
        type="text"
        inputmode="tel"
        :placeholder="t('contact.fields.phone')"
        :class="[fieldClass, errors.phone ? 'border-danger' : 'border-border']"
        autocomplete="tel"
      />
      <p v-if="errors.phone" class="mt-1 text-xs text-danger">{{ errors.phone }}</p>
    </div>

    <div>
      <input
        v-model="form.email"
        type="email"
        :placeholder="t('contact.fields.email')"
        :class="[fieldClass, errors.email ? 'border-danger' : 'border-border']"
        autocomplete="email"
      />
      <p v-if="errors.email" class="mt-1 text-xs text-danger">{{ errors.email }}</p>
    </div>

    <div>
      <input
        v-model="form.company"
        type="text"
        :placeholder="t('services.signaturePage.form.fields.companyOptional')"
        :class="[fieldClass, 'border-border']"
        autocomplete="organization"
      />
    </div>

    <div>
      <input
        v-model="form.nationalId"
        type="text"
        inputmode="numeric"
        :placeholder="t('services.signaturePage.form.fields.nationalIdOptional')"
        :class="[fieldClass, 'border-border']"
      />
    </div>

    <div>
      <input
        v-model="form.jobTitle"
        type="text"
        :placeholder="t('services.signaturePage.form.fields.jobTitleOptional')"
        :class="[fieldClass, 'border-border']"
        autocomplete="organization-title"
      />
    </div>

    <div>
      <input
        v-model="form.governorate"
        type="text"
        :placeholder="t('services.signaturePage.form.fields.governorateOptional')"
        :class="[fieldClass, 'border-border']"
        autocomplete="address-level1"
      />
    </div>

    <div>
      <select
        v-model="form.serviceType"
        :class="[fieldClass, 'border-border', !form.serviceType ? 'text-text-subtle' : '']"
      >
        <option disabled value="">
          {{ t('services.signaturePage.form.fields.serviceTypeOptional') }}
        </option>
        <option value="signature">
          {{ t('services.signaturePage.form.serviceTypes.signature') }}
        </option>
        <option value="seal">
          {{ t('services.signaturePage.form.serviceTypes.seal') }}
        </option>
        <option value="both">
          {{ t('services.signaturePage.form.serviceTypes.both') }}
        </option>
      </select>
    </div>

    <div>
      <textarea
        v-model="form.message"
        rows="4"
        :placeholder="t('services.signaturePage.form.fields.message')"
        :class="[fieldClass, 'resize-none', errors.message ? 'border-danger' : 'border-border']"
      />
      <p v-if="errors.message" class="mt-1 text-xs text-danger">{{ errors.message }}</p>
    </div>

    <p v-if="sendError" class="text-sm text-danger">{{ sendError }}</p>

    <button
      type="submit"
      :disabled="isSubmitting"
      class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-text-onprimary shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
    >
      <span
        v-if="isSubmitting"
        class="h-4 w-4 animate-spin rounded-full border-2 border-text-onprimary/30 border-t-text-onprimary"
      />
      {{ isSubmitting ? t('contact.sending') : t('services.signaturePage.form.submit') }}
    </button>
  </form>
</template>
