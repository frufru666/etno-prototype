<script setup lang="ts">
import { computed } from 'vue'
import type { EtnoCollection, EtnoDocument } from '@/data/mockData'
import { getCollectionItems } from '@/data/mockData'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'vue-router'
import { PhArchive, PhFileText } from '@phosphor-icons/vue'

const props = withDefaults(
  defineProps<{
    /** Collection (list or detail panel); when set, card is collection style */
    collection?: EtnoCollection
    /** Document (detail panel only); when set, card is document style, no thumbnail */
    document?: EtnoDocument
    /** Show thumbnail above (list view); only for collection. Default true so list has thumbnail */
    showThumbnail?: boolean
    /** Show perex and document-type badges; only for collection */
    showPerex?: boolean
    showBadges?: boolean
    /** Subtitle for document mode (e.g. "X položiek") */
    subtitle?: string
    /** Action label for document mode */
    actionLabel?: string
  }>(),
  { showThumbnail: true, showPerex: true, showBadges: true, actionLabel: 'Detail' }
)

const emit = defineEmits<{
  (e: 'click'): void
}>()

const router = useRouter()
const collectionItems = computed(() =>
  props.collection ? getCollectionItems(props.collection) : []
)
const documentTypes = computed(() =>
  [...new Set((collectionItems.value ?? []).map((d) => d.documentType))]
)

const cardTitle = computed(() =>
  props.document ? props.document.name : (props.collection?.title ?? '')
)
const cardSubtitle = computed(() =>
  props.document ? props.subtitle : `${collectionItems.value.length} položiek v kolekcii`
)

function goToCollection() {
  if (props.collection)
    router.push({ name: 'collection-detail', params: { slug: props.collection.slug } })
}

function handleClick() {
  if (props.document) emit('click')
  else if (props.collection) goToCollection()
}
</script>

<template>
  <!-- List view: collection with thumbnail above (aspect 4/3) + title, count, perex, badges -->
  <Card
    v-if="collection && showThumbnail"
    class="cursor-pointer rounded-xl border border-border transition-all hover:border-primary-200 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
    tabindex="0"
    @click="goToCollection"
    @keydown.enter.prevent="goToCollection"
    @keydown.space.prevent="goToCollection"
  >
    <CardContent class="p-3">
      <div class="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
        <div class="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <PhArchive class="h-12 w-12" />
        </div>
      </div>
      <h3 class="mt-3 line-clamp-1 text-lg font-semibold leading-tight text-foreground">
        {{ collection.title }}
      </h3>
      <p class="mt-0.5 text-sm text-muted-foreground">
        {{ collectionItems.length }} položiek v kolekcii
      </p>
      <p
        v-if="showPerex && collection.perex"
        class="mt-2 line-clamp-3 text-sm text-foreground"
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
    </CardContent>
  </Card>

  <!-- Same component: detail panel card (collection OR document). Image only for collection; same row below -->
  <Card
    v-else-if="collection || document"
    class="group cursor-pointer rounded-xl border border-border transition-all hover:border-primary-200 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
    tabindex="0"
    @click="handleClick"
    @keydown.enter.prevent="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <CardContent class="p-0 overflow-hidden">
      <!-- Image above: only for collection, not for document -->
      <div
        v-if="collection"
        class="h-[200px] w-full shrink-0 overflow-hidden rounded-t-xl bg-muted"
      >
        <div class="flex h-full w-full items-center justify-center text-muted-foreground">
          <PhArchive class="h-12 w-12" />
        </div>
      </div>
      <!-- Same content row for both collection and document -->
      <div class="flex items-start gap-3 p-3">
        <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-50">
          <FolderArchive
            v-if="collection"
            class="h-5 w-5 text-primary-500"
          />
          <FileText
            v-else
            class="h-5 w-5 text-primary-500"
          />
        </div>
        <div class="min-w-0 flex-1 text-left">
          <h3 class="line-clamp-1 text-base font-semibold leading-tight text-foreground">
            {{ cardTitle }}
          </h3>
          <p class="mt-0.5 text-sm text-muted-foreground">
            {{ cardSubtitle }}
          </p>
          <p
            v-if="collection && showPerex && collection.perex"
            class="mt-2 line-clamp-2 text-sm text-foreground"
          >
            {{ collection.perex }}
          </p>
          <div
            v-if="collection && showBadges && documentTypes.length"
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
        <span
          v-if="document"
          class="shrink-0 text-sm font-semibold text-primary-500 group-hover:underline"
        >
          {{ actionLabel }}
        </span>
      </div>
    </CardContent>
  </Card>
</template>
