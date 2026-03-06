<script setup lang="ts">
import type { MapPin } from '@/data/mockData'
import MockMap from '@/components/ct/MockMap.vue'

withDefaults(
  defineProps<{
    pins: MapPin[]
    enabled?: boolean
  }>(),
  { enabled: true }
)
</script>

<template>
  <div class="relative h-full w-full">
    <MockMap v-if="enabled" :pins="pins" />
    <div
      v-else
      class="absolute inset-0 flex items-center justify-center bg-muted text-sm text-muted-foreground"
    >
      Mapa
    </div>
  </div>
</template>
