<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { PhMagnifyingGlassPlus, PhMagnifyingGlassMinus, PhCaretLeft, PhX } from '@phosphor-icons/vue'
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
const currentIndex = ref(0)
const safeImageCount = computed(() => Math.max(props.imageCount, 1))
const isMulti = computed(() => safeImageCount.value > 1)

const thumbIndices = computed(() =>
  Array.from({ length: safeImageCount.value }, (_, i) => i)
)

watch(
  [() => props.initialIndex, safeImageCount],
  ([initial, count]) => {
    const normalized = Number.isFinite(initial) ? initial : 0
    currentIndex.value = Math.min(Math.max(normalized, 0), count - 1)
  },
  { immediate: true }
)

function splitTranscriptByImage(text: string, imageCount: number): string[] {
  const normalized = text.trim()
  if (!normalized) return Array.from({ length: imageCount }, () => '')
  if (imageCount <= 1) return [normalized]

  const paragraphs = normalized.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean)
  if (paragraphs.length >= imageCount) {
    return paragraphs.slice(0, imageCount)
  }

  const sentences = normalized
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
  const source = sentences.length ? sentences : [normalized]
  const chunks = Array.from({ length: imageCount }, () => '')
  source.forEach((part, idx) => {
    const chunkIndex = idx % imageCount
    chunks[chunkIndex] = chunks[chunkIndex] ? `${chunks[chunkIndex]} ${part}` : part
  })

  return chunks.map(
    (chunk, idx) =>
      chunk || `Pre obrázok ${idx + 1} zatiaľ nie je dostupný samostatný prepis.`
  )
}

const transcriptChunks = computed(() =>
  splitTranscriptByImage(transcriptPreview(props.item), safeImageCount.value)
)

const activeTranscript = computed(
  () => transcriptChunks.value[currentIndex.value] ?? transcriptChunks.value[0] ?? ''
)

function goBackToExplore() {
  router.push({ name: 'explore' })
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
            <PhCaretLeft class="h-4 w-4" />
            Späť
          </Button>
          <span class="text-sm font-medium">Transcript</span>
          <div class="w-14" />
        </div>
        <ScrollArea class="flex-1 p-4">
          <h3 class="mb-2 text-sm font-semibold text-foreground">
            {{ isMulti ? `Obrázok ${currentIndex + 1}/${safeImageCount}` : 'Transcript' }}
          </h3>
          <p class="whitespace-pre-wrap text-sm text-foreground">
            {{ activeTranscript }}
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
          <PhCaretLeft class="h-4 w-4" />
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
          <PhX class="h-4 w-4" />
          Zavrieť
        </Button>
        <div class="flex-1" />
        <Button
          v-if="item.hasTranscript"
          variant="secondary"
          size="sm"
          @click="emit('show-transcript')"
        >
          {{ transcriptVisible ? 'Skryť Transcript' : 'Zobraziť Transcript' }}
        </Button>
      </div>

      <!-- Desktop: column layout so thumbnail strip is never covered by transcript -->
      <div class="flex flex-1 min-h-0 flex-col pt-12">
        <!-- Row: image area + transcript panel (transcript does not extend into strip) -->
        <div class="flex min-h-0 flex-1">
          <div class="relative flex min-w-0 flex-1 items-center justify-center p-4">
            <div
              class="flex aspect-[4/3] w-full max-w-4xl items-center justify-center rounded bg-muted text-muted-foreground"
            >
              Image viewer {{ isMulti ? `(${currentIndex + 1} / ${safeImageCount})` : '' }}
            </div>
            <!-- Left toolbar: zoom only -->
            <div
              class="absolute left-2 top-1/2 flex -translate-y-1/2 flex-col gap-1"
              :class="{ 'top-[calc(50%+24px)]': fullscreen || isMulti || item.hasTranscript }"
            >
              <Button
                variant="secondary"
                size="icon"
                class="h-8 w-8 bg-white/90"
                aria-label="Priblížiť"
              >
                <PhMagnifyingGlassPlus class="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                class="h-8 w-8 bg-white/90"
                aria-label="Oddialiť"
              >
                <PhMagnifyingGlassMinus class="h-4 w-4" />
              </Button>
            </div>
          </div>
          <!-- Desktop: transcript panel to the right (stops above thumbnail strip) -->
          <div
            v-if="!isMobile && item.hasTranscript && transcriptVisible"
            class="flex w-80 shrink-0 flex-col border-l border-border bg-background/95"
          >
            <ScrollArea class="min-h-0 flex-1 p-4">
              <h3 class="mb-2 text-sm font-semibold text-foreground">
                {{ isMulti ? `Obrázok ${currentIndex + 1}/${safeImageCount}` : 'Transcript' }}
              </h3>
              <p class="whitespace-pre-wrap text-sm text-muted-foreground">
                {{ activeTranscript }}
              </p>
            </ScrollArea>
          </div>
        </div>
        <!-- Thumbnail strip in its own row so it is never covered -->
        <div
          v-if="isMulti"
          class="shrink-0 border-t border-border bg-background/90 p-2"
        >
          <p class="mb-2 text-xs font-medium text-muted-foreground">
            OBRÁZKY ({{ safeImageCount }})
          </p>
          <div class="flex gap-2 overflow-x-auto pb-2">
            <button
              v-for="i in thumbIndices"
              :key="i"
              type="button"
              class="h-14 w-14 shrink-0 overflow-hidden rounded border-2 transition-colors"
              :class="
                currentIndex === i
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-transparent bg-muted hover:border-primary-200'
              "
              @click="currentIndex = i"
            >
              <span class="flex h-full w-full items-center justify-center text-xs">
                {{ i + 1 }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
