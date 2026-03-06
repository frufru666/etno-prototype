<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { FILTER_CATEGORIES } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowLeft, X, SlidersHorizontal, MapPin } from 'lucide-vue-next'
import FilterCategoryList from '@/components/ct/FilterCategoryList.vue'
import FilterOptionsPanel from '@/components/ct/FilterOptionsPanel.vue'

const props = withDefaults(
  defineProps<{
    activeFilters: Record<string, string[]>
    mobile?: boolean
    filteredCount?: number
    /** Desktop: which category sub-panel is open (filter key). Lifted from parent for two-panel layout. */
    openSubPanelKey?: string | null
  }>(),
  { mobile: false, filteredCount: 0, openSubPanelKey: null }
)

const emit = defineEmits<{
  (e: 'update:activeFilters', payload: Record<string, string[]>): void
  (e: 'apply'): void
  (e: 'close'): void
  (e: 'update:openSubPanelKey', key: string | null): void
}>()

// Unified active panel key (used for both mobile and desktop)
const activePanelKey = ref<string | null>(null)

// Sync from parent when e.g. click-outside closes the panel (Desktop)
watch(
  () => props.openSubPanelKey,
  (v) => {
    if (!props.mobile) {
      activePanelKey.value = v ?? null
    }
  },
  { immediate: true }
)

// Search query per expanded category
const searchQuery = ref<Record<string, string>>({})

function setValue(filterKey: string, value: string, selected: boolean) {
  const current = props.activeFilters[filterKey] ?? []
  const next = selected
    ? (current.includes(value) ? current : [...current, value])
    : current.filter((v) => v !== value)
  const nextFilters = { ...props.activeFilters }
  if (next.length) nextFilters[filterKey] = next
  else delete nextFilters[filterKey]
  emit('update:activeFilters', nextFilters)
}

function clearCategory(filterKey: string) {
  const next = { ...props.activeFilters }
  delete next[filterKey]
  emit('update:activeFilters', next)
}

function clearAll() {
  emit('update:activeFilters', {})
  if (props.mobile) activePanelKey.value = null
}

function getSearchKey(filterKey: string): string {
  return searchQuery.value[filterKey] ?? ''
}

function setSearchKey(filterKey: string, q: string) {
  searchQuery.value = { ...searchQuery.value, [filterKey]: q }
}

function toggleCategory(key: string) {
  if (activePanelKey.value === key) {
    closeSubPanel()
  } else {
    activePanelKey.value = key
    if (!props.mobile) {
      emit('update:openSubPanelKey', key)
    }
  }
}

function closeSubPanel() {
  activePanelKey.value = null
  if (!props.mobile) {
    emit('update:openSubPanelKey', null)
  }
}

// Desktop: close second panel on click outside it (selection is kept)
const desktopSubPanelRef = ref<HTMLElement | null>(null)
function onDocumentMousedown(e: MouseEvent) {
  if (props.mobile) return
  if (!activePanelKey.value || !desktopSubPanelRef.value) return
  const target = e.target as Node
  if (!desktopSubPanelRef.value.contains(target)) closeSubPanel()
}
onMounted(() => {
  document.addEventListener('mousedown', onDocumentMousedown)
})
onUnmounted(() => {
  document.removeEventListener('mousedown', onDocumentMousedown)
})

function getCategoryLabel(filterKey: string): string {
  for (const cat of Object.values(FILTER_CATEGORIES)) {
    const f = cat.filters.find((x) => x.key === filterKey)
    if (f) return f.label
  }
  return filterKey
}

const totalActiveCount = computed(() =>
  Object.values(props.activeFilters).reduce((sum, arr) => sum + (arr?.length ?? 0), 0)
)
</script>

