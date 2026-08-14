<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/icons/AppIcon.vue'

const { t, tm } = useI18n()

const tabKeys = ['ess', 'ers', 'esa']
const activeTab = ref('ess')

/**
 * Media per product — drop files under public/ and set type + src.
 * type: 'image' | 'video'
 */
const productMedia = {
  ess: { type: 'image', src: '' }, // e.g. '/images/Products/media/ess.png'
  ers: { type: 'image', src: '' },
  esa: { type: 'image', src: '' }
}

const activeFeatures = computed(() => {
  const raw = tm(`home.products.tabs.${activeTab.value}.features`)
  return Array.isArray(raw) ? raw : []
})

const activeMedia = computed(() => productMedia[activeTab.value])

const hasMedia = computed(() => {
  const src = activeMedia.value?.src
  return typeof src === 'string' && src.trim().length > 0
})
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
          <img
            :src="`/images/Products/${key}-logo.png`"
            :alt="t(`common.products.${key}.name`)"
            class="h-7 w-auto object-contain sm:h-8"
          />
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
                  class="product-feature flex items-center justify-between gap-4 py-4"
                  :style="{ transitionDelay: `${0.05 + i * 0.04}s` }"
                >
                  <span class="text-[15px] font-medium leading-snug text-text-base">
                    {{ feature }}
                  </span>
                  <AppIcon
                    name="arrowLeft"
                    class="h-4 w-4 shrink-0 text-text-subtle rtl:block ltr:hidden"
                  />
                  <AppIcon
                    name="arrowRight"
                    class="h-4 w-4 shrink-0 text-text-subtle ltr:block rtl:hidden"
                  />
                </li>
              </ul>

              <RouterLink
                to="/#contact"
                class="mt-8 inline-flex items-center gap-2 text-base font-semibold text-primary transition-colors hover:text-primary-hover"
              >
                {{ t('home.products.cta') }}
                <AppIcon name="arrowLeft" class="h-4 w-4 rtl:block ltr:hidden" />
                <AppIcon name="arrowRight" class="h-4 w-4 ltr:block rtl:hidden" />
              </RouterLink>
            </div>

            <!-- Large media plane -->
            <div
              class="product-media relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-surface-alt sm:aspect-[5/4] lg:aspect-[4/3]"
            >
              <video
                v-if="hasMedia && activeMedia.type === 'video'"
                :key="activeMedia.src"
                class="h-full w-full object-cover"
                :src="activeMedia.src"
                controls
                playsinline
                preload="metadata"
              />
              <img
                v-else-if="hasMedia"
                :key="activeMedia.src"
                :src="activeMedia.src"
                :alt="t(`home.products.tabs.${activeTab}.title`)"
                class="h-full w-full object-cover"
              />
              <div
                v-else
                class="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-primary-light/30 via-surface to-surface-alt px-8 text-center"
              >
                <img
                  :src="`/images/Products/${activeTab}-logo.png`"
                  :alt="activeTab.toUpperCase()"
                  class="h-14 w-auto object-contain opacity-80"
                />
                <p class="text-sm font-medium text-text-subtle">
                  {{ t('home.products.mediaPlaceholder') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
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
