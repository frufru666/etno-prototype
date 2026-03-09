<script setup lang="ts">
import type { MediaType } from '@/data/mockData'
import { PhPlay, PhFileText, PhMusicNotes, PhImage, PhImages } from '@phosphor-icons/vue'

defineProps<{
  mediaType: MediaType
  /** When true and mediaType is image: show multi-image icon (gallery); otherwise single image */
  hasTranscript?: boolean
}>()
</script>

<template>
  <PhImages v-if="mediaType === 'image' && hasTranscript" aria-label="Galéria obrázkov" />
  <PhImage v-else-if="mediaType === 'image'" aria-label="Obrázok" />
  <PhPlay v-else-if="mediaType === 'video'" aria-label="Video" />
  <PhMusicNotes v-else-if="mediaType === 'audio'" aria-label="Audio" />
  <PhFileText v-else aria-label="Dokument" />
</template>
