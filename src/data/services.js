/**
 * Shared services catalog (identifiers + media only).
 * Copy lives in locales/services.json under items.{key}.
 */
export const SERVICE_KEYS = [
  'signature',
  'einvoicing',
  'erp',
  'consulting',
  'integration',
  'projectManagement',
  'training',
  'support'
]

export const servicesCatalog = {
  einvoicing: {
    key: 'einvoicing',
    icon: '/images/services/einvoicing.svg',
    href: '/contact/?service=einvoicing'
  },
  erp: {
    key: 'erp',
    icon: '/images/services/erp.svg',
    href: '/contact/?service=erp'
  },
  signature: {
    key: 'signature',
    icon: '/images/services/signature-token.webp',
    href: '/services/signature/',
    featured: true
  },
  consulting: {
    key: 'consulting',
    icon: '/images/services/consulting.svg',
    href: '/contact/?service=consulting'
  },
  integration: {
    key: 'integration',
    icon: '/images/services/integration.svg',
    href: '/contact/?service=integration'
  },
  projectManagement: {
    key: 'projectManagement',
    icon: '/images/services/project-management.svg',
    href: '/contact/?service=projectManagement'
  },
  training: {
    key: 'training',
    icon: '/images/services/training.svg',
    href: '/contact/?service=training'
  },
  support: {
    key: 'support',
    icon: '/images/services/support.svg',
    href: '/contact/?service=support'
  }
}

export function getServiceAnchorId(key) {
  return `service-${key}`
}

export function getServiceMenuHref(service) {
  if (service.key === 'signature') return service.href
  return `/services/#${getServiceAnchorId(service.key)}`
}

export function isServiceKey(key) {
  return SERVICE_KEYS.includes(key)
}

export function getService(key) {
  return servicesCatalog[key] || null
}

export function getServicesList() {
  return SERVICE_KEYS.map((key) => servicesCatalog[key])
}
