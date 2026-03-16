<script setup lang="ts">
import type { EtnoItem } from '@/data/mockData'
import {
  getCollectionsForItem,
  getDocumentsForItem,
} from '@/data/mockData'
import { participantLines } from '@/lib/itemPresentation'
import { Button } from '@/components/ui/button'
import MediaMetaRow from '@/components/ct/MediaMetaRow.vue'
import IdPill from '@/components/ct/IdPill.vue'

const props = defineProps<{
  item: EtnoItem
  ctaLabel: string
}>()

const emit = defineEmits<{
  (e: 'open-viewer'): void
}>()

const collectionsForItem = () => getCollectionsForItem(props.item.id)
const documentsForItem = () => getDocumentsForItem(props.item.id)
</script>

<template>
  <div
    class="relative w-full min-h-[280px] h-[280px] bg-muted flex items-center justify-center cursor-pointer"
    role="button"
    tabindex="0"
    aria-label="Otvoriť prehliadač médií"
    @click="emit('open-viewer')"
    @keydown.enter.prevent="emit('open-viewer')"
    @keydown.space.prevent="emit('open-viewer')"
  >
    <span class="text-muted-foreground text-sm">Náhľad obsahu</span>
  </div>
  <div class="px-4 py-4 bg-background border-b border-border space-y-2">
    <IdPill :id="item.id" />
    <h2 class="text-xl font-bold tracking-tight text-foreground">
      {{ props.item.title }}
    </h2>
    <p
      v-for="line in participantLines(props.item)"
      :key="line.label"
      class="text-sm text-muted-foreground"
    >
      {{ line.label }} {{ line.names }}
    </p>
    <MediaMetaRow
      :document-type="props.item.documentType"
      :media-type="props.item.mediaType"
      :collection-count="collectionsForItem().length"
      :document-count="documentsForItem().length"
      size="md"
    />
    <Button class="w-full mt-2" @click="emit('open-viewer')">
      {{ ctaLabel }}
    </Button>
  </div>
</template>
