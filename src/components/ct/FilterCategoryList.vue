<script setup lang="ts">
import { Tag, MapPin, FileText, ChevronRight } from 'lucide-vue-next'
import { FILTER_CATEGORIES } from '@/data/mockData'

const props = withDefaults(
  defineProps<{
    activeFilters: Record<string, string[]>
    activeKey?: string | null
  }>(),
  { activeKey: null }
)

const emit = defineEmits<{
  (e: 'select', key: string): void
}>()

const categoryOrder = ['thematic', 'geographic', 'formal'] as const

const iconMap = {
  Tag,
  MapPin,
  FileText,
}

function getSectionIcon(iconName: keyof typeof iconMap) {
  return iconMap[iconName] ?? FileText
}

function getSelectedCount(key: string): number {
  return props.activeFilters[key]?.length ?? 0
}
</script>

<template>
  <div class="flex flex-col gap-5">
    <template v-for="catKey in categoryOrder" :key="catKey">
      <template v-if="FILTER_CATEGORIES[catKey]">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-1 pr-1">
            <component :is="getSectionIcon(FILTER_CATEGORIES[catKey].icon)" class="h-5 w-5 text-muted-foreground" />
            <span class="text-label-small text-muted-foreground">{{ FILTER_CATEGORIES[catKey].label }}</span>
          </div>
          <div class="flex flex-col gap-2">
            <button
              v-for="filter in FILTER_CATEGORIES[catKey].filters"
              :key="filter.key"
              type="button"
              class="flex h-10 w-full cursor-pointer items-center justify-between rounded-md border px-3 py-2 transition-colors focus-visible:border-2 focus-visible:border-primary-500 focus-visible:bg-white focus-visible:outline-none"
              :class="[
                activeKey === filter.key
                  ? 'border-2 border-primary-600 bg-primary-100 text-primary-600'
                  : getSelectedCount(filter.key) > 0
                    ? 'border-2 border-primary-600 bg-primary-100 text-primary-600'
                    : 'border-[#E5E5E5] bg-white text-[#171717] hover:border-transparent hover:bg-primary-100',
              ]"
              @click.stop="emit('select', filter.key)"
            >
              <div class="flex min-w-0 items-center gap-2">
                <component
                  :is="getSectionIcon(FILTER_CATEGORIES[catKey].icon)"
                  class="h-6 w-6 shrink-0"
                  :class="activeKey === filter.key || getSelectedCount(filter.key) > 0 ? 'text-primary-600' : 'text-foreground'"
                />
                <span
                  class="truncate text-sm font-medium tracking-[-0.01em]"
                  :class="activeKey === filter.key || getSelectedCount(filter.key) > 0 ? 'text-primary-600' : 'text-[#171717]'"
                >
                  {{ filter.label }}
                </span>
                <span
                  v-if="getSelectedCount(filter.key) > 0"
                  class="flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 px-2 text-[12px] font-medium leading-4 text-primary-600"
                >
                  {{ getSelectedCount(filter.key) }}
                </span>
              </div>
              <ChevronRight
                class="h-4 w-4 shrink-0"
                :class="activeKey === filter.key || getSelectedCount(filter.key) > 0 ? 'text-primary-600' : 'text-[#171717]'"
              />
            </button>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
