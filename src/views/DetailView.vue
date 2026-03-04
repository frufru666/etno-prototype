<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DetailTopNav from '@/components/ct/DetailTopNav.vue'
import DetailRightPanel from '@/components/ct/detail/DetailRightPanel.vue'
import ImageViewer from '@/components/ct/detail/ImageViewer.vue'
import PdfViewer from '@/components/ct/detail/PdfViewer.vue'
import AudioPlayer from '@/components/ct/detail/AudioPlayer.vue'
import VideoPlayer from '@/components/ct/detail/VideoPlayer.vue'
import DetailMap from '@/components/ct/detail/DetailMap.vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getDocumentById } from '@/data/mockData'
import { useIsMobile } from '@/composables/useIsMobile'

const route = useRoute()
const router = useRouter()
const isMobile = useIsMobile()

const id = computed(() => route.params.id as string)
const document = computed(() => getDocumentById(id.value))

const rightPanelOpen = ref(true)
const leftPanelView = ref<'media' | 'map'>('media')
const mobileViewerFullscreen = ref(false)
const mobileMapFullscreen = ref(false)

function openMapFullscreen() {
  if (isMobile.value) {
    mobileMapFullscreen.value = true
  } else {
    leftPanelView.value = 'map'
  }
}

function closeMapFullscreen() {
  if (isMobile.value) {
    mobileMapFullscreen.value = false
  } else {
    leftPanelView.value = 'media'
  }
}

function openViewerFullscreen() {
  mobileViewerFullscreen.value = true
}

function closeViewerFullscreen() {
  mobileViewerFullscreen.value = false
}

function openInMaps() {
  const doc = document.value
  if (doc?.lat != null && doc?.lng != null) {
    window.open(`https://www.google.com/maps?q=${doc.lat},${doc.lng}`, '_blank')
  }
}

async function copyGps() {
  const doc = document.value
  if (doc?.lat != null && doc?.lng != null) {
    const text = `${doc.lat.toFixed(4)}° N, ${doc.lng.toFixed(4)}° E`
    await navigator.clipboard.writeText(text)
  }
}

// Multi-image count for ImageViewer (mock: 28 when hasTranscript and image)
const imageCount = computed(() => {
  const doc = document.value
  if (!doc) return 1
  if (doc.mediaType === 'image' && doc.hasTranscript) return 28
  return 1
})

// CTA label below mobile hero: "Zobraziť {mediaType}" per wireframe
const mobileCtaLabel = computed(() => {
  const doc = document.value
  if (!doc) return 'Zobraziť'
  if (doc.mediaType === 'image') return imageCount.value > 1 ? 'Zobraziť galériu' : 'Zobraziť obrázok'
  if (doc.mediaType === 'pdf') return 'Zobraziť dokument'
  if (doc.mediaType === 'audio') return 'Zobraziť nahrávku'
  if (doc.mediaType === 'video') return 'Zobraziť video'
  return 'Zobraziť'
})

