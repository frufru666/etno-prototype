<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import NavActions from '@/components/ct/NavActions.vue'
import MobileMenu from '@/components/ct/MobileMenu.vue'
import SearchInput from '@/components/ct/SearchInput.vue'
import { SlidersHorizontal } from 'lucide-vue-next'
import { useIsMobile } from '@/composables/useIsMobile'

defineProps<{
  filterOpen: boolean
  activeFilterCount: number
  searchQuery?: string
}>()

const emit = defineEmits<{
  (e: 'toggle-filter'): void
  (e: 'update:searchQuery', value: string): void
}>()

const isMobile = useIsMobile()
</script>

<template>
  <!-- Desktop nav: single row -->
  <nav
    v-if="!isMobile"
    class="fixed top-0 left-0 right-0 z-50 flex h-[57px] items-center border-b border-neutral-200 bg-white px-4 md:px-6 focus-within:outline-none"
    aria-label="Main navigation"
  >
    <div class="flex min-w-0 flex-shrink-0 items-center gap-2">
      <span class="truncate text-lg font-semibold text-primary-500">
        Etno Explorer SAV
      </span>
      <div class="relative">
        <Button
          type="button"
          size="icon"
          class="h-9 w-9 bg-primary-500 text-white hover:bg-primary-600"
          aria-label="Toggle filters"
          @click="emit('toggle-filter')"
        >
          <SlidersHorizontal class="h-4 w-4" />
        </Button>
        <Badge
          v-if="activeFilterCount > 0"
          class="absolute -right-1 -top-1 h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs"
          variant="secondary"
        >
          {{ activeFilterCount }}
        </Badge>
      </div>
    </div>

    <div class="flex flex-1 justify-center px-4">
      <SearchInput
        class="w-full max-w-lg"
        :model-value="searchQuery ?? ''"
        @update:model-value="emit('update:searchQuery', $event)"
      />
    </div>

    <div class="flex flex-shrink-0 items-center gap-2">
      <NavActions />
    </div>
  </nav>

  <!-- Mobile nav: two rows -->
  <nav
    v-else
    class="fixed top-0 left-0 right-0 z-50 flex flex-col border-b border-neutral-200 bg-white"
    aria-label="Main navigation"
  >
    <div class="flex h-[49px] items-center justify-between px-4">
      <span class="truncate text-lg font-semibold text-primary-500">
        Etno Explorer SAV
      </span>
      <MobileMenu />
    </div>
    <div class="flex items-center gap-2 px-4 pb-2.5">
      <div class="relative shrink-0">
        <Button
          type="button"
          size="sm"
          class="gap-1.5 bg-primary-500 text-white hover:bg-primary-600"
          aria-label="Toggle filters"
          @click="emit('toggle-filter')"
        >
          <SlidersHorizontal class="h-4 w-4" />
          <span>Filter</span>
        </Button>
        <Badge
          v-if="activeFilterCount > 0"
          class="absolute -right-1 -top-1 h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs"
          variant="secondary"
        >
          {{ activeFilterCount }}
        </Badge>
      </div>
      <SearchInput
        class="flex-1 min-w-0"
        :model-value="searchQuery ?? ''"
        @update:model-value="emit('update:searchQuery', $event)"
      />
    </div>
  </nav>
</template>
