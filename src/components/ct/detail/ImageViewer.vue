<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import {
  ZoomIn,
  ZoomOut,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Menu,
} from 'lucide-vue-next'
import { transcriptPreview, type EtnoItem } from '@/data/mockData'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useIsMobile } from '@/composables/useIsMobile'

const props = withDefaults(
  defineProps<{
    item: EtnoItem
    initialIndex?: number
    mobile?: boolean
    fullscreen?: boolean
    imageCount?: number
    transcriptVisible?: boolean
  }>(),
  { initialIndex: 0, imageCount: 1 }
)

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'show-transcript'): void
}>()

const router = useRouter()
const isMobile = useIsMobile()
const currentIndex = ref(props.initialIndex)
const isMulti = computed(() => props.imageCount > 1)

const thumbIndices = computed(() =>
  Array.from({ length: props.imageCount }, (_, i) => i)
)

function goBackToExplore() {
  if (window.history.length > 1) router.back()
  else router.push({ name: 'explore' })
}
</script>

<template>
  <div
    class="relative flex h-full w-full min-h-0 flex-col bg-muted"
    :class="{ 'fixed inset-0 z-[60]': fullscreen }"
  >
    <!-- Mobile: transcript as separate full screen -->
    <template v-if="isMobile && item.hasTranscript && transcriptVisible">
      <div class="flex h-full flex-col bg-background">
        <div class="flex shrink-0 items-center justify-between border-b border-border px-4 py-2">
          <Button
            variant="ghost"
            size="sm"
            class="gap-1"
            aria-label="Späť"
            @click="emit('show-transcript')"
          >
            <ChevronLeft class="h-4 w-4" />
            Späť
          </Button>
          <span class="text-sm font-medium">Transcript</span>
          <div class="w-14" />
        </div>
        <ScrollArea class="flex-1 p-4">
          <p class="whitespace-pre-wrap text-sm text-foreground">
            {{ transcriptPreview(item) }}
          </p>
        </ScrollArea>
      </div>
    </template>

    <!-- Main view: image (or desktop with transcript panel on right) -->
    <template v-else>
      <!-- Floating controls: close + transcript -->
      <div
        v-if="fullscreen || isMulti || item.hasTranscript || !isMobile"
        class="absolute left-2 right-2 top-2 z-10 flex items-center justify-between gap-2"
      >
        <Button
          v-if="!isMobile"
          variant="default"
          size="sm"
          class="gap-1.5 rounded-lg bg-primary-500 text-primary-foreground hover:bg-primary-600 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
          aria-label="Späť do Explore"
          @click="goBackToExplore"
        >
          <ChevronLeft class="h-4 w-4" />
          <span>Späť do Explore</span>
        </Button>
        <Button
          v-if="fullscreen"
          variant="ghost"
          size="sm"
          class="gap-1 bg-transparent text-foreground hover:bg-white/10"
          aria-label="Zavrieť"
          @click="emit('close')"
        >
          <X class="h-4 w-4" />
          Zavrieť
        </Button>
        <div class="flex-1" />
        <Button
          v-if="item.hasTranscript"
          variant="ghost"
          size="sm"
          class="bg-transparent text-primary-100 hover:bg-white/10 hover:text-primary-50"
          @click="emit('show-transcript')"
        >
          {{ transcriptVisible ? 'Skryť Transcript' : 'Zobraziť Transcript' }}
        </Button>
      </div>

      <!-- Desktop: image left, transcript panel right -->
      <div class="flex flex-1 min-h-0 pt-12">
        <div class="flex min-w-0 flex-1 flex-col">
          <div class="relative flex flex-1 items-center justify-center p-4">
            <div
              class="flex aspect-[4/3] w-full max-w-4xl items-center justify-center rounded bg-muted text-muted-foreground"
            >
              Image viewer {{ isMulti ? `(${currentIndex + 1} / ${imageCount})` : '' }}
            </div>
            <!-- Left toolbar -->
            <div
              class="absolute left-2 top-1/2 flex -translate-y-1/2 flex-col gap-1"
              :class="{ 'top-[calc(50%+24px)]': fullscreen || isMulti || item.hasTranscript }"
            >
              <Button
                variant="secondary"
                size="icon"
                class="h-8 w-8 bg-white/90"
                aria-label="Zoom in"
              >
                <ZoomIn class="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                class="h-8 w-8 bg-white/90"
                aria-label="Zoom out"
              >
                <ZoomOut class="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                class="h-8 w-8 bg-white/90"
                aria-label="Pan up"
              >
                <ChevronUp class="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                class="h-8 w-8 bg-white/90"
                aria-label="Pan down"
              >
                <ChevronDown class="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                class="h-8 w-8 bg-white/90"
                aria-label="Pan left"
              >
                <ChevronLeft class="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                class="h-8 w-8 bg-white/90"
                aria-label="Pan right"
              >
                <ChevronRight class="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                class="h-8 w-8 bg-white/90"
                aria-label="Fullscreen"
              >
                <Maximize2 class="h-4 w-4" />
              </Button>
              <Button
                v-if="!fullscreen"
                variant="secondary"
                size="icon"
                class="h-8 w-8 bg-white/90"
                aria-label="Close"
                @click="emit('close')"
              >
                <X class="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                class="h-8 w-8 bg-white/90"
                aria-label="Menu"
              >
                <Menu class="h-4 w-4" />
              </Button>
            </div>
          </div>
          <!-- Bottom thumbnail strip (multi only) -->
          <div
            v-if="isMulti"
            class="border-t border-border bg-background/90 p-2"
          >
            <p class="mb-2 text-xs font-medium text-muted-foreground">
              OBRÁZKY ({{ imageCount }})
            </p>
            <div class="flex gap-2 overflow-x-auto pb-2">
              <button
                v-for="i in thumbIndices"
                :key="i - 1"
                type="button"
                class="h-14 w-14 shrink-0 overflow-hidden rounded border-2 transition-colors"
                :class="
                  currentIndex === i - 1
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-transparent bg-muted hover:border-primary-200'
                "
                @click="currentIndex = i - 1"
              >
                <span class="flex h-full w-full items-center justify-center text-xs">
                  {{ i }}
                </span>
              </button>
            </div>
          </div>
        </div>
        <!-- Desktop: transcript panel to the right -->
        <div
          v-if="!isMobile && item.hasTranscript && transcriptVisible"
          class="flex w-80 shrink-0 flex-col border-l border-border bg-background/95"
        >
          <ScrollArea class="flex-1 p-4">
            <h3 class="mb-2 text-sm font-semibold text-foreground">Transcript</h3>
            <p class="whitespace-pre-wrap text-sm text-muted-foreground">
              {{ transcriptPreview(item) }}
            </p>
          </ScrollArea>
        </div>
      </div>
    </template>
  </div>
</template>
