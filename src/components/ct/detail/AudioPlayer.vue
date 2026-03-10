<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import PlaybackControls from '@/components/ct/detail/PlaybackControls.vue'
import { transcriptPreview, type EtnoItem } from '@/data/mockData'

defineProps<{
  item: EtnoItem
  mobile?: boolean
  fullscreen?: boolean
  transcriptVisible?: boolean
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
    class="relative flex h-full w-full flex-col bg-muted"
    :class="{ 'fixed inset-0 z-[60]': fullscreen }"
  >
    <div
      v-if="fullscreen"
      class="flex flex-shrink-0 items-center justify-between gap-2 border-b border-border bg-background px-4 py-2"
    >
      <Button
        variant="ghost"
        size="sm"
        class="gap-1 bg-transparent text-primary-600 hover:text-primary-700"
        aria-label="Zavrieť"
        @click="emit('close')"
      >
        <span class="text-lg leading-none">×</span>
        Zavrieť
      </Button>
      <Button
        v-if="item.hasTranscript"
        variant="secondary"
        size="sm"
        @click="emit('show-transcript')"
      >
        {{ transcriptVisible ? 'Hide Transcript' : 'Show Transcript' }}
      </Button>
    </div>

    <!-- Transcript above player: own scroll so transcript scrolls without player moving -->
    <div
      v-if="item.hasTranscript && transcriptVisible"
      class="flex min-h-0 flex-1 flex-col border-b border-border bg-background/60"
    >
      <ScrollArea class="flex-1 p-4">
        <h3 class="mb-2 text-sm font-semibold text-foreground">Transcript</h3>
        <p class="whitespace-pre-wrap text-sm text-muted-foreground">
          {{ transcriptPreview(item) }}
        </p>
      </ScrollArea>
    </div>
    <div
      v-else
      class="min-h-0 flex-1"
    />

    <div class="shrink-0">
      <PlaybackControls
        :is-playing="isPlaying"
        :current-time="currentTime"
        :duration="duration"
        @seek="seek"
        @toggle-play="isPlaying = !isPlaying"
      />
    </div>
  </div>
</template>
