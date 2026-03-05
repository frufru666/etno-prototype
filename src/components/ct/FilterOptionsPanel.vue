<script setup lang="ts">
import { computed } from 'vue'
import { Check, Search, X } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
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
  const options = getOptionsWithCounts(props.filterKey)
  const q = props.searchQuery.trim().toLowerCase()
  if (!q) return options
  return options.filter((o) => o.value.toLowerCase().includes(q))
})
</script>

<template>
  <div class="flex flex-1 flex-col min-h-0">
    <div class="shrink-0 relative mb-2 top-px px-4">
      <Search class="absolute left-7 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden />
      <Input
        :model-value="searchQuery"
        type="search"
        class="h-10 pl-10 pr-8 rounded-lg border-neutral-300 focus:border-primary-500 [&::-webkit-search-cancel-button]:hidden"
        placeholder="Hľadať..."
        @update:model-value="emit('update:searchQuery', String($event))"
      />
      <button
        v-if="searchQuery"
        type="button"
        class="absolute right-7 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        aria-label="Vymazať"
        @click="emit('update:searchQuery', '')"
      >
        <X class="h-4 w-4" />
      </button>
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
            <div
              class="flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors"
              :class="isSelected(opt.value) ? 'border-primary-500 bg-primary-500' : 'border-neutral-300 bg-white'"
            >
              <Check
                v-if="isSelected(opt.value)"
                class="h-3.5 w-3.5 text-white"
              />
            </div>
            <span class="text-sm font-medium text-foreground">{{ opt.value }}</span>
          </div>
          <span class="ml-2 shrink-0 text-sm font-medium text-primary-500">{{ opt.count }}</span>
        </button>
      </div>
    </ScrollArea>
  </div>
</template>
