<script setup lang="ts">
import { ref, computed } from 'vue'
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
import type { EtnoDocument } from '@/data/mockData'

const props = withDefaults(
  defineProps<{
    document: EtnoDocument
    initialIndex?: number
    mobile?: boolean
    fullscreen?: boolean
    imageCount?: number
  }>(),
  { initialIndex: 0, imageCount: 1 }
)

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'show-transcript'): void
}>()

const currentIndex = ref(props.initialIndex)
const isMulti = computed(() => props.imageCount > 1)

// Mock thumbnail indices for strip
const thumbIndices = computed(() =>
  Array.from({ length: props.imageCount }, (_, i) => i)
)
</script>

<template>
  <div
    class="relative flex h-full w-full min-h-0 flex-col bg-neutral-200"
    :class="{ 'fixed inset-0 z-[60]': fullscreen }"
  >
    <!-- Top bar: close (when fullscreen) + transcript button (multi) -->
    <div
      v-if="fullscreen || isMulti"
      class="absolute left-0 right-0 top-0 z-10 flex items-center justify-between gap-2 bg-black/20 p-2"
    >
      <Button
        v-if="fullscreen"
        variant="secondary"
        size="sm"
        class="gap-1"
        aria-label="Zavrieť"
        @click="emit('close')"
      >
        <X class="h-4 w-4" />
        Zavrieť
      </Button>
      <div v-else />
      <Button
        v-if="isMulti && document.hasTranscript"
        variant="outline"
        size="sm"
        class="border-primary-500 bg-white/90 text-primary-600"
        @click="emit('show-transcript')"
      >
        Zobraziť Transcript
      </Button>
    </div>

    <!-- Left toolbar -->
    <div
      class="absolute left-2 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-1"
      :class="{ 'top-[calc(50%+24px)]': fullscreen || isMulti }"
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

    <!-- Main image area (placeholder) -->
    <div class="flex flex-1 items-center justify-center p-4 pt-14">
      <div
        class="flex aspect-[4/3] w-full max-w-4xl items-center justify-center rounded bg-neutral-300 text-muted-foreground"
      >
        Image viewer {{ isMulti ? `(${currentIndex + 1} / ${imageCount})` : '' }}
      </div>
    </div>

    <!-- Bottom thumbnail strip (multi only) -->
    <div
      v-if="isMulti"
      class="border-t border-neutral-300 bg-white/90 p-2"
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
              : 'border-transparent bg-neutral-200 hover:border-neutral-400'
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
</template>
