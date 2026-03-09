<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import TopNav from '@/components/ct/TopNav.vue'
import ResultsGrid from '@/components/ct/ResultsGrid.vue'
import { Button } from '@/components/ui/button'
import { PhCaretLeft } from '@phosphor-icons/vue'
import SearchOverlayPanel from '@/components/ct/SearchOverlayPanel.vue'
import Footer from '@/components/ct/Footer.vue'
import { Separator } from '@/components/ui/separator'
import {
  getCollectionBySlug,
  getCollectionItems,
  getItemById,
  type CollectionBodyBlock,
} from '@/data/mockData'
import { useIsMobile } from '@/composables/useIsMobile'
import { useSearchOverlay } from '@/composables/useSearchOverlay'
import { sortEtnoItems, type ItemSortKey } from '@/lib/itemPresentation'
import { pushExploreSearch } from '@/lib/navigation'

const route = useRoute()
const router = useRouter()
const isMobile = useIsMobile()
const slug = computed(() => route.params.slug as string)
const collection = computed(() => getCollectionBySlug(slug.value))

const sortKey = ref<ItemSortKey>('id')
const sortOrder = ref<'asc' | 'desc'>('asc')
const searchQuery = ref('')

const items = computed(() => {
  const col = collection.value
  if (!col) return []
  return sortEtnoItems(
    getCollectionItems(col),
    sortKey.value,
    sortOrder.value
  )
})

function getItemForBlock(block: CollectionBodyBlock) {
  if (block.type !== 'media' || !block.documentId) return null
  return getItemById(block.documentId)
}

const { searchFilteredItems } = useSearchOverlay(searchQuery)

function onSearchSubmit(value: string) {
  pushExploreSearch(router, value)
}

function updateSearchQuery(value: string) {
  searchQuery.value = value
}
</script>

<template>
  <div class="min-h-dvh bg-background flex flex-col">
    <TopNav
      :filter-open="false"
      :active-filter-count="0"
      :search-query="searchQuery"
      @update:search-query="updateSearchQuery"
      @search-submit="onSearchSubmit"
    />

    <!-- Fixed over content: Back to Collections (not part of nav) -->
    <div
      class="fixed left-4 z-40"
      :class="isMobile ? 'top-[53px]' : 'top-[65px]'"
    >
      <Button
        variant="primary"
        size="sm"
        class="gap-1.5 rounded-md text-sm font-semibold shadow-sm"
        aria-label="Späť do Kolekcií"
        @click="router.push({ name: 'collections' })"
      >
        <PhCaretLeft class="size-4" />
        Späť do Kolekcií
      </Button>
    </div>

    <template v-if="collection">
      <div class="flex-1 flex flex-col pt-[49px] md:pt-[61px]">
        <SearchOverlayPanel
          :items="searchFilteredItems"
          :query="searchQuery"
          :mobile="isMobile"
        />
        <article class="mx-auto max-w-3xl px-4 py-6 md:px-6 md:py-8">
          <!-- Hero image above title (placeholder; replace with real asset when available) -->
          <div
            class="mb-6 flex min-h-[160px] items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-primary-50 to-muted md:mb-8"
            style="aspect-ratio: 21/9;"
          >
            <span class="text-sm font-medium text-muted-foreground">Kolekcia – obrázok</span>
          </div>
          <h1 class="text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl">
            {{ collection.title }}
          </h1>
          <p
            v-if="collection.subtitle"
            class="mt-1 text-base text-muted-foreground md:text-lg"
          >
            {{ collection.subtitle }}
          </p>
          <blockquote
            class="mt-4 border-l-4 border-primary-200 pl-4 text-lg italic text-muted-foreground md:mt-6 md:text-xl"
          >
            {{ collection.perex }}
          </blockquote>
          <div class="mt-6 space-y-4 md:mt-8 md:space-y-6">
            <template v-for="(block, i) in collection.body" :key="i">
              <p
                v-if="block.type === 'paragraph'"
                class="text-base leading-relaxed text-foreground md:text-lg"
              >
                {{ block.text }}
              </p>
              <h2
                v-else-if="block.type === 'heading2'"
                class="text-xl font-semibold text-foreground md:text-2xl"
              >
                {{ block.text }}
              </h2>
              <h3
                v-else-if="block.type === 'heading3'"
                class="text-lg font-semibold text-foreground md:text-xl"
              >
                {{ block.text }}
              </h3>
                <div v-else-if="block.type === 'media'" class="space-y-2">
                <div
                  class="aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted"
                >
                  <div
                    class="flex h-full items-center justify-center text-sm text-muted-foreground"
                  >
                    {{ getItemForBlock(block)?.title ?? 'Mediálny obsah' }}
                  </div>
                </div>
                <p
                  v-if="block.caption"
                  class="text-sm text-muted-foreground"
                >
                  {{ block.caption }}
                </p>
              </div>
            </template>
          </div>
        </article>

        <Separator class="my-6 md:my-8" />

        <ResultsGrid
          :items="items"
          :sort-key="sortKey"
          :sort-order="sortOrder"
          @update:sort-key="sortKey = $event"
          @update:sort-order="sortOrder = $event"
        />
        <Footer />
      </div>
    </template>
    <template v-else>
      <main class="flex-1 px-4 pt-[49px] md:px-6 md:pt-[61px]">
        <div class="mx-auto max-w-3xl py-8">
          <h1 class="text-2xl font-semibold text-foreground">Kolekcia nebola nájdená</h1>
          <p class="mt-2 text-muted-foreground">
            Požadovaná kolekcia neexistuje alebo bola odstránená.
          </p>
          <Button
            variant="link"
            class="mt-4 p-0 text-primary-600"
            @click="router.push({ name: 'collections' })"
          >
            ← Späť do Kolekcií
          </Button>
        </div>
      </main>
      <Footer />
    </template>
  </div>
</template>
