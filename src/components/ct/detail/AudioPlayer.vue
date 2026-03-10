<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import MediaViewerMobileHeader from '@/components/ct/MediaViewerMobileHeader.vue'
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

const isMobile = useIsMobile()
const isPlaying = ref(false)
const currentTime = ref(15)
const duration = ref(93)

function seek(seconds: number) {
  currentTime.value = Math.max(0, Math.min(duration.value, currentTime.value + seconds))
}
</script>

<template>
  <div
    class="relative flex h-full w-full flex-col bg-background"
    :class="{ 'fixed inset-0 z-[60]': fullscreen }"
  >
    <!-- Mobile fullscreen: Figma header + transcript + player at bottom -->
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
      <div
        v-if="item.hasTranscript && transcriptVisible"
        class="flex min-h-0 flex-1 flex-col"
      >
        <h2 class="shrink-0 px-6 pt-4 text-base font-bold text-foreground">
          Transcript
        </h2>
        <ScrollArea class="min-h-0 flex-1 px-6 pb-4">
          <p class="whitespace-pre-wrap text-base leading-6 text-muted-foreground">
            {{ transcriptPreview(item) }}
          </p>
        </ScrollArea>
      </div>
      <div v-else class="min-h-0 flex-1" />
      <div class="shrink-0 rounded-t-xl border-t border-neutral-700 bg-black">
        <PlaybackControls
          :is-playing="isPlaying"
          :current-time="currentTime"
          :duration="duration"
          @seek="seek"
          @toggle-play="isPlaying = !isPlaying"
        />
      </div>
    </template>

    <!-- Desktop or non-fullscreen -->
    <template v-else>
      <div
        v-if="fullscreen"
        class="flex flex-shrink-0 items-center justify-between gap-2 border-b border-border bg-background px-4 py-2"
      >
        <Button
          variant="ghost"
          size="sm"
          class="gap-1 bg-transparent text-primary-500 hover:bg-primary-50"
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
          {{ transcriptVisible ? 'Skryť Transcript' : 'Zobraziť Transcript' }}
        </Button>
      </div>

      <div
        v-if="item.hasTranscript && transcriptVisible && (isMobile || fullscreen)"
        class="flex min-h-0 flex-1 flex-col border-b border-border bg-background/60"
      >
        <ScrollArea class="flex-1 p-4">
          <h3 class="mb-2 text-sm font-semibold text-foreground">Transcript</h3>
          <p class="whitespace-pre-wrap text-sm text-muted-foreground">
            {{ transcriptPreview(item) }}
          </p>
        </ScrollArea>
      </div>
      <div v-else class="min-h-0 flex-1" />

      <div class="shrink-0">
        <PlaybackControls
          :is-playing="isPlaying"
          :current-time="currentTime"
          :duration="duration"
          @seek="seek"
          @toggle-play="isPlaying = !isPlaying"
        />
      </div>
    </template>
  </div>
</template>
