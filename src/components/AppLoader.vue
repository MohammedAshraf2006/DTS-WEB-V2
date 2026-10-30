<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { isDark } = useTheme()
const isLoading = ref(false)
let hideTimer = null

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion || sessionStorage.getItem('dts-loader-seen')) {
    isLoading.value = false
    return
  }

  isLoading.value = true
  sessionStorage.setItem('dts-loader-seen', '1')
  hideTimer = window.setTimeout(() => {
    isLoading.value = false
  }, 300)
})

onUnmounted(() => {
  if (hideTimer) window.clearTimeout(hideTimer)
})
</script>

<template>
  <Transition name="app-loader-fade">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[99999] flex items-center justify-center bg-white dark:bg-surface"
      aria-busy="true"
      aria-live="polite"
    >
      <img
        src="/images/DTS.webp"
        alt="DTS"
        class="h-auto w-[180px] sm:w-[220px]"
        :class="isDark ? 'brightness-110' : ''"
      />
    </div>
  </Transition>
</template>

<style scoped>
.app-loader-fade-leave-active {
  transition: opacity 0.2s ease;
}

.app-loader-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .app-loader-fade-leave-active {
    transition-duration: 0.01ms;
  }
}
</style>
