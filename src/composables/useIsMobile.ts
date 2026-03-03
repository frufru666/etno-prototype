import { useMediaQuery } from '@vueuse/core'
import type { Ref } from 'vue'

/**
 * Returns true when viewport width is below 768px (mobile).
 * Matches ETNO-SPEC breakpoint for nav and filter behavior.
 */
export function useIsMobile(): Ref<boolean> {
  return useMediaQuery('(max-width: 767px)')
}
