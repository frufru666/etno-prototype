<script setup lang="ts">
import { ref } from 'vue'
import TopNav from '@/components/ct/TopNav.vue'
import CollectionCard from '@/components/ct/CollectionCard.vue'
import Footer from '@/components/ct/Footer.vue'
import { COLLECTIONS } from '@/data/mockData'

const filterOpen = ref(false)
const searchQuery = ref('')
</script>

<template>
  <div class="min-h-screen bg-background">
    <TopNav
      :filter-open="filterOpen"
      :active-filter-count="0"
      :search-query="searchQuery"
      @toggle-filter="filterOpen = !filterOpen"
      @update:search-query="searchQuery = $event"
    />
    <div class="pt-[96px] md:pt-[57px]">
      <main class="px-4 py-6 md:px-6 md:py-8">
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
