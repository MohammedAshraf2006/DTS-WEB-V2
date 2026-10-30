export const SITE_ORIGIN = 'https://dts-eg.com'
export const OG_IMAGE = `${SITE_ORIGIN}/images/og-default.webp`

export function canonicalUrl(path) {
  if (!path || path === '/') return `${SITE_ORIGIN}/`
  const clean = path.startsWith('/') ? path : `/${path}`
  return `${SITE_ORIGIN}${clean.replace(/\/+$/, '')}/`
}

const pages = {
  home: {
    path: '/',
    ar: {
      title: 'DTS | خدمات التحول الرقمى',
      description: 'منظومة DTS لإصدار الفواتير والإيصالات الإلكترونية والتوقيع الرقمي، مرتبطة بمصلحة الضرائب المصرية.'
    },
    en: {
      title: 'DTS | Digital Transformation Services',
      description: 'DTS issues e-invoices and e-receipts and handles digital signatures for companies in Egypt, connected to the Egyptian Tax Authority.'
    }
  },
  products: {
    path: '/products',
    ar: {
      title: 'المنتجات | DTS',
      description: 'ESS اشتراك للفواتير والإيصالات. ESA يكمّله بالتوقيع والختم. ERS لإدارة إيصالات نقاط البيع (الكاشير) الإلكترونية.'
    },
    en: {
      title: 'Products | DTS',
      description: 'ESS is the invoice and receipt subscription. ESA complements it with signing. ERS manages cashier point-of-sale e-receipts.'
    }
  },
  'product-ess': {
    path: '/products/ess',
    ar: {
      title: 'ESS | DTS',
      description: 'اشتراك ESS لإصدار الفواتير والإيصالات الإلكترونية وإرسالها إلى مصلحة الضرائب المصرية.'
    },
    en: {
      title: 'ESS | DTS',
      description: 'The ESS subscription for issuing e-invoices and e-receipts and sending them to the Egyptian Tax Authority.'
    }
  },
  'product-esa': {
    path: '/products/esa',
    ar: {
      title: 'ESA | DTS',
      description: 'ESA يوقّع ويختم ما يصدره ESS على جهازك قبل الإرسال.'
    },
    en: {
      title: 'ESA | DTS',
      description: 'ESA signs and seals what ESS issues, on your PC, before submit.'
    }
  },
  'product-ers': {
    path: '/products/ers',
    ar: {
      title: 'ERS | DTS',
      description: 'ERS لإدارة إيصالات نقاط البيع (الكاشير) الإلكترونية، من غير دورة فواتير.'
    },
    en: {
      title: 'ERS | DTS',
      description: 'ERS manages electronic cashier point-of-sale receipts, without an invoice cycle.'
    }
  },
  services: {
    path: '/services',
    ar: {
      title: 'الخدمات | DTS',
      description: 'خدمات الفوترة والإيصالات والتوقيع والختم الإلكتروني من DTS.'
    },
    en: {
      title: 'Services | DTS',
      description: 'DTS services for invoicing, receipts, and e-signature or e-seal.'
    }
  },
  'services-signature': {
    path: '/services/signature',
    ar: {
      title: 'التوقيع والختم الإلكتروني | DTS',
      description: 'اطلب التوقيع أو الختم الإلكتروني. يصل الطلب إلى صندوق التوقيع، والرد في أيام العمل.'
    },
    en: {
      title: 'E-signature and e-seal | DTS',
      description: 'Request an e-signature or e-seal. The request goes to the signature inbox, with replies on business days.'
    }
  },
  clients: {
    path: '/clients',
    ar: {
      title: 'العملاء | DTS',
      description: 'شركات تعمل مع DTS في اللوجستيات والصناعة والتعليم والتجارة.'
    },
    en: {
      title: 'Clients | DTS',
      description: 'Companies that work with DTS across logistics, industry, education, and retail.'
    }
  },
  partners: {
    path: '/partners',
    ar: {
      title: 'الشركاء | DTS',
      description: 'شركاء DTS في المحاسبة والضرائب والخدمات المرتبطة.'
    },
    en: {
      title: 'Partners | DTS',
      description: 'DTS partners in accounting, tax, and related services.'
    }
  },
  contact: {
    path: '/contact',
    ar: {
      title: 'تواصل معنا | DTS',
      description: 'راسل المبيعات على sales@dts-eg.com. العمل من الأحد إلى الخميس، 9:00 صباحًا إلى 5:00 مساءً.'
    },
    en: {
      title: 'Contact | DTS',
      description: 'Write to sales at sales@dts-eg.com. Business hours are Sunday–Thursday, 9:00 AM to 5:00 PM.'
    }
  },
  knowledge: {
    path: '/knowledge',
    ar: {
      title: 'مركز المعرفة | DTS',
      description: 'شروحات الفاتورة والإيصال الإلكتروني، التوقيع والختم، التوكن، وربط منتجات DTS بمنظومة الضرائب.'
    },
    en: {
      title: 'Knowledge center | DTS',
      description: 'Guides on e-invoices and e-receipts, e-signature and e-seal, the token, and how DTS products connect to the tax system.'
    }
  },
  'not-found': {
    path: '/404',
    ar: {
      title: 'الصفحة غير موجودة | DTS',
      description: 'هذه الصفحة غير موجودة على موقع DTS.'
    },
    en: {
      title: 'Page not found | DTS',
      description: 'This page does not exist on the DTS site.'
    }
  }
}

function langOf(locale) {
  return locale === 'en' ? 'en' : 'ar'
}

export function resolveSeo(locale, routeName, params = {}) {
  const lang = langOf(locale)
  let key = routeName
  if (routeName === 'product-detail' && params.key) key = `product-${params.key}`
  const page = pages[key]
  if (!page) return null
  return { path: page.path, ...page[lang] }
}

export function staticHtmlRoutes() {
  return Object.values(pages)
    .filter((page) => page.path !== '/404')
    .map((page) => ({
      path: page.path,
      title: page.ar.title,
      description: page.ar.description
    }))
}

export { pages }
