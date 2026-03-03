<script setup lang="ts">
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-vue-next'
import { FILTER_CATEGORIES } from '@/data/mockData'

const props = defineProps<{
  activeFilters: Record<string, string[]>
}>()

const emit = defineEmits<{
  (e: 'remove', key: string, value: string): void
  (e: 'clear'): void
}>()

// Flatten to { key, label, value }[] for display
const pills = computed(() => {
  const out: { key: string; label: string; value: string }[] = []
  for (const cat of Object.values(FILTER_CATEGORIES)) {
    for (const f of cat.filters) {
      const values = props.activeFilters[f.key]
      if (values?.length)
        for (const v of values) out.push({ key: f.key, label: f.label, value: v })
    }
  }
  return out
})

function getPillLabel(pill: { label: string; value: string }) {
  return `${pill.label}: ${pill.value}`
}
</script>

<template>
  <div
    v-if="pills.length > 0"
    class="flex flex-wrap items-center gap-2 border-b border-neutral-200 bg-white px-4 py-3 md:px-6"
  >
    <span class="text-sm text-muted-foreground">Aplikované filtre:</span>
    <template v-for="pill in pills" :key="`${pill.key}-${pill.value}`">
      <span
        class="inline-flex items-center gap-1 rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-800"
      >
        {{ getPillLabel(pill) }}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          class="h-5 w-5 rounded-full hover:bg-primary-200"
          aria-label="Odstrániť filter"
          @click.stop="emit('remove', pill.key, pill.value)"
        >
          <X class="h-3 w-3" />
        </Button>
      </span>
    </template>
    <Button
      variant="link"
      class="h-auto p-0 text-sm text-primary-600 underline-offset-4 hover:text-primary-700"
      @click="emit('clear')"
    >
      Odstrániť filtre
    </Button>
  </div>
</template>
