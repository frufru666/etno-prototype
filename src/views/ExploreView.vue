<script setup lang="ts">
import { ref } from 'vue'
import TopNav from '@/components/ct/TopNav.vue'

const filterOpen = ref(false)
const activeFilterCount = ref(0)

function toggleFilter() {
  filterOpen.value = !filterOpen.value
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <TopNav
      :filter-open="filterOpen"
      :active-filter-count="activeFilterCount"
      @toggle-filter="toggleFilter"
    />
    <main class="p-6 pt-[49px] md:pt-[57px]">
      <p>Ready to build with Cursor</p>
    </main>
  </div>
</template>
