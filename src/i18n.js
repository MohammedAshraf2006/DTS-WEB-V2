import { createI18n } from 'vue-i18n'

// كل صفحة ليها ملف ترجمة مستقل (ar + en) — بيتجمّعوا هنا تحت namespace باسم الصفحة
// عشان نستخدمهم في الكومبوننتس بالشكل: t('common.nav.home') / t('home.hero.title')
import arCommon from './locales/ar/common.json'
import arHome from './locales/ar/home.json'
import arProducts from './locales/ar/products.json'
import arContact from './locales/ar/contact.json'
import arServices from './locales/ar/services.json'
import arClients from './locales/ar/clients.json'
import arPartners from './locales/ar/partners.json'
import enCommon from './locales/en/common.json'
import enHome from './locales/en/home.json'
import enProducts from './locales/en/products.json'
import enContact from './locales/en/contact.json'
import enServices from './locales/en/services.json'
import enClients from './locales/en/clients.json'
import enPartners from './locales/en/partners.json'

const savedLocale = localStorage.getItem('dts-locale') || 'ar'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: {
    ar: {
      common: arCommon,
      home: arHome,
      products: arProducts,
      contact: arContact,
      services: arServices,
      clients: arClients,
      partners: arPartners
    },
    en: {
      common: enCommon,
      home: enHome,
      products: enProducts,
      contact: enContact,
      services: enServices,
      clients: enClients,
      partners: enPartners
    }
  }
})

export default i18n
