<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { RotateCcw, Play, RotateCw } from 'lucide-vue-next'
import type { EtnoDocument } from '@/data/mockData'

const props = defineProps<{
  document: EtnoDocument
  mobile?: boolean
  fullscreen?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

// Mock playback state
const isPlaying = ref(false)
const currentTime = ref(15) // seconds
const duration = ref(93) // 1:33

const currentLabel = computed(() => {
  const m = Math.floor(currentTime.value / 60)
  const s = currentTime.value % 60
  return `${m}:${s.toString().padStart(2, '0')}`
})
const durationLabel = computed(() => {
  const m = Math.floor(duration.value / 60)
  const s = duration.value % 60
  return `${m}:${s.toString().padStart(2, '0')}`
})
const progressPercent = computed(() =>
  Math.min(100, (currentTime.value / duration.value) * 100)
)

function seek(seconds: number) {
  currentTime.value = Math.max(0, Math.min(duration.value, currentTime.value + seconds))
}
function togglePlay() {
  isPlaying.value = !isPlaying.value
}

// Transcript text: use note or abstract, or placeholder
const transcriptText = computed(() => {
  if (props.document.note) return props.document.note
  if (props.document.abstract) return props.document.abstract
  return 'Transkript nahrávky… (mock text) Dátum výskumu, Skupina, Heslo. Obec, č. d. Košická Nová Ves, 1.10.1974. Okres, Košice. Zapísal, Prameň, Predmet, Foto, Kresba.'
})
</script>

<template>
  <div
    class="relative flex h-full w-full flex-col bg-neutral-100"
    :class="{ 'fixed inset-0 z-[60]': fullscreen }"
  >
    <!-- Top bar: close when fullscreen (e.g. mobile) -->
    <div
      v-if="fullscreen"
      class="flex flex-shrink-0 items-center border-b border-neutral-200 bg-white px-4 py-2"
    >
      <Button
        variant="ghost"
        size="sm"
        class="gap-1"
        aria-label="Zavrieť"
        @click="emit('close')"
      >
        <span class="text-lg leading-none">×</span>
        Zavrieť
      </Button>
    </div>

    <!-- Transcript area (scrollable) -->
    <ScrollArea class="flex-1 p-4">
      <h3 class="mb-2 text-lg font-semibold">Transcript</h3>
      <p class="whitespace-pre-wrap text-sm text-muted-foreground">
        {{ transcriptText }}
      </p>
    </ScrollArea>

    <!-- Pinned bottom bar -->
    <div class="flex flex-shrink-0 flex-col gap-2 border-t border-neutral-300 bg-slate-800 p-4 text-white">
      <div class="flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          class="gap-1 text-white hover:bg-slate-700"
          @click="seek(-10)"
        >
          <RotateCcw class="h-4 w-4" />
          10s
        </Button>
        <Button
          variant="secondary"
          size="icon"
          class="h-12 w-12 rounded-full bg-white text-slate-800 hover:bg-neutral-200"
          @click="togglePlay"
        >
          <Play
            v-if="!isPlaying"
            class="h-6 w-6 translate-x-0.5"
            fill="currentColor"
          />
          <span v-else class="text-lg font-bold">‖</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          class="gap-1 text-white hover:bg-slate-700"
          @click="seek(10)"
        >
          <RotateCw class="h-4 w-4" />
          10s
        </Button>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs tabular-nums">{{ currentLabel }}</span>
        <div class="relative h-2 flex-1 rounded-full bg-slate-600">
          <div
            class="absolute inset-y-0 left-0 rounded-full bg-primary-500 transition-all"
            :style="{ width: `${progressPercent}%` }"
          />
        </div>
        <span class="text-xs tabular-nums">{{ durationLabel }}</span>
      </div>
    </div>
  </div>
</template>
