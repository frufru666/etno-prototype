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
  DOCUMENTS,
  getMapPins,
  matchesFilters,
  type EtnoDocument,
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
  'documentType', 'studyPeriod', 'collectionMethod', 'language',
]
function syncFiltersFromQuery() {
  const q = route.query
  const next: Record<string, string[]> = {}
  for (const key of filterKeys) {
    const val = q[key]
    if (val == null) continue
    const arr = Array.isArray(val) ? val : [val]
    if (arr.length) next[key] = arr
  }
  activeFilters.value = next
}

function matchesSearch(doc: EtnoDocument, q: string): boolean {
  const term = q.trim().toLowerCase()
  if (!term) return true
  const parts = [
    doc.id, doc.title, doc.subtitle, doc.abstract, doc.note,
    doc.keywords?.join(' '),
    doc.authors?.map((a) => a.name).join(' '),
    doc.researchers?.map((a) => a.name).join(' '),
    doc.originators?.map((a) => a.name).join(' '),
    doc.obec, doc.okres, doc.kraj, doc.stat, doc.lokalita,
    doc.documentType, doc.researchCollection, doc.collectionMethod,
    doc.language,
  ]
  const searchable = parts.filter(Boolean).join(' ').toLowerCase()
  return searchable.includes(term)
}

const isSearchActive = computed(() => searchQuery.value.trim().length > 0)

const searchPanelLeftPx = computed(() => {
  if (!filterOpen.value || isMobile.value) return 16
  const base = 16 + 280 + 12
  return openSubPanelKey.value ? base + 320 + 12 : base
})

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
watch(isMobile, (mobile) => {
  if (mobile) filterOpen.value = false
  else filterOpen.value = true
})

const filteredDocuments = computed(() => {
  let list = DOCUMENTS.filter((doc) =>
    matchesFilters(doc, activeFilters.value)
  )
  list = list.filter((doc) => matchesSearch(doc, searchQuery.value))
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

const mapPins = computed(() => getMapPins(filteredDocuments.value))

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
  <div class="min-h-screen bg-background">
    <TopNav
      :filter-open="filterOpen"
      :active-filter-count="activeFilterCount"
      :search-query="searchQuery"
      @toggle-filter="filterOpen = !filterOpen"
      @update:search-query="onSearchQueryChange"
    />
    <!-- Mobile nav is 2 rows (~96px), desktop is 57px -->
    <div class="relative pt-[96px] md:pt-[57px]">
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

      <!-- Desktop: floating search results panel over map -->
      <div
        v-if="isSearchActive && !isMobile"
        class="fixed top-20 z-30 transition-[left] duration-200"
        :style="{ left: searchPanelLeftPx + 'px' }"
      >
        <SearchResultsPanel
          :documents="filteredDocuments"
          :query="searchQuery"
        />
      </div>

      <!-- Map: always full width (hidden on mobile when search active) -->
      <div
        v-if="!(isSearchActive && isMobile)"
        class="relative h-[50vh] min-h-[200px] md:h-[calc(100vh-57px)]"
      >
        <MapView :pins="mapPins" />
      </div>

      <!-- Mobile: search results list (replaces map when searching) -->
      <div
        v-if="isSearchActive && isMobile"
        class="min-h-[50vh]"
      >
        <SearchResultsPanel
          :documents="filteredDocuments"
          :query="searchQuery"
          mobile
        />
      </div>

      <!-- Cards: shift right on desktop when filter open so filter doesn't cover them -->
      <div
        v-if="!isSearchActive"
        class="transition-[margin] duration-200"
        :class="filterOpen && !isMobile ? (openSubPanelKey ? 'md:ml-[628px]' : 'md:ml-[296px]') : ''"
      >
        <FilterChips
          :active-filters="activeFilters"
          @remove="removeFilter"
          @clear="clearFilters"
        />
        <ResultsGrid
          :documents="filteredDocuments"
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
            :filtered-count="filteredDocuments.length"
            @update:active-filters="activeFilters = $event"
            @apply="filterOpen = false"
            @close="filterOpen = false"
          />
        </SheetContent>
      </Sheet>

      <Footer v-if="!isSearchActive" />
    </div>
  </div>
</template>
