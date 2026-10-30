import { onMounted, onBeforeUnmount } from 'vue'

export function useScrollReveal(rootSelector = null) {
  let observer

  onMounted(() => {
    const root = rootSelector ? document.querySelector(rootSelector) : document
    const els = root ? root.querySelectorAll('.reveal') : []

    if (!els.length) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    els.forEach((el) => observer.observe(el))
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
}
