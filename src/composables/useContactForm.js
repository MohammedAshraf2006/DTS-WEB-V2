import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { sendContactMessage } from '@/services/contact'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useContactForm() {
  const { t } = useI18n()

  const form = reactive({
    name: '',
    phone: '',
    email: '',
    message: '',
    honeypot: ''
  })

  const errors = reactive({})
  const isSubmitting = ref(false)
  const showSuccess = ref(false)
  const sendError = ref('')

  function resetForm() {
    form.name = ''
    form.phone = ''
    form.email = ''
    form.message = ''
    form.honeypot = ''
  }

  function clearErrors() {
    Object.keys(errors).forEach((key) => {
      delete errors[key]
    })
    sendError.value = ''
  }

  function validate() {
    clearErrors()
    let valid = true

    if (!form.name.trim()) {
      errors.name = t('contact.errors.name')
      valid = false
    }

    const phoneDigits = form.phone.replace(/\D/g, '')
    if (!form.phone.trim()) {
      errors.phone = t('contact.errors.phone')
      valid = false
    } else if (phoneDigits.length < 10) {
      errors.phone = t('contact.errors.phoneInvalid')
      valid = false
    }

    if (!form.email.trim()) {
      errors.email = t('contact.errors.email')
      valid = false
    } else if (!EMAIL_RE.test(form.email.trim())) {
      errors.email = t('contact.errors.emailInvalid')
      valid = false
    }

    if (!form.message.trim()) {
      errors.message = t('contact.errors.message')
      valid = false
    }

    return valid
  }

  async function handleSubmit() {
    if (form.honeypot) return
    if (!validate()) return

    isSubmitting.value = true
    sendError.value = ''

    try {
      await sendContactMessage({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        honeypot: form.honeypot
      })
      resetForm()
      showSuccess.value = true
    } catch {
      sendError.value = t('contact.errors.send')
    } finally {
      isSubmitting.value = false
    }
  }

  function sendAnother() {
    showSuccess.value = false
    clearErrors()
  }

  return {
    form,
    errors,
    isSubmitting,
    showSuccess,
    sendError,
    handleSubmit,
    sendAnother
  }
}
