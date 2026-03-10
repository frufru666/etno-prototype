<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  METADATA_SECTIONS,
  abstractDisplay,
  getCollectionsForItem,
  getDocumentsForItem,
  getDocumentItems,
  type EtnoItem,
} from '@/data/mockData'
import { participantLines } from '@/lib/itemPresentation'
import { PhArrowSquareOut, PhCaretRight } from '@phosphor-icons/vue'
import DetailMap from '@/components/ct/detail/DetailMap.vue'
import CollectionCard from '@/components/ct/CollectionCard.vue'

const props = withDefaults(
  defineProps<{
    item: EtnoItem
    mobile?: boolean
    /** When true, hide ID/title/author (e.g. when shown in mobile hero block above) */
    hideHeader?: boolean
    /** When true, show desktop panel controls in the header row. */
    showPanelHeader?: boolean
  }>(),
  { hideHeader: false, showPanelHeader: false }
)

const emit = defineEmits<{
  (e: 'open-map-fullscreen'): void
  (e: 'show-transcript'): void
  (e: 'hide-panel'): void
}>()

const router = useRouter()

const collectionsForItem = () => getCollectionsForItem(props.item.id)
const documentsForItem = () => getDocumentsForItem(props.item.id)

function openExploreWithFilter(filterKey: string, value: string) {
  router.push({ name: 'explore', query: { [filterKey]: value } })
}

function formatCoords(item: EtnoItem): string {
  if (item.lat != null && item.lng != null) {
    return `${item.lat.toFixed(4)}° N, ${item.lng.toFixed(4)}° E`
  }
  return ''
}

const labelWidthClass = props.mobile ? 'w-[130px]' : 'w-[152px]'
</script>

