<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Button } from '@/components/ui/button'
import MediaViewerMobileHeader from '@/components/ct/MediaViewerMobileHeader.vue'
import { PhMagnifyingGlassPlus, PhMagnifyingGlassMinus, PhX } from '@phosphor-icons/vue'
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
</script>

<template>
  <div
    class="relative flex h-full w-full min-h-0 flex-col bg-muted"
    :class="{ 'fixed inset-0 z-[60]': fullscreen }"
  >
    <!-- Mobile fullscreen: Figma header + content + thumbnails -->
    <template v-if="isMobile && fullscreen">
      <MediaViewerMobileHeader
        :right-label="
          item.hasTranscript
            ? (transcriptVisible ? 'Skryť Transcript' : 'Zobraziť Transcript')
            : undefined
        "
        @close="emit('close')"
        @action="emit('show-transcript')"
      />
      <!-- Transcript view: dimmed image + title + scrollable transcript -->
      <template v-if="item.hasTranscript && transcriptVisible">
        <div class="relative flex min-h-0 flex-1 flex-col bg-background">
          <div
            class="absolute inset-0 bg-muted opacity-20"
            aria-hidden
          />
          <h2 class="relative z-10 px-6 pt-4 text-base font-bold text-foreground">
            {{ isMulti ? `Transcript ${currentIndex + 1}/${safeImageCount}` : 'Transcript' }}
          </h2>
          <ScrollArea class="relative z-10 flex-1 px-6 pb-4">
            <p class="whitespace-pre-wrap text-base leading-6 text-foreground">
              {{ activeTranscript }}
            </p>
          </ScrollArea>
        </div>
      </template>
      <!-- Image view: image area + zoom on right -->
      <template v-else>
        <div class="relative flex min-h-0 flex-1 flex-col">
          <div class="relative flex min-h-0 flex-1 items-center justify-center p-4">
            <div
              class="flex aspect-[4/3] w-full max-w-4xl items-center justify-center rounded bg-muted text-muted-foreground"
            >
              Image viewer {{ isMulti ? `(${currentIndex + 1} / ${safeImageCount})` : '' }}
            </div>
            <!-- Right-side zoom (Figma) -->
            <div
              class="absolute right-2 top-1/2 flex -translate-y-1/2 flex-col gap-1"
            >
              <Button
                variant="secondary"
                size="icon"
                class="h-8 w-8 border-2 border-primary-500 bg-background"
                aria-label="Priblížiť"
              >
                <PhMagnifyingGlassPlus class="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                class="h-8 w-8 border-2 border-primary-500 bg-background"
                aria-label="Oddialiť"
              >
                <PhMagnifyingGlassMinus class="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </template>
      <!-- Thumbnails at bottom (both image and transcript view) -->
      <div
        v-if="isMulti"
        class="shrink-0 border-t border-border bg-background p-4"
      >
        <div class="flex gap-2 overflow-x-auto">
          <button
            v-for="idx in thumbIndices"
            :key="idx"
            type="button"
            class="h-12 w-12 shrink-0 overflow-hidden rounded border-2 transition-colors"
            :class="
              currentIndex === idx
                ? 'border-primary-500 bg-primary-50'
                : 'border-border bg-muted opacity-50 hover:border-primary-200'
            "
            @click="currentIndex = idx"
          >
            <span class="flex h-full w-full items-center justify-center text-xs">
              {{ idx + 1 }}
            </span>
          </button>
        </div>
      </div>
    </template>

    <!-- Desktop or non-fullscreen mobile: original layout -->
    <template v-else>
      <!-- Floating controls when desktop fullscreen or with transcript -->
      <div
        v-if="fullscreen || isMulti || (item.hasTranscript && (isMobile || fullscreen))"
        class="absolute left-2 right-2 top-2 z-10 flex items-center justify-between gap-2"
      >
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
          v-if="item.hasTranscript && (isMobile || fullscreen)"
          variant="secondary"
          size="sm"
          @click="emit('show-transcript')"
        >
          {{ transcriptVisible ? 'Skryť Transcript' : 'Zobraziť Transcript' }}
        </Button>
      </div>

      <div class="flex flex-1 min-h-0 flex-col pt-12">
        <div class="flex min-h-0 flex-1">
          <div class="relative flex min-w-0 flex-1 items-center justify-center p-4">
            <div
              class="flex aspect-[4/3] w-full max-w-4xl items-center justify-center rounded bg-muted text-muted-foreground"
            >
              Image viewer {{ isMulti ? `(${currentIndex + 1} / ${safeImageCount})` : '' }}
            </div>
            <div
              class="absolute left-2 top-1/2 flex -translate-y-1/2 flex-col gap-1"
              :class="{
                'top-[calc(50%+24px)]':
                  fullscreen || isMulti || (item.hasTranscript && (isMobile || fullscreen)),
              }"
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
        </div>
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
