<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/icons/AppIcon.vue'

const { t, locale } = useI18n()
const isEnglishLocale = computed(() => locale.value === 'en')

const heroBackground = ref(null)
let vantaEffect = null
let themeObserver = null

const loadScript = (src, key) => {
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[data-vanta-key="${key}"]`)

    if (existingScript) {
      if (existingScript.dataset.loaded === 'true') {
        resolve()
        return
      }

      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(new Error(`Failed to load ${key}`)), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.dataset.vantaKey = key
    script.addEventListener('load', () => {
      script.dataset.loaded = 'true'
      resolve()
    }, { once: true })
    script.addEventListener('error', () => reject(new Error(`Failed to load ${key}`)), { once: true })
    document.head.appendChild(script)
  })
}

const initHeroBackground = async () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const saveData = Boolean(navigator.connection?.saveData)
  if (!heroBackground.value || prefersReducedMotion || saveData) return

  try {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js', 'three-r134')
    await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js', 'vanta-globe')

    if (window.VANTA && window.VANTA.GLOBE && heroBackground.value) {
      if (vantaEffect) {
        vantaEffect.destroy()
      }

      const isDark = document.documentElement.classList.contains('dark')
      const themeColors = isDark
        ? {
            backgroundColor: 0x050a18,
            color: 0x00e8f0,
            color2: 0x2de2ed,
            alpha: 0.22
          }
        : {
            backgroundColor: 0xffffff,
            color: 0x1b739f,
            color2: 0x23b8c1,
            alpha: 0.12
          }

      vantaEffect = window.VANTA.GLOBE({
        el: heroBackground.value,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: themeColors.color,
        color2: themeColors.color2,
        backgroundColor: themeColors.backgroundColor,
        size: 0.7,
        alpha: 0.35,
        backgroundAlpha: 0
      })
    }
  } catch (error) {
    console.warn('Hero background failed to initialize:', error)
  }
}

// أيقونات دائرية فوق العنوان (بروح صف الأيقونات في هيرو notion.com)
// لكن كل أيقونة ليها علاقة مباشرة بمنتجاتنا: فاتورة / إيصال / توقيع / أمان / سحابة / تكامل / نقاط بيع
const heroIcons = [
  { name: 'invoice', tone: 'primary' },
  { name: 'clipboard', tone: 'success' },
  { name: 'signature', tone: 'gold' },
  { name: 'shield', tone: 'info' },
  { name: 'cloud', tone: 'navy' },
  { name: 'link', tone: 'warning' },
  { name: 'pos', tone: 'primary' }
]

const floatingProductCards = [
  { src: '/images/Products/ers-logo.webp', alt: 'ERS', className: 'sm:-translate-y-1' },
  { src: '/images/Products/esa-logo.webp', alt: 'ESA', className: 'translate-y-2 sm:translate-y-3' },
  { src: '/images/Products/ess-logo.webp', alt: 'ESS', className: '-translate-y-1 sm:-translate-y-2' }
]

const toneClasses = {
  primary: { border: 'border-primary', bg: 'bg-primary', text: 'text-primary' },
  success: { border: 'border-success', bg: 'bg-success', text: 'text-success' },
  gold: { border: 'border-gold', bg: 'bg-gold', text: 'text-gold' },
  info: { border: 'border-info', bg: 'bg-info', text: 'text-info' },
  navy: { border: 'border-navy', bg: 'bg-navy', text: 'text-navy' },
  warning: { border: 'border-warning', bg: 'bg-warning', text: 'text-warning' }
}

// Rotating hero pills — brand core hues (readable in light + dark)
const rotatingWords = [
  { key: 'invoice', rgb: '27 115 159' }, // Blue #1B739F
  { key: 'receipt', rgb: '22 163 74' }, // Green #16A34A
  { key: 'signature', rgb: '224 184 77' } // Gold #E0B84D
]

const activeIndex = ref(0)
let rotationTimer = null

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!prefersReducedMotion) {
    rotationTimer = setInterval(() => {
      activeIndex.value = (activeIndex.value + 1) % rotatingWords.length
    }, 2400)
  }

  initHeroBackground()

  themeObserver = new MutationObserver(() => {
    initHeroBackground()
  })

  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})

onBeforeUnmount(() => {
  if (rotationTimer) clearInterval(rotationTimer)

  if (themeObserver) {
    themeObserver.disconnect()
    themeObserver = null
  }

  if (vantaEffect) {
    vantaEffect.destroy()
    vantaEffect = null
  }
})
</script>

<template>
  <section class="relative isolate overflow-hidden bg-white pb-12 pt-28 dark:bg-surface lg:pb-16 lg:pt-36">
    <!-- Vanta globe — stays inside hero only -->
    <div ref="heroBackground" aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-35 dark:opacity-45"></div>
    <div
      class="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary-light/20 via-white/50 to-white dark:from-surface/90 dark:via-transparent dark:to-surface"
    ></div>

    <div class="relative mx-auto max-w-4xl px-5 text-center lg:px-10">
      <div class="reveal mt-0 flex items-center justify-center gap-3 sm:gap-4" style="transition-delay: .04s">
        <div
          v-for="(card, index) in floatingProductCards"
          :key="card.alt"
          class="logo-well floating-card flex h-10 w-16 items-center justify-center rounded-2xl border border-border/60 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:h-12 sm:w-20"
          :class="card.className"
          :style="{ animationDelay: `${index * 220}ms` }"
        >
          <img :src="card.src" :alt="card.alt" class="h-6 w-auto object-contain sm:h-7" />
        </div>
      </div>

      <!-- العنوان الرئيسي مع الكلمة المتغيّرة (نفس فكرة هيرو) -->
      <h1
        class="reveal mt-9 flex flex-wrap items-center justify-center gap-x-3 gap-y-5 font-sans text-4xl font-extrabold leading-[1.25] tracking-tight text-text-base sm:mt-11 sm:gap-y-6 sm:text-5xl lg:text-6xl xl:text-7xl"
        style="transition-delay: .08s"
      >
        <span>{{ t('home.hero.titlePrefix') }}</span>

        <!-- الكلمات التلاتة مكدّسة فوق بعض في نفس المكان (CSS grid stacking).
             طبقة الخلفية مفصولة عن طبقة النص (absolute + translate) عشان نقدر ننزل الخلفية لوحدها
             من غير ما نحرّك الكلام (النقطة + النص) اللي فاضل ثابت في مكانه الطبيعي -->
        <span class="relative inline-grid place-items-center">
          <span
            v-for="(word, i) in rotatingWords"
            :key="word.key"
            class="relative col-start-1 row-start-1 inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 leading-none text-text-base transition-opacity duration-500 ease-out sm:px-5 sm:py-2.5"
            :class="i === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'"
          >
            <!-- طبقة الخلفية بس — هي اللي بتنزل شوية لتحت -->
            <span
              class="absolute inset-0 rounded-full shadow-sm ring-1 ring-black/5"
              :class="isEnglishLocale ? 'translate-y-1 sm:translate-y-1.3' : 'translate-y-1.5 sm:translate-y-2.1'"
              :style="{ backgroundColor: `rgb(${word.rgb} / 0.2)` }"
            ></span>
            <!-- النقطة والنص — فاضلة في مكانها الطبيعي -->
            <span class="relative z-10 h-2.5 w-2.5 shrink-0 rounded-full sm:h-3 sm:w-3" :style="{ backgroundColor: `rgb(${word.rgb})` }"></span>
            <span class="relative z-10">{{ t(`home.hero.rotatingWords.${word.key}`) }}</span>
          </span>
        </span>

        <span>{{ t('home.hero.titleSuffix') }}</span>
      </h1>

      <p
        class="reveal mx-auto mt-12 max-w-2xl text-lg leading-relaxed text-text-muted sm:mt-14"
        style="transition-delay: .16s"
      >
        {{ t('home.hero.subtitle') }}
      </p>

      <div class="reveal mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" style="transition-delay: .24s">
        <RouterLink
          to="/services/signature"
          class="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-text-onprimary shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg"
        >
          {{ t('home.hero.ctaPrimary') }}
          <AppIcon name="arrowLeft" class="h-4 w-4 rtl:block ltr:hidden" />
          <AppIcon name="arrowRight" class="h-4 w-4 ltr:block rtl:hidden" />
        </RouterLink>
        <RouterLink
          to="/products"
          class="inline-flex items-center gap-2 rounded-full border border-border bg-surface-alt px-7 py-3.5 text-sm font-bold text-text-base transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary"
        >
          {{ t('home.hero.ctaSecondary') }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>
