<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import DetailTopNav from "@/components/ct/DetailTopNav.vue";
import DetailRightPanel from "@/components/ct/detail/DetailRightPanel.vue";
import DetailMediaViewer from "@/components/ct/detail/DetailMediaViewer.vue";
import DetailMobileHero from "@/components/ct/detail/DetailMobileHero.vue";
import DetailMap from "@/components/ct/detail/DetailMap.vue";
import SearchOverlayPanel from "@/components/ct/SearchOverlayPanel.vue";
import { Button } from "@/components/ui/button";
import { PhCaretLeft, PhSidebar, PhSidebarSimple } from "@phosphor-icons/vue";
import { getItemById } from "@/data/mockData";
import { useIsMobile } from "@/composables/useIsMobile";
import { useSearchOverlay } from "@/composables/useSearchOverlay";
import { pushExploreSearch } from "@/lib/navigation";

const route = useRoute();
const router = useRouter();
const isMobile = useIsMobile();
const searchQuery = ref("");
const { searchFilteredItems } = useSearchOverlay(searchQuery);

const id = computed(() => route.params.id as string);
const item = computed(() => getItemById(id.value));
const fromCollectionSlug = computed(
  () => route.query.fromCollection as string | undefined,
);

const rightPanelOpen = ref(true);
const leftPanelView = ref<"media" | "map">("media");
const mobileViewerFullscreen = ref(false);
const mobileMapFullscreen = ref(false);
const transcriptVisible = ref(false);

const mobileContextLabel = computed(() =>
  fromCollectionSlug.value ? "Collection Item Detail" : "Item detail",
);

const mobileBackTargetName = computed(() =>
  fromCollectionSlug.value ? "collection-detail" : "explore",
);

const mobileBackTargetParams = computed(() =>
  fromCollectionSlug.value ? { slug: fromCollectionSlug.value } : undefined,
);

function onSearchSubmit(value: string) {
  pushExploreSearch(router, value);
}

function updateSearchQuery(value: string) {
  searchQuery.value = value;
}

function openMapFullscreen() {
  if (isMobile.value) mobileMapFullscreen.value = true;
  else leftPanelView.value = "map";
}
function closeMapFullscreen() {
  if (isMobile.value) mobileMapFullscreen.value = false;
  else leftPanelView.value = "media";
}
function openInMaps() {
  const it = item.value;
  if (it?.lat != null && it?.lng != null) {
    window.open(`https://www.google.com/maps?q=${it.lat},${it.lng}`, "_blank");
  }
}
async function copyGps() {
  const it = item.value;
  if (it?.lat != null && it?.lng != null) {
    await navigator.clipboard.writeText(
      `${it.lat.toFixed(4)}° N, ${it.lng.toFixed(4)}° E`,
    );
  }
}

function toggleRightPanel() {
  rightPanelOpen.value = !rightPanelOpen.value;
  // Keep viewer content visible and full-width when panel is hidden.
  leftPanelView.value = "media";
}

const imageCount = computed(() => {
  const it = item.value;
  if (!it) return 1;
  return it.mediaType === "image" && it.id === "RELIROMA-F001" ? 28 : 1;
});

const mobileCtaLabel = computed(() => {
  const it = item.value;
  if (!it) return "Zobraziť";
  if (it.mediaType === "image")
    return imageCount.value > 1 ? "Zobraziť galériu" : "Zobraziť obrázok";
  if (it.mediaType === "pdf") return "Zobraziť PDF";
  if (it.mediaType === "audio") return "Zobraziť nahrávku";
  if (it.mediaType === "video") return "Zobraziť video";
  return "Zobraziť";
});

watch(
  item,
  (it) => {
    if (it == null && route.name === "detail")
      router.replace({ name: "explore" });
    else transcriptVisible.value = it?.mediaType === "audio";
  },
  { immediate: true },
);
</script>