<template>
  <div
    class="flex flex-col"
    :class="mobile ? 'h-full w-full bg-background' : 'min-w-0 flex-1'"
  >
    <!-- Desktop: two separate floating panels over map (wireframe) -->
    <template v-if="!mobile">
      <div class="flex items-start gap-3 min-w-0">
        <!-- Panel 1: category list — standalone floating card 280px -->
        <div class="w-[280px] shrink-0 flex min-h-0 flex-col max-h-[calc(100vh-90px)] overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          <div class="flex shrink-0 items-center justify-between p-4 pb-0 mb-3">
            <div class="flex items-center gap-1.5">
              <SlidersHorizontal class="h-5 w-5 text-foreground" aria-hidden />
              <span class="text-lg font-bold tracking-tight text-foreground">Filter Aktivít</span>
            </div>
            <button
              type="button"
              class="text-sm font-semibold text-destructive px-1 py-0.5 transition-opacity hover:opacity-80"
              :class="totalActiveCount === 0 && 'opacity-50 pointer-events-none'"
              @click="clearAll"
            >
              Reset all
            </button>
          </div>
          <div class="min-h-0 flex-1 overflow-hidden">
            <ScrollArea class="h-full">
              <div class="px-4 pb-4">
                <FilterCategoryList
                  :active-filters="activeFilters"
                  :active-key="activePanelKey"
                  @select="toggleCategory"
                />
              </div>
            </ScrollArea>
          </div>
        </div>
        <!-- Panel 2: sub-panel — standalone floating card 320px (closes on click outside) -->
        <div
          v-if="activePanelKey"
          ref="desktopSubPanelRef"
          class="w-[320px] shrink-0 flex min-h-0 flex-col max-h-[calc(100vh-90px)] overflow-hidden rounded-xl border border-border bg-card shadow-lg"
        >
          <div class="shrink-0 flex items-center justify-between gap-2 px-4 pb-3 pt-4">
            <div class="flex items-center gap-2">
              <Button
                type="button"
                size="icon"
                class="h-9 w-9 shrink-0 rounded-lg bg-primary-500 text-white hover:bg-primary-600"
                aria-label="Späť"
                @click="closeSubPanel"
              >
                <ArrowLeft class="h-5 w-5" />
              </Button>
              <span class="text-base font-semibold tracking-tight text-foreground">{{ getCategoryLabel(activePanelKey) }}</span>
            </div>
            <button
              type="button"
              class="text-sm font-semibold text-destructive px-2 py-1 transition-opacity hover:opacity-80"
              :class="(activeFilters[activePanelKey]?.length ?? 0) === 0 && 'opacity-50 pointer-events-none'"
              @click="clearCategory(activePanelKey)"
            >
              Reset
            </button>
          </div>
          <div class="flex min-h-0 flex-1 flex-col overflow-hidden pb-4">
            <FilterOptionsPanel
              :filter-key="activePanelKey"
              :active-filters="activeFilters"
              :search-query="getSearchKey(activePanelKey)"
              @update:search-query="(q) => setSearchKey(activePanelKey!, q)"
              @toggle="(val, sel) => setValue(activePanelKey!, val, sel)"
            />
          </div>
        </div>
      </div>
    </template>

    <!-- Mobile: top bar per wireframe — left: title, right: close (Zavrieť filter + X) -->
    <template v-else>
      <header class="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
        <h2 class="text-lg font-bold tracking-tight text-foreground">Filter Aktivít</h2>
        <Button
          variant="secondary"
          size="sm"
          class="gap-2 rounded-lg font-semibold"
          @click="emit('close')"
        >
          <X class="h-5 w-5" aria-hidden />
          <span>Zavrieť filter</span>
        </Button>
      </header>
      <!-- Mobile step 2: sub-panel -->
      <template v-if="activePanelKey">
        <div class="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div class="shrink-0 flex items-center justify-between gap-2 px-4 pb-3 pt-4">
            <div class="flex items-center gap-2">
              <Button
                type="button"
                size="icon"
                class="h-9 w-9 shrink-0 rounded-lg bg-primary-500 text-white hover:bg-primary-600"
                aria-label="Späť"
                @click="closeSubPanel"
              >
                <ArrowLeft class="h-5 w-5" />
              </Button>
              <span class="text-base font-semibold tracking-tight text-foreground">{{ getCategoryLabel(activePanelKey) }}</span>
            </div>
          </div>
          <div class="flex min-h-0 flex-1 flex-col pb-4">
            <FilterOptionsPanel
              :filter-key="activePanelKey"
              :active-filters="activeFilters"
              :search-query="getSearchKey(activePanelKey)"
              @update:search-query="(q) => setSearchKey(activePanelKey!, q)"
              @toggle="(val, sel) => setValue(activePanelKey!, val, sel)"
            />
          </div>
          <div class="flex flex-col gap-2 border-t border-border p-3">
            <Button class="w-full gap-2" @click="emit('apply')">
              <span>Zobraziť {{ filteredCount }} výsledkov</span>
              <MapPin class="h-4 w-4" />
            </Button>
            <button
              v-if="totalActiveCount > 0"
              type="button"
              class="w-full py-2 text-center text-sm font-semibold text-destructive transition-opacity hover:opacity-80"
              @click="clearAll"
            >
              Resetovať všetky filtre ({{ totalActiveCount }})
            </button>
          </div>
        </div>
      </template>

      <!-- Mobile step 1: category list (title is in top bar) -->
      <template v-else>
        <ScrollArea class="flex-1 min-h-0">
          <div class="px-4 pt-4 pb-4">
            <FilterCategoryList
              :active-filters="activeFilters"
              @select="toggleCategory"
            />
          </div>
        </ScrollArea>
        <div class="flex flex-col gap-2 border-t border-border p-3">
          <Button class="w-full gap-2" @click="emit('apply')">
            <span>Zobraziť {{ filteredCount }} výsledkov</span>
            <MapPin class="h-4 w-4" />
          </Button>
          <!-- Reset below CTA when a selection is made (wireframe) -->
          <button
            v-if="totalActiveCount > 0"
            type="button"
            class="w-full py-2 text-center text-sm font-semibold text-destructive transition-opacity hover:opacity-80"
            @click="clearAll"
          >
            Resetovať všetky filtre ({{ totalActiveCount }})
          </button>
        </div>
      </template>
    </template>
  </div>
</template>
