<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()
const isEnglishLocale = computed(() => locale.value === 'en')
const splitOpen = ref(false)

function onSplitFocusOut(event) {
  if (!event.currentTarget.contains(event.relatedTarget)) splitOpen.value = false
}

function onSplitHalfClick(event) {
  if (splitOpen.value) return
  if (window.matchMedia('(hover: none)').matches) {
    event.preventDefault()
    splitOpen.value = true
  }
}

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
  { src: '/images/Products/ers-logo.webp', key: 'ers', to: '/products/ers/', className: 'sm:-translate-y-1' },
  { src: '/images/Products/esa-logo.webp', key: 'esa', to: '/products/esa/', className: 'translate-y-2 sm:translate-y-3' },
  { src: '/images/Products/ess-logo.webp', key: 'ess', to: '/products/ess/', className: '-translate-y-1 sm:-translate-y-2' }
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
  { key: 'invoice', rgb: '27 115 159', to: '/products/ess/' },
  { key: 'receipt', rgb: '22 163 74', to: '/products/ers/' },
  { key: 'signature', rgb: '224 184 77', to: '/products/esa/' }
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
        <RouterLink
          v-for="(card, index) in floatingProductCards"
          :key="card.key"
          :to="card.to"
          class="logo-well floating-card flex h-10 w-16 items-center justify-center rounded-2xl border border-border/60 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary sm:h-12 sm:w-20"
          :class="card.className"
          :style="{ animationDelay: `${index * 220}ms` }"
          :aria-label="t(`common.products.${card.key}.name`)"
        >
          <img :src="card.src" :alt="t(`common.products.${card.key}.name`)" class="h-6 w-auto object-contain sm:h-7" />
        </RouterLink>
      </div>

      <!-- العنوان الرئيسي مع الكلمة المتغيّرة (نفس فكرة هيرو) -->
      <h1
        class="reveal mt-9 flex flex-wrap items-center justify-center gap-x-3 gap-y-4 font-sans text-[1.7rem] font-extrabold leading-[1.3] tracking-tight text-text-base sm:mt-11 sm:gap-y-6 sm:text-5xl lg:text-6xl xl:text-7xl"
        style="transition-delay: .08s"
      >
        <span>{{ t('home.hero.titlePrefix') }}</span>

        <!-- الكلمات التلاتة مكدّسة فوق بعض في نفس المكان (CSS grid stacking).
             طبقة الخلفية مفصولة عن طبقة النص (absolute + translate) عشان نقدر ننزل الخلفية لوحدها
             من غير ما نحرّك الكلام (النقطة + النص) اللي فاضل ثابت في مكانه الطبيعي -->
        <span class="relative inline-grid place-items-center">
          <RouterLink
            v-for="(word, i) in rotatingWords"
            :key="word.key"
            :to="word.to"
            class="relative col-start-1 row-start-1 inline-flex max-w-[min(100%,18rem)] items-center gap-2 whitespace-normal rounded-full px-3 py-2 text-center leading-none text-text-base transition-opacity duration-500 ease-out hover:brightness-110 sm:max-w-none sm:whitespace-nowrap sm:px-5 sm:py-2.5"
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
          </RouterLink>
        </span>

        <span>{{ t('home.hero.titleSuffix') }}</span>
      </h1>

      <p
        class="reveal mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-text-muted sm:mt-10"
        style="transition-delay: .16s"
      >
        {{ t('home.hero.subtitle') }}
      </p>

      <div
        class="reveal mx-auto mt-8 flex w-full max-w-xl flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
        style="transition-delay: .24s"
      >
        <RouterLink
          to="/contact/"
          class="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-text-onprimary shadow-[0_0_10px_rgba(35,184,193,0.32)] transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_0_14px_rgba(35,184,193,0.45)]"
        >
          {{ t('common.buttons.contactUs') }}
        </RouterLink>
        <div
          class="split-cta"
          :class="{ 'is-open': splitOpen }"
          @mouseenter="splitOpen = true"
          @mouseleave="splitOpen = false"
          @focusin="splitOpen = true"
          @focusout="onSplitFocusOut"
        >
          <div class="split-cta__shell">
            <RouterLink
              to="/knowledge/"
              class="split-cta__half"
              @click="onSplitHalfClick"
            >
              {{ t('common.buttons.latestArticles') }}
            </RouterLink>
            <RouterLink
              to="/products/"
              class="split-cta__half split-cta__half--extra"
              :tabindex="splitOpen ? 0 : -1"
              @click="onSplitHalfClick"
            >
              {{ t('common.buttons.discoverProducts') }}
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.split-cta__shell {
  display: flex;
  align-items: stretch;
  overflow: visible;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface-alt);
  box-shadow: 0 0 10px rgba(35, 184, 193, 0.32);
  transition: transform 0.35s ease, gap 0.35s ease, padding 0.35s ease, box-shadow 0.35s ease, background-color 0.35s ease, border-color 0.35s ease;
}

.split-cta__half {
  display: inline-flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  padding: 0.875rem 1.75rem;
  font-size: 0.875rem;
  font-weight: 700;
  border-radius: 999px;
  transition: color 0.25s ease, background-color 0.35s ease, box-shadow 0.35s ease, max-width 0.4s ease, opacity 0.3s ease, padding 0.4s ease;
}

.split-cta__half--extra {
  flex: 0 0 auto;
  max-width: 0;
  overflow: hidden;
  padding-inline: 0;
  opacity: 0;
  color: var(--color-text-on-primary);
  background: transparent;
  pointer-events: none;
}

.split-cta.is-open .split-cta__shell,
.split-cta:hover .split-cta__shell {
  box-shadow: 0 0 14px rgba(35, 184, 193, 0.45);
}

.split-cta.is-open .split-cta__shell {
  gap: 0.4rem;
  padding: 0.25rem;
  transform: scale(1.06);
}

.split-cta.is-open .split-cta__half--extra {
  max-width: 22rem;
  padding-inline: 1.35rem;
  opacity: 1;
  background: var(--color-primary);
  pointer-events: auto;
}

.split-cta:hover .split-cta__half:first-child {
  color: var(--color-primary);
}

.split-cta.is-open .split-cta__half--extra:hover {
  background: var(--color-primary-hover);
}

@media (prefers-reduced-motion: reduce) {
  .split-cta__shell,
  .split-cta__half {
    transition: none;
  }

  .split-cta.is-open .split-cta__shell {
    transform: none;
  }
}
</style>
