<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import TopNav from '@/components/ct/TopNav.vue'

const route = useRoute()
const router = useRouter()
const id = route.params.id as string
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <TopNav
      :filter-open="false"
      :active-filter-count="0"
      @toggle-filter="() => {}"
    />
    <main class="p-6 pt-[49px] md:pt-[57px]">
      <p class="text-muted-foreground">
        Detail for id: <strong>{{ id }}</strong>
      </p>
      <button
        type="button"
        class="mt-4 text-primary-600 hover:underline"
        @click="router.push({ name: 'explore' })"
      >
        ← Back to Explore
      </button>
    </main>
  </div>
</template>
