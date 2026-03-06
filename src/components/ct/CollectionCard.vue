<script setup lang="ts">
import type { EtnoCollection } from '@/data/mockData'
import { getCollectionItems } from '@/data/mockData'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'vue-router'
import { FolderArchive } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    collection: EtnoCollection
    /** Compact variant for detail panel (horizontal, no perex/badges) */
    compact?: boolean
  }>(),
  { compact: false }
)

const router = useRouter()
const collectionItems = getCollectionItems(props.collection)
const documentTypes = [...new Set(collectionItems.map((d) => d.documentType))]

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
    <CardContent :class="compact ? 'p-2.5' : 'p-3'">
      <!-- Compact: horizontal layout for detail panel -->
      <div
        v-if="compact"
        class="flex items-center gap-3"
      >
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
          <FolderArchive class="h-5 w-5 text-primary-500" />
        </div>
        <div class="min-w-0 flex-1 text-left">
          <h3 class="line-clamp-1 text-sm font-semibold leading-tight text-foreground">
            {{ collection.title }}
          </h3>
          <p class="text-xs text-muted-foreground">
            {{ collectionItems.length }} položiek v kolekcii
          </p>
        </div>
      </div>
      <!-- Default: full card -->
      <template v-else>
        <div class="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
          <div class="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <FolderArchive class="h-12 w-12" />
          </div>
        </div>
        <h3 class="mt-3 line-clamp-1 text-lg font-semibold leading-tight">
          {{ collection.title }}
        </h3>
        <p class="mt-0.5 text-sm text-muted-foreground">
          {{ collectionItems.length }} položiek v kolekcii
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
      </template>
    </CardContent>
  </Card>
</template>
