<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import TopNav from '@/components/ct/TopNav.vue'
import FilterChips from '@/components/ct/FilterChips.vue'
import ResultsGrid from '@/components/ct/ResultsGrid.vue'
import Footer from '@/components/ct/Footer.vue'
import {
  DOCUMENTS,
  matchesFilters,
  type EtnoDocument,
} from '@/data/mockData'
import { useIsMobile } from '@/composables/useIsMobile'

const isMobile = useIsMobile()
const filterOpen = ref(false)
const activeFilters = ref<Record<string, string[]>>({})
const sortKey = ref('id')
const sortOrder = ref<'asc' | 'desc'>('asc')

// Desktop: filter open by default; mobile: closed
onMounted(() => {
  filterOpen.value = !isMobile.value
})
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
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <TopNav
      :filter-open="filterOpen"
      :active-filter-count="activeFilterCount"
      @toggle-filter="filterOpen = !filterOpen"
    />
    <div class="pt-[49px] md:pt-[57px]">
      <!-- Map area: full viewport height below nav -->
      <div
        class="relative h-[50vh] min-h-[200px] md:h-[calc(100vh-57px)]"
      >
        <div
          class="absolute inset-0 flex items-center justify-center bg-neutral-200 text-muted-foreground"
        >
          Map placeholder
        </div>
        <!-- FilterSidebar placeholder: floats over map when open -->
        <aside
          v-if="filterOpen"
          class="fixed left-0 top-[57px] z-40 h-[calc(100vh-57px)] w-[304px] border-r border-neutral-200 bg-white shadow-md max-md:top-[49px] max-md:h-[calc(100vh-49px)] max-md:w-[280px]"
        >
          <div class="flex items-center justify-between border-b border-neutral-200 p-3">
            <h2 class="text-sm font-semibold">Filter Aktivít</h2>
            <button
              type="button"
              class="text-sm text-primary-600 hover:underline"
              @click="clearFilters"
            >
              Reset všetky
            </button>
          </div>
          <p class="p-3 text-sm text-muted-foreground">
            Filter kategórie (placeholder)
          </p>
        </aside>
      </div>

      <FilterChips
        :active-filters="activeFilters"
        @remove="removeFilter"
        @clear="clearFilters"
      />

      <!-- Results: margin-left when filter open on desktop -->
      <div
        class="transition-[margin] duration-200"
        :class="filterOpen ? 'md:ml-[304px]' : 'md:ml-0'"
      >
        <ResultsGrid
          :documents="filteredDocuments"
          :sort-key="sortKey"
          :sort-order="sortOrder"
          @update:sort-key="sortKey = $event"
          @update:sort-order="sortOrder = $event"
        />
      </div>

      <Footer />
    </div>
  </div>
</template>
