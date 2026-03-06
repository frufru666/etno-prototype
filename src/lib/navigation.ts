import type { Router } from 'vue-router'

export function pushExploreSearch(router: Router, rawQuery: string) {
  const query = rawQuery.trim()
  return router.push({
    name: 'explore',
    query: query ? { q: query } : {},
  })
}
