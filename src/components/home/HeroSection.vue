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
  if (!heroBackground.value || prefersReducedMotion) return

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
            backgroundColor: 0x0a1424,
            color: 0x76b8ff,
            color2: 0xcfe7ff,
            alpha: 0.18
          }
        : {
            backgroundColor: 0xf8fafc,
            color: 0x1c6e8e,
            color2: 0x9ec7f9,
            alpha: 0.14
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

const toneClasses = {
  primary: { border: 'border-primary', bg: 'bg-primary', text: 'text-primary' },
  success: { border: 'border-success', bg: 'bg-success', text: 'text-success' },
  gold: { border: 'border-gold', bg: 'bg-gold', text: 'text-gold' },
  info: { border: 'border-info', bg: 'bg-info', text: 'text-info' },
  navy: { border: 'border-navy', bg: 'bg-navy', text: 'text-navy' },
  warning: { border: 'border-warning', bg: 'bg-warning', text: 'text-warning' }
}

// الكلمة الدايرة جوه العنوان — لون هادي شفاف (زي pill الموجودة في notion.com بالظبط)
// مبني على متغيرات الـ RGB الموجودة في colors.css نفسه، مفيش لون جديد اتضاف
const rotatingWords = [
  { key: 'invoice', rgb: 'var(--color-primary-rgb)' },
  { key: 'receipt', rgb: 'var(--color-success-rgb)' },
  { key: 'signature', rgb: 'var(--color-gold-rgb)' }
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
  <section class="relative overflow-hidden bg-surface pb-20 pt-40 lg:pb-28 lg:pt-48">
    <div ref="heroBackground" aria-hidden="true" class="pointer-events-none absolute inset-0 opacity-35"></div>
    <!-- خلفية متدرجة هادئة -->
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary-light/60 via-transparent to-transparent"></div>

    <div class="relative mx-auto max-w-4xl px-5 text-center lg:px-10">
      <!-- صف الأيقونات (بدل البادج النصي القديم) -->
      <div class="reveal flex items-center justify-center gap-2.5 sm:gap-3.5" style="transition-delay: .04s">
        <div
          v-for="(icon, i) in heroIcons"
          :key="icon.name"
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12"
          :class="i % 2 === 0
            ? ['border-2', 'bg-surface-alt', toneClasses[icon.tone].border, toneClasses[icon.tone].text]
            : [toneClasses[icon.tone].bg, 'text-text-onprimary']"
        >
          <AppIcon :name="icon.name" class="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </div>

      <!-- العنوان الرئيسي مع الكلمة المتغيّرة (نفس فكرة هيرو) -->
      <h1
        class="reveal mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-sans text-4xl font-extrabold leading-[1.1] tracking-tight text-text-base sm:text-5xl lg:text-6xl xl:text-7xl"
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
              :class="isEnglishLocale ? 'translate-y-1 sm:translate-y-1.3' : 'translate-y-1.5 sm:translate-y-2'"
              :style="{ backgroundColor: `rgb(${word.rgb} / 0.18)` }"
            ></span>
            <!-- النقطة والنص — فاضلة في مكانها الطبيعي -->
            <span class="relative z-10 h-2.5 w-2.5 shrink-0 rounded-full sm:h-3 sm:w-3" :style="{ backgroundColor: `rgb(${word.rgb})` }"></span>
            <span class="relative z-10">{{ t(`home.hero.rotatingWords.${word.key}`) }}</span>
          </span>
        </span>

        <span>{{ t('home.hero.titleSuffix') }}</span>
      </h1>

      <p
        class="reveal mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-muted"
        style="transition-delay: .16s"
      >
        {{ t('home.hero.subtitle') }}
      </p>

      <div class="reveal mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" style="transition-delay: .24s">
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

      <p class="reveal mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-text-subtle" style="transition-delay: .3s">
        <AppIcon name="shield" class="h-4 w-4 text-primary" />
        {{ t('home.hero.trustBadge') }}
      </p>
    </div>
  </section>
</template>
