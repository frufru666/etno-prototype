<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import TopNav from "@/components/ct/TopNav.vue";
import FloatingExploreHeader from "@/components/ct/FloatingExploreHeader.vue";
import ViewSwitcher from "@/components/ct/ViewSwitcher.vue";
import FilterSidebar from "@/components/ct/FilterSidebar.vue";
import FilterChips from "@/components/ct/FilterChips.vue";
import ResultsGrid from "@/components/ct/ResultsGrid.vue";
import SearchOverlayPanel from "@/components/ct/SearchOverlayPanel.vue";
import Footer from "@/components/ct/Footer.vue";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  getMapPins,
  getFilterQueryKeys,
  matchesFilters,
  matchesSearch,
  ITEMS,
} from "@/data/mockData";
import MapView from "@/components/ct/MapView.vue";
import MapFilterInfobox from "@/components/ct/MapFilterInfobox.vue";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/composables/useIsMobile";
import { useVisualViewport } from "@/composables/useVisualViewport";
import { sortEtnoItems, type ItemSortKey } from "@/lib/itemPresentation";
import { pushExploreSearch } from "@/lib/navigation";
import {
  PhCompass,
  PhCrosshair,
  PhSlidersHorizontal,
  PhX,
} from "@phosphor-icons/vue";

const route = useRoute();
const router = useRouter();
const isMobile = useIsMobile();
const { heightPx: visualViewportHeightPx } = useVisualViewport(56);
/** Mobile only: 'map' | 'list' for tab; map is base layer, list is sliding overlay */
const mobileExploreTab = ref<"map" | "list">("map");
/** Mobile: restore scroll position when returning to list view */
const resultsScrollY = ref(0);
const resultsPanelRef = ref<HTMLElement | null>(null);
const desktopListRef = ref<HTMLElement | null>(null);
const desktopSearchOverlayRef = ref<HTMLElement | null>(null);
const mapViewRef = ref<InstanceType<typeof MapView> | null>(null);
const filterOpen = ref(false);
const openSubPanelKey = ref<string | null>(null);
const activeFilters = ref<Record<string, string[]>>({});
const sortKey = ref<ItemSortKey>("id");
const sortOrder = ref<"asc" | "desc">("asc");
const searchQuery = ref("");
const mobileSearchOverlayEnabled = ref(true);
const desktopSearchOverlayEnabled = ref(true);

// Build activeFilters from route.query (e.g. from Detail filter links)
const filterKeys = getFilterQueryKeys();

let syncingFromQuery = false;
function syncFiltersFromQuery() {
  syncingFromQuery = true;
  const q = route.query;
  const next: Record<string, string[]> = {};
  for (const key of filterKeys) {
    const val = q[key];
    if (val == null) continue;
    const arr = Array.isArray(val) ? val : [val];
    if (arr.length) next[key] = arr;
  }
  activeFilters.value = next;
  queueMicrotask(() => {
    syncingFromQuery = false;
  });
}

onMounted(() => {
  if (!isMobile.value) filterOpen.value = true;
  syncFiltersFromQuery();
  const q = route.query.q ?? route.query.query;
  searchQuery.value = typeof q === "string" ? q : "";
  mobileSearchOverlayEnabled.value = true;
  desktopSearchOverlayEnabled.value = true;
});
watch(
  () => route.query,
  (query) => {
    syncFiltersFromQuery();
    const q = query.q ?? query.query;
    searchQuery.value = typeof q === "string" ? q : "";
    mobileSearchOverlayEnabled.value = true;
    desktopSearchOverlayEnabled.value = true;
  },
  { deep: true },
);

watch(
  activeFilters,
  (filters) => {
    if (syncingFromQuery) return;
    const nextQuery: Record<string, unknown> = { ...route.query };

    // remove existing filter keys from query
    for (const key of filterKeys) delete nextQuery[key];

    // add active filters into query (so they persist on back navigation)
    for (const [key, values] of Object.entries(filters)) {
      if (!values?.length) continue;
      nextQuery[key] = values.length === 1 ? values[0] : values;
    }

    router.replace({ query: nextQuery });
  },
  { deep: true },
);
const mapSelectionIds = ref<string[] | null>(null);

