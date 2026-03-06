<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'
import NavActions from '@/components/ct/NavActions.vue'
import MobileMenu from '@/components/ct/MobileMenu.vue'
import SearchInput from '@/components/ct/SearchInput.vue'
import ResultsGrid from '@/components/ct/ResultsGrid.vue'
import SearchOverlayPanel from '@/components/ct/SearchOverlayPanel.vue'
import Footer from '@/components/ct/Footer.vue'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
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
import { PhCaretLeft } from '@phosphor-icons/vue'

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
</script>

<template>
  <div class="min-h-dvh bg-background flex flex-col">
    <!-- Desktop nav: single row -->
    <nav
      v-if="!isMobile"
      class="fixed top-0 left-0 right-0 z-50 flex h-[57px] items-center border-b border-border bg-background px-4 md:px-6"
      aria-label="Collection navigation"
    >
      <div class="flex min-w-0 flex-shrink-0 items-center gap-3">
        <RouterLink
          to="/"
          class="truncate text-lg font-semibold text-primary-500 hover:text-primary-600"
        >
          Etno Explorer SAV
        </RouterLink>
      </div>
      <div class="flex flex-1 justify-center px-4">
        <Button
          variant="outline"
          size="sm"
          class="mr-2 gap-1.5 rounded-lg border-border text-foreground hover:bg-accent focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
          aria-label="Späť do Kolekcií"
          @click="router.push({ name: 'collections' })"
        >
          <PhCaretLeft class="h-4 w-4" />
          <span class="hidden lg:inline">Späť do Kolekcií</span>
        </Button>
        <SearchInput
          v-model="searchQuery"
          class="w-full max-w-md"
          @submit="onSearchSubmit"
        />
      </div>
      <div class="flex flex-shrink-0 items-center gap-2">
        <NavActions />
      </div>
    </nav>

    <!-- Mobile nav: two rows (title + menu, then back button + search) -->
    <nav
      v-else
      class="fixed top-0 left-0 right-0 z-50 flex flex-col border-b border-border bg-background"
      aria-label="Collection navigation"
    >
      <div class="flex h-[49px] items-center justify-between px-4">
        <RouterLink
          to="/"
          class="truncate text-lg font-semibold text-primary-500 hover:text-primary-600"
        >
          Etno Explorer SAV
        </RouterLink>
        <MobileMenu />
      </div>
      <div class="flex items-center gap-2 px-4 pb-2.5">
        <Button
          variant="outline"
          size="icon"
          class="h-9 w-9 rounded-lg border-border text-foreground hover:bg-accent focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
          aria-label="Späť do Kolekcií"
          @click="router.push({ name: 'collections' })"
        >
          <PhCaretLeft class="h-4 w-4" />
        </Button>
        <SearchInput
          v-model="searchQuery"
          class="flex-1 min-w-0"
          @submit="onSearchSubmit"
        />
      </div>
    </nav>

    <template v-if="collection">
      <div class="flex-1 flex flex-col pt-[96px] md:pt-[57px]">
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
      <main class="flex-1 px-4 pt-[96px] md:px-6 md:pt-[57px]">
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
