<script setup>
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'
import AppIcon from '@/components/icons/AppIcon.vue'

const { t, tm } = useI18n()

// For stat chart initialization
const chartRefs = ref({})

// Initialize charts on mount
onMounted(() => {
  // Initialize ApexCharts for each stat
  // This would be called here with actual data
  initializeCharts()
})

const initializeCharts = () => {
  // Load ApexCharts library and initialize charts
  // For now, this is a placeholder
  // In production, you'd load ApexCharts dynamically
  if (typeof window !== 'undefined' && window.ApexCharts) {
    // Initialize each chart
    Object.keys(chartRefs.value).forEach((key) => {
      // Chart initialization code here
    })
  }
}

// Get brand color from CSS variables
const getBrandColor = () => {
  if (typeof window !== 'undefined') {
    const computedStyle = getComputedStyle(document.documentElement)
    return computedStyle.getPropertyValue('--color-primary').trim() || '#1447E6'
  }
  return '#1447E6'
}
</script>

<template>
  <section class="relative overflow-hidden bg-surface py-20 lg:py-28">
    <!-- Background decorative elements -->
    <div class="pointer-events-none absolute -end-32 top-0 h-96 w-96 rounded-full bg-primary-light/5 blur-3xl"></div>
    <div class="pointer-events-none absolute -start-32 -bottom-32 h-96 w-96 rounded-full bg-primary-light/5 blur-3xl"></div>

    <div class="relative mx-auto max-w-7xl px-5 lg:px-10">
      <!-- Statistics Grid -->
      <div class="reveal mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" style="transition-delay: 0s">
        <div
          v-for="(stat, i) in tm('home.stats.items')"
          :key="i"
          class="overflow-hidden rounded-xl border border-border bg-surface-alt p-6 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md sm:p-8"
        >
          <!-- Stat Header: Number and Percentage -->
          <div class="flex items-start justify-between">
            <div>
              <!-- Main Number -->
              <h3 class="font-heading text-3xl font-bold text-primary sm:text-4xl">
                {{ stat.value }}
              </h3>
              <!-- Label -->
              <p class="mt-2 text-sm font-medium text-text-subtle">
                {{ stat.label }}
              </p>
            </div>

            <!-- Percentage Badge -->
            <div class="flex items-center gap-1 rounded-full bg-success-light px-3 py-1.5 text-xs font-semibold text-success">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-3.5 w-3.5"
              >
                <polyline points="23 6 13.5 15.5 8 10 1 17"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
              {{ stat.growth || '12%' }}
            </div>
          </div>

          <!-- Chart Container -->
          <div :ref="(el) => chartRefs[`chart-${i}`] = el" class="mt-6 h-16 sm:h-20"></div>

          <!-- Chart Controls -->
          <div class="mt-6 flex flex-col items-start justify-between gap-3 border-t border-border pt-4 sm:flex-row sm:items-center">
            <!-- Time Period Dropdown (Simplified) -->
            <button
              class="text-sm font-medium text-text-muted transition-colors hover:text-text-base"
            >
              Last 7 days
              <AppIcon name="chevronDown" class="ml-1 inline h-3.5 w-3.5" />
            </button>

            <!-- View Report Link -->
            <a
              href="#"
              class="inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-colors hover:text-primary-hover"
            >
              View Report
              <AppIcon name="arrowRight" class="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="reveal bg-gradient-to-r from-primary-light/20 to-primary-light/10 rounded-2xl border border-primary-light/30 p-8 text-center sm:p-12 lg:p-16" style="transition-delay: .1s">
        <h2 class="font-heading text-2xl font-bold text-text-base sm:text-3xl lg:text-4xl">
          {{ t('home.cta.title') }}
        </h2>
        <p class="mx-auto mt-4 max-w-lg text-base leading-relaxed text-text-muted sm:text-lg">
          {{ t('home.cta.subtitle') }}
        </p>

        <!-- CTA Button -->
        <a
          href="mailto:Info@dts-eg.net"
          class="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-text-onprimary shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-lg"
        >
          {{ t('home.cta.button') }}
          <AppIcon name="arrowLeft" class="h-4 w-4 rtl:block ltr:hidden" />
          <AppIcon name="arrowRight" class="h-4 w-4 ltr:block rtl:hidden" />
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Responsive adjustments */
@media (max-width: 640px) {
  :deep(.apexcharts-canvas) {
    width: 100% !important;
    height: 100% !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>

<!-- ApexCharts Integration Code (to add to main.js or component setup) -->
<!-- 
Add this to your main.js to load ApexCharts:

// In main.js
const script = document.createElement('script')
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/apexcharts/3.45.0/apexcharts.min.js'
document.head.appendChild(script)

Then in the component setup:

// ApexCharts configuration
const chartOptions = {
  chart: {
    type: 'area',
    height: '100%',
    maxWidth: '100%',
    fontFamily: 'Inter, sans-serif',
    dropShadow: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    enabled: true,
    x: {
      show: false,
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      opacityFrom: 0.55,
      opacityTo: 0,
      shade: getBrandColor(),
      gradientToColors: [getBrandColor()],
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 2,
  },
  grid: {
    show: false,
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
  },
  xaxis: {
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
}

// Sample data for each stat
const series = [
  {
    name: 'Growth',
    data: [6500, 6418, 6456, 6526, 6356, 6456, 6600],
    color: getBrandColor(),
  },
]
-->