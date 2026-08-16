<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrolledHeader } from '@/composables/useScrolledHeader'
import { useTheme } from '@/composables/useTheme'
import { runViewTransition } from '@/composables/runViewTransition'
import AppIcon from '@/components/icons/AppIcon.vue'
import ProductMenuCard from '@/components/products/ProductMenuCard.vue'
import ServiceMenuCard from '@/components/services/ServiceMenuCard.vue'
import { PRODUCT_KEYS, productsCatalog } from '@/data/products'
import { getServicesList, getServiceMenuHref } from '@/data/services'

const { t, locale } = useI18n()
const { isScrolled } = useScrolledHeader()
const { isDark, toggleTheme } = useTheme()

const isProductsOpen = ref(false)
const isServicesOpen = ref(false)
const isMobileOpen = ref(false)

const productKeys = PRODUCT_KEYS
const services = getServicesList()

let productsCloseTimer = null
let servicesCloseTimer = null

function clearMenuTimers() {
  clearTimeout(productsCloseTimer)
  clearTimeout(servicesCloseTimer)
  productsCloseTimer = null
  servicesCloseTimer = null
}

function closeMenus() {
  clearMenuTimers()
  isProductsOpen.value = false
  isServicesOpen.value = false
}

function openProducts() {
  clearMenuTimers()
  isServicesOpen.value = false
  isProductsOpen.value = true
}

function closeProducts() {
  clearTimeout(productsCloseTimer)
  productsCloseTimer = null
  isProductsOpen.value = false
}

function scheduleCloseProducts() {
  clearTimeout(productsCloseTimer)
  productsCloseTimer = setTimeout(() => {
    isProductsOpen.value = false
    productsCloseTimer = null
  }, 70)
}

function openServices() {
  clearMenuTimers()
  isProductsOpen.value = false
  isServicesOpen.value = true
}

function closeServices() {
  clearTimeout(servicesCloseTimer)
  servicesCloseTimer = null
  isServicesOpen.value = false
}

function scheduleCloseServices() {
  clearTimeout(servicesCloseTimer)
  servicesCloseTimer = setTimeout(() => {
    isServicesOpen.value = false
    servicesCloseTimer = null
  }, 70)
}

async function toggleLocale() {
  await runViewTransition(() => {
    locale.value = locale.value === 'ar' ? 'en' : 'ar'
  }, 'locale')
}

function closeMobile() {
  isMobileOpen.value = false
}

