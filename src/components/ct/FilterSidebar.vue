<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { FILTER_CATEGORIES, getOptionsWithCounts } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tag, MapPin, FileText, ChevronRight, ArrowLeft, X, Search, SlidersHorizontal, Check } from 'lucide-vue-next'

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

// Mobile only: which category sub-panel is open (filter key)
const selectedCategoryKey = ref<string | null>(null)

// Desktop: which category sub-panel is open (internal state so click always works)
const desktopSubPanelKey = ref<string | null>(null)
// Sync from parent when e.g. click-outside closes the panel
watch(
  () => props.openSubPanelKey,
  (v) => { desktopSubPanelKey.value = v ?? null },
  { immediate: true }
)

// Search query per expanded category (desktop) or for mobile sub-panel
const searchQuery = ref<Record<string, string>>({})

const categoryOrder = ['thematic', 'geographic', 'formal'] as const

const iconMap = {
  Tag,
  MapPin,
  FileText,
}

function getSectionIcon(iconName: keyof typeof iconMap) {
  return iconMap[iconName] ?? FileText
}

function getSelectedCount(key: string): number {
  return props.activeFilters[key]?.length ?? 0
}

function isSelected(key: string, value: string): boolean {
  return props.activeFilters[key]?.includes(value) ?? false
}

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
  if (props.mobile) selectedCategoryKey.value = null
}

function getSearchKey(filterKey: string): string {
  return searchQuery.value[filterKey] ?? ''
}

function setSearchKey(filterKey: string, q: string) {
  searchQuery.value = { ...searchQuery.value, [filterKey]: q }
}

function getFilteredOptions(filterKey: string): { value: string; count: number }[] {
  const options = getOptionsWithCounts(filterKey)
  const q = (getSearchKey(filterKey) ?? '').trim().toLowerCase()
  if (!q) return options
  return options.filter((o) => o.value.toLowerCase().includes(q))
}

function openMobileCategory(key: string) {
  selectedCategoryKey.value = key
}

function closeMobileSubPanel() {
  selectedCategoryKey.value = null
}

/** Desktop: open second panel for this category; toggle off if same key */
function openDesktopSubPanel(key: string) {
  if (desktopSubPanelKey.value === key) {
    closeDesktopSubPanel()
    return
  }
  desktopSubPanelKey.value = key
  emit('update:openSubPanelKey', key)
}

/** Desktop: close second panel (keeps selection) */
function closeDesktopSubPanel() {
  desktopSubPanelKey.value = null
  emit('update:openSubPanelKey', null)
}

