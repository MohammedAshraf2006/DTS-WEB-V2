import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * بيرجع ref بولياني بيبقى true لما المستخدم يعمل scroll لتحت أكتر من
 * threshold — يُستخدم في AppHeader.vue عشان الخلفية تتغير زي Zapier
 * (شفاف في الأول، ياخد background + blur عند الـ scroll).
 */
export function useScrolledHeader(threshold = 24) {
  const isScrolled = ref(false)

  const onScroll = () => {
    isScrolled.value = window.scrollY > threshold
  }

  onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return { isScrolled }
}
