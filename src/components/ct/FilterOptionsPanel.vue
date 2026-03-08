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
          class="flex cursor-pointer items-center justify-between border-b border-[#E5E5E5] py-2.5 px-4 text-left transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#1A62FF]"
          :class="[
            isSelected(opt.value)
              ? 'bg-[#CDE0FF] border-[#1A62FF]'
              : 'bg-transparent hover:bg-[#CDE0FF]',
          ]"
          @click="emit('toggle', opt.value, !isSelected(opt.value))"
        >
          <div class="flex items-center gap-3">
            <Checkbox
              :model-value="isSelected(opt.value)"
              class="h-5 w-5 rounded border-2 shadow-none pointer-events-none"
              :class="isSelected(opt.value) ? 'border-[#034AE8] bg-[#034AE8] text-white' : ''"
            />
            <span class="text-label text-[#171717]">{{ opt.value }}</span>
          </div>
          <span class="ml-2 shrink-0 text-label text-[#1A62FF]">{{ opt.count }}</span>
        </button>
      </div>
    </ScrollArea>
  </div>
</template>
