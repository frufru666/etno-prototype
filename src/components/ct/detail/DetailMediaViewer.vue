<script setup lang="ts">
import { computed } from 'vue'
import type { EtnoItem } from '@/data/mockData'
import ImageViewer from '@/components/ct/detail/ImageViewer.vue'
import PdfViewer from '@/components/ct/detail/PdfViewer.vue'
import AudioPlayer from '@/components/ct/detail/AudioPlayer.vue'
import VideoPlayer from '@/components/ct/detail/VideoPlayer.vue'
import { useIsMobile } from '@/composables/useIsMobile'

const props = withDefaults(
  defineProps<{
    item: EtnoItem
    imageCount?: number
    fullscreen?: boolean
    transcriptVisible?: boolean
    desktopTranscriptInLayout?: boolean
  }>(),
  {
    desktopTranscriptInLayout: false,
  }
)

defineEmits<{
  (e: 'close'): void
  (e: 'toggle-transcript'): void
}>()

const isMobile = useIsMobile()

const viewerTranscriptVisible = computed(() => {
  if (props.desktopTranscriptInLayout && !isMobile.value && !props.fullscreen) {
    return false
  }
  return props.transcriptVisible
})
</script>

<template>
  <ImageViewer
    v-if="props.item.mediaType === 'image'"
    :item="props.item"
    :image-count="props.imageCount ?? 1"
    :fullscreen="props.fullscreen"
    :transcript-visible="viewerTranscriptVisible"
    @close="$emit('close')"
    @show-transcript="$emit('toggle-transcript')"
  />
  <PdfViewer
    v-else-if="props.item.mediaType === 'pdf'"
    :item="props.item"
    :fullscreen="props.fullscreen"
    @close="$emit('close')"
  />
  <AudioPlayer
    v-else-if="props.item.mediaType === 'audio'"
    :item="props.item"
    :fullscreen="props.fullscreen"
    :transcript-visible="viewerTranscriptVisible"
    @close="$emit('close')"
    @show-transcript="$emit('toggle-transcript')"
  />
  <VideoPlayer
    v-else-if="props.item.mediaType === 'video'"
    :item="props.item"
    :fullscreen="props.fullscreen"
    :transcript-visible="viewerTranscriptVisible"
    @close="$emit('close')"
    @show-transcript="$emit('toggle-transcript')"
  />
  <div
    v-else
    class="flex h-full items-center justify-center bg-muted text-muted-foreground"
  >
    Žiadny prehliadač pre tento typ položky.
  </div>
</template>