<template>
  <component :is="mobile ? 'div' : ScrollArea" :class="mobile ? '' : 'h-full'">
    <div
      class="flex flex-col"
      :class="mobile ? 'px-4 py-5' : showPanelHeader ? 'p-4' : 'p-6'"
    >
      <div
        v-if="showPanelHeader && !mobile"
        class="mb-4 flex items-center justify-between gap-2"
      >
        <div class="flex min-w-0 items-center gap-2">
          <h3 class="truncate text-lg font-bold text-foreground">Detail</h3>
          <span
            class="shrink-0 rounded-full bg-primary-100 px-2 py-1 font-mono text-xs font-semibold text-primary-500"
          >
            {{ item.id }}
          </span>
        </div>
        <Button
          variant="nav"
          size="sm"
          class="gap-1.5 rounded-md text-sm font-semibold"
          aria-label="Skryť panel"
          @click="emit('hide-panel')"
        >
          Skryť
          <PhCaretRight class="h-4 w-4" />
        </Button>
      </div>

      <!-- 1. Header (hidden on mobile when shown in hero block above) -->
      <div
        v-if="!hideHeader"
        class="mb-5 space-y-1"
      >
        <span
          v-if="!showPanelHeader"
          class="inline-block font-mono text-label-small text-primary-500 bg-primary-50 px-2 py-0.5 rounded"
        >
          {{ item.id }}
        </span>
        <h2 class="text-2xl font-bold tracking-tight text-foreground">
          {{ item.title }}
        </h2>
        <p
          v-for="line in participantLines(item)"
          :key="line.label"
          class="text-sm text-muted-foreground"
        >
          {{ line.label }} {{ line.names }}
        </p>
        <Badge
          variant="outline"
          class="text-muted-foreground"
        >
          {{ item.documentType }}
        </Badge>
      </div>

      <!-- 2. Abstract (inline, like keywords) -->
      <div class="mb-7">
        <h4 class="mb-2 text-label-small font-bold uppercase tracking-wide text-muted-foreground">
          ABSTRAKT
        </h4>
        <p class="text-sm text-foreground">
          {{ abstractDisplay(item) }}
        </p>
      </div>

      <!-- 3. Kľúčové slová -->
      <div class="mb-7">
        <h4 class="mb-2 text-label-small font-bold uppercase tracking-wide text-muted-foreground">
          KĽÚČOVÉ SLOVÁ
        </h4>
        <div class="flex flex-wrap gap-1.5">
          <Badge
            v-for="kw in item.keywords"
            :key="kw"
            variant="outline"
            class="cursor-pointer border-primary-200 text-primary-500 hover:bg-primary-50 hover:text-primary-600"
            @click="openExploreWithFilter('keywords', kw)"
          >
            {{ kw }}
          </Badge>
        </div>
      </div>

      <!-- 4. Údaje (DataRow structure from Archeo) -->
      <div class="mb-4">
        <h3 class="mb-5 border-b-2 border-foreground pb-3 text-base font-bold tracking-tight text-foreground">
          Údaje
        </h3>

        <template
          v-for="section in METADATA_SECTIONS"
          :key="section.title"
        >
          <h4 class="mb-1 text-label-small font-bold uppercase tracking-wide text-muted-foreground">
            {{ section.title }}
          </h4>
          <div class="mb-6 flex flex-col">
            <div
              v-for="field in section.fields.filter((f) => f.getValue(item) != null)"
              :key="field.key"
              class="flex items-baseline border-b border-border py-2.5 last:border-b-0"
            >
              <span
                class="shrink-0 text-label-small text-muted-foreground"
                :class="labelWidthClass"
              >
                {{ field.label }}
              </span>
              <span class="min-w-0 flex-1 pl-2">
                <template v-if="field.isLink && field.filterKey">
                  <button
                    type="button"
                    class="inline-flex items-center gap-1 text-sm font-medium text-primary-500 hover:text-primary-600 hover:underline"
                    @click="
                      openExploreWithFilter(
                        field.filterKey,
                        field.getValue(item)
                      )
                    "
                  >
                    {{ field.getValue(item) }}
                    <PhArrowSquareOut class="h-3 w-3 shrink-0" />
                  </button>
                </template>
                <a
                  v-else-if="field.key === 'license' && item.license"
                  :href="item.license"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 text-sm font-medium text-primary-500 hover:text-primary-600 hover:underline"
                >
                  {{ field.getValue(item) }}
                  <PhArrowSquareOut class="h-3 w-3 shrink-0" />
                </a>
                <span
                  v-else
                  class="text-sm font-medium text-foreground"
                >
                  {{ field.getValue(item) }}
                </span>
              </span>
            </div>
          </div>
        </template>
      </div>

      <!-- 5. Súčasť (collection / document membership) – only when item has any -->
      <div
        v-if="collectionsForItem().length > 0 || documentsForItem().length > 0"
        class="mb-7 space-y-4"
      >
        <h4 class="text-label-small font-bold uppercase tracking-wide text-muted-foreground">
          SÚČASŤ
        </h4>
        <div class="space-y-4">
          <div>
            <p class="mb-2 text-sm text-muted-foreground">
              Súčasť kolekcie
            </p>
            <div
              v-if="collectionsForItem().length"
              class="flex flex-col gap-3"
            >
              <CollectionCard
                v-for="c in collectionsForItem()"
                :key="c.id"
                :collection="c"
                :show-thumbnail="false"
                :show-perex="false"
                :show-badges="false"
              />
            </div>
            <p
              v-else
              class="text-sm text-muted-foreground"
            >
              —
            </p>
          </div>
          <div>
            <p class="mb-2 text-sm text-muted-foreground">
              Súčasť dokumentu
            </p>
            <div
              v-if="documentsForItem().length"
              class="flex flex-col gap-2"
            >
              <CollectionCard
                v-for="d in documentsForItem()"
                :key="d.id"
                :document="d"
                :subtitle="`${getDocumentItems(d).length} položiek`"
                action-label="Zobraziť v Explore"
                @click="openExploreWithFilter('document', d.slug)"
              />
            </div>
            <p
              v-else
              class="text-sm text-muted-foreground"
            >
              —
            </p>
          </div>
        </div>
      </div>

      <!-- 6. Lokalita -->
      <div
        v-if="item.hasMap && item.lat != null && item.lng != null"
        class="space-y-2"
      >
        <h4 class="text-label-small font-bold uppercase tracking-wide text-muted-foreground">
          LOKALITA
        </h4>
        <div class="relative w-full max-h-[160px] overflow-hidden rounded-md border border-border bg-primary-50" style="aspect-ratio: 2/1;">
          <DetailMap
            :lat="item.lat"
            :lng="item.lng"
            compact
          />
          <div
            v-if="formatCoords(item)"
            class="absolute bottom-2 left-2 z-10 rounded bg-white/90 px-2 py-1 font-mono text-xs text-foreground"
          >
            {{ formatCoords(item) }}
          </div>
          <Button
            variant="secondary"
            size="sm"
            class="absolute bottom-2 right-2 z-10"
            @click="emit('open-map-fullscreen')"
          >
            Fullscreen →
          </Button>
        </div>
      </div>
    </div>
  </component>
</template>
