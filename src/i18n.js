import { createI18n } from 'vue-i18n'

// كل صفحة ليها ملف ترجمة مستقل (ar + en) — بيتجمّعوا هنا تحت namespace باسم الصفحة
// عشان نستخدمهم في الكومبوننتس بالشكل: t('common.nav.home') / t('home.hero.title')
import arCommon from './locales/ar/common.json'
import arHome from './locales/ar/home.json'
import arProducts from './locales/ar/products.json'
import enCommon from './locales/en/common.json'
import enHome from './locales/en/home.json'
import enProducts from './locales/en/products.json'

const savedLocale = localStorage.getItem('dts-locale') || 'ar'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: {
    ar: {
      common: arCommon,
      home: arHome,
      products: arProducts
    },
    en: {
      common: enCommon,
      home: enHome,
      products: enProducts
    }
  }
})

export default i18n
