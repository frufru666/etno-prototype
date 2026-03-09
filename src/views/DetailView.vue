<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DetailTopNav from '@/components/ct/DetailTopNav.vue'
import DetailRightPanel from '@/components/ct/detail/DetailRightPanel.vue'
import DetailMediaViewer from '@/components/ct/detail/DetailMediaViewer.vue'
import DetailMobileHero from '@/components/ct/detail/DetailMobileHero.vue'
import DetailMap from '@/components/ct/detail/DetailMap.vue'
import SearchOverlayPanel from '@/components/ct/SearchOverlayPanel.vue'
import { Button } from '@/components/ui/button'
import { PhCaretLeft, PhSidebar, PhSidebarSimple } from '@phosphor-icons/vue'
import { getItemById } from '@/data/mockData'
import { useIsMobile } from '@/composables/useIsMobile'
import { useSearchOverlay } from '@/composables/useSearchOverlay'
import { pushExploreSearch } from '@/lib/navigation'

const route = useRoute()
const router = useRouter()
const isMobile = useIsMobile()
const searchQuery = ref('')
const { searchFilteredItems } = useSearchOverlay(searchQuery)

const id = computed(() => route.params.id as string)
const item = computed(() => getItemById(id.value))

const rightPanelOpen = ref(true)
const leftPanelView = ref<'media' | 'map'>('media')
const mobileViewerFullscreen = ref(false)
const mobileMapFullscreen = ref(false)
const transcriptVisible = ref(false)

function onSearchSubmit(value: string) {
  pushExploreSearch(router, value)
}

function openMapFullscreen() {
  if (isMobile.value) mobileMapFullscreen.value = true
  else leftPanelView.value = 'map'
}
function closeMapFullscreen() {
  if (isMobile.value) mobileMapFullscreen.value = false
  else leftPanelView.value = 'media'
}
function openInMaps() {
  const it = item.value
  if (it?.lat != null && it?.lng != null) {
    window.open(`https://www.google.com/maps?q=${it.lat},${it.lng}`, '_blank')
  }
}
async function copyGps() {
  const it = item.value
  if (it?.lat != null && it?.lng != null) {
    await navigator.clipboard.writeText(`${it.lat.toFixed(4)}° N, ${it.lng.toFixed(4)}° E`)
  }
}

const imageCount = computed(() => {
  const it = item.value
  if (!it) return 1
  return it.mediaType === 'image' && it.id === 'RELIROMA-F001' ? 28 : 1
})

const mobileCtaLabel = computed(() => {
  const it = item.value
  if (!it) return 'Zobraziť'
  if (it.mediaType === 'image') return imageCount.value > 1 ? 'Zobraziť galériu' : 'Zobraziť obrázok'
  if (it.mediaType === 'pdf') return 'Zobraziť PDF'
  if (it.mediaType === 'audio') return 'Zobraziť nahrávku'
  if (it.mediaType === 'video') return 'Zobraziť video'
  return 'Zobraziť'
})

watch(item, (it) => {
  if (it == null && route.name === 'detail') router.replace({ name: 'explore' })
  else transcriptVisible.value = false
}, { immediate: true })
</script>