// Desktop: close second panel on click outside it (selection is kept)
const desktopSubPanelRef = ref<HTMLElement | null>(null)
function onDocumentMousedown(e: MouseEvent) {
  if (props.mobile) return
  if (!desktopSubPanelKey.value || !desktopSubPanelRef.value) return
  const target = e.target as Node
  if (!desktopSubPanelRef.value.contains(target)) closeDesktopSubPanel()
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
    :class="mobile ? 'h-full w-full bg-white' : 'min-w-0 flex-1'"
  >
    <!-- Desktop: two separate floating panels over map (wireframe) -->
    <template v-if="!mobile">
      <div class="flex items-start gap-3 min-w-0">
        <!-- Panel 1: category list — standalone floating card 280px -->
        <div class="w-[280px] shrink-0 flex flex-col max-h-[calc(100vh-90px)] overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg">
          <div class="flex items-center justify-between p-4 pb-0 mb-3">
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
          <ScrollArea class="flex-1 px-4 pb-4">
            <div class="flex flex-col gap-4">
              <template v-for="catKey in categoryOrder" :key="catKey">
                <template v-if="FILTER_CATEGORIES[catKey]">
                  <div class="flex flex-col gap-2">
                    <div class="flex items-center gap-1 pr-1">
                      <component :is="getSectionIcon(FILTER_CATEGORIES[catKey].icon)" class="h-4 w-4 text-muted-foreground" />
                      <span class="text-[12px] font-medium text-muted-foreground">{{ FILTER_CATEGORIES[catKey].label }}</span>
                    </div>
                    <div class="flex flex-col gap-2">
                      <button
                        v-for="filter in FILTER_CATEGORIES[catKey].filters"
                        :key="filter.key"
                        type="button"
                        class="flex h-9 w-full cursor-pointer items-center justify-between rounded-lg border px-3 transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                        :class="[
                          desktopSubPanelKey === filter.key
                            ? 'border-2 border-primary-500 bg-white'
                            : getSelectedCount(filter.key) > 0
                              ? 'border border-primary-200 bg-primary-50'
                              : 'border border-neutral-200 bg-white',
                        ]"
                        @click.stop="openDesktopSubPanel(filter.key)"
                      >
                        <div class="flex items-center gap-2 min-w-0">
                          <span
                            class="truncate text-sm font-medium tracking-tight"
                            :class="desktopSubPanelKey === filter.key ? 'text-primary-600' : 'text-foreground'"
                          >
                            {{ filter.label }}
                          </span>
                          <span
                            v-if="getSelectedCount(filter.key) > 0"
                            class="flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-primary-500 px-1.5 text-[11px] font-semibold text-white"
                          >
                            {{ getSelectedCount(filter.key) }}
                          </span>
                        </div>
                        <ChevronRight
                          class="h-4 w-4 shrink-0"
                          :class="desktopSubPanelKey === filter.key ? 'text-primary-600' : 'text-foreground'"
                        />
                      </button>
                    </div>
                  </div>
                </template>
              </template>
            </div>
          </ScrollArea>
        </div>
        <!-- Panel 2: sub-panel — standalone floating card 320px (closes on click outside) -->
        <div
          v-if="desktopSubPanelKey"
          ref="desktopSubPanelRef"
          class="w-[320px] shrink-0 flex flex-col max-h-[calc(100vh-90px)] overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg"
        >
          <div class="flex items-center justify-between gap-2 px-4 pb-3 pt-4">
            <div class="flex items-center gap-2">
              <Button
                type="button"
                size="icon"
                class="h-9 w-9 shrink-0 rounded-lg bg-primary-500 text-white hover:bg-primary-600"
                aria-label="Späť"
                @click="closeDesktopSubPanel"
              >
                <ArrowLeft class="h-5 w-5" />
              </Button>
              <span class="text-base font-semibold tracking-tight text-foreground">{{ getCategoryLabel(desktopSubPanelKey) }}</span>
            </div>
            <button
              type="button"
              class="text-sm font-semibold text-destructive px-2 py-1 transition-opacity hover:opacity-80"
              :class="(activeFilters[desktopSubPanelKey]?.length ?? 0) === 0 && 'opacity-50 pointer-events-none'"
              @click="clearCategory(desktopSubPanelKey)"
            >
              Reset
            </button>
          </div>
          <div class="flex flex-1 flex-col overflow-hidden px-4 pb-4">
            <div class="relative mb-2 top-px">
              <Search class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input
                :model-value="getSearchKey(desktopSubPanelKey)"
                type="search"
                class="h-10 pl-10 pr-8 rounded-lg border-neutral-300 focus:border-primary-500 [&::-webkit-search-cancel-button]:hidden"
                placeholder="Hľadať..."
                @update:model-value="setSearchKey(desktopSubPanelKey, $event)"
              />
              <button
                v-if="getSearchKey(desktopSubPanelKey)"
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Vymazať"
                @click="setSearchKey(desktopSubPanelKey, '')"
              >
                <X class="h-4 w-4" />
              </button>
            </div>
            <ScrollArea class="flex-1 min-h-0">
              <div class="flex flex-col">
                <button
                  v-for="opt in getFilteredOptions(desktopSubPanelKey)"
                  :key="opt.value"
                  type="button"
                  class="flex cursor-pointer items-center justify-between border-b border-neutral-100 py-2.5 px-1 text-left transition-colors hover:bg-neutral-50"
                  @click="setValue(desktopSubPanelKey, opt.value, !isSelected(desktopSubPanelKey, opt.value))"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors"
                      :class="isSelected(desktopSubPanelKey, opt.value) ? 'border-primary-500 bg-primary-500' : 'border-neutral-300 bg-white'"
                    >
                      <Check
                        v-if="isSelected(desktopSubPanelKey, opt.value)"
                        class="h-3.5 w-3.5 text-white"
                      />
                    </div>
                    <span class="text-sm font-medium text-foreground">{{ opt.value }}</span>
                  </div>
                  <span class="ml-2 shrink-0 text-sm font-medium text-primary-500">{{ opt.count }}</span>
                </button>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </template>

    <!-- Mobile: top bar per wireframe — left: title, right: close (Zavrieť filter + X) -->
    <template v-else>
      <header class="flex shrink-0 items-center justify-between border-b border-neutral-200 px-4 py-3">
        <h2 class="text-lg font-bold tracking-tight text-foreground">Filter Aktivít</h2>
        <button
          type="button"
          class="flex cursor-pointer items-center gap-2 rounded-lg bg-neutral-100 px-3 py-2 text-base font-semibold text-neutral-700 transition-colors hover:bg-neutral-200"
          @click="emit('close')"
        >
          <X class="h-5 w-5" aria-hidden />
          <span>Zavrieť filter</span>
        </button>
      </header>
      <!-- Mobile step 2: sub-panel -->
      <template v-if="selectedCategoryKey">
        <div class="flex flex-1 flex-col overflow-hidden">
          <div class="flex items-center justify-between gap-2 px-4 pb-3 pt-4">
            <div class="flex items-center gap-2">
              <Button
                type="button"
                size="icon"
                class="h-9 w-9 shrink-0 rounded-lg bg-primary-500 text-white hover:bg-primary-600"
                aria-label="Späť"
                @click="closeMobileSubPanel"
              >
                <ArrowLeft class="h-5 w-5" />
              </Button>
              <span class="text-base font-semibold tracking-tight text-foreground">{{ getCategoryLabel(selectedCategoryKey) }}</span>
            </div>
          </div>
          <div class="flex flex-1 flex-col overflow-hidden px-4 pb-4">
            <div class="relative mb-2 top-px">
              <Search class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input
                :model-value="getSearchKey(selectedCategoryKey)"
                type="search"
                class="h-10 pl-10 pr-8 rounded-lg [&::-webkit-search-cancel-button]:hidden"
                placeholder="Hľadať..."
                @update:model-value="setSearchKey(selectedCategoryKey, $event)"
              />
              <button
                v-if="getSearchKey(selectedCategoryKey)"
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Vymazať"
                @click="setSearchKey(selectedCategoryKey, '')"
              >
                <X class="h-4 w-4" />
              </button>
            </div>
            <ScrollArea class="flex-1 min-h-0">
              <div class="flex flex-col">
                <button
                  v-for="opt in getFilteredOptions(selectedCategoryKey)"
                  :key="opt.value"
                  type="button"
                  class="flex cursor-pointer items-center justify-between border-b border-neutral-100 py-2.5 px-1 text-left transition-colors hover:bg-neutral-50"
                  @click="setValue(selectedCategoryKey, opt.value, !isSelected(selectedCategoryKey, opt.value))"
                >
                  <div class="flex items-center gap-3">
                    <div
                      class="flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors"
                      :class="isSelected(selectedCategoryKey, opt.value) ? 'border-primary-500 bg-primary-500' : 'border-neutral-300 bg-white'"
                    >
                      <Check
                        v-if="isSelected(selectedCategoryKey, opt.value)"
                        class="h-3.5 w-3.5 text-white"
                      />
                    </div>
                    <span class="text-sm font-medium text-foreground">{{ opt.value }}</span>
                  </div>
                  <span class="ml-2 shrink-0 text-sm font-medium text-primary-500">{{ opt.count }}</span>
                </button>
              </div>
            </ScrollArea>
          </div>
          <div class="flex flex-col gap-2 border-t border-neutral-200 p-3">
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
        <ScrollArea class="flex-1">
          <div class="flex flex-col gap-4 px-4 pt-4 pb-4">
            <template v-for="catKey in categoryOrder" :key="catKey">
              <template v-if="FILTER_CATEGORIES[catKey]">
                <div class="flex flex-col gap-2">
                  <div class="flex items-center gap-1 pr-1">
                    <component :is="getSectionIcon(FILTER_CATEGORIES[catKey].icon)" class="h-4 w-4 text-muted-foreground" />
                    <span class="text-[12px] font-medium text-muted-foreground">{{ FILTER_CATEGORIES[catKey].label }}</span>
                  </div>
                  <div class="flex flex-col gap-2">
                    <button
                      v-for="filter in FILTER_CATEGORIES[catKey].filters"
                      :key="filter.key"
                      type="button"
                      class="flex h-9 w-full cursor-pointer items-center justify-between rounded-lg border border-neutral-200 bg-white px-3 transition-colors hover:bg-neutral-50"
                      :class="getSelectedCount(filter.key) > 0 && 'border-primary-200 bg-primary-50'"
                      @click="openMobileCategory(filter.key)"
                    >
                      <div class="flex items-center gap-2 min-w-0">
                        <span class="truncate text-sm font-medium text-foreground">{{ filter.label }}</span>
                        <span
                          v-if="getSelectedCount(filter.key) > 0"
                          class="flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-primary-500 px-1.5 text-[11px] font-semibold text-white"
                        >
                          {{ getSelectedCount(filter.key) }}
                        </span>
                      </div>
                      <ChevronRight class="h-4 w-4 shrink-0 text-foreground" />
                    </button>
                  </div>
                </div>
              </template>
            </template>
          </div>
        </ScrollArea>
        <div class="flex flex-col gap-2 border-t border-neutral-200 p-3">
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
