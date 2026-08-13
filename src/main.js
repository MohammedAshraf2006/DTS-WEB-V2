import { createApp, watch } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './composables/useTheme' // يطبّق الوضع الداكن/الفاتح فورًا قبل الـ render
import './style.css'

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')

// مزامنة dir="rtl/ltr" و lang في الـ <html> مع اللغة الحالية
function syncHtmlDir(locale) {
  document.documentElement.setAttribute('lang', locale)
  document.documentElement.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr')
}
syncHtmlDir(i18n.global.locale.value)
watch(i18n.global.locale, (newLocale) => {
  syncHtmlDir(newLocale)
  localStorage.setItem('dts-locale', newLocale)
})