onBeforeUnmount(() => {
  clearMenuTimers()
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="isScrolled || isMobileOpen || isProductsOpen || isServicesOpen
      ? 'bg-surface-alt border-b border-border shadow-sm'
      : 'bg-transparent border-b border-transparent'"
  >
    <nav class="grid h-16 w-full grid-cols-[1fr_auto_1fr] items-center px-6 lg:px-12">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2 shrink-0 justify-self-start" @click="closeMobile">
        <img src="/images/DTS.webp" alt="DTS" class="h-11 w-auto lg:h-12" width="180" height="48" fetchpriority="high" decoding="async" />
      </RouterLink>

      <!-- Desktop nav (centered) -->
      <ul class="hidden items-center gap-3 justify-self-center lg:flex">
        <li>
          <RouterLink
            to="/"
            class="rounded-lg px-4 py-3 text-base font-medium text-text-base transition-colors hover:bg-primary-light"
            @mouseenter="closeMenus"
          >
            {{ t('common.nav.home') }}
          </RouterLink>
        </li>

        <!-- Products mega dropdown -->
        <li @mouseenter="openProducts" @mouseleave="scheduleCloseProducts">
          <RouterLink
            to="/products"
            class="flex items-center gap-1.5 rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-primary-light"
            :class="isProductsOpen ? 'bg-primary-light text-primary' : 'text-text-base'"
            :aria-expanded="isProductsOpen"
            @click="closeProducts"
          >
            {{ t('common.nav.products') }}
            <AppIcon
              name="chevronDown"
              class="h-4 w-4 transition-transform"
              :style="{ transform: isProductsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }"
            />
          </RouterLink>
        </li>

        <!-- Services mega dropdown -->
        <li @mouseenter="openServices" @mouseleave="scheduleCloseServices">
          <RouterLink
            to="/services"
            class="flex items-center gap-1.5 rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-primary-light"
            :class="isServicesOpen ? 'bg-primary-light text-primary' : 'text-text-base'"
            :aria-expanded="isServicesOpen"
            @click="closeServices"
          >
            {{ t('common.nav.services') }}
            <AppIcon
              name="chevronDown"
              class="h-4 w-4 transition-transform"
              :style="{ transform: isServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }"
            />
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/clients"
            class="rounded-lg px-4 py-3 text-base font-medium text-text-base transition-colors hover:bg-primary-light"
            @mouseenter="closeMenus"
          >
            {{ t('common.nav.clients') }}
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/partners"
            class="rounded-lg px-4 py-3 text-base font-medium text-text-base transition-colors hover:bg-primary-light"
            @mouseenter="closeMenus"
          >
            {{ t('common.nav.partners') }}
          </RouterLink>
        </li>
      </ul>

      <!-- Right actions + mobile toggle (grouped, right-aligned) -->
      <div class="flex items-center justify-self-end gap-3">
        <div class="hidden items-center gap-3 lg:flex">
          <button
            class="theme-toggle flex h-10 w-10 items-center justify-center rounded-full text-text-subtle transition-colors hover:bg-primary-light hover:text-primary"
            :aria-label="isDark ? 'Light mode' : 'Dark mode'"
            @click="toggleTheme"
          >
            <Transition name="icon-swap" mode="out-in">
              <AppIcon :key="isDark ? 'sun' : 'moon'" :name="isDark ? 'sun' : 'moon'" class="h-6 w-6" />
            </Transition>
          </button>
          <button
            class="locale-toggle h-10 rounded-full px-4 text-base font-semibold text-text-subtle transition-colors hover:bg-primary-light hover:text-primary"
            @click="toggleLocale"
          >
            <Transition name="locale-swap" mode="out-in">
              <span :key="locale" class="inline-block">{{ locale === 'ar' ? 'EN' : 'AR' }}</span>
            </Transition>
          </button>
          <RouterLink
            to="/contact"
            class="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-text-onprimary shadow-sm transition-all hover:bg-primary-hover hover:shadow-md"
          >
            {{ t('common.nav.cta') }}
          </RouterLink>
        </div>

        <!-- Mobile toggle -->
        <button
          class="flex h-10 w-10 items-center justify-center rounded-lg text-text-base lg:hidden"
          @click="isMobileOpen = !isMobileOpen"
        >
          <AppIcon :name="isMobileOpen ? 'close' : 'menu'" class="h-7 w-7" />
        </button>
      </div>
    </nav>

    <!-- Products mega menu -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isProductsOpen"
        class="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-2"
        @mouseenter="openProducts"
        @mouseleave="scheduleCloseProducts"
      >
        <div class="rounded-2xl border border-border bg-surface-alt p-6 shadow-xl">
          <div class="mb-4 flex items-center justify-between">
            <span class="text-sm text-text-subtle">{{ t('common.nav.products') }}</span>
            <RouterLink to="/products" class="flex items-center gap-1 text-sm font-semibold text-primary hover:underline" @click="closeProducts">
              {{ t('common.buttons.discoverProducts') }}
              <AppIcon :name="locale === 'ar' ? 'arrowLeft' : 'arrowRight'" class="h-3.5 w-3.5" />
            </RouterLink>
          </div>
          <div class="grid grid-cols-3 items-stretch gap-4">
            <ProductMenuCard
              v-for="key in productKeys"
              :key="key"
              :product-key="key"
              :tint="productsCatalog[key].tint"
              @navigate="closeProducts"
            />
          </div>
        </div>
      </div>
    </Transition>

    <!-- Services mega menu -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isServicesOpen"
        class="absolute left-1/2 top-full w-[min(920px,calc(100vw-2rem))] -translate-x-1/2 pt-2"
        @mouseenter="openServices"
        @mouseleave="scheduleCloseServices"
      >
        <div class="rounded-2xl border border-border bg-surface-alt p-6 shadow-xl">
          <div class="mb-4 flex items-center justify-between">
            <span class="text-sm text-text-subtle">{{ t('common.nav.services') }}</span>
            <RouterLink to="/services" class="flex items-center gap-1 text-sm font-semibold text-primary hover:underline" @click="closeServices">
              {{ t('common.buttons.discoverServices') }}
              <AppIcon :name="locale === 'ar' ? 'arrowLeft' : 'arrowRight'" class="h-3.5 w-3.5" />
            </RouterLink>
          </div>
          <div class="grid grid-cols-2 items-stretch gap-3 sm:grid-cols-4 sm:gap-4">
            <ServiceMenuCard
              v-for="svc in services"
              :key="svc.key"
              :service-key="svc.key"
              :icon="svc.icon"
              :href="getServiceMenuHref(svc)"
              :featured="!!svc.featured"
              @navigate="closeServices"
            />
          </div>
        </div>
      </div>
    </Transition>

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
          <li><RouterLink class="block rounded-lg px-3 py-2.5 text-sm font-semibold text-text-base" to="/products" @click="closeMobile">{{ t('common.nav.products') }}</RouterLink></li>
          <li v-for="key in productKeys" :key="key">
            <RouterLink
              class="block rounded-lg px-3 py-2 ps-6 text-sm font-medium text-text-muted"
              :to="`/products/${key}`"
              @click="closeMobile"
            >
              {{ t(`common.products.${key}.name`) }}
            </RouterLink>
          </li>
          <li><RouterLink class="block rounded-lg px-3 py-2.5 text-sm font-semibold text-text-base" to="/services" @click="closeMobile">{{ t('common.nav.services') }}</RouterLink></li>
          <li v-for="svc in services" :key="svc.key">
            <RouterLink
              class="block rounded-lg px-3 py-2 ps-6 text-sm font-medium text-text-muted"
              :to="getServiceMenuHref(svc)"
              @click="closeMobile"
            >
              {{ t(`services.items.${svc.key}.title`) }}
            </RouterLink>
          </li>
          <li><RouterLink class="block rounded-lg px-3 py-2.5 text-sm font-semibold text-text-base" to="/clients" @click="closeMobile">{{ t('common.nav.clients') }}</RouterLink></li>
          <li><RouterLink class="block rounded-lg px-3 py-2.5 text-sm font-semibold text-text-base" to="/partners" @click="closeMobile">{{ t('common.nav.partners') }}</RouterLink></li>
        </ul>
        <div class="mt-4 flex items-center gap-2 border-t border-border pt-4">
          <button class="theme-toggle flex h-9 w-9 items-center justify-center rounded-full text-text-subtle" @click="toggleTheme">
            <Transition name="icon-swap" mode="out-in">
              <AppIcon :key="isDark ? 'sun' : 'moon'" :name="isDark ? 'sun' : 'moon'" class="h-5 w-5" />
            </Transition>
          </button>
          <button class="locale-toggle h-9 rounded-full px-3 text-sm font-semibold text-text-subtle" @click="toggleLocale">
            <Transition name="locale-swap" mode="out-in">
              <span :key="locale" class="inline-block">{{ locale === 'ar' ? 'EN' : 'AR' }}</span>
            </Transition>
          </button>
          <RouterLink
            to="/contact"
            class="ms-auto rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-text-onprimary"
            @click="closeMobile"
          >
            {{ t('common.nav.cta') }}
          </RouterLink>
        </div>
      </div>
    </Transition>
  </header>
</template>
