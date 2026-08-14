import { ref } from 'vue'

/**
 * Lightweight perspective tilt for sculpted panels.
 * @param {{ maxX?: number, maxY?: number }} options
 */
export function useCardTilt(options = {}) {
  const maxX = options.maxX ?? 8
  const maxY = options.maxY ?? 10
  const root = ref(null)
  const tilt = ref({ x: 0, y: 0 })

  function onMove(e) {
    const el = root.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    tilt.value = {
      x: (py - 0.5) * -maxX,
      y: (px - 0.5) * maxY
    }
  }

  function onLeave() {
    tilt.value = { x: 0, y: 0 }
  }

  return { root, tilt, onMove, onLeave }
}