<template>
  <div class="min-h-screen bg-background">
    <DetailTopNav
      :right-panel-open="rightPanelOpen"
      :search-query="searchQuery"
      mobile-context-label="Detail"
      :mobile-context-id="item?.id"
      :show-mobile-up="isMobile"
      mobile-up-aria-label="Späť do Explore"
      @mobile-up="router.push({ name: 'explore' })"
      @toggle-right-panel="rightPanelOpen = !rightPanelOpen"
      @update:search-query="searchQuery = $event"
      @search-submit="onSearchSubmit"
    />

    <!-- Desktop only: second-row controls float over content below navbar -->
    <div
      v-if="!isMobile"
      class="fixed left-4 top-[65px] z-40 flex items-center gap-2"
    >
      <Button
        variant="primary"
        size="sm"
        class="gap-1.5 rounded-md text-sm font-semibold shadow-sm"
        aria-label="Späť do Explore"
        @click="router.push({ name: 'explore' })"
      >
        <PhCaretLeft class="size-4" />
        Späť do Explore
      </Button>
      <Button
        :variant="rightPanelOpen ? 'primary' : 'toggle'"
        size="sm"
        class="gap-1.5 rounded-md text-sm font-semibold shadow-sm"
        aria-label="Toggle right panel"
        :aria-pressed="rightPanelOpen"
        @click="rightPanelOpen = !rightPanelOpen"
      >
        <PhSidebar v-if="!rightPanelOpen" class="size-4" />
        <PhSidebarSimple v-else class="size-4" />
        {{ rightPanelOpen ? 'Skryť panel' : 'Zobraziť panel' }}
      </Button>
    </div>

    <template v-if="!item">
      <main class="p-6 pt-[49px] md:pt-[61px]">
        <p class="text-muted-foreground">
          Položka s ID <strong>{{ id }}</strong> nebola nájdená.
        </p>
        <Button variant="link" class="mt-4 p-0 text-primary-600" @click="router.push({ name: 'explore' })">
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
        class="pt-[49px] md:flex md:flex-1 md:pt-[61px] md:overflow-hidden"
      >
        <div class="min-w-0 md:flex-1 flex flex-col">
          <!-- Desktop: layered media + map -->
          <template v-if="!isMobile">
            <div class="flex-1 relative overflow-hidden h-[calc(100vh-61px)]">
              <div class="absolute inset-0" :class="{ invisible: leftPanelView !== 'media' }">
                <DetailMediaViewer
                  :item="item"
                  :image-count="imageCount"
                  :transcript-visible="transcriptVisible"
                  @toggle-transcript="transcriptVisible = !transcriptVisible"
                />
              </div>
              <div v-if="leftPanelView === 'map'" class="absolute inset-0 z-30 flex flex-col bg-background">
                <template v-if="item.lat != null && item.lng != null">
                  <DetailMap :lat="item.lat" :lng="item.lng" />
                  <div class="absolute left-2 right-2 top-2 z-10 flex items-center justify-between">
                    <Button variant="secondary" size="sm" @click="closeMapFullscreen">Zavrieť</Button>
                    <div class="flex gap-2">
                      <Button variant="outline" size="sm" @click="openInMaps">Otvoriť v Maps</Button>
                      <Button variant="outline" size="sm" @click="copyGps">Kopírovať GPS</Button>
                    </div>
                  </div>
                </template>
                <div v-else class="flex h-full flex-col items-center justify-center gap-4 text-muted-foreground">
                  <span>Žiadne súradnice pre mapu</span>
                  <Button variant="secondary" @click="closeMapFullscreen">Zavrieť</Button>
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
          class="flex h-[calc(100vh-61px)] w-[420px] shrink-0 flex-col border-l border-border bg-background"
        >
          <DetailRightPanel :item="item" @open-map-fullscreen="openMapFullscreen" />
        </aside>
      </div>

      <!-- Mobile: fullscreen viewer overlay -->
      <div v-if="isMobile && mobileViewerFullscreen" class="fixed inset-0 z-[60] flex flex-col bg-background">
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
        v-if="isMobile && mobileMapFullscreen && item.lat != null && item.lng != null"
        class="fixed inset-0 z-[60] flex flex-col bg-background"
      >
        <div class="relative flex-1 min-h-0">
          <DetailMap :lat="item.lat" :lng="item.lng" />
          <div class="absolute left-4 right-4 top-2 z-10 flex items-center justify-between">
            <Button variant="secondary" size="sm" @click="closeMapFullscreen">Zavrieť</Button>
            <div class="flex gap-2">
              <Button variant="outline" size="sm" @click="openInMaps">Otvoriť v Maps</Button>
              <Button variant="outline" size="sm" @click="copyGps">Kopírovať GPS</Button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
