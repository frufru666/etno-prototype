<script setup lang="ts">
import { computed } from 'vue'
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
  <div class="flex flex-col gap-4">
    <template v-for="catKey in categoryOrder" :key="catKey">
      <template v-if="FILTER_CATEGORIES[catKey]">
        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-1 pr-1">
            <component :is="getSectionIcon(FILTER_CATEGORIES[catKey].icon)" class="h-4 w-4 text-muted-foreground" />
            <span class="text-label-small text-muted-foreground">{{ FILTER_CATEGORIES[catKey].label }}</span>
          </div>
          <div class="flex flex-col gap-2">
            <button
              v-for="filter in FILTER_CATEGORIES[catKey].filters"
              :key="filter.key"
              type="button"
              class="flex h-10 w-full cursor-pointer items-center justify-between rounded-md px-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A62FF]"
              :class="[
                activeKey === filter.key
                  ? 'border-2 border-[#034AE8] bg-[#CDE0FF] text-[#034AE8]'
                  : getSelectedCount(filter.key) > 0
                    ? 'border border-[#E5E5E5] bg-[#CDE0FF] text-[#034AE8] border-2 border-[#034AE8]'
                    : 'border border-[#E5E5E5] bg-white hover:bg-[#CDE0FF]',
              ]"
              @click.stop="emit('select', filter.key)"
            >
              <div class="flex items-center gap-2 min-w-0">
                <span
                  class="truncate text-label"
                  :class="activeKey === filter.key || getSelectedCount(filter.key) > 0 ? 'text-[#034AE8]' : 'text-[#171717]'"
                >
                  {{ filter.label }}
                </span>
                <!-- Filter chip: pill with count -->
                <span
                  v-if="getSelectedCount(filter.key) > 0"
                  class="inline-flex h-6 shrink-0 items-center gap-1 rounded-full bg-[#CDE0FF] px-2 text-xs font-medium text-[#034AE8]"
                  style="line-height: 16px"
                >
                  {{ getSelectedCount(filter.key) }}
                </span>
              </div>
              <ChevronRight
                class="h-4 w-4 shrink-0"
                :class="activeKey === filter.key || getSelectedCount(filter.key) > 0 ? 'text-[#034AE8]' : 'text-[#171717]'"
              />
            </button>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
