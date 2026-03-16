<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import DetailTopNav from "@/components/ct/DetailTopNav.vue";
import DetailRightPanel from "@/components/ct/detail/DetailRightPanel.vue";
import DetailTranscriptPanel from "@/components/ct/detail/DetailTranscriptPanel.vue";
import DetailMediaViewer from "@/components/ct/detail/DetailMediaViewer.vue";
import DetailMobileHero from "@/components/ct/detail/DetailMobileHero.vue";
import DetailMap from "@/components/ct/detail/DetailMap.vue";
import MediaViewerMobileHeader from "@/components/ct/MediaViewerMobileHeader.vue";
import SearchOverlayPanel from "@/components/ct/SearchOverlayPanel.vue";
import { Button } from "@/components/ui/button";
import { PhCaretLeft } from "@phosphor-icons/vue";
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

const metadataPanelOpen = ref(true);
const transcriptPanelOpen = ref(true);
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

function labelForRouteName(
  name: string | symbol | null | undefined,
): string | null {
  if (name === "explore") return "Explore";
  if (name === "collections") return "Collections";
  if (name === "collection-detail") return "Collection Detail";
  if (name === "info") return "Info";
  return null;
}

const historyBackTarget = computed(() => {
  const back = window.history.state?.back as string | undefined;
  if (!back || !back.startsWith("/")) return null;
  const resolved = router.resolve(back);
  const label = labelForRouteName(resolved.name);
  if (!label) return null;
  return { path: back, label };
});

const fallbackBackLabel = computed(() =>
  fromCollectionSlug.value ? "Collection Detail" : "Explore",
);

const detailBackLabel = computed(
  () => historyBackTarget.value?.label ?? fallbackBackLabel.value,
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

function toggleMetadataPanel() {
  metadataPanelOpen.value = !metadataPanelOpen.value;
  // Keep viewer content visible and full-width when panel is hidden.
  leftPanelView.value = "media";
}

function showTranscriptPanel() {
  transcriptPanelOpen.value = true;
}

function hideTranscriptPanel() {
  transcriptPanelOpen.value = false;
}

function showMetadataPanel() {
  metadataPanelOpen.value = true;
  leftPanelView.value = "media";
}

function hideMetadataPanel() {
  metadataPanelOpen.value = false;
  leftPanelView.value = "media";
}

function goBackFromDetail() {
  if (historyBackTarget.value) {
    router.back();
    return;
  }
  if (fromCollectionSlug.value) {
    router.push({
      name: "collection-detail",
      params: { slug: fromCollectionSlug.value },
    });
    return;
  }
  router.push({ name: "explore" });
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
    else {
      transcriptVisible.value = it?.mediaType === "audio";
      transcriptPanelOpen.value = !!it?.hasTranscript;
      metadataPanelOpen.value = true;
      leftPanelView.value = "media";
    }
  },
  { immediate: true },
);
</script>

