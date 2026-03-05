<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { RouterLink } from 'vue-router'
import NavActions from '@/components/ct/NavActions.vue'
import MobileMenu from '@/components/ct/MobileMenu.vue'
import SearchInput from '@/components/ct/SearchInput.vue'
import ResultsGrid from '@/components/ct/ResultsGrid.vue'
import { Separator } from '@/components/ui/separator'
import {
  getCollectionBySlug,
  getCollectionItems,
  getItemById,
  type CollectionBodyBlock,
} from '@/data/mockData'
import { useIsMobile } from '@/composables/useIsMobile'

const route = useRoute()
const isMobile = useIsMobile()
const slug = computed(() => route.params.slug as string)
const collection = computed(() => getCollectionBySlug(slug.value))

const sortKey = ref('id')
const sortOrder = ref<'asc' | 'desc'>('asc')
const searchQuery = ref('')

const items = computed(() => {
  const col = collection.value
  if (!col) return []
  let list = getCollectionItems(col)
  const key = sortKey.value
  const order = sortOrder.value
  return [...list].sort((a, b) => {
    let aVal: string | undefined
    let bVal: string | undefined
    if (key === 'id') {
      aVal = a.id
      bVal = b.id
    } else if (key === 'title') {
      aVal = a.title
      bVal = b.title
    } else if (key === 'studyPeriodStart') {
      aVal = a.studyPeriodStart ?? ''
      bVal = b.studyPeriodStart ?? ''
    } else {
      aVal = a.id
      bVal = b.id
    }
    const cmp = (aVal ?? '').localeCompare(bVal ?? '', undefined, { numeric: true })
    return order === 'asc' ? cmp : -cmp
  })
})

function getItemForBlock(block: CollectionBodyBlock) {
  if (block.type !== 'media' || !block.documentId) return null
  return getItemById(block.documentId)
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <nav
      class="fixed top-0 left-0 right-0 z-50 flex items-center border-b border-border bg-background px-4 md:px-6"
      :class="isMobile ? 'h-[49px]' : 'h-[57px]'"
      aria-label="Collection navigation"
    >
      <div class="flex min-w-0 flex-shrink-0 items-center gap-3">
        <RouterLink
          to="/"
          class="truncate text-lg font-semibold text-primary-500 hover:text-primary-600"
        >
          Etno Explorer SAV
        </RouterLink>
        <RouterLink
          :to="{ name: 'collections' }"
          class="hidden shrink-0 text-sm text-muted-foreground hover:text-foreground md:inline"
        >
          ← Späť do Kolekcií
        </RouterLink>
      </div>
      <div v-if="!isMobile" class="flex flex-1 justify-center px-4">
        <SearchInput v-model="searchQuery" class="w-full max-w-md" />
      </div>
      <div v-if="!isMobile" class="flex flex-shrink-0 items-center gap-2">
        <NavActions />
      </div>
      <template v-else>
        <RouterLink
          :to="{ name: 'collections' }"
          class="flex-1 text-sm text-primary-500 hover:text-primary-600 hover:underline"
        >
          ← Kolekcie
        </RouterLink>
        <MobileMenu />
      </template>
    </nav>

    <template v-if="collection">
      <div class="pt-[49px] md:pt-[57px]">
        <article class="mx-auto max-w-3xl px-4 py-6 md:px-6 md:py-8">
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
      </div>
    </template>
  </div>
</template>
