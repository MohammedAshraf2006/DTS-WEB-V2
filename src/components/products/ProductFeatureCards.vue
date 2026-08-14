<script setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/icons/AppIcon.vue'
import ProductFeaturePanel from '@/components/products/ProductFeaturePanel.vue'

const props = defineProps({
  productKey: { type: String, required: true },
  features: { type: Array, default: () => [] }
})

const { t } = useI18n()
const openIndex = ref(0)

const tintClass = computed(() => {
  if (props.productKey === 'ers') {
    return 'from-[#c9fbfe]/55 to-surface-alt dark:from-[#00e8f0]/14 dark:to-surface-alt'
  }
  if (props.productKey === 'esa') {
    return 'from-[#c0eefe]/55 to-surface-alt dark:from-[#00e8f0]/12 dark:to-surface-alt'
  }
  return 'from-[#afdefc]/50 to-surface-alt dark:from-[#00e8f0]/14 dark:to-surface-alt'
})

watch(
  () => props.productKey,
  () => {
    openIndex.value = 0
  }
)

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<template>
  <section class="reveal mt-12 lg:mt-16">
    <h2 class="font-heading text-lg font-bold text-text-base sm:text-xl">
      {{ t('products.featuresTitle') }}
    </h2>
    <p class="mt-1 text-sm text-text-subtle">
      {{ t('products.featuresHint') }}
    </p>

    <ul class="mt-6 divide-y divide-border border-y border-border">
      <li v-for="(feature, i) in features" :key="`${productKey}-${i}`">
        <button
          type="button"
          class="flex w-full items-center justify-between gap-4 py-4 text-start"
          :aria-expanded="openIndex === i"
          :aria-controls="`feature-panel-${productKey}-${i}`"
          @click="toggle(i)"
        >
          <span
            class="font-heading text-base font-bold leading-snug sm:text-lg"
            :class="openIndex === i ? 'text-primary' : 'text-text-base'"
          >
            {{ feature.title }}
          </span>
          <AppIcon
            name="chevronDown"
            class="h-4 w-4 shrink-0 text-text-subtle transition-transform duration-200"
            :class="openIndex === i ? 'rotate-180 text-primary' : ''"
          />
        </button>

        <div
          :id="`feature-panel-${productKey}-${i}`"
          class="grid transition-[grid-template-rows] duration-300 ease-out"
          :class="openIndex === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
        >
          <div class="overflow-hidden">
            <ProductFeaturePanel
              v-if="openIndex === i"
              :detail="feature.detail"
              :tint-class="tintClass"
            />
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>