<template>
  <div class="min-h-screen bg-background">
    <DetailTopNav
      :right-panel-open="metadataPanelOpen"
      :search-query="searchQuery"
      :mobile-context-label="mobileContextLabel"
      :mobile-context-id="fromCollectionSlug ? undefined : item?.id"
      :mobile-back-to-name="mobileBackTargetName"
      :mobile-back-to-params="mobileBackTargetParams"
      :mobile-back-aria-label="`Späť do ${detailBackLabel}`"
      :mobile-show-search="false"
      @toggle-right-panel="toggleMetadataPanel"
      @update:search-query="updateSearchQuery"
      @search-submit="onSearchSubmit"
    />

    <template v-if="!item">
      <main class="p-6 pt-[49px] md:pt-[57px]">
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
        :class="isMobile && item ? 'pt-[49px]' : 'pt-[96px] md:pt-[57px]'"
      >
        <div
          class="relative min-w-0 md:flex-1 flex flex-col"
          :class="{ 'md:w-full': !metadataPanelOpen && !transcriptPanelOpen }"
        >
          <div
            v-if="!isMobile"
            class="pointer-events-none absolute left-4 right-4 top-4 z-40 flex items-start justify-between gap-2"
          >
            <Button
              v-if="item.mediaType !== 'pdf'"
              variant="primary"
              size="sm"
              class="pointer-events-auto gap-1.5 shrink-0 rounded-md text-sm font-semibold text-white shadow-sm"
              :aria-label="`Back to ${detailBackLabel}`"
              @click="goBackFromDetail"
            >
              <PhCaretLeft class="size-4" />
              {{ `Back to ${detailBackLabel}` }}
            </Button>
            <div class="pointer-events-auto ml-auto flex items-center gap-2">
              <Button
                v-if="item.hasTranscript && !transcriptPanelOpen"
                variant="nav"
                size="sm"
                class="gap-1.5 shrink-0 rounded-md text-sm font-semibold"
                aria-label="Zobraziť Transcript"
                @click="showTranscriptPanel"
              >
                Zobraziť Transcript
              </Button>
              <Button
                v-if="!metadataPanelOpen"
                variant="nav"
                size="sm"
                class="gap-1.5 shrink-0 rounded-md text-sm font-semibold"
                aria-label="Zobraziť Panel"
                @click="showMetadataPanel"
              >
                Zobraziť Panel
              </Button>
            </div>
          </div>

          <!-- Desktop: layered media + map -->
          <template v-if="!isMobile">
            <div class="flex-1 overflow-hidden h-[calc(100vh-57px)]">
              <div v-if="leftPanelView === 'media'" class="h-full">
                <DetailMediaViewer
                  :item="item"
                  :image-count="imageCount"
                  desktop-transcript-in-layout
                  :transcript-visible="
                    isMobile || mobileViewerFullscreen
                      ? transcriptVisible
                      : false
                  "
                  @toggle-transcript="transcriptVisible = !transcriptVisible"
                />
              </div>
              <div
                v-if="leftPanelView === 'map'"
                class="relative z-30 flex h-full flex-col bg-background"
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

        <DetailTranscriptPanel
          v-if="!isMobile && item.hasTranscript && transcriptPanelOpen"
          :item="item"
          class="h-[calc(100vh-57px)] w-[345px] shrink-0 border-l border-border bg-background"
          @hide="hideTranscriptPanel"
        />

        <aside
          v-if="!isMobile && metadataPanelOpen"
          class="flex h-[calc(100vh-57px)] w-[393px] shrink-0 flex-col border-l border-border bg-background"
        >
          <DetailRightPanel
            :item="item"
            show-panel-header
            @hide-panel="hideMetadataPanel"
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
            desktop-transcript-in-layout
            :transcript-visible="transcriptVisible"
            fullscreen
            @close="mobileViewerFullscreen = false"
            @toggle-transcript="transcriptVisible = !transcriptVisible"
          />
        </div>
      </div>

      <!-- Mobile: fullscreen map overlay (Figma: header + map + bottom infobox) -->
      <div
        v-if="
          isMobile &&
          mobileMapFullscreen &&
          item.lat != null &&
          item.lng != null
        "
        class="fixed inset-0 z-[60] flex flex-col bg-background"
      >
        <MediaViewerMobileHeader
          right-label="Otvoriť v Maps"
          @close="closeMapFullscreen"
          @action="openInMaps"
        />
        <div class="relative flex-1 min-h-0">
          <DetailMap :lat="item.lat" :lng="item.lng" />
        </div>
        <div
          class="absolute bottom-6 left-1/2 z-10 flex w-[calc(100%-32px)] max-w-[361px] -translate-x-1/2 items-center justify-between gap-2 rounded-lg border border-border bg-background px-2 py-1 shadow-sm"
        >
          <div class="flex min-w-0 items-center gap-1">
            <span class="text-sm font-medium text-muted-foreground">
              Poloha
            </span>
            <span class="truncate text-sm font-bold text-foreground">
              {{ item.lat.toFixed(4) }}° N, {{ item.lng.toFixed(4) }}° E
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            class="shrink-0 text-sm font-semibold text-primary-500"
            @click="copyGps"
          >
            Kopírovať GPS
          </Button>
        </div>
      </div>
    </template>
  </div>
</template>
