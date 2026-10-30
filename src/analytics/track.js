const DEFAULT_GA4 = 'G-EY2GF14XJ0'
const DEFAULT_PIXEL = '1763152844965514'

const gaId = () => import.meta.env.VITE_GA4_MEASUREMENT_ID || DEFAULT_GA4
const pixelId = () => import.meta.env.VITE_META_PIXEL_ID || DEFAULT_PIXEL
const gtmId = () => import.meta.env.VITE_GTM_ID || ''
const gsc = () => import.meta.env.VITE_GSC_VERIFICATION || ''

function gaDebug() {
  return typeof window !== 'undefined' && /(?:^|[?&])ga_debug=1(?:&|$)/.test(window.location.search)
}

function dataLayerPush(payload) {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
}

function injectScript(src, attrs = {}) {
  if (document.querySelector(`script[src="${src}"]`)) return
  const el = document.createElement('script')
  el.src = src
  el.async = true
  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, value)
  })
  document.head.appendChild(el)
}

function injectNoscript(id, html) {
  if (document.getElementById(id) || !document.body) return
  const el = document.createElement('noscript')
  el.id = id
  el.innerHTML = html
  document.body.prepend(el)
}

export function initAnalytics() {
  const verification = gsc()
  if (verification && !document.querySelector('meta[name="google-site-verification"]')) {
    const meta = document.createElement('meta')
    meta.setAttribute('name', 'google-site-verification')
    meta.setAttribute('content', verification)
    document.head.appendChild(meta)
  }

  const gtm = gtmId()
  if (gtm && !document.getElementById('gtm-script')) {
    dataLayerPush({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
    injectScript(`https://www.googletagmanager.com/gtm.js?id=${gtm}`, { id: 'gtm-script' })
    injectNoscript(
      'gtm-noscript',
      `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtm}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
    )
  }

  const measurement = gaId()
  if (!gtm && measurement && !window.gtag) {
    injectScript(`https://www.googletagmanager.com/gtag/js?id=${measurement}`)
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', measurement, {
      send_page_view: false,
      debug_mode: gaDebug()
    })
  }

  const pixel = pixelId()
  if (!gtm && pixel && !window.fbq) {
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = true
      n.version = '2.0'
      n.queue = []
      t = b.createElement(e)
      t.async = true
      t.src = v
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
    /* eslint-enable */
    window.fbq('init', pixel)
    injectNoscript(
      'fb-pixel-noscript',
      `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixel}&ev=PageView&noscript=1" alt="" />`
    )
  }
}

export function trackPageView(path) {
  const page_location = window.location.href
  const page_title = document.title
  dataLayerPush({ event: 'page_view', page_path: path, page_location, page_title })
  const measurement = gaId()
  if (measurement && window.gtag) {
    window.gtag('config', measurement, {
      page_path: path,
      page_location,
      page_title,
      debug_mode: gaDebug()
    })
  }
  if (pixelId() && window.fbq) {
    window.fbq('track', 'PageView')
  }
}

export function trackEvent(name, params = {}) {
  dataLayerPush({ event: name, ...params })
  const measurement = gaId()
  if (measurement && window.gtag) {
    window.gtag('event', name, params)
  }
  if (pixelId() && window.fbq) {
    if (name === 'generate_lead' || name === 'signature_lead') {
      window.fbq('track', 'Lead', params)
    } else if (name === 'click_whatsapp' || name === 'click_call') {
      window.fbq('track', 'Contact', params)
    } else if (name === 'article_view_3008') {
      window.fbq('track', 'ViewContent', params)
    }
    if (name === 'file_download_3008') {
      window.fbq('trackCustom', 'DownloadFix', params)
    }
  }
}
