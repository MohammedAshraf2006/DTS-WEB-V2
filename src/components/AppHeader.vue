<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrolledHeader } from '@/composables/useScrolledHeader'
import { useTheme } from '@/composables/useTheme'
import AppIcon from '@/components/icons/AppIcon.vue'

const { t, locale } = useI18n()
const { isScrolled } = useScrolledHeader()
const { isDark, toggleTheme } = useTheme()

const isProductsOpen = ref(false)
const isMobileOpen = ref(false)

const productKeys = ['ess', 'ers', 'esa']

function toggleLocale() {
  locale.value = locale.value === 'ar' ? 'en' : 'ar'
}

function closeMobile() {
  isMobileOpen.value = false
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="isScrolled || isMobileOpen
      ? 'bg-surface-alt/90 backdrop-blur-md border-b border-border shadow-sm'
      : 'bg-transparent border-b border-transparent'"
  >
    <nav class="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-5 lg:px-10">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 shrink-0" @click="closeMobile">
        <img src="/images/DTS.png" alt="DTS" class="h-9 w-auto" />
      </RouterLink>

      <!-- Desktop nav -->
      <ul class="hidden items-center gap-1 lg:flex">
        <li>
          <RouterLink
            to="/"
            class="rounded-full px-4 py-2 text-sm font-semibold text-text-muted transition-colors hover:bg-primary-light hover:text-primary"
          >
            {{ t('common.nav.home') }}
          </RouterLink>
        </li>

        <!-- Products mega dropdown -->
        <li
          class="relative"
          @mouseenter="isProductsOpen = true"
          @mouseleave="isProductsOpen = false"
        >
          <button
            class="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-text-muted transition-colors hover:bg-primary-light hover:text-primary"
            :aria-expanded="isProductsOpen"
          >
            {{ t('common.nav.products') }}
            <AppIcon
              name="chevronDown"
              class="h-4 w-4 transition-transform"
              :style="{ transform: isProductsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }"
            />
          </button>

          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div
              v-if="isProductsOpen"
              class="absolute start-0 top-full w-80 rounded-2xl border border-border bg-surface-alt p-3 shadow-xl"
            >
              <RouterLink
                v-for="key in productKeys"
                :key="key"
                to="/#products"
                class="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-primary-light"
              >
                <span class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                  <AppIcon :name="key === 'ess' ? 'cloud' : key === 'ers' ? 'pos' : 'signature'" class="h-5 w-5" />
                </span>
                <span>
                  <span class="block text-sm font-bold text-text-base">{{ t(`common.products.${key}.name`) }}</span>
                  <span class="block text-xs text-text-subtle">{{ t(`common.products.${key}.tagline`) }}</span>
                </span>
              </RouterLink>
            </div>
          </Transition>
        </li>

        <li>
          <RouterLink
            to="/#services"
            class="rounded-full px-4 py-2 text-sm font-semibold text-text-muted transition-colors hover:bg-primary-light hover:text-primary"
          >
            {{ t('common.nav.services') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/#about"
            class="rounded-full px-4 py-2 text-sm font-semibold text-text-muted transition-colors hover:bg-primary-light hover:text-primary"
          >
            {{ t('common.nav.about') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/#partners"
            class="rounded-full px-4 py-2 text-sm font-semibold text-text-muted transition-colors hover:bg-primary-light hover:text-primary"
          >
            {{ t('common.nav.partners') }}
          </RouterLink>
        </li>
      </ul>

      <!-- Right actions -->
      <div class="hidden items-center gap-2 lg:flex">
        <button
          class="flex h-9 w-9 items-center justify-center rounded-full text-text-subtle transition-colors hover:bg-primary-light hover:text-primary"
          :aria-label="isDark ? 'Light mode' : 'Dark mode'"
          @click="toggleTheme"
        >
          <AppIcon :name="isDark ? 'sun' : 'moon'" class="h-5 w-5" />
        </button>
        <button
          class="h-9 rounded-full px-3 text-sm font-semibold text-text-subtle transition-colors hover:bg-primary-light hover:text-primary"
          @click="toggleLocale"
        >
          {{ locale === 'ar' ? 'EN' : 'AR' }}
        </button>
        <RouterLink
          to="/#contact"
          class="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-text-onprimary shadow-sm transition-all hover:bg-primary-hover hover:shadow-md"
        >
          {{ t('common.nav.cta') }}
        </RouterLink>
      </div>

      <!-- Mobile toggle -->
      <button
        class="flex h-10 w-10 items-center justify-center rounded-lg text-text-base lg:hidden"
        @click="isMobileOpen = !isMobileOpen"
      >
        <AppIcon :name="isMobileOpen ? 'close' : 'menu'" class="h-6 w-6" />
      </button>
    </nav>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div v-if="isMobileOpen" class="border-t border-border bg-surface-alt px-5 py-4 lg:hidden">
        <ul class="flex flex-col gap-1">
          <li><RouterLink class="block rounded-lg px-3 py-2.5 text-sm font-semibold text-text-base" to="/" @click="closeMobile">{{ t('common.nav.home') }}</RouterLink></li>
          <li><RouterLink class="block rounded-lg px-3 py-2.5 text-sm font-semibold text-text-base" to="/#products" @click="closeMobile">{{ t('common.nav.products') }}</RouterLink></li>
          <li><RouterLink class="block rounded-lg px-3 py-2.5 text-sm font-semibold text-text-base" to="/#services" @click="closeMobile">{{ t('common.nav.services') }}</RouterLink></li>
          <li><RouterLink class="block rounded-lg px-3 py-2.5 text-sm font-semibold text-text-base" to="/#about" @click="closeMobile">{{ t('common.nav.about') }}</RouterLink></li>
          <li><RouterLink class="block rounded-lg px-3 py-2.5 text-sm font-semibold text-text-base" to="/#partners" @click="closeMobile">{{ t('common.nav.partners') }}</RouterLink></li>
        </ul>
        <div class="mt-4 flex items-center gap-2 border-t border-border pt-4">
          <button class="flex h-9 w-9 items-center justify-center rounded-full text-text-subtle" @click="toggleTheme">
            <AppIcon :name="isDark ? 'sun' : 'moon'" class="h-5 w-5" />
          </button>
          <button class="h-9 rounded-full px-3 text-sm font-semibold text-text-subtle" @click="toggleLocale">
            {{ locale === 'ar' ? 'EN' : 'AR' }}
          </button>
          <RouterLink
            to="/#contact"
            class="ms-auto rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-text-onprimary"
            @click="closeMobile"
          >
            {{ t('common.nav.cta') }}
          </RouterLink>
        </div>
      </div>
    </Transition>
  </header>
