import { computed, type Ref } from 'vue'
import { ITEMS, matchesSearch } from '@/data/mockData'

export function useSearchOverlay(searchQuery: Ref<string>) {
  const searchFilteredItems = computed(() =>
    ITEMS.filter((item) => matchesSearch(item, searchQuery.value))
  )

  const isSearchActive = computed(() => searchQuery.value.trim().length > 0)

  return {
    searchFilteredItems,
    isSearchActive,
  }
}
