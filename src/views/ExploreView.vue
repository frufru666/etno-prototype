<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import TopNav from '@/components/ct/TopNav.vue'
import FilterSidebar from '@/components/ct/FilterSidebar.vue'
import FilterChips from '@/components/ct/FilterChips.vue'
import ResultsGrid from '@/components/ct/ResultsGrid.vue'
import Footer from '@/components/ct/Footer.vue'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import {
  DOCUMENTS,
  matchesFilters,
  type EtnoDocument,
} from '@/data/mockData'
import { useIsMobile } from '@/composables/useIsMobile'

const route = useRoute()
const isMobile = useIsMobile()
const filterOpen = ref(false)
const openSubPanelKey = ref<string | null>(null)
const activeFilters = ref<Record<string, string[]>>({})
const sortKey = ref('id')
const sortOrder = ref<'asc' | 'desc'>('asc')

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

onMounted(() => {
  filterOpen.value = !isMobile.value
  syncFiltersFromQuery()
})
watch(() => route.query, syncFiltersFromQuery, { deep: true })
watch(isMobile, (mobile) => {
  if (mobile) filterOpen.value = false
  else filterOpen.value = true
})

const filteredDocuments = computed(() => {
  const list = DOCUMENTS.filter((doc) =>
    matchesFilters(doc, activeFilters.value)
  )
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
  <div class="min-h-screen bg-gray-50">
    <TopNav
      :filter-open="filterOpen"
      :active-filter-count="activeFilterCount"
      @toggle-filter="filterOpen = !filterOpen"
    />
    <div class="pt-[49px] md:pt-[57px]">
      <!-- Desktop: fixed floating FilterSidebar (Panel 1 + Panel 2 when category open) -->
      <aside
        v-if="filterOpen && !isMobile"
        ref="filterAsideRef"
        class="fixed left-0 top-[57px] z-40 flex h-[calc(100vh-57px)] overflow-visible border-r border-neutral-200 bg-white shadow-lg transition-[width] duration-200"
        :class="openSubPanelKey ? 'w-[624px]' : 'w-[304px]'"
        aria-label="Filter panel"
      >
        <FilterSidebar
          :active-filters="activeFilters"
          v-model:open-subpanel-key="openSubPanelKey"
          @update:active-filters="activeFilters = $event"
        />
      </aside>

      <!-- Map + content: shift right on desktop when filter open so sidebar doesn't cover -->
      <div
        class="transition-[margin] duration-200"
        :class="filterOpen && !isMobile ? (openSubPanelKey ? 'md:ml-[624px]' : 'md:ml-[304px]') : ''"
      >
        <!-- Map area: full viewport height below nav -->
        <div
          class="relative h-[50vh] min-h-[200px] md:h-[calc(100vh-57px)]"
        >
          <div
            class="absolute inset-0 flex items-center justify-center bg-neutral-200 text-muted-foreground"
          >
            Map placeholder
          </div>
        </div>

        <!-- FilterChips + ResultsGrid (scroll with page) -->
        <div>
          <FilterChips
          :active-filters="activeFilters"
          @remove="removeFilter"
          @clear="clearFilters"
        />
        <ResultsGrid
          :documents="filteredDocuments"
          :sort-key="sortKey"
          :sort-order="sortOrder"
          @update:sort-key="sortKey = $event"
          @update:sort-order="sortOrder = $event"
        />
        </div>
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
          />
        </SheetContent>
      </Sheet>

      <Footer />
    </div>
  </div>
</template>
