<script setup lang="ts">
import type { EtnoDocument } from '@/data/mockData'
import { getMediaType } from '@/data/mockData'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import MediaTypeIcon from '@/components/ct/MediaTypeIcon.vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  document: EtnoDocument
}>()

const router = useRouter()

function goToDetail() {
  router.push({ name: 'detail', params: { id: props.document.id } })
}

const mediaType = getMediaType(props.document.documentType)
const isMultiImage = mediaType === 'image' && props.document.hasTranscript

function participantLines(): { label: string; names: string }[] {
  const out: { label: string; names: string }[] = []
  if (props.document.authors?.length)
    out.push({
      label: 'Autor:',
      names: props.document.authors.map((a) => a.name).join(', '),
    })
  if (props.document.researchers?.length)
    out.push({
      label: 'Výskumník:',
      names: props.document.researchers.map((a) => a.name).join(', '),
    })
  if (props.document.originators?.length)
    out.push({
      label: 'Pôvodca:',
      names: props.document.originators.map((a) => a.name).join(', '),
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
        {{ document.id }}
      </Badge>
      <span
        v-if="!document.hasMap"
        class="text-xs text-destructive"
      >
        Nie je v mape
      </span>
    </CardHeader>
    <CardContent class="space-y-2 p-3 pt-2">
      <!-- Thumbnail 4:3 -->
      <div
        class="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-muted"
      >
        <div
          class="absolute inset-0 flex items-center justify-center text-muted-foreground"
        >
          <MediaTypeIcon
            :media-type="mediaType"
            :has-transcript="document.hasTranscript"
            class="h-10 w-10"
          />
        </div>
      </div>
      <h3 class="line-clamp-2 font-medium leading-tight">
        {{ document.title }}
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
          {{ document.documentType }}
        </Badge>
      </div>
    </CardContent>
  </Card>
</template>