const filteredItems = computed(() => {
  let list = ITEMS.filter((item) => matchesFilters(item, activeFilters.value));
  list = list.filter((item) => matchesSearch(item, searchQuery.value));
  if (mapSelectionIds.value && mapSelectionIds.value.length) {
    const selected = new Set(mapSelectionIds.value);
    list = list.filter((item) => selected.has(item.id));
  }
  return sortEtnoItems(list, sortKey.value, sortOrder.value);
});

const activeFilterCount = computed(() => {
  return Object.values(activeFilters.value).reduce(
    (sum, arr) => sum + (arr?.length ?? 0),
    0,
  );
});

const mapPins = computed(() => getMapPins(filteredItems.value));

function removeFilter(key: string, value: string) {
  const next = { ...activeFilters.value };
  const arr = next[key]?.filter((v) => v !== value) ?? [];
  if (arr.length) next[key] = arr;
  else delete next[key];
  activeFilters.value = next;
}

function clearFilters() {
  activeFilters.value = {};
}

function onSearchQueryChange(value: string) {
  searchQuery.value = value;
  mobileSearchOverlayEnabled.value = true;
  desktopSearchOverlayEnabled.value = true;
  if (value.trim()) filterOpen.value = false;
  const next = { ...route.query };
  if (value.trim()) next.q = value.trim();
  else delete next.q;
  router.replace({ query: next });
}

function onSearchSubmit(value: string) {
  mobileSearchOverlayEnabled.value = true;
  desktopSearchOverlayEnabled.value = true;
  filterOpen.value = false;
  pushExploreSearch(router, value);
}

function setMobileExploreTab(tab: "map" | "list") {
  if (
    mobileExploreTab.value === "list" &&
    tab === "map" &&
    resultsPanelRef.value
  ) {
    resultsScrollY.value = resultsPanelRef.value.scrollTop;
  }
  mobileExploreTab.value = tab;
  mobileSearchOverlayEnabled.value = false;
  if (tab === "list") {
    nextTick(() => {
      if (resultsPanelRef.value)
        resultsPanelRef.value.scrollTop = resultsScrollY.value;
    });
  }
}

const isMobileSearchOverlayOpen = computed(() => {
  if (!isMobile.value) return false;
  if (!mobileSearchOverlayEnabled.value) return false;
  return searchQuery.value.trim().length > 0;
});

/** Mobile search panel height: visual viewport when overlay open (keyboard-aware), else null */
const mobileSearchPanelHeightPx = computed(() =>
  isMobile.value && isMobileSearchOverlayOpen.value ? visualViewportHeightPx.value : null,
);

function scrollDesktopListIntoView() {
  if (!desktopListRef.value) return;
  desktopListRef.value.scrollIntoView({ behavior: "smooth", block: "start" });
}

function clearMapSelection() {
  mapSelectionIds.value = null;
}

function onShowAllInGrid(ids?: string[]) {
  if (ids && ids.length) {
    mapSelectionIds.value = ids;
  }
  if (isMobile.value) {
    setMobileExploreTab("list");
  } else {
    scrollDesktopListIntoView();
  }
}

// Desktop: close sub-panel and search overlay when clicking outside
const filterAsideRef = ref<HTMLElement | null>(null);
function onDocumentMousedown(e: MouseEvent) {
  if (
    !isMobile.value &&
    openSubPanelKey.value &&
    filterAsideRef.value &&
    !filterAsideRef.value.contains(e.target as Node)
  ) {
    openSubPanelKey.value = null;
  }
  if (
    !isMobile.value &&
    desktopSearchOverlayEnabled.value &&
    desktopSearchOverlayRef.value &&
    !desktopSearchOverlayRef.value.contains(e.target as Node)
  ) {
    desktopSearchOverlayEnabled.value = false;
  }
}
onMounted(() => {
  document.addEventListener("mousedown", onDocumentMousedown);
});
onUnmounted(() => {
  document.removeEventListener("mousedown", onDocumentMousedown);
});
</script>

