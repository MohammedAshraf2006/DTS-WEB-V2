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
      <div class="reveal mx-auto max-w-2xl text-center">
        <h2 class="font-heading text-3xl font-extrabold text-text-base sm:text-4xl">
          {{ t('home.products.title') }}
        </h2>
        <p class="mt-4 text-base text-text-muted">{{ t('home.products.subtitle') }}</p>
      </div>

      <!-- Tabs -->
      <div class="reveal mt-10 flex flex-wrap items-center justify-center gap-2" style="transition-delay: .08s">
        <button
          v-for="key in tabKeys"
          :key="key"
          class="inline-flex items-center justify-center rounded-full border p-3 transition-all"
          :class="activeTab === key
            ? 'border-primary bg-primary shadow-md'
            : 'border-border bg-surface-alt hover:border-primary/40 hover:brightness-95'"
          @click="activeTab = key"
        >
          <img :src="`/images/Products/${key}-logo.png`" :alt="key.toUpperCase()" class="h-6 w-auto object-contain transition-opacity duration-200" :class="activeTab === key ? 'opacity-100' : 'opacity-90 hover:opacity-100'" />
        </button>
      </div>

      <!-- Content -->
      <Transition mode="out-in" enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div :key="activeTab" class="reveal is-visible mt-10 grid grid-cols-1 items-center gap-10 rounded-3xl border border-border bg-surface-alt p-6 shadow-sm lg:grid-cols-2 lg:p-10">
          <div>
            <h3 class="font-heading text-2xl font-extrabold text-text-base">{{ activeContent.title }}</h3>
            <p class="mt-3 text-text-muted leading-relaxed">{{ activeContent.description }}</p>

            <ul class="mt-6 space-y-3">
              <li v-for="(feature, i) in activeContent.features" :key="i" class="flex items-start gap-2.5">
                <span class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary">
                  <svg viewBox="0 0 24 24" fill="none" class="h-3 w-3"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                <span class="text-sm text-text-muted">{{ feature }}</span>
              </li>
            </ul>

            <RouterLink
              to="/#products"
              class="mt-7 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover"
            >
              {{ t('home.products.cta') }}
              <AppIcon name="arrowLeft" class="h-4 w-4 rtl:block ltr:hidden" />
              <AppIcon name="arrowRight" class="h-4 w-4 ltr:block rtl:hidden" />
            </RouterLink>
          </div>

          <div class="relative flex h-56 items-center justify-center rounded-2xl bg-primary-light/40 sm:h-72">
            <img :src="`/images/Products/${activeTab}-logo.png`" :alt="activeTab.toUpperCase()" class="h-24 w-auto object-contain sm:h-28" />
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>
