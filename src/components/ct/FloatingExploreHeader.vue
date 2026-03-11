<script setup lang="ts">
import { Button } from '@/components/ui/button'
import SearchInput from '@/components/ct/SearchInput.vue'
import MobileMenu from '@/components/ct/MobileMenu.vue'
import { PhList, PhPlus } from '@phosphor-icons/vue'

defineProps<{
  searchQuery: string
  activeFilterCount: number
}>()

const emit = defineEmits<{
  (e: 'toggle-filter'): void
  (e: 'update:searchQuery', value: string): void
  (e: 'searchSubmit', value: string): void
}>()
</script>

<template>
  <header
    class="fixed left-2 right-2 z-30 flex items-center gap-3"
    style="top: calc(env(safe-area-inset-top, 0px) + 8px)"
    aria-label="Explore actions"
  >
    <Button
      type="button"
      variant="primary"
      class="h-10 shrink-0 gap-2 rounded-full px-4 font-semibold"
      aria-label="Filter"
      @click="emit('toggle-filter')"
    >
      <PhPlus class="size-6" weight="bold" />
      Filter
      <span
        v-if="activeFilterCount > 0"
        class="ml-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/20 px-1.5 text-xs font-semibold"
      >
        {{ activeFilterCount }}
      </span>
    </Button>
    <div class="min-w-0 flex-1">
      <SearchInput
        :model-value="searchQuery"
        placeholder-brand="EtnoExplorer"
        input-class="h-10 w-full rounded-full bg-white border-0 text-base"
        @update:model-value="emit('update:searchQuery', $event)"
        @submit="emit('searchSubmit', $event)"
      />
    </div>
    <MobileMenu>
      <template #trigger>
        <Button
          type="button"
          variant="primary"
          size="icon"
          class="h-10 w-10 shrink-0 rounded-full"
          aria-label="Open menu"
        >
          <PhList class="size-6" weight="bold" />
        </Button>
      </template>
    </MobileMenu>
  </header>
</template>
