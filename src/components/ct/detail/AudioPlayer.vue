<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import PlaybackControls from '@/components/ct/detail/PlaybackControls.vue'
import { transcriptPreview, type EtnoDocument } from '@/data/mockData'

const props = defineProps<{
  document: EtnoDocument
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
      class="flex flex-shrink-0 items-center justify-between border-b border-border bg-background px-4 py-2"
    >
      <Button variant="ghost" size="sm" class="gap-1" aria-label="Zavrieť" @click="emit('close')">
        <span class="text-lg leading-none">×</span>
        Zavrieť
      </Button>
      <Button
        v-if="document.hasTranscript"
        variant="outline"
        size="sm"
        @click="emit('show-transcript')"
      >
        {{ transcriptVisible ? 'Skryť Transcript' : 'Zobraziť Transcript' }}
      </Button>
    </div>
    <div
      v-else-if="document.hasTranscript"
      class="flex flex-shrink-0 justify-end border-b border-border bg-background/80 px-4 py-2"
    >
      <Button
        variant="outline"
        size="sm"
        @click="emit('show-transcript')"
      >
        {{ transcriptVisible ? 'Skryť Transcript' : 'Zobraziť Transcript' }}
      </Button>
    </div>

    <!-- Transcript above player: own scroll so transcript scrolls without player moving -->
    <div
      v-if="document.hasTranscript && transcriptVisible"
      class="flex min-h-0 flex-1 flex-col border-b border-border bg-background/60"
    >
      <ScrollArea class="flex-1 p-4">
        <h3 class="mb-2 text-sm font-semibold text-foreground">Transcript</h3>
        <p class="whitespace-pre-wrap text-sm text-muted-foreground">
          {{ transcriptPreview(document) }}
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
