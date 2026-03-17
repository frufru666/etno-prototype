<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import NavActions from '@/components/ct/NavActions.vue'
import MobileMenu from '@/components/ct/MobileMenu.vue'
import SearchInput from '@/components/ct/SearchInput.vue'
import { PhSlidersHorizontal } from '@phosphor-icons/vue'
import { useIsMobile } from '@/composables/useIsMobile'

const props = withDefaults(
  defineProps<{
    filterOpen?: boolean
    activeFilterCount?: number
    searchQuery?: string
    mobileTitle?: string
    mobileShowSearch?: boolean
    /** When true (Explore), show Filter + Search row below the title row. */
    mobileShowFilterRow?: boolean
  }>(),
  {
    mobileShowSearch: true,
    mobileShowFilterRow: false,
    filterOpen: false,
    activeFilterCount: 0,
  }
)

const emit = defineEmits<{
  (e: 'toggle-filter'): void
  (e: 'update:searchQuery', value: string): void
  (e: 'searchSubmit', value: string): void
}>()

const isMobile = useIsMobile()
const route = useRoute()
const isExploreActive = computed(() => route.name === 'explore')
const isCollectionsActive = computed(
  () => route.name === 'collections' || route.name === 'collection-detail',
)
const mobileHeaderTitle = computed(() => {
  if (route.name === 'explore') return 'Etno Explorer SAV'
  if (route.name === 'collections') return 'Collections'
  if (route.name === 'info') return 'Info'
  return 'Etno Explorer SAV'
})
</script>

<template>
  <!-- Desktop nav: single row with Explore / Collections toggles -->
  <nav
    v-if="!isMobile"
    class="fixed top-0 left-0 right-0 z-50 flex h-[57px] items-center border-b border-border bg-background px-3 md:px-4 focus-within:outline-none"
    aria-label="Main navigation"
  >
    <div class="flex min-w-0 flex-shrink-0 items-center gap-3">
      <Button
        :variant="isExploreActive ? 'navActive' : 'nav'"
        size="lg"
        class="gap-2"
        as-child
      >
        <RouterLink
          to="/"
          class="flex items-center gap-2 text-primary-500"
        >
          Explore
        </RouterLink>
      </Button>
      <Button
        :variant="isCollectionsActive ? 'navActive' : 'nav'"
        size="lg"
        class="gap-2"
        as-child
      >
        <RouterLink
          to="/collections"
          class="flex items-center gap-2 text-primary-500"
        >
          Collections
        </RouterLink>
      </Button>
    </div>

    <div class="flex flex-1 justify-center px-4">
      <SearchInput
        class="w-full max-w-[600px]"
        :model-value="props.searchQuery ?? ''"
        placeholder-brand="EtnoExplorer"
        input-class="h-11 w-full rounded-xl text-[15px]"
        @update:model-value="emit('update:searchQuery', $event)"
        @submit="emit('searchSubmit', $event)"
      />
    </div>

    <div class="flex flex-shrink-0 items-center gap-2">
      <NavActions />
    </div>
  </nav>

  <!-- Mobile nav: Figma – row 1 title + menu; row 2 Filter + Search (Explore) or Search only -->
  <nav
    v-else
    class="fixed top-0 left-0 right-0 z-50 flex flex-col border-b border-border bg-background"
    aria-label="Main navigation"
  >
    <div class="flex h-14 shrink-0 items-center justify-center px-3 pt-3 pb-1">
      <div class="flex h-10 w-full items-center justify-between gap-2">
        <span class="truncate text-lg font-bold tracking-tight text-foreground">
          {{ props.mobileTitle ?? mobileHeaderTitle }}
        </span>
        <MobileMenu />
      </div>
    </div>
    <!-- Explore: Filter + Search row (Figma) -->
    <div
      v-if="props.mobileShowFilterRow"
      class="flex shrink-0 items-center gap-3 px-3 py-2"
    >
      <Button
        type="button"
        variant="primary"
        class="h-10 gap-2 rounded-md font-semibold"
        :aria-label="props.filterOpen ? 'Zavrieť filter' : 'Filter'"
        @click="emit('toggle-filter')"
      >
        <PhSlidersHorizontal class="size-5" />
        Filter
      </Button>
      <SearchInput
        class="flex-1 min-w-0"
        placeholder="Search database"
        :model-value="props.searchQuery ?? ''"
        @update:model-value="emit('update:searchQuery', $event)"
        @submit="emit('searchSubmit', $event)"
      />
    </div>
    <!-- Collections / Info: search-only row when not using Filter row -->
    <div
      v-else-if="props.mobileShowSearch"
      class="flex items-center gap-2 px-3 py-2"
    >
      <SearchInput
        class="flex-1 min-w-0"
        :model-value="props.searchQuery ?? ''"
        @update:model-value="emit('update:searchQuery', $event)"
        @submit="emit('searchSubmit', $event)"
      />
    </div>
  </nav>
</template>
