<script setup lang="ts">
import { computed } from 'vue'
import type { EtnoItem } from '@/data/mockData'
import type { MediaType } from '@/data/mockData'
import { getCollectionsForItem, getDocumentsForItem, getMediaType, yearFromStudyPeriodStart } from '@/data/mockData'
import { participantLines } from '@/lib/itemPresentation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import MediaMetaRow from '@/components/ct/MediaMetaRow.vue'
import IdPill from '@/components/ct/IdPill.vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  item: EtnoItem
  /** When set, detail page shows "Back to Collection" and returns to this collection slug */
  fromCollectionSlug?: string
}>()

const router = useRouter()

function goToDetail() {
  const query = props.fromCollectionSlug ? { fromCollection: props.fromCollectionSlug } : undefined
  router.push({ name: 'detail', params: { id: props.item.id }, query })
}

const mediaType = getMediaType(props.item.documentType)
const isMultiImage = mediaType === 'image' && props.item.hasTranscript
const collections = getCollectionsForItem(props.item.id)
const documents = getDocumentsForItem(props.item.id)

const locationDisplay = computed(() => {
  const raw = [props.item.obec, props.item.okres].filter(Boolean) as string[]
  const parts =
    raw.length === 2 && raw[0] === raw[1] ? [raw[0]] : raw
  return parts.length > 0 ? parts.join(', ') : undefined
})
const yearDisplay = computed(() => yearFromStudyPeriodStart(props.item.studyPeriodStart))

function typeChipClass(mediaType: MediaType): string {
  switch (mediaType) {
    case 'image':
      return 'border-purple-200 bg-purple-50 text-purple-700'
    case 'video':
      return 'border-secondary-300 bg-secondary-100 text-secondary-800'
    case 'audio':
      return 'border-green-200 bg-green-50 text-green-800'
    case 'pdf':
      return 'border-amber-200 bg-amber-50 text-amber-800'
    default:
      return 'border-muted-foreground/30 bg-muted/50 text-muted-foreground'
  }
}

function thumbnailClass(mediaType: MediaType): string {
  switch (mediaType) {
    case 'image':
      return 'bg-purple-50 text-purple-700'
    case 'video':
      return 'bg-secondary-100 text-secondary-800'
    case 'audio':
      return 'bg-green-50 text-green-800'
    case 'pdf':
      return 'bg-amber-50 text-amber-800'
    default:
      return 'bg-muted text-muted-foreground'
  }
}
</script>

<template>
  <Card
    class="cursor-pointer rounded-xl border border-border transition-all hover:border-primary-200 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
    tabindex="0"
    @click="goToDetail"
    @keydown.enter.prevent="goToDetail"
    @keydown.space.prevent="goToDetail"
  >
    <CardHeader class="flex flex-row items-center justify-between gap-2 p-3 pb-0">
      <IdPill :id="item.id" />
      <span
        v-if="!item.hasMap"
        class="text-xs text-destructive"
      >
        Nie je v mape
      </span>
    </CardHeader>
    <CardContent class="space-y-2 p-3 pt-2">
      <!-- Thumbnail 4:3: colored by media type, always shows icon -->
      <div
        class="relative aspect-[4/3] w-full overflow-hidden rounded-md"
        :class="thumbnailClass(mediaType)"
      >
        <div
          class="absolute inset-0 flex flex-col items-center justify-center gap-1"
        >
          <MediaTypeIcon
            :media-type="mediaType"
            :has-transcript="item.hasTranscript"
            class="h-10 w-10"
          />
          <span
            v-if="isMultiImage"
            class="text-xs font-medium uppercase tracking-wider opacity-90"
          >
            Galéria
          </span>
        </div>
      </div>
      <!-- 1. Document type + collection/document meta – shared component -->
      <MediaMetaRow
        :document-type="item.documentType"
        :media-type="mediaType"
        :collection-count="collections.length"
        :document-count="documents.length"
        size="md"
      />
      <!-- 2. Location and year -->
      <div
        v-if="locationDisplay || yearDisplay"
        class="line-clamp-1 flex flex-wrap items-baseline gap-x-1.5 text-xs text-muted-foreground"
      >
        <span v-if="locationDisplay">{{ locationDisplay }}</span>
        <span v-if="locationDisplay && yearDisplay" class="shrink-0" aria-hidden>·</span>
        <span v-if="yearDisplay">{{ yearDisplay }}</span>
      </div>
      <!-- 3. Title -->
      <h3 class="line-clamp-2 text-base font-semibold leading-tight text-foreground">
        {{ item.title }}
      </h3>
      <!-- 4. Author / participants (same text style as location) -->
      <div class="space-y-0.5 text-sm text-muted-foreground">
        <p
          v-for="line in participantLines(item)"
          :key="line.label"
          class="line-clamp-1 text-xs"
        >
          {{ line.label }} {{ line.names }}
        </p>
      </div>
    </CardContent>
  </Card>
</template>
