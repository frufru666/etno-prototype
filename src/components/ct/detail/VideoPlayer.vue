<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { PhCaretLeft, PhX } from '@phosphor-icons/vue'
import PlaybackControls from '@/components/ct/detail/PlaybackControls.vue'
import { transcriptPreview, type EtnoItem } from '@/data/mockData'
import { useIsMobile } from '@/composables/useIsMobile'

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

const router = useRouter()
const isMobile = useIsMobile()
const isPlaying = ref(false)
const currentTime = ref(15)
const duration = ref(93)

function seek(seconds: number) {
  currentTime.value = Math.max(0, Math.min(duration.value, currentTime.value + seconds))
}

function goBackToExplore() {
  if (window.history.length > 1) router.back()
  else router.push({ name: 'explore' })
}
</script>

<template>
  <div
    class="relative flex h-full w-full flex-col bg-neutral-900"
    :class="{ 'fixed inset-0 z-[60]': fullscreen }"
  >
    <div class="absolute left-4 right-4 top-4 z-10 flex items-center justify-between">
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
      <div v-else class="flex-1" />
      <Button
        v-if="item.hasTranscript"
        variant="secondary"
        size="sm"
        @click="emit('show-transcript')"
      >
        {{ transcriptVisible ? 'Skryť Transcript' : 'Zobraziť Transcript' }}
      </Button>
    </div>
    <div
      v-if="item.hasTranscript || fullscreen"
      class="h-12 shrink-0"
    />

    <!-- Desktop: media left, transcript panel right -->
    <template v-if="!isMobile">
      <div class="flex flex-1 min-h-0">
        <div class="flex min-w-0 flex-1 flex-col">
          <div class="flex flex-1 min-h-0 items-center justify-center text-neutral-500">
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
        <div
          v-if="item.hasTranscript && transcriptVisible"
          class="flex w-80 shrink-0 flex-col border-l border-white/20 bg-black/40"
        >
          <ScrollArea class="flex-1 p-4">
            <p class="whitespace-pre-wrap text-sm text-neutral-200">
              {{ transcriptPreview(item) }}
            </p>
          </ScrollArea>
        </div>
      </div>
    </template>

    <!-- Mobile: video + controls fixed, transcript below in own scroll -->
    <template v-else>
      <div class="flex shrink-0 items-center justify-center py-4 text-neutral-500">
        Video viewer placeholder
      </div>
      <PlaybackControls
        class="shrink-0"
        :is-playing="isPlaying"
        :current-time="currentTime"
        :duration="duration"
        @seek="seek"
        @toggle-play="isPlaying = !isPlaying"
      />
      <div
        v-if="item.hasTranscript && transcriptVisible"
        class="flex min-h-0 flex-1 flex-col border-t border-white/20 bg-black/40"
      >
        <ScrollArea class="flex-1 p-4">
          <p class="whitespace-pre-wrap text-sm text-neutral-200">
            {{ transcriptPreview(item) }}
          </p>
        </ScrollArea>
      </div>
    </template>
  </div>
</template>
