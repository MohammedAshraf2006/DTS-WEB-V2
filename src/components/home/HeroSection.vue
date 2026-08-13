<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/icons/AppIcon.vue'

const { t } = useI18n()
const globeRef = ref(null)
let globeInstance = null

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${src}"]`)

    if (existingScript) {
      if (existingScript.dataset.loaded === 'true') {
        resolve()
        return
      }

      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(new Error(`Failed to load ${src}`)), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => {
      script.dataset.loaded = 'true'
      resolve()
    }
    script.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(script)
  })

const initGlobe = async () => {
  if (!globeRef.value) return

  try {
    if (!window.THREE) {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js')
    }

    if (!window.VANTA?.GLOBE) {
      await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js')
    }

    if (!window.VANTA?.GLOBE) return

    if (globeInstance) {
      globeInstance.destroy()
    }

    globeInstance = window.VANTA.GLOBE({
      el: globeRef.value,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1,
      scaleMobile: 1,
      size: 0.8,
      color: '#1c6e8e',
      color2: '#8ad7ff',
      backgroundColor: 'rgba(0,0,0,0)',
      points: 12,
      maxDistance: 18,
      spacing: 18,
      showDots: true,
      alpha: 0.95,
      backgroundAlpha: 0
    })
  } catch (error) {
    console.warn('Vanta Globe failed to initialize:', error)
  }
}

onMounted(() => {
  initGlobe()
})

onBeforeUnmount(() => {
  if (globeInstance) {
    globeInstance.destroy()
  }
})
</script>

<template>
  <section class="relative overflow-hidden bg-surface pb-20 pt-40 lg:pb-28 lg:pt-48">
    <!-- خلفية متدرجة هادئة -->
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary-light/60 via-transparent to-transparent"></div>

    <div class="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 lg:grid-cols-2 lg:gap-10 lg:px-10">
      <!-- النص -->
      <div class="text-center lg:text-start">
        <span
          class="reveal inline-flex items-center gap-2 rounded-full border border-border bg-surface-alt px-4 py-1.5 text-xs font-bold text-primary shadow-sm"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow"></span>
          {{ t('home.hero.badge') }}
        </span>

        <h1
          class="reveal mt-6 font-heading text-4xl font-extrabold leading-tight text-text-base sm:text-5xl lg:text-[3.25rem]"
          style="transition-delay: .08s"
        >
          {{ t('home.hero.title') }}
        </h1>

        <p
          class="reveal mx-auto mt-5 max-w-xl text-lg leading-relaxed text-text-muted lg:mx-0"
          style="transition-delay: .16s"
        >
          {{ t('home.hero.subtitle') }}
        </p>

        <div class="reveal mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start" style="transition-delay: .24s">
          <RouterLink
            to="/#contact"
            class="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-text-onprimary shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg"
          >
            {{ t('home.hero.ctaPrimary') }}
            <AppIcon name="arrowLeft" class="h-4 w-4 rtl:block ltr:hidden" />
            <AppIcon name="arrowRight" class="h-4 w-4 ltr:block rtl:hidden" />
          </RouterLink>
          <RouterLink
            to="/#products"
            class="inline-flex items-center gap-2 rounded-full border border-border bg-surface-alt px-7 py-3.5 text-sm font-bold text-text-base transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
          >
            {{ t('home.hero.ctaSecondary') }}
          </RouterLink>
        </div>

        <p class="reveal mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-text-subtle lg:justify-start" style="transition-delay: .3s">
          <AppIcon name="shield" class="h-4 w-4 text-primary" />
          {{ t('home.hero.trustBadge') }}
        </p>
      </div>

      <!-- الرسمة/الأنيميشن الحي -->
      <div class="reveal relative mx-auto h-[22rem] w-[22rem] sm:h-[28rem] sm:w-[28rem]" style="transition-delay: .2s">
        <div class="absolute inset-6 rounded-full bg-primary/10 blur-3xl animate-pulse-glow"></div>

        <div
          ref="globeRef"
          class="absolute inset-0 overflow-hidden rounded-full border border-primary/15 bg-surface-alt/30 shadow-[0_20px_80px_rgba(28,110,142,0.18)] ring-1 ring-primary/10"
        >
          <div class="absolute inset-[18%] z-20 flex items-center justify-center rounded-full border border-primary/10 bg-surface-alt/5 backdrop-blur-[1px]">
            <img src="/images/DTS.png" alt="DTS" class="h-16 w-auto sm:h-20" />
          </div>
        </div>

        <div
          class="absolute -start-2 top-6 z-30 flex items-center justify-center rounded-2xl border border-border/70 bg-transparent px-4 py-3 shadow-lg shadow-primary/5 backdrop-blur-sm animate-float-slow sm:-start-6"
        >
          <img src="/images/Products/ess-logo.png" alt="ESS" class="h-8 w-auto object-contain" />
        </div>

        <div
          class="absolute bottom-8 -end-2 z-30 flex items-center justify-center rounded-2xl border border-border/70 bg-transparent px-4 py-3 shadow-lg shadow-primary/5 backdrop-blur-sm animate-float-slower sm:-end-8"
        >
          <img src="/images/Products/esa-logo.png" alt="ESA" class="h-8 w-auto object-contain" />
        </div>

        <div
          class="absolute -bottom-2 start-10 z-30 flex items-center justify-center rounded-2xl border border-border/70 bg-transparent px-3 py-2.5 shadow-lg shadow-primary/5 backdrop-blur-sm animate-float-slow"
          style="animation-delay: 1.2s"
        >
          <img src="/images/Products/ers-logo.png" alt="ERS" class="h-7 w-auto object-contain" />
        </div>
      </div>
    </div>
  </section>
</template>
