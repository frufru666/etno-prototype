<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopNav from '@/components/ct/TopNav.vue'
import FilterSidebar from '@/components/ct/FilterSidebar.vue'
import FilterChips from '@/components/ct/FilterChips.vue'
import ResultsGrid from '@/components/ct/ResultsGrid.vue'
import SearchResultsPanel from '@/components/ct/SearchResultsPanel.vue'
import Footer from '@/components/ct/Footer.vue'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import {
  ITEMS,
  getMapPins,
  matchesFilters,
  matchesSearch,
  type EtnoItem,
} from '@/data/mockData'
import MapView from '@/components/ct/MapView.vue'
import { useIsMobile } from '@/composables/useIsMobile'

const route = useRoute()
const router = useRouter()
const isMobile = useIsMobile()
const filterOpen = ref(false)
const openSubPanelKey = ref<string | null>(null)
const activeFilters = ref<Record<string, string[]>>({})
const sortKey = ref('id')
const sortOrder = ref<'asc' | 'desc'>('asc')
const searchQuery = ref('')

// Build activeFilters from route.query (e.g. from Detail filter links)
const filterKeys = [
  'keywords', 'researchCollection', 'author', 'obec', 'okres', 'kraj', 'stat',
  'documentType', 'studyPeriod', 'collectionMethod', 'language', 'document',
]

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

const isSearchActive = computed(() => searchQuery.value.trim().length > 0)

onMounted(() => {
  filterOpen.value = !isMobile.value
  syncFiltersFromQuery()
  const q = route.query.q ?? route.query.query
  if (typeof q === 'string') searchQuery.value = q
})
watch(() => route.query, (query) => {
  syncFiltersFromQuery()
  const q = query.q ?? query.query
  if (typeof q === 'string') searchQuery.value = q
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
  const key = sortKey.value
  const order = sortOrder.value
  return [...list].sort((a, b) => {
    let aVal: string | undefined
    let bVal: string | undefined
    if (key === 'id') {
      aVal = a.id
      bVal = b.id
    } else if (key === 'title') {
      aVal = a.title
      bVal = b.title
    } else if (key === 'studyPeriodStart') {
      aVal = a.studyPeriodStart ?? ''
      bVal = b.studyPeriodStart ?? ''
    } else {
      aVal = a.id
      bVal = b.id
    }
    const cmp = (aVal ?? '').localeCompare(bVal ?? '', undefined, { numeric: true })
    return order === 'asc' ? cmp : -cmp
  })
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
    <!-- Mobile nav is 2 rows (~96px), desktop is 57px -->
    <div class="relative flex-1 pt-[96px] md:pt-[57px]">
      <!-- Desktop: floating filter container over map (no layout shift) -->
      <div
        v-if="filterOpen && !isMobile"
        ref="filterAsideRef"
        class="fixed left-4 top-20 z-40 overflow-visible"
        aria-label="Filter panel"
      >
        <FilterSidebar
          :active-filters="activeFilters"
          v-model:open-subpanel-key="openSubPanelKey"
          @update:active-filters="activeFilters = $event"
        />
      </div>

      <div
        v-if="isSearchActive"
        class="fixed left-4 right-4 top-[104px] z-30 md:left-1/2 md:right-auto md:top-[72px] md:w-[480px] md:-translate-x-1/2"
      >
        <SearchResultsPanel
          :items="filteredItems"
          :query="searchQuery"
          :mobile="isMobile"
        />
      </div>

      <div
        class="relative h-[50vh] min-h-[200px] md:h-[calc(100vh-57px)]"
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
