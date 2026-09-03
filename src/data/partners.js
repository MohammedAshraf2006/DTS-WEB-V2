/**
 * Partners catalog (identifiers, media, and website only).
 * Copy lives in locales/partners.json under items.{key}.
 */
export const PARTNER_KEYS = [
  'fedis',
  'tawqe3y',
  'mts',
  'khalil',
  'textWorld',
  'essamAbdelgawad',
  'gamalAbdelrazek',
  'ramiMinyaElQamh'
]

export const partnersCatalog = {
  fedis: {
    key: 'fedis',
    logo: '/images/partners/fedis.webp',
    url: 'https://fedis.com.eg/',
    tint: 'red'
  },
  tawqe3y: {
    key: 'tawqe3y',
    logo: '/images/partners/tawqe3y.webp',
    url: 'https://tawqe3y.com/',
    tint: 'signature'
  },
  mts: {
    key: 'mts',
    logo: '/images/partners/mts.webp',
    url: '',
    tint: 'navy'
  },
  khalil: {
    key: 'khalil',
    logo: '/images/partners/khalil.webp',
    url: '',
    tint: 'amber'
  },
  textWorld: {
    key: 'textWorld',
    logo: '/images/partners/text-world.webp',
    url: '',
    tint: 'navy'
  },
  essamAbdelgawad: {
    key: 'essamAbdelgawad',
    logo: '',
    url: '',
    tint: 'amber'
  },
  ramiMinyaElQamh: {
    key: 'ramiMinyaElQamh',
    logo: '',
    url: '',
    tint: 'navy'
  },
  gamalAbdelrazek: {
    key: 'gamalAbdelrazek',
    logo: '',
    url: '',
    tint: 'red'
  }
}

export function getPartnersList() {
  return PARTNER_KEYS.map((key) => partnersCatalog[key])
}
