import { ref } from 'vue'

const isDark = ref(localStorage.getItem('dts-theme') === 'dark')

function applyTheme() {
  document.documentElement.classList.toggle('dark', isDark.value)
}

// طبّق الوضع فورًا لحظة تحميل الملف (قبل أي render) عشان نتجنب "الفلاش"
applyTheme()

export function useTheme() {
  function toggleTheme() {
    isDark.value = !isDark.value
    localStorage.setItem('dts-theme', isDark.value ? 'dark' : 'light')
    applyTheme()
  }

  return { isDark, toggleTheme }
}
