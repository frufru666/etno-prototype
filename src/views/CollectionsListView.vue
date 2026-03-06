<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import TopNav from '@/components/ct/TopNav.vue'
import CollectionCard from '@/components/ct/CollectionCard.vue'
import SearchResultsPanel from '@/components/ct/SearchResultsPanel.vue'
import Footer from '@/components/ct/Footer.vue'
import { COLLECTIONS, ITEMS, matchesSearch } from '@/data/mockData'
import { useIsMobile } from '@/composables/useIsMobile'

const router = useRouter()
const isMobile = useIsMobile()
const filterOpen = ref(false)
const searchQuery = ref('')

const searchFilteredItems = computed(() =>
  ITEMS.filter((item) => matchesSearch(item, searchQuery.value))
)
const isSearchActive = computed(() => searchQuery.value.trim().length > 0)

function onSearchSubmit(value: string) {
  router.push({ name: 'explore', query: value.trim() ? { q: value.trim() } : {} })
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <TopNav
      :filter-open="filterOpen"
      :active-filter-count="0"
      :search-query="searchQuery"
      @toggle-filter="filterOpen = !filterOpen"
      @update:search-query="searchQuery = $event"
      @search-submit="onSearchSubmit"
    />
    <div class="pt-[96px] md:pt-[57px]">
      <div
        v-if="isSearchActive"
        class="fixed left-4 right-4 top-[104px] z-30 md:left-1/2 md:right-auto md:top-[72px] md:w-[480px] md:-translate-x-1/2"
      >
        <SearchResultsPanel
          :items="searchFilteredItems"
          :query="searchQuery"
          :mobile="isMobile"
        />
      </div>
      <main
        class="px-4 py-6 md:px-6 md:py-8"
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
