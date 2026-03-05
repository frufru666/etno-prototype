<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DetailTopNav from '@/components/ct/DetailTopNav.vue'
import DetailRightPanel from '@/components/ct/detail/DetailRightPanel.vue'
import DetailMediaViewer from '@/components/ct/detail/DetailMediaViewer.vue'
import DetailMobileHero from '@/components/ct/detail/DetailMobileHero.vue'
import DetailMap from '@/components/ct/detail/DetailMap.vue'
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
  if (isMobile.value) mobileMapFullscreen.value = true
  else leftPanelView.value = 'map'
}
function closeMapFullscreen() {
  if (isMobile.value) mobileMapFullscreen.value = false
  else leftPanelView.value = 'media'
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
    await navigator.clipboard.writeText(`${doc.lat.toFixed(4)}° N, ${doc.lng.toFixed(4)}° E`)
  }
}

const imageCount = computed(() => {
  const doc = document.value
  if (!doc) return 1
  return doc.mediaType === 'image' && doc.hasTranscript ? 28 : 1
})

const mobileCtaLabel = computed(() => {
  const doc = document.value
  if (!doc) return 'Zobraziť'
  if (doc.mediaType === 'image') return imageCount.value > 1 ? 'Zobraziť galériu' : 'Zobraziť obrázok'
  if (doc.mediaType === 'pdf') return 'Zobraziť dokument'
  if (doc.mediaType === 'audio') return 'Zobraziť nahrávku'
  if (doc.mediaType === 'video') return 'Zobraziť video'
  return 'Zobraziť'
})

watch(document, (doc) => {
  if (doc == null && route.name === 'detail') router.replace({ name: 'explore' })
}, { immediate: true })
</script>

<template>
  <div class="min-h-screen bg-background">
    <DetailTopNav
      :right-panel-open="rightPanelOpen"
      @toggle-right-panel="rightPanelOpen = !rightPanelOpen"
    />

    <template v-if="!document">
      <main class="p-6 pt-[65px] md:pt-[73px]">
        <p class="text-muted-foreground">
          Dokument s ID <strong>{{ id }}</strong> nebol nájdený.
        </p>
        <Button variant="link" class="mt-4 p-0 text-primary-600" @click="router.push({ name: 'explore' })">
          ← Späť do Explore
        </Button>
      </main>
    </template>

    <template v-else>
      <div class="pt-[49px] md:flex md:flex-1 md:pt-[57px] md:overflow-hidden">
        <div class="min-w-0 md:flex-1 flex flex-col">
          <!-- Desktop: layered media + map -->
          <template v-if="!isMobile">
            <div class="flex-1 relative overflow-hidden h-[calc(100vh-57px)]">
              <div class="absolute inset-0" :class="{ invisible: leftPanelView !== 'media' }">
                <DetailMediaViewer :document="document" :image-count="imageCount" />
              </div>
              <div v-if="leftPanelView === 'map'" class="absolute inset-0 z-30 flex flex-col bg-background">
                <template v-if="document.lat != null && document.lng != null">
                  <DetailMap :lat="document.lat" :lng="document.lng" />
                  <div class="absolute right-2 top-2 z-10 flex gap-2">
                    <Button variant="secondary" size="sm" @click="closeMapFullscreen">Zavrieť</Button>
                    <Button variant="outline" size="sm" @click="openInMaps">Otvoriť v Maps</Button>
                    <Button variant="outline" size="sm" @click="copyGps">Kopírovať GPS</Button>
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
              :document="document"
              :cta-label="mobileCtaLabel"
              @open-viewer="mobileViewerFullscreen = true"
            />
            <div class="border-t border-border bg-background">
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

        <aside
          v-if="!isMobile && rightPanelOpen"
          class="flex h-[calc(100vh-57px)] w-[420px] shrink-0 flex-col border-l border-border bg-background"
        >
          <DetailRightPanel :document="document" @open-map-fullscreen="openMapFullscreen" @show-transcript="() => {}" />
        </aside>
      </div>

      <!-- Mobile: fullscreen viewer overlay -->
      <div v-if="isMobile && mobileViewerFullscreen" class="fixed inset-0 z-[60] flex flex-col bg-background">
        <div class="flex-1 min-h-0 flex flex-col">
          <DetailMediaViewer :document="document" :image-count="imageCount" fullscreen @close="mobileViewerFullscreen = false" />
        </div>
      </div>

      <!-- Mobile: fullscreen map overlay -->
      <div
        v-if="isMobile && mobileMapFullscreen && document.lat != null && document.lng != null"
        class="fixed inset-0 z-[60] flex flex-col bg-background"
      >
        <div class="flex flex-shrink-0 items-center justify-between border-b border-border px-4 py-2">
          <Button variant="ghost" size="sm" class="gap-1" @click="closeMapFullscreen">× Zavrieť</Button>
        </div>
        <div class="relative flex-1 min-h-0">
          <DetailMap :lat="document.lat" :lng="document.lng" />
        </div>
        <div class="flex flex-shrink-0 justify-end gap-2 border-t border-border p-4">
          <Button variant="outline" size="sm" @click="openInMaps">Otvoriť v Maps</Button>
          <Button variant="outline" size="sm" @click="copyGps">Kopírovať GPS</Button>
        </div>
      </div>
    </template>
  </div>
</template>
