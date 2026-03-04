<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { RotateCcw, Play, RotateCw, X } from 'lucide-vue-next'
import type { EtnoDocument } from '@/data/mockData'

const props = defineProps<{
  document: EtnoDocument
  mobile?: boolean
  fullscreen?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'show-transcript'): void
}>()

const isPlaying = ref(false)
const currentTime = ref(15)
const duration = ref(93)

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
</script>

<template>
  <div
    class="relative flex h-full w-full flex-col bg-slate-900"
    :class="{ 'fixed inset-0 z-[60]': fullscreen }"
  >
    <!-- Top bar: close when fullscreen + transcript button -->
    <div class="absolute left-4 right-4 top-4 z-10 flex items-center justify-between">
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
        v-if="document.hasTranscript"
        variant="outline"
        size="sm"
        class="border-primary-500 bg-white/10 text-primary-300 hover:bg-white/20"
        @click="emit('show-transcript')"
      >
        Zobraziť Transcript
      </Button>
    </div>
    <!-- Spacer so content is not under the bar -->
    <div
      v-if="document.hasTranscript || fullscreen"
      class="h-12 shrink-0"
    />

    <!-- Video placeholder (dark) -->
    <div class="flex flex-1 items-center justify-center text-slate-500">
      Video viewer placeholder
    </div>

    <!-- Bottom controls (same as AudioPlayer) -->
    <div class="flex flex-shrink-0 flex-col gap-2 border-t border-slate-700 bg-slate-800 p-4 text-white">
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
