<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopNav from '@/components/ct/TopNav.vue'
import CollectionCard from '@/components/ct/CollectionCard.vue'
import SearchOverlayPanel from '@/components/ct/SearchOverlayPanel.vue'
import Footer from '@/components/ct/Footer.vue'
import { COLLECTIONS } from '@/data/mockData'
import { useIsMobile } from '@/composables/useIsMobile'
import { useSearchOverlay } from '@/composables/useSearchOverlay'
import { pushExploreSearch } from '@/lib/navigation'

const router = useRouter()
const isMobile = useIsMobile()
const filterOpen = ref(false)
const searchQuery = ref('')
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
      :filter-open="filterOpen"
      :active-filter-count="0"
      :search-query="searchQuery"
      @toggle-filter="filterOpen = !filterOpen"
      @update:search-query="updateSearchQuery"
      @search-submit="onSearchSubmit"
    />
    <div class="flex-1 flex flex-col pt-[49px] md:pt-[61px]">
      <SearchOverlayPanel
        :items="searchFilteredItems"
        :query="searchQuery"
        :mobile="isMobile"
      />
      <main
        class="flex-1 px-4 py-6 md:px-6 md:py-8"
      >
        <h1 class="text-2xl font-semibold text-foreground md:text-3xl">
          Kolekcie
        </h1>
        <p class="mt-1 text-muted-foreground md:mt-2">
          Kurátorované výbery z archívu.
        </p>
        <div
          class="mt-6 grid grid-cols-1 gap-4 md:mt-8 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
        >
          <CollectionCard
            v-for="collection in COLLECTIONS"
            :key="collection.id"
            :collection="collection"
          />
        </div>
      </main>
      <Footer />
    </div>
  </div>
</template>
