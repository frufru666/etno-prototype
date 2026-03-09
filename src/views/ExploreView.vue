<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopNav from '@/components/ct/TopNav.vue'
import FilterSidebar from '@/components/ct/FilterSidebar.vue'
import FilterChips from '@/components/ct/FilterChips.vue'
import ResultsGrid from '@/components/ct/ResultsGrid.vue'
import SearchOverlayPanel from '@/components/ct/SearchOverlayPanel.vue'
import Footer from '@/components/ct/Footer.vue'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import {
  getMapPins,
  getFilterQueryKeys,
  matchesFilters,
  matchesSearch,
  ITEMS,
} from '@/data/mockData'
import MapView from '@/components/ct/MapView.vue'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/composables/useIsMobile'
import { sortEtnoItems, type ItemSortKey } from '@/lib/itemPresentation'
import { pushExploreSearch } from '@/lib/navigation'
import { PhSlidersHorizontal, PhX } from '@phosphor-icons/vue'

const route = useRoute()
const router = useRouter()
const isMobile = useIsMobile()
const filterOpen = ref(false)
const openSubPanelKey = ref<string | null>(null)
const activeFilters = ref<Record<string, string[]>>({})
const sortKey = ref<ItemSortKey>('id')
const sortOrder = ref<'asc' | 'desc'>('asc')
const searchQuery = ref('')

// Build activeFilters from route.query (e.g. from Detail filter links)
const filterKeys = getFilterQueryKeys()

let syncingFromQuery = false
function syncFiltersFromQuery() {
  syncingFromQuery = true
  const q = route.query
  const next: Record<string, string[]> = {}
  for (const key of filterKeys) {
    const val = q[key]
    if (val == null) continue
    const arr = Array.isArray(val) ? val : [val]
    if (arr.length) next[key] = arr
  }
  activeFilters.value = next
  queueMicrotask(() => {
    syncingFromQuery = false
  })
}

onMounted(() => {
  filterOpen.value = !isMobile.value
  syncFiltersFromQuery()
  const q = route.query.q ?? route.query.query
  searchQuery.value = typeof q === 'string' ? q : ''
})
watch(() => route.query, (query) => {
  syncFiltersFromQuery()
  const q = query.q ?? query.query
  searchQuery.value = typeof q === 'string' ? q : ''
}, { deep: true })

watch(activeFilters, (filters) => {
  if (syncingFromQuery) return
  const nextQuery: Record<string, unknown> = { ...route.query }

  // remove existing filter keys from query
  for (const key of filterKeys) delete nextQuery[key]

  // add active filters into query (so they persist on back navigation)
  for (const [key, values] of Object.entries(filters)) {
    if (!values?.length) continue
    nextQuery[key] = values.length === 1 ? values[0] : values
  }

  router.replace({ query: nextQuery })
}, { deep: true })
watch(isMobile, (mobile) => {
  if (mobile) filterOpen.value = false
  else filterOpen.value = true
})

const filteredItems = computed(() => {
  let list = ITEMS.filter((item) =>
    matchesFilters(item, activeFilters.value)
  )
  list = list.filter((item) => matchesSearch(item, searchQuery.value))
  return sortEtnoItems(list, sortKey.value, sortOrder.value)
})

const activeFilterCount = computed(() => {
  return Object.values(activeFilters.value).reduce(
    (sum, arr) => sum + (arr?.length ?? 0),
    0
  )
})

const mapPins = computed(() => getMapPins(filteredItems.value))

function removeFilter(key: string, value: string) {
  const next = { ...activeFilters.value }
  const arr = next[key]?.filter((v) => v !== value) ?? []
  if (arr.length) next[key] = arr
  else delete next[key]
  activeFilters.value = next
}

function clearFilters() {
  activeFilters.value = {}
}

function onSearchQueryChange(value: string) {
  searchQuery.value = value
  const next = { ...route.query }
  if (value.trim()) next.q = value.trim()
  else delete next.q
  router.replace({ query: next })
}

