/**
 * Apply theme/locale updates. View Transitions are intentionally avoided —
 * they snapshot the starfield and can freeze or hide the site background.
 * Header controls keep their own micro fade animations.
 * @param {() => void} update
 * @returns {Promise<void>}
 */
export async function runViewTransition(update) {
  update()
}
