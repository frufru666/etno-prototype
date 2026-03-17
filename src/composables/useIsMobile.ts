import { onUnmounted, ref } from 'vue'
import type { Ref } from 'vue'

const QUERY = '(max-width: 767px)'

/**
 * Returns true when viewport width is below 768px (mobile).
 * Matches ETNO-SPEC breakpoint for nav and filter behavior.
 * Uses synchronous matchMedia so the correct layout renders on first paint (e.g. reload at narrow width).
 */
export function useIsMobile(): Ref<boolean> {
  const isMobile = ref(false)

  if (typeof window === 'undefined') {
    return isMobile
  }

  const mql = window.matchMedia(QUERY)
  isMobile.value = mql.matches

  const handler = (e: MediaQueryListEvent) => {
    isMobile.value = e.matches
  }
  mql.addEventListener('change', handler)
  onUnmounted(() => {
    mql.removeEventListener('change', handler)
  })

  return isMobile
}
