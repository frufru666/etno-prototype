<script setup lang="ts">
import type { EtnoCollection } from '@/data/mockData'
import { getCollectionDocuments } from '@/data/mockData'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'vue-router'
import { FolderArchive } from 'lucide-vue-next'

const props = defineProps<{
  collection: EtnoCollection
}>()

const router = useRouter()
const documents = getCollectionDocuments(props.collection)
const documentTypes = [...new Set(documents.map((d) => d.documentType))]

function goToCollection() {
  router.push({ name: 'collection-detail', params: { slug: props.collection.slug } })
}
</script>

<template>
  <Card
    class="cursor-pointer rounded-xl border border-border transition-all hover:border-primary-200 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
    tabindex="0"
    @click="goToCollection"
    @keydown.enter.prevent="goToCollection"
    @keydown.space.prevent="goToCollection"
  >
    <CardContent class="p-3">
      <div class="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
        <div class="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <FolderArchive class="h-12 w-12" />
        </div>
      </div>
      <h3 class="mt-3 line-clamp-1 text-lg font-semibold leading-tight">
        {{ collection.title }}
      </h3>
      <p class="mt-0.5 text-sm text-muted-foreground">
        {{ documents.length }} položiek v kolekcii
      </p>
      <p class="mt-2 line-clamp-3 text-sm text-foreground">
        {{ collection.perex }}
      </p>
      <div class="mt-2 flex flex-wrap gap-1">
        <Badge
          v-for="docType in documentTypes"
          :key="docType"
          variant="secondary"
          class="text-xs"
        >
          {{ docType }}
        </Badge>
      </div>
    </CardContent>
  </Card>
</template>
