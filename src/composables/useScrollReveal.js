import { onMounted, onBeforeUnmount } from 'vue'

/**
 * أنيميشن ظهور بسيط عند الـ scroll — بيضيف كلاس is-visible لأي عنصر
 * فيه كلاس "reveal" (شوف style.css) لما يدخل الشاشة، مع staggered delay
 * اختياري لو العناصر فيها data-reveal-delay.
 *
 * الاستخدام داخل أي component:
 *   import { useScrollReveal } from '@/composables/useScrollReveal'
 *   useScrollReveal()
 * وفي الـ template: class="reveal" style="transition-delay: .1s"
 */
export function useScrollReveal(rootSelector = null) {
  let observer

  onMounted(() => {
    const root = rootSelector ? document.querySelector(rootSelector) : document
    const els = root ? root.querySelectorAll('.reveal') : []

    if (!('IntersectionObserver' in window) || els.length === 0) {
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
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )

    els.forEach((el) => observer.observe(el))
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })
}
