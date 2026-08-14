<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCountUp } from '@/composables/useCountUp'

const { t } = useI18n()

const props = defineProps({
  value: { type: String, required: true },
  label: { type: String, required: true },
  growth: { type: String, default: '+0%' },
  trend: { type: String, default: 'up' }, // 'up' | 'down'
  hint: { type: String, default: '' },
  points: { type: Array, default: () => [40, 48, 45, 58, 62, 70, 78] },
  delay: { type: Number, default: 0 }
})

const root = ref(null)
const isUp = computed(() => props.trend !== 'down')

const { displayValue } = useCountUp(root, props.value, {
  duration: 1700,
  direction: isUp.value ? 'up' : 'down'
})
const { displayValue: growthDisplay } = useCountUp(root, props.growth, {
  duration: 1400,
  direction: isUp.value ? 'up' : 'down'
})

const spark = computed(() => {
  const pts = props.points.length ? props.points : [40, 50, 45, 60, 55, 70, 80]
  const min = Math.min(...pts)
  const max = Math.max(...pts)
  const span = Math.max(max - min, 1)
  const w = 120
  const h = 48
  const step = w / (pts.length - 1)
  const coords = pts.map((p, i) => {
    const x = i * step
    const y = h - ((p - min) / span) * (h - 6) - 3
    return [x, y]
  })
  const line = coords.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  const area = `${line} L${w},${h} L0,${h} Z`
  return { line, area, w, h }
})

const tilt = ref({ x: 0, y: 0 })

function onMove(e) {
  const el = root.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width
  const py = (e.clientY - rect.top) / rect.height
  tilt.value = {
    x: (py - 0.5) * -14,
    y: (px - 0.5) * 18
  }
}

function onLeave() {
  tilt.value = { x: 0, y: 0 }
}
</script>

<template>
  <article
    ref="root"
    class="stat-card reveal group relative"
    :style="{ transitionDelay: `${delay}s` }"
    @mousemove="onMove"
    @mouseleave="onLeave"
  >
    <div
      class="stat-card-inner relative overflow-hidden rounded-2xl border border-border bg-surface-alt p-6 sm:p-8"
      :style="{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`
      }"
    >
      <!-- 3D depth layers -->
      <div class="pointer-events-none absolute -end-10 -top-10 h-36 w-36 rounded-full bg-primary/15 blur-2xl transition-opacity group-hover:opacity-100" />
      <div
        class="pointer-events-none absolute -bottom-12 -start-8 h-32 w-32 rounded-full blur-2xl"
        :class="isUp ? 'bg-success/20' : 'bg-info/25'"
      />

      <div class="relative z-10 flex items-start justify-between gap-4">
        <div>
          <p
            class="stat-number font-heading text-4xl font-extrabold tracking-tight text-primary sm:text-5xl"
          >
            {{ displayValue }}
          </p>
          <p class="mt-2 text-sm font-semibold text-text-base sm:text-base">{{ label }}</p>
          <p v-if="hint" class="mt-1 text-xs text-text-subtle">{{ hint }}</p>
        </div>

        <div
          class="stat-badge inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold"
          :class="isUp ? 'bg-success-light text-success' : 'bg-info-light text-info'"
        >
          <span class="stat-arrow inline-flex" :class="isUp ? 'is-up' : 'is-down'" aria-hidden="true">
            <svg
              v-if="isUp"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.4"
              class="h-3.5 w-3.5"
            >
              <path d="M12 19V5M5 12l7-7 7 7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <svg
              v-else
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.4"
              class="h-3.5 w-3.5"
            >
              <path d="M12 5v14M5 12l7 7 7-7" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          {{ growthDisplay }}
        </div>
      </div>

      <!-- Animated sparkline -->
      <div class="relative z-10 mt-8">
        <svg
          class="stat-spark h-14 w-full overflow-visible"
          :viewBox="`0 0 ${spark.w} ${spark.h}`"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient :id="`fill-${delay}`" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" :stop-color="isUp ? 'rgb(22 163 74)' : 'rgb(2 132 199)'" stop-opacity="0.35" />
              <stop offset="100%" :stop-color="isUp ? 'rgb(22 163 74)' : 'rgb(2 132 199)'" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path :d="spark.area" :fill="`url(#fill-${delay})`" class="stat-spark-area" />
          <path
            :d="spark.line"
            fill="none"
            :stroke="isUp ? 'rgb(22 163 74)' : 'rgb(2 132 199)'"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="stat-spark-line"
          />
        </svg>
      </div>

      <!-- Floating mini chips for motion -->
      <div class="pointer-events-none absolute bottom-4 end-4 flex flex-col gap-1 opacity-70" aria-hidden="true">
        <span class="stat-float-chip rounded-md bg-surface/80 px-2 py-0.5 text-[10px] font-bold text-text-subtle shadow-sm backdrop-blur">
          {{ isUp ? '▲' : '▼' }} {{ t('home.stats.live') }}
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.stat-card {
  transform-style: preserve-3d;
}

.stat-card-inner {
  transform-style: preserve-3d;
  transition: transform 0.18s ease-out, box-shadow 0.25s ease;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.65) inset,
    0 18px 40px -24px rgba(15, 23, 42, 0.35);
}

.dark .stat-card-inner {
  box-shadow:
    0 1px 0 rgba(35, 184, 193, 0.12) inset,
    0 -1px 0 rgba(0, 0, 0, 0.4) inset,
    0 20px 44px -20px rgba(0, 0, 0, 0.65);
}

.stat-card:hover .stat-card-inner {
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.75) inset,
    0 28px 50px -20px rgba(28, 110, 142, 0.35);
}

.dark .stat-card:hover .stat-card-inner {
  box-shadow:
    0 1px 0 rgba(35, 184, 193, 0.18) inset,
    0 -1px 0 rgba(0, 0, 0, 0.45) inset,
    0 28px 52px -18px rgba(0, 0, 0, 0.75);
}

.stat-number {
  text-shadow: 0 8px 24px rgba(28, 110, 142, 0.25);
  transform: translateZ(28px);
}

.stat-badge {
  transform: translateZ(36px);
}

.stat-arrow.is-up {
  animation: arrow-bounce-up 1.1s ease-in-out infinite;
}

.stat-arrow.is-down {
  animation: arrow-bounce-down 1.1s ease-in-out infinite;
}

.stat-spark-line {
  stroke-dasharray: 220;
  stroke-dashoffset: 220;
  animation: spark-draw 1.4s ease forwards 0.25s;
}

.stat-spark-area {
  opacity: 0;
  animation: spark-fade 0.8s ease forwards 0.7s;
}

.stat-float-chip {
  animation: chip-float 2.4s ease-in-out infinite;
}

@keyframes arrow-bounce-up {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

@keyframes arrow-bounce-down {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(4px);
  }
}

@keyframes spark-draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes spark-fade {
  to {
    opacity: 1;
  }
}

@keyframes chip-float {
  0%,
  100% {
    transform: translateY(0) translateZ(20px);
  }
  50% {
    transform: translateY(-6px) translateZ(28px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .stat-arrow.is-up,
  .stat-arrow.is-down,
  .stat-float-chip,
  .stat-spark-line,
  .stat-spark-area {
    animation: none !important;
  }

  .stat-spark-line {
    stroke-dashoffset: 0;
  }

  .stat-spark-area {
    opacity: 1;
  }

  .stat-card-inner {
    transition: none;
  }
}
</style>
