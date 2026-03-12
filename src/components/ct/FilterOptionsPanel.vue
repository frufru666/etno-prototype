<script setup lang="ts">
import { computed } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'
import SearchInput from '@/components/ct/SearchInput.vue'
import { getOptionsWithCounts } from '@/data/mockData'

const props = withDefaults(
  defineProps<{
    filterKey: string
    activeFilters: Record<string, string[]>
    searchQuery?: string
  }>(),
  { searchQuery: '' }
)

const emit = defineEmits<{
  (e: 'update:searchQuery', q: string): void
  (e: 'toggle', value: string, selected: boolean): void
}>()

function isSelected(value: string): boolean {
  return props.activeFilters[props.filterKey]?.includes(value) ?? false
}

const filteredOptions = computed(() => {
  const options = getOptionsWithCounts(props.filterKey, props.activeFilters)
  const q = props.searchQuery.trim().toLowerCase()
  if (!q) return options
  return options.filter((o) => o.value.toLowerCase().includes(q))
})
</script>

<template>
  <div class="flex flex-1 flex-col min-h-0">
    <div class="shrink-0 mb-2 px-4">
      <SearchInput
        :model-value="searchQuery"
        placeholder="Hľadať..."
        @update:model-value="emit('update:searchQuery', String($event))"
      />
    </div>
    <div class="min-h-0 flex-1 overflow-y-auto">
      <div class="flex flex-col">
        <button
          v-for="opt in filteredOptions"
          :key="opt.value"
          type="button"
          class="flex min-h-10 [@media(max-height:900px)]:min-h-8 cursor-pointer items-start justify-between gap-2 px-4 py-2 text-left transition-colors hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-500"
          :class="isSelected(opt.value) ? 'border border-primary-500 bg-primary-100' : 'border-b border-border'"
          @click="emit('toggle', opt.value, !isSelected(opt.value))"
        >
          <div class="flex min-w-0 flex-1 items-start gap-3">
            <Checkbox
              :model-value="isSelected(opt.value)"
              class="pointer-events-none h-5 w-5 rounded-sm border border-input shadow-none data-[state=checked]:border-primary-600 data-[state=checked]:bg-primary-100 data-[state=checked]:text-primary-600"
            />
            <span class="text-sm font-medium tracking-[-0.01em] text-foreground">{{ opt.value }}</span>
          </div>
          <span class="ml-2 shrink-0 text-sm font-medium text-primary-500">{{ opt.count }}</span>
        </button>
      </div>
    </div>
  </div>
</template>
