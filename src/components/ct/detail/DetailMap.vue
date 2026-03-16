<script setup lang="ts">
import { computed } from 'vue'
import MockMap from '@/components/ct/MockMap.vue'

const props = withDefaults(
  defineProps<{
    lat: number
    lng: number
    compact?: boolean
    /** When false, hide mobile CTA in tooltip (used in fullscreen detail map) */
    showDetailCta?: boolean
  }>(),
  { compact: false, showDetailCta: true }
)

const pins = computed(() => [
  {
    id: '',
    lat: props.lat,
    lng: props.lng,
    title: 'Lokalita',
    documentType: 'fotografia' as const,
  },
])
</script>

<template>
  <div class="relative h-full w-full min-h-[200px]">
    <MockMap :pins="pins" :compact="compact" :show-detail-cta="showDetailCta" />
  </div>
</template>
