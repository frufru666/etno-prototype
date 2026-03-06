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
    /** Show perex and document-type badges (list view); hide in detail panel */
    showPerex?: boolean
    showBadges?: boolean
  }>(),
  { showPerex: true, showBadges: true }
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
    <CardContent class="p-3">
      <!-- Single horizontal layout: prominent (primary-50 strip, icon, title, count, optional perex/badges) -->
      <div class="flex items-start gap-3">
        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-50">
          <FolderArchive class="h-5 w-5 text-primary-500" />
        </div>
        <div class="min-w-0 flex-1 text-left">
          <h3 class="line-clamp-1 text-base font-semibold leading-tight text-foreground">
            {{ collection.title }}
          </h3>
          <p class="mt-0.5 text-sm text-muted-foreground">
            {{ collectionItems.length }} položiek v kolekcii
          </p>
          <p
            v-if="showPerex && collection.perex"
            class="mt-2 line-clamp-2 text-sm text-foreground"
          >
            {{ collection.perex }}
          </p>
          <div
            v-if="showBadges && documentTypes.length"
            class="mt-2 flex flex-wrap gap-1"
          >
            <Badge
              v-for="docType in documentTypes"
              :key="docType"
              variant="secondary"
              class="text-xs"
            >
              {{ docType }}
            </Badge>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
