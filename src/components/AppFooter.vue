<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/icons/AppIcon.vue'

const { t, tm } = useI18n()

const year = new Date().getFullYear()
const revealed = reactive({ support: false, sales: false })

const productLinks = [
  { key: 'ess', to: '/products/ess' },
  { key: 'ers', to: '/products/ers' },
  { key: 'esa', to: '/products/esa' }
]

const companyLinks = [
  { labelKey: 'common.footer.quickLinks.home', to: '/' },
  { labelKey: 'common.footer.quickLinks.about', to: '/#about' },
  { labelKey: 'common.footer.quickLinks.services', to: '/#services' },
  { labelKey: 'common.footer.quickLinks.partners', to: '/#partners' }
]
</script>

<template>
  <footer
    class="relative overflow-hidden border-t border-border bg-surface-alt dark:border-[#152a45] dark:[--color-text-base:#d4e2f5] dark:[--color-text-muted:#a3b6ce] dark:[--color-text-subtle:#7e93ae]"
  >
    <!-- Soft Notion-like ambient -->
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent dark:via-primary/15"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -end-24 top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      aria-hidden="true"
    />

    <!-- Pre-footer CTA band -->
    <div class="border-b border-border/80 dark:border-[#152a45]">
      <div class="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-8 sm:flex-row sm:items-center lg:px-10 lg:py-10">
        <div class="max-w-xl">
          <h2 class="font-heading text-2xl font-bold tracking-tight text-text-base sm:text-3xl">
            {{ t('common.footer.ctaTitle') }}
          </h2>
          <p class="mt-2 text-base leading-relaxed text-text-muted">
            {{ t('common.footer.ctaSubtitle') }}
          </p>
        </div>
        <RouterLink
          to="/contact"
          class="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-text-onprimary shadow-md transition-all hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg"
        >
          {{ t('common.footer.ctaButton') }}
          <AppIcon name="arrowLeft" class="h-4 w-4 rtl:block ltr:hidden" />
          <AppIcon name="arrowRight" class="h-4 w-4 ltr:block rtl:hidden" />
        </RouterLink>
      </div>
    </div>

    <!-- Link grid -->
    <div class="mx-auto max-w-7xl px-5 py-10 lg:px-10 lg:py-12">
      <div class="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-12 lg:gap-8">
        <!-- Brand column -->
        <div class="col-span-2 md:col-span-3 lg:col-span-4">
          <RouterLink to="/" class="inline-flex items-center gap-3">
            <img src="/images/DTS.png" alt="DTS" class="h-10 w-auto" />
          </RouterLink>
          <p class="mt-2 text-sm font-semibold text-primary">
            {{ t('common.footer.tagline') }}
          </p>
          <p class="mt-4 max-w-sm text-[15px] leading-relaxed text-text-subtle">
            {{ t('common.footer.description') }}
          </p>
        </div>

        <!-- Product -->
        <div class="lg:col-span-2">
          <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-text-subtle">
            {{ t('common.footer.productTitle') }}
          </h3>
          <ul class="mt-5 space-y-3">
            <li v-for="item in productLinks" :key="item.key">
              <RouterLink
                :to="item.to"
                class="text-[15px] text-text-muted transition-colors hover:text-text-base"
              >
                {{ t(`common.products.${item.key}.name`) }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div class="lg:col-span-2">
          <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-text-subtle">
            {{ t('common.footer.companyTitle') }}
          </h3>
          <ul class="mt-5 space-y-3">
            <li v-for="link in companyLinks" :key="link.labelKey">
              <RouterLink
                :to="link.to"
                class="text-[15px] text-text-muted transition-colors hover:text-text-base"
              >
                {{ t(link.labelKey) }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div class="lg:col-span-2">
          <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-text-subtle">
            {{ t('common.footer.helpTitle') }}
          </h3>
          <ul class="mt-5 space-y-3 text-[15px]">
            <li class="flex flex-col items-start">
              <button
                type="button"
                class="text-start text-text-muted transition-colors hover:text-text-base"
                :aria-expanded="revealed.support"
                @click="revealed.support = !revealed.support"
              >
                {{ t('common.footer.support') }}
              </button>
              <a
                v-if="revealed.support"
                :href="`mailto:${t('common.footer.supportEmail')}`"
                dir="ltr"
                class="mt-1 text-sm font-semibold text-primary [unicode-bidi:isolate]"
              >
                {{ t('common.footer.supportEmail') }}
              </a>
            </li>
            <li class="flex flex-col items-start">
              <button
                type="button"
                class="text-start text-text-muted transition-colors hover:text-text-base"
                :aria-expanded="revealed.sales"
                @click="revealed.sales = !revealed.sales"
              >
                {{ t('common.footer.sales') }}
              </button>
              <a
                v-if="revealed.sales"
                :href="`mailto:${t('common.footer.salesEmail')}`"
                dir="ltr"
                class="mt-1 text-sm font-semibold text-primary [unicode-bidi:isolate]"
              >
                {{ t('common.footer.salesEmail') }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="col-span-2 md:col-span-1 lg:col-span-2">
          <h3 class="text-xs font-semibold uppercase tracking-[0.16em] text-text-subtle">
            {{ t('common.footer.contactTitle') }}
          </h3>
          <ul class="mt-5 space-y-2.5">
            <li v-for="(num, i) in tm('common.footer.numbers')" :key="i">
              <a
                :href="`tel:${String(num).replace(/[^\d+]/g, '')}`"
                dir="ltr"
                class="inline-block text-[15px] text-text-muted transition-colors hover:text-text-base [unicode-bidi:isolate]"
              >
                {{ num }}
              </a>
            </li>
          </ul>
          <p class="mt-5 flex items-start gap-2 text-xs leading-relaxed text-text-subtle">
            <AppIcon name="mapPin" class="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {{ t('common.footer.address') }}
          </p>
        </div>
      </div>

      <!-- Bottom bar -->
      <div
        class="mt-14 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 dark:border-[#152a45] sm:flex-row sm:items-center"
      >
        <p class="text-sm text-text-subtle">
          © {{ year }} DTS — {{ t('common.footer.rights') }}
        </p>
        <div class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-subtle">
          <RouterLink to="/products" class="transition-colors hover:text-text-base">
            {{ t('common.footer.quickLinks.products') }}
          </RouterLink>
          <RouterLink to="/#services" class="transition-colors hover:text-text-base">
            {{ t('common.footer.quickLinks.services') }}
          </RouterLink>
          <RouterLink to="/contact" class="transition-colors hover:text-text-base">
            {{ t('common.nav.contact') }}
          </RouterLink>
        </div>
      </div>
    </div>
  </footer>
</template>
