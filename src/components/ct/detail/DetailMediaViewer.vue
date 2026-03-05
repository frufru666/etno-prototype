<script setup lang="ts">
import type { EtnoItem } from '@/data/mockData'
import ImageViewer from '@/components/ct/detail/ImageViewer.vue'
import PdfViewer from '@/components/ct/detail/PdfViewer.vue'
import AudioPlayer from '@/components/ct/detail/AudioPlayer.vue'
import VideoPlayer from '@/components/ct/detail/VideoPlayer.vue'

defineProps<{
  item: EtnoItem
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
    v-if="item.mediaType === 'image'"
    :item="item"
    :image-count="imageCount ?? 1"
    :fullscreen="fullscreen"
    :transcript-visible="transcriptVisible"
    @close="$emit('close')"
    @show-transcript="$emit('toggle-transcript')"
  />
  <PdfViewer
    v-else-if="item.mediaType === 'pdf'"
    :item="item"
    :fullscreen="fullscreen"
    @close="$emit('close')"
  />
  <AudioPlayer
    v-else-if="item.mediaType === 'audio'"
    :item="item"
    :fullscreen="fullscreen"
    :transcript-visible="transcriptVisible"
    @close="$emit('close')"
    @show-transcript="$emit('toggle-transcript')"
  />
  <VideoPlayer
    v-else-if="item.mediaType === 'video'"
    :item="item"
    :fullscreen="fullscreen"
    :transcript-visible="transcriptVisible"
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
