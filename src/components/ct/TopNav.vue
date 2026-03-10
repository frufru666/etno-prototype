<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import NavActions from '@/components/ct/NavActions.vue'
import MobileMenu from '@/components/ct/MobileMenu.vue'
import SearchInput from '@/components/ct/SearchInput.vue'
import { useIsMobile } from '@/composables/useIsMobile'

const props = withDefaults(
  defineProps<{
    filterOpen: boolean
    activeFilterCount: number
    searchQuery?: string
    mobileTitle?: string
    mobileShowSearch?: boolean
  }>(),
  { mobileShowSearch: true }
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
    class="fixed top-0 left-0 right-0 z-50 flex h-[57px] items-center border-b border-border bg-background px-4 md:px-6 focus-within:outline-none"
    aria-label="Main navigation"
  >
    <div class="flex min-w-0 flex-shrink-0 items-center gap-3">
      <div class="h-10 w-10 rounded-full bg-neutral-300" aria-hidden />
      <RouterLink
        to="/"
        class="truncate text-lg font-semibold text-primary-500 hover:text-primary-600"
      >
        Etno Explorer SAV
      </RouterLink>
      <Button
        :variant="isExploreActive ? 'primary' : 'nav'"
        size="lg"
        class="gap-2 rounded-md"
        as-child
      >
        <RouterLink
          to="/"
          :class="
            isExploreActive
              ? 'flex items-center gap-2 text-white'
              : 'flex items-center gap-2 text-primary-500'
          "
        >
          Explore
        </RouterLink>
      </Button>
      <Button
        :variant="isCollectionsActive ? 'primary' : 'nav'"
        size="lg"
        class="gap-2 rounded-md"
        as-child
      >
        <RouterLink
          to="/collections"
          :class="
            isCollectionsActive
              ? 'flex items-center gap-2 text-white'
              : 'flex items-center gap-2 text-primary-500'
          "
        >
          Collections
        </RouterLink>
      </Button>
    </div>

    <div class="flex flex-1 justify-center px-4">
      <SearchInput
        class="w-full max-w-lg"
        :model-value="props.searchQuery ?? ''"
        @update:model-value="emit('update:searchQuery', $event)"
        @submit="emit('searchSubmit', $event)"
      />
    </div>

    <div class="flex flex-shrink-0 items-center gap-2">
      <NavActions />
    </div>
  </nav>

  <!-- Mobile nav: brand + search + menu -->
  <nav
    v-else
    class="fixed top-0 left-0 right-0 z-50 flex flex-col border-b border-border bg-background"
    aria-label="Main navigation"
  >
    <div class="flex h-[49px] items-center justify-between gap-2 px-4">
      <span class="truncate text-lg font-bold tracking-tight text-foreground">
        {{ props.mobileTitle ?? mobileHeaderTitle }}
      </span>
      <MobileMenu />
    </div>
    <div v-if="props.mobileShowSearch" class="flex items-center gap-2 px-2 pb-2">
      <SearchInput
        class="flex-1 min-w-0"
        :model-value="props.searchQuery ?? ''"
        @update:model-value="emit('update:searchQuery', $event)"
        @submit="emit('searchSubmit', $event)"
      />
    </div>
  </nav>
</template>
