<script setup lang="ts">
import type { EtnoItem } from '@/data/mockData'
import { getCollectionsForItem, getDocumentsForItem, getMediaType } from '@/data/mockData'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import MediaTypeIcon from '@/components/ct/MediaTypeIcon.vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  item: EtnoItem
}>()

const router = useRouter()

function goToDetail() {
  router.push({ name: 'detail', params: { id: props.item.id } })
}

const mediaType = getMediaType(props.item.documentType)
const isMultiImage = mediaType === 'image' && props.item.hasTranscript
const collections = getCollectionsForItem(props.item.id)
const documents = getDocumentsForItem(props.item.id)

function participantLines(): { label: string; names: string }[] {
  const out: { label: string; names: string }[] = []
  if (props.item.authors?.length)
    out.push({
      label: 'Autor:',
      names: props.item.authors.map((a) => a.name).join(', '),
    })
  if (props.item.researchers?.length)
    out.push({
      label: 'Výskumník:',
      names: props.item.researchers.map((a) => a.name).join(', '),
    })
  if (props.item.originators?.length)
    out.push({
      label: 'Pôvodca:',
      names: props.item.originators.map((a) => a.name).join(', '),
    })
  return out
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
      <Badge variant="outline" class="font-mono text-xs text-primary-500 border-primary-200">
        {{ item.id }}
      </Badge>
      <span
        v-if="!item.hasMap"
        class="text-xs text-destructive"
      >
        Nie je v mape
      </span>
    </CardHeader>
    <CardContent class="space-y-2 p-3 pt-2">
      <!-- Thumbnail 4:3: single image = one icon, multi image = gallery icon + label -->
      <div
        class="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-muted"
      >
        <div
          class="absolute inset-0 flex flex-col items-center justify-center gap-1 text-muted-foreground"
        >
          <MediaTypeIcon
            :media-type="mediaType"
            :has-transcript="item.hasTranscript"
            class="h-10 w-10"
          />
          <span
            v-if="isMultiImage"
            class="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/90"
          >
            Galéria
          </span>
        </div>
      </div>
      <h3 class="line-clamp-2 font-medium leading-tight">
        {{ item.title }}
      </h3>
      <div class="space-y-0.5 text-xs text-muted-foreground">
        <p
          v-for="line in participantLines()"
          :key="line.label"
          class="line-clamp-1"
        >
          {{ line.label }} {{ line.names }}
        </p>
      </div>
      <div class="flex flex-wrap gap-1 pt-1">
        <Badge variant="secondary" class="text-xs">
          {{ item.documentType }}
        </Badge>
        <Badge
          v-if="collections.length"
          variant="outline"
          class="text-xs border-primary-200 text-primary-600"
        >
          Kolekcia
        </Badge>
        <Badge
          v-if="documents.length"
          variant="outline"
          class="text-xs border-muted-foreground/40 text-muted-foreground"
        >
          Dokument
        </Badge>
      </div>
    </CardContent>
  </Card>
</template>