// Desktop: close sub-panel when clicking outside the filter aside
const filterAsideRef = ref<HTMLElement | null>(null)
function onDocumentMousedown(e: MouseEvent) {
  if (!isMobile.value && openSubPanelKey.value && filterAsideRef.value && !filterAsideRef.value.contains(e.target as Node)) {
    openSubPanelKey.value = null
  }
}
onMounted(() => {
  document.addEventListener('mousedown', onDocumentMousedown)
})
onUnmounted(() => {
  document.removeEventListener('mousedown', onDocumentMousedown)
})
</script>

<template>
  <div class="min-h-dvh bg-background flex flex-col">
    <TopNav
      :filter-open="filterOpen"
      :active-filter-count="activeFilterCount"
      :search-query="searchQuery"
      @toggle-filter="filterOpen = !filterOpen"
      @update:search-query="onSearchQueryChange"
    />
    <!-- Fixed over map: Filter / Close filter button (not part of nav) -->
    <div
      class="fixed left-4 z-40 flex items-center gap-2"
      :class="isMobile ? 'top-[53px]' : 'top-[65px]'"
    >
      <Button
        v-if="filterOpen"
        type="button"
        variant="outline"
        size="lg"
        class="gap-2 rounded-md shadow-sm"
        aria-label="Zavrieť filter"
        @click="filterOpen = false"
      >
        <PhX class="size-6" />
        Zavrieť filter
      </Button>
      <Button
        v-else
        type="button"
        variant="primary"
        size="lg"
        class="gap-2 rounded-md font-semibold shadow-sm"
        aria-label="Filter"
        @click="filterOpen = true"
      >
        <PhSlidersHorizontal class="size-6" />
        Filter
        <span
          v-if="activeFilterCount > 0"
          class="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/20 px-1.5 text-xs font-semibold"
        >
          {{ activeFilterCount }}
        </span>
      </Button>
    </div>

    <div class="relative flex-1 pt-[49px] md:pt-[61px]">
      <!-- Desktop: floating filter container over map (no layout shift) -->
      <div
        v-if="filterOpen && !isMobile"
        ref="filterAsideRef"
        class="fixed left-4 z-40 overflow-visible"
        style="top: 5rem;"
        aria-label="Filter panel"
      >
        <FilterSidebar
          :active-filters="activeFilters"
          v-model:open-subpanel-key="openSubPanelKey"
          @update:active-filters="activeFilters = $event"
        />
      </div>

      <SearchOverlayPanel
        :items="filteredItems"
        :query="searchQuery"
        :mobile="isMobile"
      />

      <div
        class="relative h-[50vh] min-h-[200px] md:h-[calc(100vh-61px)]"
      >
        <MapView :pins="mapPins" />
      </div>

      <!-- Cards: shift right on desktop when filter open so filter doesn't cover them -->
      <div
        class="transition-[margin] duration-200"
        :class="filterOpen && !isMobile ? (openSubPanelKey ? 'md:ml-[236px] lg:ml-[548px] xl:ml-[628px]' : 'md:ml-[236px] lg:ml-[256px] xl:ml-[296px]') : ''"
      >
        <FilterChips
          :active-filters="activeFilters"
          @remove="removeFilter"
          @clear="clearFilters"
        />
        <ResultsGrid
          :items="filteredItems"
          :sort-key="sortKey"
          :sort-order="sortOrder"
          :search-query="searchQuery"
          @update:sort-key="sortKey = $event"
          @update:sort-order="sortOrder = $event"
        />
      </div>

      <!-- Mobile: Sheet from top when filter open -->
      <Sheet
        :open="isMobile && filterOpen"
        @update:open="(v) => { if (!v) filterOpen = false }"
      >
        <SheetContent
          side="top"
          class="h-[100dvh] max-h-[100dvh] overflow-hidden p-0"
        >
          <FilterSidebar
            mobile
            :active-filters="activeFilters"
            :filtered-count="filteredItems.length"
            @update:active-filters="activeFilters = $event"
            @apply="filterOpen = false"
            @close="filterOpen = false"
          />
        </SheetContent>
      </Sheet>

      <Footer />
    </div>
  </div>
</template>
