/**
 * Shared product catalog (identifiers + media only).
 * Drop files under public/, then set gallery src/poster.
 * ESA Lite: set liteDownloadUrl when the installer URL is ready.
 */
export const PRODUCT_KEYS = ['ess', 'ers', 'esa']

export const productsCatalog = {
  ess: {
    key: 'ess',
    logo: '/images/Products/ess-logo.png',
    tint: 'ess',
    gallery: [
      { type: 'video', src: '', poster: '' },
      { type: 'image', src: '' }
    ]
  },
  ers: {
    key: 'ers',
    logo: '/images/Products/ers-logo.png',
    tint: 'ers',
    gallery: [
      { type: 'video', src: '', poster: '' },
      { type: 'image', src: '' }
    ]
  },
  esa: {
    key: 'esa',
    logo: '/images/Products/esa-logo.png',
    tint: 'esa',
    liteDownloadUrl: '',
    gallery: [
      { type: 'video', src: '', poster: '' },
      { type: 'image', src: '' }
    ]
  }
}

export function isProductKey(key) {
  return PRODUCT_KEYS.includes(key)
}

export function getProduct(key) {
  return productsCatalog[key] || null
}

export function hasMediaSrc(item) {
  return typeof item?.src === 'string' && item.src.trim().length > 0
}

export function galleryWithSrc(product) {
  return (product?.gallery || []).filter(hasMediaSrc)
}

export function firstMedia(product) {
  const items = galleryWithSrc(product)
  return items.find((item) => item.type === 'video') || items[0] || null
}
