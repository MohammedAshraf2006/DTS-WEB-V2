import { ref, onMounted, onBeforeUnmount } from 'vue'

/**
 * بيدّي عداد رقمي بسيط يعدّ لأعلى لما يظهر في الشاشة (زي أرقام الإحصائيات).
 * بيقبل قيمة نصية زي "10000+" أو "95%" ويستخرج الرقم منها، ويسيب أي prefix/suffix زي ما هو.
 */
export function useCountUp(targetEl, rawValue, duration = 1400) {
  const displayValue = ref(rawValue)
  let observer

  onMounted(() => {
    const match = String(rawValue).match(/^(\D*)([\d,.]+)(\D*)$/)
    if (!match || !targetEl.value) {
      displayValue.value = rawValue
      return
    }

    const [, prefix, numStr, suffix] = match
    const target = parseFloat(numStr.replace(/,/g, ''))
    const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0

    const animate = () => {
      const start = performance.now()
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = target * eased
        displayValue.value = `${prefix}${current.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        })}${suffix}`
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
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
      { threshold: 0.4 }
    )
    observer.observe(targetEl.value)
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { displayValue }
}
