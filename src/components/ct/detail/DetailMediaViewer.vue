<script setup lang="ts">
import type { EtnoDocument } from '@/data/mockData'
import ImageViewer from '@/components/ct/detail/ImageViewer.vue'
import PdfViewer from '@/components/ct/detail/PdfViewer.vue'
import AudioPlayer from '@/components/ct/detail/AudioPlayer.vue'
import VideoPlayer from '@/components/ct/detail/VideoPlayer.vue'

defineProps<{
  document: EtnoDocument
  imageCount?: number
  fullscreen?: boolean
  transcriptVisible?: boolean
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'toggle-transcript'): void
}>()
</script>

<template>
  <ImageViewer
    v-if="document.mediaType === 'image'"
    :document="document"
    :image-count="imageCount ?? 1"
    :fullscreen="fullscreen"
    :transcript-visible="transcriptVisible"
    @close="$emit('close')"
    @show-transcript="$emit('toggle-transcript')"
  />
  <PdfViewer
    v-else-if="document.mediaType === 'pdf'"
    :document="document"
    :fullscreen="fullscreen"
    @close="$emit('close')"
  />
  <AudioPlayer
    v-else-if="document.mediaType === 'audio'"
    :document="document"
    :fullscreen="fullscreen"
    :transcript-visible="transcriptVisible"
    @close="$emit('close')"
    @show-transcript="$emit('toggle-transcript')"
  />
  <VideoPlayer
    v-else-if="document.mediaType === 'video'"
    :document="document"
    :fullscreen="fullscreen"
    :transcript-visible="transcriptVisible"
    @close="$emit('close')"
    @show-transcript="$emit('toggle-transcript')"
  />
  <div
    v-else
    class="flex h-full items-center justify-center bg-muted text-muted-foreground"
  >
    Žiadny prehliadač pre tento typ dokumentu.
  </div>
</template>
