<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/icons/AppIcon.vue'

const { t } = useI18n()

const tabKeys = ['ess', 'ers', 'esa']
const activeTab = ref('ess')

const activeContent = computed(() => ({
  title: t(`home.products.tabs.${activeTab.value}.title`),
  description: t(`home.products.tabs.${activeTab.value}.description`),
  features: t(`home.products.tabs.${activeTab.value}.features`)
}))
</script>

<template>
  <section id="products" class="bg-surface py-20 lg:py-28">
    <div class="mx-auto max-w-7xl px-5 lg:px-10">
      <!-- Section Header -->
      <div class="reveal mx-auto max-w-3xl text-center">
        <h2 class="font-heading text-3xl font-bold text-text-base sm:text-4xl lg:text-5xl">
          {{ t('home.products.title') }}
        </h2>
        <p class="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
          {{ t('home.products.subtitle') }}
        </p>
      </div>

      <!-- Product Tabs -->
      <div class="reveal mt-12 flex flex-wrap items-center justify-center gap-3 lg:gap-4" style="transition-delay: .08s">
        <button
          v-for="key in tabKeys"
          :key="key"
          class="group flex items-center gap-2 rounded-full border border-border px-6 py-3 transition-all duration-200"
          :class="activeTab === key
            ? 'border-primary bg-primary shadow-md'
            : 'bg-surface-alt hover:border-primary/40 hover:bg-surface-alt/80'"
          @click="activeTab = key"
        >
          <img
            :src="`/images/Products/${key}-logo.png`"
            :alt="key.toUpperCase()"
            class="h-5 w-auto object-contain transition-opacity duration-200"
            :class="activeTab === key ? 'opacity-100' : 'opacity-75 group-hover:opacity-100'"
          />
          <span
            class="hidden text-sm font-semibold transition-colors duration-200 sm:inline"
            :class="activeTab === key ? 'text-text-onprimary' : 'text-text-base'"
          >
            {{ t(`common.products.${key}.name`) }}
          </span>
        </button>
      </div>

      <!-- Product Content Card -->
      <Transition
        mode="out-in"
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y--4"
      >
        <div
          :key="activeTab"
          class="reveal is-visible mt-14 overflow-hidden rounded-2xl border border-border bg-surface-alt shadow-sm transition-all lg:mt-16"
          style="transition-delay: .1s"
        >
          <!-- Grid Layout: Info on left, Image on right -->
          <div class="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1fr]">
            <!-- Left: Product Information -->
            <div class="flex flex-col justify-between p-8 sm:p-10 lg:p-12">
              <!-- Product Name -->
              <div>
                <h3 class="font-heading text-2xl font-bold text-text-base sm:text-3xl">
                  {{ activeContent.title }}
                </h3>

                <!-- Description -->
                <p class="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
                  {{ activeContent.description }}
                </p>

                <!-- Key Features List -->
                <ul class="mt-8 space-y-3 sm:space-y-4">
                  <li
                    v-for="(feature, i) in activeContent.features"
                    :key="i"
                    class="flex items-start gap-3"
                  >
                    <!-- Checkmark Icon -->
                    <span class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="h-3 w-3"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <!-- Feature Text -->
                    <span class="text-base text-text-muted sm:text-[15px]">
                      {{ feature }}
                    </span>
                  </li>
                </ul>
              </div>

              <!-- CTA Link -->
              <RouterLink
                to="/#contact"
                class="mt-10 inline-flex items-center gap-2 text-base font-bold text-primary transition-colors duration-200 hover:text-primary-hover"
              >
                {{ t('home.products.cta') }}
                <AppIcon name="arrowLeft" class="h-4 w-4 rtl:block ltr:hidden" />
                <AppIcon name="arrowRight" class="h-4 w-4 ltr:block rtl:hidden" />
              </RouterLink>
            </div>

            <!-- Right: Product Image/Screenshot -->
            <div
              class="relative flex items-center justify-center bg-gradient-to-br from-primary-light/30 via-surface to-surface-alt p-8 sm:min-h-[400px] sm:p-10 lg:min-h-[450px] lg:p-12"
            >
              <!-- Background decoration -->
              <div class="absolute inset-0 overflow-hidden">
                <div class="absolute -end-12 -top-12 h-40 w-40 rounded-full bg-primary-light/20 blur-3xl"></div>
                <div class="absolute -start-12 -bottom-12 h-40 w-40 rounded-full bg-primary-light/10 blur-3xl"></div>
              </div>

              <!-- Product Logo/Screenshot -->
              <div class="relative z-10 text-center">
                <img
                  :src="`/images/Products/${activeTab}-logo.png`"
                  :alt="activeTab.toUpperCase()"
                  class="mx-auto h-32 w-auto object-contain sm:h-40 lg:h-48"
                />
                <p class="mt-6 text-sm font-medium text-text-subtle">
                  {{ t(`common.products.${activeTab}.tagline`) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Bottom CTA for Products Page -->
      <div class="reveal mt-10 text-center" style="transition-delay: .15s">
        <RouterLink
          to="/#products"
          class="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-bold text-text-base transition-all duration-200 hover:border-primary hover:text-primary"
        >
          {{ t('home.products.viewAll') || 'See all products' }}
          <AppIcon name="arrowLeft" class="h-4 w-4 rtl:block ltr:hidden" />
          <AppIcon name="arrowRight" class="h-4 w-4 ltr:block rtl:hidden" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Smooth animation transitions */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>