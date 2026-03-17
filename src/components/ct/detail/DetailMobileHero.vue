<script setup lang="ts">
import type { EtnoItem } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import MediaTypeIcon from '@/components/ct/MediaTypeIcon.vue'

defineProps<{
  item: EtnoItem
  ctaLabel: string
}>()

const emit = defineEmits<{
  (e: 'open-viewer'): void
}>()
</script>

<template>
  <div
    class="relative w-full min-h-[280px] h-[280px] bg-muted flex flex-col items-center justify-center gap-2 cursor-pointer"
    role="button"
    tabindex="0"
    aria-label="Otvoriť prehliadač médií"
    @click="emit('open-viewer')"
    @keydown.enter.prevent="emit('open-viewer')"
    @keydown.space.prevent="emit('open-viewer')"
  >
    <MediaTypeIcon
      :media-type="props.item.mediaType"
      :has-transcript="props.item.hasTranscript"
      class="h-24 w-24 shrink-0 text-muted-foreground"
    />
    <span class="text-muted-foreground text-sm">Náhľad obsahu</span>
  </div>
  <div class="px-4 py-4 bg-background border-b border-border">
    <Button class="w-full" @click="emit('open-viewer')">
      {{ ctaLabel }}
    </Button>
  </div>
</template>
