<script setup lang="ts">
import type { EtnoItem } from '@/data/mockData'
import SearchResultsPanel from '@/components/ct/SearchResultsPanel.vue'

withDefaults(
  defineProps<{
    items: EtnoItem[]
    query: string
    mobile?: boolean
    positionClass?: string
  }>(),
  {
    mobile: false,
    positionClass:
      'fixed left-4 right-4 top-[104px] z-30 md:left-1/2 md:right-auto md:top-[72px] md:w-[480px] md:-translate-x-1/2',
  }
)
</script>

<template>
  <div
    v-if="query.trim().length > 0"
    :class="positionClass"
  >
    <SearchResultsPanel
      :items="items"
      :query="query"
      :mobile="mobile"
    />
  </div>
</template>
