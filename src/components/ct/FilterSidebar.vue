<script setup lang="ts">
import { ref, watch } from 'vue'
import { FILTER_CATEGORIES, getOptionsWithCounts } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tag, MapPin, FileText, ChevronRight, ArrowLeft, X } from 'lucide-vue-next'

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

/** Desktop: open second panel for this category */
function openDesktopSubPanel(key: string) {
  desktopSubPanelKey.value = key
  emit('update:openSubPanelKey', key)
}

/** Desktop: close second panel */
function closeDesktopSubPanel() {
  desktopSubPanelKey.value = null
  emit('update:openSubPanelKey', null)
}

function getCategoryLabel(filterKey: string): string {
  for (const cat of Object.values(FILTER_CATEGORIES)) {
    const f = cat.filters.find((x) => x.key === filterKey)
    if (f) return f.label
  }
  return filterKey
}
</script>

<template>
  <div
    class="flex h-full flex-col border-r border-neutral-200 bg-white"
    :class="mobile ? 'w-full' : 'min-w-0 flex-1'"
  >
    <!-- Desktop: two-panel layout (Panel 1 + Panel 2 side by side) -->
    <template v-if="!mobile">
      <div class="flex h-full min-w-0">
        <!-- Panel 1: category list -->
        <div class="flex h-full w-[304px] shrink-0 flex-col border-r border-neutral-200">
          <div class="flex items-center justify-between border-b border-neutral-200 p-3">
            <h2 class="text-sm font-semibold">Filter Aktivít</h2>
            <Button
              variant="ghost"
              size="sm"
              class="h-8 text-primary-600 hover:text-primary-700"
              @click="clearAll"
            >
              Reset all
            </Button>
          </div>
          <ScrollArea class="max-h-[calc(100vh-57px)] flex-1">
            <div class="p-2">
              <template v-for="catKey in categoryOrder" :key="catKey">
                <template v-if="FILTER_CATEGORIES[catKey]">
                  <div class="mb-2 mt-3 first:mt-0">
                    <div class="flex items-center gap-2 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <component :is="getSectionIcon(FILTER_CATEGORIES[catKey].icon)" class="h-3.5 w-3.5" />
                      {{ FILTER_CATEGORIES[catKey].label }}
                    </div>
                    <button
                      v-for="filter in FILTER_CATEGORIES[catKey].filters"
                      :key="filter.key"
                      type="button"
                      class="flex w-full items-center justify-between gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors hover:bg-muted/50"
                      :class="[
                        desktopSubPanelKey === filter.key
                          ? 'border-2 border-primary-500 bg-primary-50/30'
                          : 'border-transparent',
                        getSelectedCount(filter.key) > 0 && desktopSubPanelKey !== filter.key && 'border-primary-200 bg-primary-50/50',
                      ]"
                      @click.stop="openDesktopSubPanel(filter.key)"
                    >
                      <span class="truncate font-medium">{{ filter.label }}</span>
                      <div class="flex shrink-0 items-center gap-1">
                        <span
                          v-if="getSelectedCount(filter.key) > 0"
                          class="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700"
                        >
                          {{ getSelectedCount(filter.key) }}
                        </span>
                        <ChevronRight class="h-4 w-4 shrink-0 text-muted-foreground" />
                      </div>
                    </button>
                  </div>
                </template>
              </template>
            </div>
          </ScrollArea>
        </div>
        <!-- Panel 2: sub-panel with search + checkboxes (~320px), opens when category clicked -->
        <div
          v-if="desktopSubPanelKey"
          class="flex h-full w-[320px] shrink-0 flex-col border-r border-neutral-200 bg-white shadow-lg"
        >
          <div class="flex items-center justify-between gap-2 border-b border-neutral-200 p-3">
            <Button
              variant="ghost"
              size="icon"
              class="h-8 w-8 shrink-0"
              aria-label="Späť"
              @click="closeDesktopSubPanel"
            >
              <ArrowLeft class="h-4 w-4" />
            </Button>
            <span class="min-w-0 truncate font-medium">{{ getCategoryLabel(desktopSubPanelKey) }}</span>
            <Button
              variant="ghost"
              size="sm"
              class="h-8 shrink-0 text-muted-foreground"
              @click="clearCategory(desktopSubPanelKey)"
            >
              Reset
            </Button>
          </div>
          <div class="flex flex-1 flex-col overflow-hidden p-3">
            <div class="relative mb-2">
              <Input
                :model-value="getSearchKey(desktopSubPanelKey)"
                type="search"
                class="h-9 pr-8"
                placeholder="Hľadať..."
                @update:model-value="setSearchKey(desktopSubPanelKey, $event)"
              />
              <button
                v-if="getSearchKey(desktopSubPanelKey)"
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Vymazať"
                @click="setSearchKey(desktopSubPanelKey, '')"
              >
                <X class="h-4 w-4" />
              </button>
            </div>
            <ScrollArea class="max-h-[calc(100vh-57px-120px)] flex-1">
              <div class="space-y-1 pr-2">
                <label
                  v-for="opt in getFilteredOptions(desktopSubPanelKey)"
                  :key="opt.value"
                  class="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted/50"
                >
                  <Checkbox
                    :checked="isSelected(desktopSubPanelKey, opt.value)"
                    @update:checked="(v) => setValue(desktopSubPanelKey, opt.value, v === true)"
                  />
                  <span class="flex-1 text-sm">{{ opt.value }}</span>
                  <span class="text-xs text-primary-600">({{ opt.count }})</span>
                </label>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </template>

    <!-- Mobile: single-panel layout -->
    <template v-else>
      <!-- Header (mobile) -->
      <div class="flex items-center justify-between border-b border-neutral-200 p-3">
        <h2 class="text-sm font-semibold">Filter Aktivít</h2>
        <Button
          variant="ghost"
          size="sm"
          class="h-8 text-primary-600 hover:text-primary-700"
          @click="clearAll"
        >
          Reset all
        </Button>
      </div>

    <!-- Mobile: step 2 sub-panel -->
    <template v-if="mobile && selectedCategoryKey">
      <div class="flex flex-1 flex-col overflow-hidden">
        <div class="flex items-center gap-2 border-b border-neutral-200 p-3">
          <Button
            variant="ghost"
            size="icon"
            class="h-8 w-8"
            aria-label="Späť"
            @click="closeMobileSubPanel"
          >
            <ArrowLeft class="h-4 w-4" />
          </Button>
          <span class="font-medium">{{ getCategoryLabel(selectedCategoryKey) }}</span>
        </div>
        <div class="flex flex-1 flex-col overflow-hidden p-3">
          <div class="relative mb-2">
            <Input
              :model-value="getSearchKey(selectedCategoryKey)"
              type="search"
              class="h-9 pr-8"
              placeholder="Hľadať..."
              @update:model-value="setSearchKey(selectedCategoryKey, $event)"
            />
            <button
              v-if="getSearchKey(selectedCategoryKey)"
              type="button"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Vymazať"
              @click="setSearchKey(selectedCategoryKey, '')"
            >
              <X class="h-4 w-4" />
            </button>
          </div>
          <ScrollArea class="flex-1 max-h-[50vh]">
            <div class="space-y-1 pr-2">
              <label
                v-for="opt in getFilteredOptions(selectedCategoryKey)"
                :key="opt.value"
                class="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted/50"
              >
                <Checkbox
                  :checked="isSelected(selectedCategoryKey, opt.value)"
                  @update:checked="(v) => setValue(selectedCategoryKey, opt.value, v === true)"
                />
                <span class="flex-1 text-sm">{{ opt.value }}</span>
                <span class="text-xs text-muted-foreground">({{ opt.count }})</span>
              </label>
            </div>
          </ScrollArea>
          <Button
            variant="ghost"
            size="sm"
            class="mt-2 w-full justify-start text-muted-foreground"
            @click="clearCategory(selectedCategoryKey)"
          >
            Resetovať túto kategóriu
          </Button>
        </div>
        <div class="flex flex-col gap-2 border-t border-neutral-200 p-3">
          <Button
            class="w-full"
            @click="emit('apply')"
          >
            Zobraziť {{ filteredCount }} výsledkov
          </Button>
          <Button
            variant="ghost"
            size="sm"
            class="w-full text-muted-foreground"
            @click="clearAll"
          >
            Resetovať všetky filtre
          </Button>
        </div>
      </div>
    </template>

    <!-- Mobile: step 1 list -->
    <template v-else>
      <ScrollArea class="flex-1">
        <div class="p-2">
          <template v-for="catKey in categoryOrder" :key="catKey">
            <template v-if="FILTER_CATEGORIES[catKey]">
              <div class="mb-2 mt-3 first:mt-0">
                <div class="flex items-center gap-2 px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <component :is="getSectionIcon(FILTER_CATEGORIES[catKey].icon)" class="h-3.5 w-3.5" />
                  {{ FILTER_CATEGORIES[catKey].label }}
                </div>
                <button
                  v-for="filter in FILTER_CATEGORIES[catKey].filters"
                  :key="filter.key"
                  type="button"
                  class="flex w-full items-center justify-between gap-2 rounded-md border border-transparent px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted/50"
                  :class="getSelectedCount(filter.key) > 0 && 'border-primary-200 bg-primary-50/50'"
                  @click="openMobileCategory(filter.key)"
                >
                  <span class="truncate font-medium">{{ filter.label }}</span>
                  <div class="flex shrink-0 items-center gap-1">
                    <span
                      v-if="getSelectedCount(filter.key) > 0"
                      class="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700"
                    >
                      {{ getSelectedCount(filter.key) }}
                    </span>
                    <ChevronRight class="h-4 w-4 text-muted-foreground" />
                  </div>
                </button>
              </div>
            </template>
          </template>
        </div>
      </ScrollArea>
      <div class="flex flex-col gap-2 border-t border-neutral-200 p-3">
        <Button class="w-full" @click="emit('apply')">
          Zobraziť {{ filteredCount }} výsledkov
        </Button>
        <Button variant="ghost" size="sm" class="w-full text-muted-foreground" @click="clearAll">
          Resetovať všetky filtre
        </Button>
      </div>
    </template>
    </template>
  </div>
</template>
