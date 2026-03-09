<script setup lang="ts">
import type { MediaType } from '@/data/mockData'
import { Play, FileText, Music, ImageIcon, Images } from 'lucide-vue-next'

defineProps<{
  mediaType: MediaType
  /** When true and mediaType is image: show multi-image icon (gallery); otherwise single image */
  hasTranscript?: boolean
}>()
</script>

<template>
  <Images v-if="mediaType === 'image' && hasTranscript" aria-label="Galéria obrázkov" />
  <ImageIcon v-else-if="mediaType === 'image'" aria-label="Obrázok" />
  <Play v-else-if="mediaType === 'video'" aria-label="Video" />
  <Music v-else-if="mediaType === 'audio'" aria-label="Audio" />
  <FileText v-else aria-label="Dokument" />
</template>
