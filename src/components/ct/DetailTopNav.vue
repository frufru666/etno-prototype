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
  rightPanelOpen: boolean
  searchQuery?: string
  mobileContextLabel?: string
  mobileContextId?: string
  showMobileUp?: boolean
  mobileUpAriaLabel?: string
}>()

const emit = defineEmits<{
  (e: 'toggle-right-panel'): void
  (e: 'update:searchQuery', value: string): void
  (e: 'searchSubmit', value: string): void
  (e: 'mobile-up'): void
}>()

const route = useRoute()
const isMobile = useIsMobile()
const isExploreActive = computed(() => route.name === 'explore')
const isCollectionsActive = computed(() => route.name === 'collections')

function onSearchSubmit(value: string) {
  emit('searchSubmit', value)
}
</script>

<template>
  <!-- Single row nav only; Back to Explore + panel toggle live in DetailView, fixed over content -->
  <nav
    v-if="!isMobile"
    class="fixed top-0 left-0 right-0 z-50 flex h-[61px] items-center border-b border-border bg-background px-4 md:px-6"
    aria-label="Detail navigation"
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
    <div class="flex flex-1 items-center justify-center px-4">
      <SearchInput
        :model-value="searchQuery ?? ''"
        class="w-full max-w-md"
        @update:model-value="emit('update:searchQuery', $event)"
        @submit="onSearchSubmit"
      />
    </div>
    <div class="flex flex-shrink-0 items-center gap-2">
      <NavActions />
    </div>
  </nav>
  <nav
    v-else
    class="fixed top-0 left-0 right-0 z-50 flex h-[49px] items-center justify-between gap-2 border-b border-border bg-background px-4"
    aria-label="Detail navigation"
  >
    <div class="flex min-w-0 items-center gap-2">
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
      <span class="rounded bg-primary-50 px-2 py-0.5 text-label-small font-semibold uppercase tracking-wide text-primary-600">
        {{ mobileContextLabel ?? 'Detail' }}
      </span>
      <span
        v-if="mobileContextId"
        class="truncate font-mono text-xs text-muted-foreground"
      >
        {{ mobileContextId }}
      </span>
    </div>
    <MobileMenu />
  </nav>
</template>
