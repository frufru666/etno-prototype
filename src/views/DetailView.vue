<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DetailTopNav from '@/components/ct/DetailTopNav.vue'
import DetailRightPanel from '@/components/ct/detail/DetailRightPanel.vue'
import ImageViewer from '@/components/ct/detail/ImageViewer.vue'
import PdfViewer from '@/components/ct/detail/PdfViewer.vue'
import AudioPlayer from '@/components/ct/detail/AudioPlayer.vue'
import VideoPlayer from '@/components/ct/detail/VideoPlayer.vue'
import { Button } from '@/components/ui/button'
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

// Multi-image count for ImageViewer (mock: 28 when hasTranscript and image)
const imageCount = computed(() => {
  const doc = document.value
  if (!doc) return 1
  if (doc.mediaType === 'image' && doc.hasTranscript) return 28
  return 1
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
      <div class="flex pt-[49px] md:pt-[57px]">
        <!-- Left panel (desktop) or full width (mobile) -->
        <div class="min-w-0 flex-1">
          <!-- Desktop: media or map in left panel -->
          <template v-if="!isMobile">
            <!-- Map in left panel (desktop) -->
            <div
              v-if="leftPanelView === 'map'"
              class="relative h-[calc(100vh-57px)] w-full bg-neutral-200"
            >
              <div class="absolute inset-0 flex flex-col items-center justify-center gap-4 text-muted-foreground">
                <span>Map placeholder (fullscreen)</span>
                <Button
                  variant="secondary"
                  @click="closeMapFullscreen"
                >
                  Zavrieť
                </Button>
              </div>
            </div>
            <!-- Media viewer (desktop) -->
            <div
              v-else
              class="h-[calc(100vh-57px)] w-full"
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
          </template>

          <!-- Mobile: stacked layout -->
          <template v-else>
            <!-- Inline media viewer (compact) -->
            <div class="relative w-full bg-neutral-200">
              <ImageViewer
                v-if="document.mediaType === 'image'"
                :document="document"
                :image-count="imageCount"
                :mobile="true"
              />
              <PdfViewer
                v-else-if="document.mediaType === 'pdf'"
                :document="document"
                :mobile="true"
              />
              <AudioPlayer
                v-else-if="document.mediaType === 'audio'"
                :document="document"
                :mobile="true"
              />
              <VideoPlayer
                v-else-if="document.mediaType === 'video'"
                :document="document"
                :mobile="true"
              />
              <div
                v-else
                class="flex aspect-video items-center justify-center text-muted-foreground"
              >
                Žiadny prehliadač
              </div>
              <!-- Mobile: Zobraziť galériu for multi-image -->
              <Button
                v-if="document.mediaType === 'image' && imageCount > 1"
                class="absolute bottom-4 left-4 right-4"
                @click="openViewerFullscreen"
              >
                Zobraziť galériu
              </Button>
            </div>
            <!-- Right panel content stacked below (mobile) -->
            <div class="min-h-[50vh] border-t border-neutral-200 bg-white">
              <DetailRightPanel
                :document="document"
                :mobile="true"
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

      <!-- Mobile: fullscreen viewer overlay -->
      <div
        v-if="isMobile && mobileViewerFullscreen"
        class="fixed inset-0 z-[60] bg-white"
      >
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

      <!-- Mobile: fullscreen map overlay -->
      <div
        v-if="isMobile && mobileMapFullscreen"
        class="fixed inset-0 z-[60] flex flex-col bg-white"
      >
        <div class="flex flex-shrink-0 items-center justify-between border-b border-neutral-200 px-4 py-2">
          <Button
            variant="ghost"
            size="sm"
            class="gap-1"
            @click="closeMapFullscreen"
          >
            × Zavrieť
          </Button>
        </div>
        <div class="flex flex-1 items-center justify-center bg-primary-100 text-muted-foreground">
          Map placeholder (fullscreen)
        </div>
        <div class="flex flex-shrink-0 justify-end gap-2 border-t border-neutral-200 p-4">
          <Button variant="outline" size="sm">Otvoriť v Maps</Button>
          <Button variant="outline" size="sm">Kopírovať GPS</Button>
        </div>
      </div>
    </template>
  </div>
</template>