// Redirect to Explore when document not found
watch(
  document,
  (doc) => {
    if (doc == null && route.name === 'detail') {
      router.replace({ name: 'explore' })
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <DetailTopNav
      :right-panel-open="rightPanelOpen"
      @toggle-right-panel="rightPanelOpen = !rightPanelOpen"
    />

    <!-- Not found -->
    <template v-if="!document">
      <main class="p-6 pt-[65px] md:pt-[73px]">
        <p class="text-muted-foreground">
          Dokument s ID <strong>{{ id }}</strong> nebol nájdený.
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

    <!-- Document found -->
    <template v-else>
      <div class="flex flex-1 pt-[49px] md:pt-[57px] overflow-hidden">
        <!-- Left panel (desktop) or full width (mobile) -->
        <div class="min-w-0 flex-1 flex flex-col">
          <!-- Desktop: single left column with absolute layers (Archeo-style) -->
          <template v-if="!isMobile">
            <div class="flex-1 relative overflow-hidden h-[calc(100vh-57px)]">
              <!-- Layer 1: media (default) -->
              <div
                class="absolute inset-0"
                :class="{ invisible: leftPanelView !== 'media' }"
              >
                <ImageViewer
                  v-if="document.mediaType === 'image'"
                  :document="document"
                  :image-count="imageCount"
                />
                <PdfViewer
                  v-else-if="document.mediaType === 'pdf'"
                  :document="document"
                />
                <AudioPlayer
                  v-else-if="document.mediaType === 'audio'"
                  :document="document"
                />
                <VideoPlayer
                  v-else-if="document.mediaType === 'video'"
                  :document="document"
                />
                <div
                  v-else
                  class="flex h-full items-center justify-center bg-neutral-200 text-muted-foreground"
                >
                  Žiadny prehliadač pre tento typ dokumentu.
                </div>
              </div>
              <!-- Layer 2: map (on top when active) -->
              <div
                v-if="leftPanelView === 'map'"
                class="absolute inset-0 z-30 flex flex-col bg-white"
              >
                <template v-if="document.lat != null && document.lng != null">
                  <DetailMap :lat="document.lat" :lng="document.lng" />
                  <div class="absolute right-2 top-2 z-10 flex gap-2">
                    <Button variant="secondary" size="sm" @click="closeMapFullscreen">Zavrieť</Button>
                    <Button variant="outline" size="sm" @click="openInMaps">Otvoriť v Maps</Button>
                    <Button variant="outline" size="sm" @click="copyGps">Kopírovať GPS</Button>
                  </div>
                </template>
                <div
                  v-else
                  class="flex h-full flex-col items-center justify-center gap-4 text-muted-foreground"
                >
                  <span>Žiadne súradnice pre mapu</span>
                  <Button variant="secondary" @click="closeMapFullscreen">Zavrieť</Button>
                </div>
              </div>
            </div>
          </template>

          <!-- Mobile: stacked layout – static hero, then CTA, then panel -->
          <template v-else>
            <!-- Static hero: thumbnail/placeholder only (no interaction; tap CTA to open viewer) -->
            <div
              class="relative w-full min-h-[280px] h-[280px] bg-neutral-200 flex items-center justify-center cursor-pointer"
              role="button"
              tabindex="0"
              aria-label="Otvoriť prehliadač médií"
              @click="openViewerFullscreen"
              @keydown.enter.prevent="openViewerFullscreen"
              @keydown.space.prevent="openViewerFullscreen"
            >
              <span class="text-muted-foreground text-sm">Náhľad obsahu</span>
            </div>
            <!-- Mobile header + CTA below hero (per wireframe: ID, title, author, type, then CTA) -->
            <div class="px-4 py-4 bg-white border-b border-neutral-200 space-y-2">
              <span
                class="inline-block font-mono text-[13px] font-medium text-primary-500 bg-primary-50 px-2 py-0.5 rounded"
              >
                {{ document.id }}
              </span>
              <h2 class="text-xl font-bold tracking-tight text-foreground">
                {{ document.title }}
              </h2>
              <p
                v-if="document.authors?.length"
                class="text-[15px] text-muted-foreground"
              >
                Autor: {{ document.authors.map((a) => a.name).join(', ') }}
              </p>
              <Badge
                variant="outline"
                class="text-muted-foreground"
              >
                {{ document.documentType }}
              </Badge>
              <Button
                class="w-full mt-2"
                @click="openViewerFullscreen"
              >
                {{ mobileCtaLabel }}
              </Button>
            </div>
            <!-- Right panel content stacked below (mobile) -->
            <div class="flex-1 min-h-0 border-t border-neutral-200 bg-white">
              <DetailRightPanel
                :document="document"
                :mobile="true"
                :hide-header="true"
                @open-map-fullscreen="openMapFullscreen"
                @show-transcript="() => {}"
              />
            </div>
          </template>
        </div>

        <!-- Right panel (desktop only, when toggled on) -->
        <aside
          v-if="!isMobile && rightPanelOpen"
          class="flex h-[calc(100vh-57px)] w-[420px] shrink-0 flex-col border-l border-neutral-200 bg-white"
        >
          <DetailRightPanel
            :document="document"
            @open-map-fullscreen="openMapFullscreen"
            @show-transcript="() => {}"
          />
        </aside>
      </div>

      <!-- Mobile: fullscreen viewer overlay (interactive media viewer with thumb strip + transcript) -->
      <div
        v-if="isMobile && mobileViewerFullscreen"
        class="fixed inset-0 z-[60] flex flex-col bg-white"
      >
        <div class="flex-1 min-h-0 flex flex-col">
          <ImageViewer
            v-if="document.mediaType === 'image'"
            :document="document"
            :image-count="imageCount"
            :fullscreen="true"
            @close="closeViewerFullscreen"
          />
          <PdfViewer
            v-else-if="document.mediaType === 'pdf'"
            :document="document"
            :fullscreen="true"
            @close="closeViewerFullscreen"
          />
          <AudioPlayer
            v-else-if="document.mediaType === 'audio'"
            :document="document"
            :fullscreen="true"
            @close="closeViewerFullscreen"
          />
          <VideoPlayer
            v-else-if="document.mediaType === 'video'"
            :document="document"
            :fullscreen="true"
            @close="closeViewerFullscreen"
          />
        </div>
      </div>

      <!-- Mobile: fullscreen map overlay -->
      <div
        v-if="isMobile && mobileMapFullscreen && document.lat != null && document.lng != null"
        class="fixed inset-0 z-[60] flex flex-col bg-white"
      >
        <div class="flex flex-shrink-0 items-center justify-between border-b border-neutral-200 px-4 py-2">
          <Button variant="ghost" size="sm" class="gap-1" @click="closeMapFullscreen">
            × Zavrieť
          </Button>
        </div>
        <div class="relative flex-1 min-h-0">
          <DetailMap :lat="document.lat" :lng="document.lng" />
        </div>
        <div class="flex flex-shrink-0 justify-end gap-2 border-t border-neutral-200 p-4">
          <Button variant="outline" size="sm" @click="openInMaps">Otvoriť v Maps</Button>
          <Button variant="outline" size="sm" @click="copyGps">Kopírovať GPS</Button>
        </div>
      </div>
    </template>
  </div>
</template>
