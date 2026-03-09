<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import NavActions from '@/components/ct/NavActions.vue'
import MobileMenu from '@/components/ct/MobileMenu.vue'
import SearchInput from '@/components/ct/SearchInput.vue'
import { PhCaretLeft } from '@phosphor-icons/vue'
import { useIsMobile } from '@/composables/useIsMobile'

defineProps<{
  filterOpen: boolean
  activeFilterCount: number
  searchQuery?: string
  showMobileUp?: boolean
  mobileUpAriaLabel?: string
}>()

const emit = defineEmits<{
  (e: 'toggle-filter'): void
  (e: 'update:searchQuery', value: string): void
  (e: 'searchSubmit', value: string): void
  (e: 'mobile-up'): void
}>()

const isMobile = useIsMobile()
const route = useRoute()
const isExploreActive = computed(() => route.name === 'explore')
const isCollectionsActive = computed(() => route.name === 'collections')
</script>

<template>
  <!-- Single row nav only; Filter / Back buttons live in views, fixed over content -->
  <nav
    v-if="!isMobile"
    class="fixed top-0 left-0 right-0 z-50 flex h-[61px] items-center border-b border-border bg-background px-4 md:px-6 focus-within:outline-none"
    aria-label="Main navigation"
  >
    <div class="flex min-w-0 flex-shrink-0 items-center gap-2">
      <RouterLink
        to="/"
        class="truncate text-lg font-semibold text-primary-500 hover:text-primary-600"
      >
        Etno Explorer SAV
      </RouterLink>
      <Button
        :variant="isExploreActive ? 'primary' : 'toggle'"
        size="lg"
        class="gap-2 rounded-md"
        as-child
      >
        <RouterLink
          to="/"
          class="flex items-center gap-2"
          :aria-current="isExploreActive ? 'page' : undefined"
          :aria-pressed="isExploreActive"
        >
          Explore
        </RouterLink>
      </Button>
      <Button
        :variant="isCollectionsActive ? 'primary' : 'toggle'"
        size="lg"
        class="gap-2 rounded-md"
        as-child
      >
        <RouterLink
          to="/collections"
          class="flex items-center gap-2"
          :aria-current="isCollectionsActive ? 'page' : undefined"
          :aria-pressed="isCollectionsActive"
        >
          Collections
        </RouterLink>
      </Button>
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
  <nav
    v-else
    class="fixed top-0 left-0 right-0 z-50 flex h-[49px] items-center gap-2 border-b border-border bg-background px-4"
    aria-label="Main navigation"
  >
    <Button
      v-if="showMobileUp"
      variant="primary"
      size="icon-sm"
      class="shrink-0 rounded-md"
      :aria-label="mobileUpAriaLabel ?? 'O úroveň vyššie'"
      @click="emit('mobile-up')"
    >
      <PhCaretLeft class="size-4" />
    </Button>
    <RouterLink
      to="/"
      class="truncate text-lg font-semibold text-primary-500 hover:text-primary-600 shrink-0"
    >
      Etno Explorer SAV
    </RouterLink>
    <SearchInput
      class="min-w-0 flex-1"
      :model-value="searchQuery ?? ''"
      @update:model-value="emit('update:searchQuery', $event)"
      @submit="emit('searchSubmit', $event)"
    />
    <MobileMenu />
  </nav>
</template>