<template>
  <div class="min-h-screen bg-background">
    <DetailTopNav
      :right-panel-open="rightPanelOpen"
      :search-query="searchQuery"
      :mobile-context-label="mobileContextLabel"
      :mobile-context-id="fromCollectionSlug ? undefined : item?.id"
      :mobile-back-to-name="mobileBackTargetName"
      :mobile-back-to-params="mobileBackTargetParams"
      :mobile-back-aria-label="
        fromCollectionSlug ? 'Späť do kolekcie' : 'Späť do Explore'
      "
      @toggle-right-panel="rightPanelOpen = !rightPanelOpen"
      @update:search-query="updateSearchQuery"
      @search-submit="onSearchSubmit"
    />

    <!-- Desktop-only fixed toolbar row for detail actions -->
    <div
      v-if="item && !isMobile"
      class="ct-fixed-toolbar fixed left-0 right-0 top-[73px] z-40 flex items-start justify-between gap-2 px-4"
    >
      <div class="flex items-center gap-2 min-w-0">
        <Button
          variant="primary"
          size="sm"
          class="gap-1.5 shrink-0 rounded-md text-sm font-semibold shadow-sm"
          :aria-label="
            fromCollectionSlug ? 'Späť do kolekcie' : 'Späť do Explore'
          "
          @click="
            fromCollectionSlug
              ? router.push({
                  name: 'collection-detail',
                  params: { slug: fromCollectionSlug },
                })
              : router.push({ name: 'explore' })
          "
        >
          <PhCaretLeft class="size-4" />
          {{ fromCollectionSlug ? "Back to Collection" : "Back to Explore" }}
        </Button>
      </div>
      <div class="ml-auto flex items-center gap-2">
        <Button
          v-if="item.hasTranscript"
          variant="outline"
          size="sm"
          class="gap-1.5 shrink-0 rounded-md text-sm font-semibold shadow-sm"
          :aria-label="transcriptVisible ? 'Hide Transcript' : 'Show Transcript'"
          @click="transcriptVisible = !transcriptVisible"
        >
          {{ transcriptVisible ? "Hide Transcript" : "Show Transcript" }}
        </Button>
        <Button
          variant="outline"
          size="sm"
          class="gap-1.5 shrink-0 rounded-md text-sm font-semibold shadow-sm"
        :aria-label="rightPanelOpen ? 'Hide right panel' : 'Show right panel'"
        @click="toggleRightPanel"
        >
          <PhSidebar v-if="!rightPanelOpen" class="size-4" />
          <PhSidebarSimple v-else class="size-4" />
          {{ rightPanelOpen ? "Hide right panel" : "Show right panel" }}
        </Button>
      </div>
    </div>

    <template v-if="!item">
      <main class="p-6 pt-[96px] md:pt-[57px]">
        <p class="text-muted-foreground">
          Položka s ID <strong>{{ id }}</strong> nebola nájdená.
        </p>
        <Button
          variant="link"
          class="mt-4 p-0 text-primary-600"
          @click="router.push({ name: 'explore' })"
        >
          ← Späť do Explore
        </Button>
      </main>
    </template>

    <template v-else>
      <SearchOverlayPanel
        :items="searchFilteredItems"
        :query="searchQuery"
        :mobile="isMobile"
      />
      <div
        class="md:flex md:flex-1 md:overflow-hidden"
        :class="isMobile && item ? 'pt-[96px]' : 'pt-[96px] md:pt-[57px]'"
      >
        <div class="min-w-0 md:flex-1 flex flex-col">
          <!-- Desktop: layered media + map -->
          <template v-if="!isMobile">
            <div class="flex-1 relative overflow-hidden h-[calc(100vh-57px)]">
              <div
                class="absolute inset-0"
                :class="{ invisible: leftPanelView !== 'media' }"
              >
                <DetailMediaViewer
                  :item="item"
                  :image-count="imageCount"
                  :transcript-visible="transcriptVisible"
                  @toggle-transcript="transcriptVisible = !transcriptVisible"
                />
              </div>
              <div
                v-if="leftPanelView === 'map'"
                class="absolute inset-0 z-30 flex flex-col bg-background"
              >
                <template v-if="item.lat != null && item.lng != null">
                  <DetailMap :lat="item.lat" :lng="item.lng" />
                  <div
                    class="absolute left-2 right-2 top-2 z-10 flex items-center justify-between"
                  >
                    <Button
                      variant="secondary"
                      size="sm"
                      @click="closeMapFullscreen"
                      >Zavrieť</Button
                    >
                    <div class="flex gap-2">
                      <Button variant="outline" size="sm" @click="openInMaps"
                        >Otvoriť v Maps</Button
                      >
                      <Button variant="outline" size="sm" @click="copyGps"
                        >Kopírovať GPS</Button
                      >
                    </div>
                  </div>
                </template>
                <div
                  v-else
                  class="flex h-full flex-col items-center justify-center gap-4 text-muted-foreground"
                >
                  <span>Žiadne súradnice pre mapu</span>
                  <Button variant="secondary" @click="closeMapFullscreen"
                    >Zavrieť</Button
                  >
                </div>
              </div>
            </div>
          </template>

          <!-- Mobile: hero + metadata -->
          <template v-else>
            <DetailMobileHero
              :item="item"
              :cta-label="mobileCtaLabel"
              @open-viewer="mobileViewerFullscreen = true"
            />
            <div class="border-t border-border bg-background">
              <DetailRightPanel
                :item="item"
                :mobile="true"
                :hide-header="true"
                @open-map-fullscreen="openMapFullscreen"
              />
            </div>
          </template>
        </div>

        <aside
          v-if="!isMobile && rightPanelOpen"
          class="flex h-[calc(100vh-57px)] w-[420px] shrink-0 flex-col border-l border-border bg-background"
        >
          <DetailRightPanel
            :item="item"
            @open-map-fullscreen="openMapFullscreen"
          />
        </aside>
      </div>

      <!-- Mobile: fullscreen viewer overlay -->
      <div
        v-if="isMobile && mobileViewerFullscreen"
        class="fixed inset-0 z-[60] flex flex-col bg-background"
      >
        <div class="flex-1 min-h-0 flex flex-col">
          <DetailMediaViewer
            :item="item"
            :image-count="imageCount"
            :transcript-visible="transcriptVisible"
            fullscreen
            @close="mobileViewerFullscreen = false"
            @toggle-transcript="transcriptVisible = !transcriptVisible"
          />
        </div>
      </div>

      <!-- Mobile: fullscreen map overlay (floating buttons, no bar) -->
      <div
        v-if="
          isMobile &&
          mobileMapFullscreen &&
          item.lat != null &&
          item.lng != null
        "
        class="fixed inset-0 z-[60] flex flex-col bg-background"
      >
        <div class="relative flex-1 min-h-0">
          <DetailMap :lat="item.lat" :lng="item.lng" />
          <div
            class="absolute left-4 right-4 top-2 z-10 flex items-center justify-between"
          >
            <Button variant="secondary" size="sm" @click="closeMapFullscreen"
              >Zavrieť</Button
            >
            <div class="flex gap-2">
              <Button variant="outline" size="sm" @click="openInMaps"
                >Otvoriť v Maps</Button
              >
              <Button variant="outline" size="sm" @click="copyGps"
                >Kopírovať GPS</Button
              >
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