<template>
  <div class="min-h-dvh bg-background flex flex-col">
    <!-- Desktop: TopNav with Filter + Search in nav -->
    <TopNav
      v-if="!isMobile"
      :filter-open="filterOpen"
      :active-filter-count="activeFilterCount"
      :search-query="searchQuery"
      :mobile-show-search="false"
      :mobile-show-filter-row="false"
      @toggle-filter="filterOpen = !filterOpen"
      @update:search-query="onSearchQueryChange"
      @search-submit="onSearchSubmit"
    />

    <!-- Desktop: filter button + sidebar -->
    <div
      v-if="!isMobile"
      class="ct-fixed-toolbar fixed left-4 top-[65px] z-40 flex flex-col gap-2"
    >
      <div class="flex items-center gap-2">
        <Button
          v-if="filterOpen"
          type="button"
          variant="outline"
          size="sm"
          class="gap-2 rounded-md border-0 shadow-sm"
          aria-label="Zavrieť filter"
          @click="filterOpen = false"
        >
          <PhX class="size-4" />
          Zavrieť filter
        </Button>
        <Button
          v-else
          type="button"
          variant="primary"
          size="sm"
          class="gap-2 rounded-md font-semibold shadow-sm"
          aria-label="Filter"
          @click="filterOpen = true"
        >
          <PhSlidersHorizontal class="size-4" />
          Filter
          <span
            v-if="activeFilterCount > 0"
            class="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-600 px-1.5 text-xs font-semibold text-white"
          >
            {{ activeFilterCount }}
          </span>
        </Button>
      </div>
      <!-- Desktop: FilterSidebar directly below the Filter button -->
      <div
        v-if="filterOpen"
        ref="filterAsideRef"
        class="flex min-h-0 max-h-[calc(100vh-80px)] flex-col overflow-visible"
        aria-label="Filter panel"
      >
        <FilterSidebar
          :active-filters="activeFilters"
          v-model:open-subpanel-key="openSubPanelKey"
          @update:active-filters="activeFilters = $event"
        />
      </div>
    </div>

    <!-- Desktop: map above, list below -->
    <div v-if="!isMobile" class="relative flex-1 pt-[56px]">
      <div ref="desktopSearchOverlayRef">
        <SearchOverlayPanel
          :items="filteredItems"
          :query="searchQuery"
          :open="desktopSearchOverlayEnabled"
          :mobile="false"
          position-class="fixed left-0 right-0 top-[72px] z-30 flex justify-center px-4"
        />
      </div>
      <div class="relative h-[50vh] min-h-[200px] md:h-[calc(100vh-61px)]">
        <MapView
          :pins="mapPins"
          :items="filteredItems"
          :cooperative-gestures="true"
          @show-all-in-grid="onShowAllInGrid"
        />
        <MapFilterInfobox
          :count="filteredItems.length"
          @show-list="scrollDesktopListIntoView"
        />
      </div>
      <!-- Margin matches FilterSidebar: left-4 (16px) + panel(s) 300px each + gap-3 (12px) when sub-panel open -->
      <div
        ref="desktopListRef"
        class="transition-[margin] duration-200"
        :class="
          filterOpen
            ? openSubPanelKey
              ? 'md:ml-[628px]'
              : 'md:ml-[316px]'
            : ''
        "
      >
        <FilterChips
          :active-filters="activeFilters"
          @remove="removeFilter"
          @clear="clearFilters"
        />
        <div v-if="mapSelectionIds && mapSelectionIds.length" class="px-4 pb-2">
          <button
            type="button"
            class="inline-flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            @click="clearMapSelection"
          >
            <span>Výber z mapy ({{ mapSelectionIds.length }})</span>
            <PhX class="h-3 w-3" />
          </button>
        </div>
        <ResultsGrid
          :items="filteredItems"
          :sort-key="sortKey"
          :sort-order="sortOrder"
          :search-query="searchQuery"
          @update:sort-key="sortKey = $event"
          @update:sort-order="sortOrder = $event"
        />
      </div>
      <Footer />
    </div>

    <!-- Mobile: full-bleed map + floating header + sliding results panel + ViewSwitcher (Figma) -->
    <template v-else>
      <div class="h-[100dvh] max-h-[100dvh] overflow-hidden relative">
        <!-- Layer 1: Map (always mounted, full viewport, z-10) -->
        <div class="fixed inset-0 z-[10]">
          <MapView
            ref="mapViewRef"
            :pins="mapPins"
            :items="filteredItems"
            pin-style="secondary"
            cluster-style="dark"
            :show-zoom-controls="false"
            @show-all-in-grid="onShowAllInGrid"
          />
        </div>
        <!-- Layer 2: Results panel (slides up over map, z-20) -->
        <Transition
          enter-active-class="transition-[transform] duration-250 ease-out"
          enter-from-class="translate-y-full"
          enter-to-class="translate-y-0"
          leave-active-class="transition-[transform] duration-200 ease-in"
          leave-from-class="translate-y-0"
          leave-to-class="translate-y-full"
        >
          <div
            v-show="mobileExploreTab === 'list'"
            ref="resultsPanelRef"
            class="fixed left-0 right-0 bottom-0 z-[20] rounded-[24px_24px_24px_0] bg-[#fafafa] overflow-y-auto overscroll-contain touch-manipulation"
            :style="{
              top: '56px',
              paddingBottom: '80px',
            }"
          >
            <FilterChips
              :active-filters="activeFilters"
              @remove="removeFilter"
              @clear="clearFilters"
            />
            <div
              v-if="mapSelectionIds && mapSelectionIds.length"
              class="px-4 pb-2"
            >
              <button
                type="button"
                class="inline-flex items-center gap-1 rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 hover:bg-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                @click="clearMapSelection"
              >
                <span>Výber z mapy ({{ mapSelectionIds.length }})</span>
                <PhX class="h-3 w-3" />
              </button>
            </div>
            <ResultsGrid
              :items="filteredItems"
              :sort-key="sortKey"
              :sort-order="sortOrder"
              :search-query="searchQuery"
              @update:sort-key="sortKey = $event"
              @update:sort-order="sortOrder = $event"
            />
            <Footer />
          </div>
        </Transition>
        <!-- Layer 3: Floating header (Filter + Search + Menu) -->
        <FloatingExploreHeader
          :search-query="searchQuery"
          :active-filter-count="activeFilterCount"
          @toggle-filter="filterOpen = !filterOpen"
          @update:search-query="onSearchQueryChange"
          @search-submit="onSearchSubmit"
        />
        <!-- Layer 4: Fit-bounds (left) + ViewSwitcher (center) + Locate me (right) – animates out with overlay open -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-300 ease-out"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-2"
        >
          <div
            v-if="!isMobileSearchOverlayOpen"
            class="pointer-events-none fixed left-2 right-2 bottom-0 z-40 flex items-center justify-between pt-2 pb-2"
          >
            <div class="pointer-events-auto">
              <Button
                v-if="mobileExploreTab === 'map'"
                type="button"
                variant="secondary"
                size="icon"
                class="h-10 w-10 shrink-0 rounded-xl border-0"
                aria-label="Center map on all pins"
                @click="mapViewRef?.fitBounds?.()"
              >
                <PhCrosshair class="size-6" weight="bold" />
              </Button>
            </div>
            <ViewSwitcher
              class="pointer-events-auto"
              :model-value="mobileExploreTab"
              @update:model-value="setMobileExploreTab"
            />
            <div class="pointer-events-auto">
              <Button
                v-if="mobileExploreTab === 'map'"
                type="button"
                variant="secondary"
                size="icon"
                class="h-10 w-10 shrink-0 rounded-xl border-0"
                aria-label="Locate me"
                @click="mapViewRef?.locate?.()"
              >
                <PhCompass class="size-6" weight="bold" />
              </Button>
            </div>
          </div>
        </Transition>
      </div>
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-3"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-300 ease-out"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <SearchOverlayPanel
          v-if="isMobileSearchOverlayOpen"
          :items="filteredItems"
          :query="searchQuery"
          :open="mobileSearchOverlayEnabled"
          :mobile="true"
          :available-height-px="mobileSearchPanelHeightPx"
          position-class="fixed left-2 right-2 z-30 top-[56px] md:left-1/2 md:right-auto md:top-[72px] md:w-[480px] md:-translate-x-1/2"
        />
      </Transition>
      <Sheet
        :open="filterOpen"
        @update:open="
          (v) => {
            if (!v) filterOpen = false;
          }
        "
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
    </template>
  </div>
</template>
