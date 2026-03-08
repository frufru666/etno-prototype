<script setup lang="ts">
import { computed } from 'vue'
import { X } from 'lucide-vue-next'
import { FILTER_CATEGORIES } from '@/data/mockData'

const props = defineProps<{
  activeFilters: Record<string, string[]>
}>()

const emit = defineEmits<{
  (e: 'remove', key: string, value: string): void
  (e: 'clear'): void
}>()

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
    class="flex flex-wrap items-center gap-2 border-b border-[#E5E5E5] bg-white px-4 py-3 md:px-6"
  >
    <span class="text-body-small text-[#737373]">Aplikované filtre:</span>
    <template v-for="pill in pills" :key="`${pill.key}-${pill.value}`">
      <span
        class="inline-flex h-6 items-center gap-1 rounded-full bg-[#CDE0FF] px-2 text-xs font-medium text-[#034AE8]"
        style="line-height: 16px"
      >
        {{ getPillLabel(pill) }}
        <button
          type="button"
          class="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[#034AE8] transition-colors hover:bg-[#A0C3FF]"
          aria-label="Odstrániť filter"
          @click.stop="emit('remove', pill.key, pill.value)"
        >
          <X class="h-4 w-4" />
        </button>
      </span>
    </template>
    <button
      type="button"
      class="text-body-small font-medium text-[#1A62FF] underline-offset-4 hover:underline"
      @click="emit('clear')"
    >
      Odstrániť filtre
    </button>
  </div>
</template>
