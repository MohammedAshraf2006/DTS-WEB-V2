import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * Animated numeric display that counts up (or down) when the element enters view.
 * Accepts values like "10000+", "95%", "+12%", "-48%".
 */
export function useCountUp(targetEl, rawValue, options = {}) {
  const { duration = 1600, direction = 'up' } = options
  const displayValue = ref(direction === 'up' ? formatStart(rawValue) : String(rawValue))
  let observer
  let rafId

  function formatStart(raw) {
    const match = String(raw).match(/^(\D*)([\d,.]+)(\D*)$/)
    if (!match) return raw
    const [, prefix, , suffix] = match
    return `${prefix}0${suffix}`
  }

  onMounted(() => {
    const match = String(rawValue).match(/^(\D*)([\d,.]+)(\D*)$/)
    if (!match || !targetEl.value) {
      displayValue.value = rawValue
      return
    }

    const [, prefix, numStr, suffix] = match
    const target = parseFloat(numStr.replace(/,/g, ''))
    const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0
    const startValue = direction === 'down' ? target * 1.55 : 0

    const animate = () => {
      const start = performance.now()
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = startValue + (target - startValue) * eased
        displayValue.value = `${prefix}${current.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        })}${suffix}`
        if (progress < 1) rafId = requestAnimationFrame(step)
      }
      rafId = requestAnimationFrame(step)
    }

    if (!('IntersectionObserver' in window)) {
      animate()
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.35 }
    )
    observer.observe(targetEl.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    if (rafId) cancelAnimationFrame(rafId)
  })

  return { displayValue }
}
