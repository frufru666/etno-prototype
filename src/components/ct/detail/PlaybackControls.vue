<script setup lang="ts">
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { RotateCcw, Play, RotateCw } from 'lucide-vue-next'

const props = defineProps<{
  isPlaying: boolean
  currentTime: number
  duration: number
}>()

const emit = defineEmits<{
  (e: 'seek', seconds: number): void
  (e: 'toggle-play'): void
}>()

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

const progressPercent = computed(() =>
  Math.min(100, (props.currentTime / props.duration) * 100)
)
</script>

<template>
  <div class="flex flex-shrink-0 flex-col gap-2 border-t border-neutral-700 bg-neutral-800 p-4 text-white">
    <div class="flex items-center justify-center gap-4">
      <Button variant="ghost" size="sm" class="gap-1 text-white hover:bg-neutral-700" @click="emit('seek', -10)">
        <RotateCcw class="h-4 w-4" />
        10s
      </Button>
      <Button
        variant="secondary"
        size="icon"
        class="h-12 w-12 rounded-full bg-white text-neutral-800 hover:bg-neutral-200"
        @click="emit('toggle-play')"
      >
        <Play v-if="!isPlaying" class="h-6 w-6 translate-x-0.5" fill="currentColor" />
        <span v-else class="text-lg font-bold">‖</span>
      </Button>
      <Button variant="ghost" size="sm" class="gap-1 text-white hover:bg-neutral-700" @click="emit('seek', 10)">
        <RotateCw class="h-4 w-4" />
        10s
      </Button>
    </div>
    <div class="flex items-center gap-2">
      <span class="text-xs tabular-nums">{{ formatTime(currentTime) }}</span>
      <div class="relative h-2 flex-1 rounded-full bg-neutral-600">
        <div
          class="absolute inset-y-0 left-0 rounded-full bg-primary-500 transition-all"
          :style="{ width: `${progressPercent}%` }"
        />
      </div>
      <span class="text-xs tabular-nums">{{ formatTime(duration) }}</span>
    </div>
  </div>
</template>
