<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import NavActions from '@/components/ct/NavActions.vue'
import MobileMenu from '@/components/ct/MobileMenu.vue'
import SearchInput from '@/components/ct/SearchInput.vue'
import { PhSlidersHorizontal } from '@phosphor-icons/vue'
import { useIsMobile } from '@/composables/useIsMobile'

defineProps<{
  filterOpen: boolean
  activeFilterCount: number
  searchQuery?: string
}>()

const emit = defineEmits<{
  (e: 'toggle-filter'): void
  (e: 'update:searchQuery', value: string): void
  (e: 'searchSubmit', value: string): void
}>()

const isMobile = useIsMobile()
const route = useRoute()
const showFilter = computed(() => route.name === 'explore')
</script>

<template>
  <!-- Desktop nav: single row -->
  <nav
    v-if="!isMobile"
    class="fixed top-0 left-0 right-0 z-50 flex h-[57px] items-center border-b border-border bg-background px-4 md:px-6 focus-within:outline-none"
    aria-label="Main navigation"
  >
    <div class="flex min-w-0 flex-shrink-0 items-center gap-2">
      <RouterLink
        to="/"
        class="truncate text-lg font-semibold text-primary-500 hover:text-primary-600"
      >
        Etno Explorer SAV
      </RouterLink>
      <div
        v-if="showFilter"
        class="relative"
      >
        <Button
          type="button"
          :variant="filterOpen ? 'default' : 'outline'"
          size="sm"
          :class="[
            'h-9 gap-1.5 rounded-lg text-sm font-semibold',
            !filterOpen && 'border-primary-500 text-primary-500 hover:bg-primary-50 hover:text-primary-600',
            filterOpen && 'bg-primary-500 text-primary-foreground hover:bg-primary-600',
          ]"
          :aria-label="filterOpen ? 'Zavrieť filter' : 'Filter'"
          @click="emit('toggle-filter')"
        >
          <PhSlidersHorizontal class="h-4 w-4" />
          <span>{{ filterOpen ? 'Zavrieť filter' : 'Filter' }}</span>
        </Button>
        <span
          v-if="activeFilterCount > 0"
          class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold"
          :class="filterOpen ? 'bg-primary-foreground text-primary-500' : 'bg-primary-500 text-primary-foreground'"
        >
          {{ activeFilterCount }}
        </span>
      </div>
    </div>

    <div class="flex flex-1 justify-center px-4">
      <SearchInput
        class="w-full max-w-lg"
        :model-value="searchQuery ?? ''"
        @update:model-value="emit('update:searchQuery', $event)"
        @submit="emit('searchSubmit', $event)"
      />
    </div>

    <div class="flex flex-shrink-0 items-center gap-2">
      <NavActions />
    </div>
  </nav>

  <!-- Mobile nav: two rows -->
  <nav
    v-else
    class="fixed top-0 left-0 right-0 z-50 flex flex-col border-b border-border bg-background"
    aria-label="Main navigation"
  >
    <div class="flex h-[49px] items-center justify-between px-4">
      <RouterLink
        to="/"
        class="truncate text-lg font-semibold text-primary-500 hover:text-primary-600"
      >
        Etno Explorer SAV
      </RouterLink>
      <MobileMenu />
    </div>
    <div class="flex items-center gap-2 px-4 pb-2.5">
      <div
        v-if="showFilter"
        class="relative shrink-0"
      >
        <Button
          type="button"
          :variant="filterOpen ? 'default' : 'outline'"
          size="sm"
          :class="[
            'gap-1.5 rounded-lg text-sm font-semibold',
            !filterOpen && 'border-primary-500 text-primary-500 hover:bg-primary-50 hover:text-primary-600',
            filterOpen && 'bg-primary-500 text-primary-foreground hover:bg-primary-600',
          ]"
          :aria-label="filterOpen ? 'Zavrieť filter' : 'Filter'"
          @click="emit('toggle-filter')"
        >
          <PhSlidersHorizontal class="h-4 w-4" />
          <span>{{ filterOpen ? 'Zavrieť filter' : 'Filter' }}</span>
        </Button>
        <span
          v-if="activeFilterCount > 0"
          class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold"
          :class="filterOpen ? 'bg-primary-foreground text-primary-500' : 'bg-primary-500 text-primary-foreground'"
        >
          {{ activeFilterCount }}
        </span>
      </div>
      <SearchInput
        class="flex-1 min-w-0"
        :model-value="searchQuery ?? ''"
        @update:model-value="emit('update:searchQuery', $event)"
        @submit="emit('searchSubmit', $event)"
      />
    </div>
  </nav>
</template>
