<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { isDark } = useTheme()
const isLoading = ref(true)
let hideTimer = null

onMounted(() => {
  hideTimer = window.setTimeout(() => {
    isLoading.value = false
  }, 1000)
})

onUnmounted(() => {
  if (hideTimer) window.clearTimeout(hideTimer)
})
</script>

<template>
  <Transition name="app-loader-fade">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[99999] flex items-center justify-center bg-white dark:bg-[#050d1e]"
      aria-busy="true"
      aria-live="polite"
    >
      <img
        src="/images/DTS.png"
        alt="DTS"
        class="app-loader-logo h-auto w-[220px] sm:w-[280px]"
        :class="isDark ? 'brightness-110' : ''"
      />
    </div>
  </Transition>
</template>

<style scoped>
.app-loader-logo {
  animation: app-loader-pulse 1.5s ease-in-out infinite;
}

.app-loader-fade-leave-active {
  transition: opacity 0.5s ease;
}

.app-loader-fade-leave-to {
  opacity: 0;
}

@keyframes app-loader-pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

@media (prefers-reduced-motion: reduce) {
  .app-loader-logo {
    animation: none;
  }

  .app-loader-fade-leave-active {
    transition-duration: 0.01ms;
  }
}
</style>
