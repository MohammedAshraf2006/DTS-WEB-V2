<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'
import AppIcon from '@/components/icons/AppIcon.vue'
import { PRODUCT_KEYS, getProduct, selectProductImage } from '@/data/products'

const { t, tm, locale } = useI18n()
const { isDark } = useTheme()

const tabKeys = PRODUCT_KEYS
const activeTab = ref('ess')

const activeProduct = computed(() => getProduct(activeTab.value))
const activeMedia = computed(() => {
  return selectProductImage(activeProduct.value, isDark.value, locale.value)
})

const activeFeatures = computed(() => {
  void locale.value
  const raw = tm(`home.products.tabs.${activeTab.value}.features`)
  return Array.isArray(raw) ? raw : []
})

const hasMedia = computed(() => Boolean(activeMedia.value))
</script>

<template>
  <section id="products" class="bg-transparent py-12 lg:py-16">
    <div class="mx-auto max-w-7xl px-5 lg:px-10">
      <div class="reveal mx-auto max-w-3xl text-center">
        <h2 class="font-heading text-3xl font-bold tracking-tight text-text-base sm:text-4xl lg:text-5xl">
          {{ t('home.products.title') }}
        </h2>
        <p class="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
          {{ t('home.products.subtitle') }}
        </p>
      </div>

      <!-- Notion-like text tabs -->
      <div
        class="reveal mt-8 flex flex-wrap items-end justify-center gap-x-8 gap-y-3 border-b border-border"
        style="transition-delay: .05s"
        role="tablist"
        :aria-label="t('home.products.title')"
      >
        <button
          v-for="key in tabKeys"
          :key="key"
          type="button"
          role="tab"
          :aria-selected="activeTab === key"
          :aria-label="t(`common.products.${key}.name`)"
          class="relative -mb-px flex items-center justify-center pb-3 transition-opacity"
          :class="
            activeTab === key
              ? 'border-b-2 border-primary opacity-100'
              : 'border-b-2 border-transparent opacity-55 hover:opacity-90'
          "
          @click="activeTab = key"
        >
          <span class="logo-well flex h-9 items-center rounded-lg px-2.5 sm:h-10">
            <img
              :src="`/images/Products/${key}-logo.webp`"
              :alt="t(`common.products.${key}.name`)"
              class="h-6 w-auto object-contain sm:h-7"
            />
          </span>
        </button>
      </div>

      <Transition
        mode="out-in"
        enter-active-class="product-panel-enter-active"
        enter-from-class="product-panel-enter-from"
        enter-to-class="product-panel-enter-to"
        leave-active-class="product-panel-leave-active"
        leave-from-class="product-panel-leave-from"
        leave-to-class="product-panel-leave-to"
      >
        <div :key="activeTab" class="reveal is-visible mt-8 lg:mt-10" role="tabpanel">
          <!-- Notion-style: copy + large media -->
          <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div class="product-copy max-w-xl">
              <h3 class="font-heading text-3xl font-bold tracking-tight text-text-base sm:text-4xl">
                {{ t(`home.products.tabs.${activeTab}.title`) }}
              </h3>
              <p class="mt-5 text-lg leading-relaxed text-text-muted">
                {{ t(`home.products.tabs.${activeTab}.description`) }}
              </p>

              <!-- Capability rows (Notion “See what Notion can do” vibe) -->
              <ul class="mt-8 divide-y divide-border border-y border-border">
                <li
                  v-for="(feature, i) in activeFeatures"
                  :key="i"
                  class="product-feature py-4"
                  :style="{ transitionDelay: `${0.05 + i * 0.04}s` }"
                >
                  <span class="text-[15px] font-medium leading-snug text-text-base">
                    {{ feature }}
                  </span>
                </li>
              </ul>

              <RouterLink
                :to="`/products/${activeTab}`"
                class="mt-8 inline-flex items-center gap-2 text-base font-semibold text-primary transition-colors hover:text-primary-hover"
              >
                {{ t('home.products.cta') }}
                <AppIcon name="arrowLeft" class="h-4 w-4 rtl:block ltr:hidden" />
                <AppIcon name="arrowRight" class="h-4 w-4 ltr:block rtl:hidden" />
              </RouterLink>
            </div>

            <!-- Large media plane -->
            <div
              class="product-media relative w-full overflow-hidden rounded-xl bg-surface-alt"
              :class="activeTab === 'esa' ? 'h-[400px] sm:h-[480px] lg:h-[540px]' : activeTab === 'ess' ? 'h-[230px] sm:h-[280px] lg:h-[320px]' : 'h-[260px] sm:h-[320px] lg:h-[380px]'"
            >
              <img
                v-if="hasMedia"
                :key="activeMedia.src"
                :src="activeMedia.src"
                :alt="t(`home.products.tabs.${activeTab}.title`)"
                class="h-full w-full object-contain"
                decoding="async"
              />
              <div
                v-else
                class="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-primary-light/30 via-surface to-surface-alt px-8 text-center"
              >
                <span class="logo-well flex h-16 w-16 items-center justify-center rounded-2xl">
                  <img
                    :src="`/images/Products/${activeTab}-logo.webp`"
                    :alt="activeTab.toUpperCase()"
                    class="h-10 w-auto object-contain"
                  />
                </span>
                <p class="text-sm font-medium text-text-subtle">
                  {{ t('home.products.mediaPlaceholder') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <div class="reveal mt-10 text-center" style="transition-delay: .12s">
        <RouterLink
          to="/products"
          class="inline-flex items-center gap-2 rounded-full border border-border bg-surface-alt px-6 py-3 text-sm font-bold text-text-base transition-all duration-200 hover:border-primary hover:text-primary"
        >
          {{ t('home.products.viewAll') }}
          <AppIcon name="arrowLeft" class="h-4 w-4 rtl:block ltr:hidden" />
          <AppIcon name="arrowRight" class="h-4 w-4 ltr:block rtl:hidden" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.product-media {
  box-shadow: 0 24px 48px -28px rgba(15, 23, 42, 0.35);
}

.dark .product-media {
  box-shadow: 0 24px 48px -24px rgba(0, 0, 0, 0.55);
}

.product-panel-enter-active {
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
}

.product-panel-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.product-panel-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.product-panel-enter-to,
.product-panel-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.product-panel-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.product-panel-enter-active .product-media {
  transition:
    opacity 0.4s ease 0.06s,
    transform 0.4s ease 0.06s;
}

.product-panel-enter-from .product-media {
  opacity: 0;
  transform: translateY(16px) scale(0.98);
}

.product-panel-enter-active .product-feature {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.product-panel-enter-from .product-feature {
  opacity: 0;
  transform: translateY(8px);
}

@media (prefers-reduced-motion: reduce) {
  .product-panel-enter-active,
  .product-panel-leave-active,
  .product-panel-enter-active .product-media,
  .product-panel-enter-active .product-feature {
    transition-duration: 0.01ms !important;
  }

  .product-panel-enter-from,
  .product-panel-enter-from .product-media,
  .product-panel-enter-from .product-feature {
    opacity: 1;
    transform: none;
  }
}
</style>
