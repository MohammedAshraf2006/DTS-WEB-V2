/**
 * Shared product catalog (identifiers + media only).
 * Drop files under public/, then set gallery src/poster.
 * Images: WebP (run `npm run optimize:images` after dropping PNG/JPG).
 * Videos: MP4 (H.264) under public/videos/{ess,ers,esa}/ — max ~720p, always set a WebP poster.
 * ESA Lite installer: productsCatalog.esa.liteDownloadUrl
 */
export const PRODUCT_KEYS = ['ess', 'ers', 'esa']

export const productsCatalog = {
  ess: {
    key: 'ess',
    logo: '/images/Products/ess-logo.webp',
    tint: 'ess',
    gallery: [
      { type: 'video', src: '/images/Products/media/ess/ESS.mp4', poster: '/images/Products/media/ess/ESS.webp' },
      { type: 'image', src: '/images/Products/media/ess/ess-light-ar.webp' },
      { type: 'image', src: '/images/Products/media/ess/ess-light-en.webp' },
      { type: 'image', src: '/images/Products/media/ess/ess-dark-ar.webp' },
      { type: 'image', src: '/images/Products/media/ess/ess-dark-en.webp' }
    ]
  },
  ers: {
    key: 'ers',
    logo: '/images/Products/ers-logo.webp',
    tint: 'ers',
    gallery: [
      { type: 'video', src: '/images/Products/media/ers/ERS.mp4', poster: '/images/Products/media/ers/ERS.webp' },
      { type: 'image', src: '/images/Products/media/ers/ers-light-ar.webp' },
      { type: 'image', src: '/images/Products/media/ers/ers-light-en.webp' },
      { type: 'image', src: '/images/Products/media/ers/ers-dark-ar.webp' },
      { type: 'image', src: '/images/Products/media/ers/ers-dark-en.webp' }
    ]
  },
  esa: {
    key: 'esa',
    logo: '/images/Products/esa-logo.webp',
    tint: 'esa',
    liteDownloadUrl:
      'https://github.com/Mohamedosama-dts/ESA-Lite/releases/download/v2.1.1/ESA_Lite_en.msi',
    gallery: [
      { type: 'video', src: '/images/Products/media/esa/ESA.mp4', poster: '/images/Products/media/esa/ESA.webp' },
      { type: 'image', src: '/images/Products/media/esa/esa-light-ar.webp' },
      { type: 'image', src: '/images/Products/media/esa/esa-light-en.webp' },
      { type: 'image', src: '/images/Products/media/esa/esa-dark-ar.webp' },
      { type: 'image', src: '/images/Products/media/esa/esa-dark-en.webp' }
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

/** Select appropriate image based on theme and language */
export function selectProductImage(product, isDark, locale) {
  if (!product?.gallery) return null
  
  // Try to find image matching theme and language
  const themeName = isDark ? 'dark' : 'light'
  const lang = locale === 'ar' ? 'ar' : 'en'
  const targetName = `${themeName}-${lang}`
  
  // Search for matching image pattern (e.g., "esa-light-ar", "esa-dark-en")
  const matchedImage = product.gallery.find(item => 
    item.type === 'image' && item.src.includes(targetName)
  )
  
  if (matchedImage) return matchedImage
  
  // Fallback to any image if exact match not found
  const fallbackImage = product.gallery.find(item => item.type === 'image')
  if (fallbackImage) return fallbackImage
  
  return null
}

/** Listing/home teaser: select appropriate image based on theme and language */
export function listingPreview(product, isDark = false, locale = 'en') {
  return selectProductImage(product, isDark, locale)
}

/** Get video for product pages */
export function productVideo(product) {
  if (!product?.video) return null
  return {
    type: 'video',
    src: product.video
  }
}
