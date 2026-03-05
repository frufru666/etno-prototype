<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-vue-next'
import PlaybackControls from '@/components/ct/detail/PlaybackControls.vue'
import type { EtnoDocument } from '@/data/mockData'

defineProps<{
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

function seek(seconds: number) {
  currentTime.value = Math.max(0, Math.min(duration.value, currentTime.value + seconds))
}
</script>

<template>
  <div
    class="relative flex h-full w-full flex-col bg-neutral-900"
    :class="{ 'fixed inset-0 z-[60]': fullscreen }"
  >
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
    <div
      v-if="document.hasTranscript || fullscreen"
      class="h-12 shrink-0"
    />

    <div class="flex flex-1 items-center justify-center text-neutral-500">
      Video viewer placeholder
    </div>

    <PlaybackControls
      :is-playing="isPlaying"
      :current-time="currentTime"
      :duration="duration"
      @seek="seek"
      @toggle-play="isPlaying = !isPlaying"
    />
  </div>
</template>
