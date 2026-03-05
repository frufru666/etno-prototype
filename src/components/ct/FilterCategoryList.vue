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
            <span class="text-[12px] font-medium text-muted-foreground">{{ FILTER_CATEGORIES[catKey].label }}</span>
          </div>
          <div class="flex flex-col gap-2">
            <button
              v-for="filter in FILTER_CATEGORIES[catKey].filters"
              :key="filter.key"
              type="button"
              class="flex h-9 w-full cursor-pointer items-center justify-between rounded-lg border px-3 transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              :class="[
                activeKey === filter.key
                  ? 'border-2 border-primary-500 bg-white'
                  : getSelectedCount(filter.key) > 0
                    ? 'border border-primary-200 bg-primary-50'
                    : 'border border-neutral-200 bg-white',
              ]"
              @click.stop="emit('select', filter.key)"
            >
              <div class="flex items-center gap-2 min-w-0">
                <span
                  class="truncate text-sm font-medium tracking-tight"
                  :class="activeKey === filter.key ? 'text-primary-600' : 'text-foreground'"
                >
                  {{ filter.label }}
                </span>
                <span
                  v-if="getSelectedCount(filter.key) > 0"
                  class="flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-primary-500 px-1.5 text-[11px] font-semibold text-white"
                >
                  {{ getSelectedCount(filter.key) }}
                </span>
              </div>
              <ChevronRight
                class="h-4 w-4 shrink-0"
                :class="activeKey === filter.key ? 'text-primary-600' : 'text-foreground'"
              />
            </button>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
