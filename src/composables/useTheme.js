import { ref } from 'vue'
import { runViewTransition } from '@/composables/runViewTransition'

const isDark = ref(localStorage.getItem('dts-theme') === 'dark')

function applyTheme() {
  document.documentElement.classList.toggle('dark', isDark.value)
}

// طبّق الوضع فورًا لحظة تحميل الملف (قبل أي render) عشان نتجنب "الفلاش"
applyTheme()

export function useTheme() {
  async function toggleTheme() {
    await runViewTransition(() => {
      isDark.value = !isDark.value
      localStorage.setItem('dts-theme', isDark.value ? 'dark' : 'light')
      applyTheme()
    }, 'theme')
  }

  return { isDark, toggleTheme }
}
