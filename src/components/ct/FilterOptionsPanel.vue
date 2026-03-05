<script setup lang="ts">
import { computed } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
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
        input-class="h-10"
        @update:model-value="emit('update:searchQuery', String($event))"
      />
    </div>
    <ScrollArea class="flex-1 min-h-0">
      <div class="flex flex-col">
        <button
          v-for="opt in filteredOptions"
          :key="opt.value"
          type="button"
          class="flex cursor-pointer items-center justify-between border-b border-neutral-100 py-2.5 px-4 text-left transition-colors hover:bg-neutral-50"
          @click="emit('toggle', opt.value, !isSelected(opt.value))"
        >
          <div class="flex items-center gap-3">
            <Checkbox
              :model-value="isSelected(opt.value)"
              class="h-5 w-5 rounded border-2 shadow-none pointer-events-none"
            />
            <span class="text-sm font-medium text-foreground">{{ opt.value }}</span>
          </div>
          <span class="ml-2 shrink-0 text-sm font-medium text-primary-500">{{ opt.count }}</span>
        </button>
      </div>
    </ScrollArea>
  </div>
</template>
