<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import NavActions from '@/components/ct/NavActions.vue'
import MobileMenu from '@/components/ct/MobileMenu.vue'
import SearchInput from '@/components/ct/SearchInput.vue'
import { PhCaretLeft } from '@phosphor-icons/vue'
import { useIsMobile } from '@/composables/useIsMobile'

const props = withDefaults(
  defineProps<{
    rightPanelOpen: boolean
    searchQuery?: string
    mobileContextLabel?: string
    mobileBackToName?: string
    mobileBackToParams?: Record<string, string | number>
    mobileBackAriaLabel?: string
    /** When false, mobile nav is single row (no search bar). Use for object viewers. */
    mobileShowSearch?: boolean
  }>(),
  { mobileShowSearch: true }
)

const emit = defineEmits<{
  (e: 'toggle-right-panel'): void
  (e: 'update:searchQuery', value: string): void
  (e: 'searchSubmit', value: string): void
}>()

const route = useRoute()
const router = useRouter()
const isMobile = useIsMobile()
const isExploreActive = computed(() => route.name === 'explore')
const isCollectionsActive = computed(
  () => route.name === 'collections' || route.name === 'collection-detail',
)

function goBackToExplore() {
  const back = window.history.state?.back as string | undefined
  if (back && back.startsWith('/')) {
    router.back()
    return
  }
  router.push({
    name: props.mobileBackToName ?? 'explore',
    params: props.mobileBackToParams,
  })
}

function onSearchSubmit(value: string) {
  emit('searchSubmit', value)
}
</script>

<template>
  <!-- Desktop nav: single row with Explore / Collections toggles -->
  <nav
    v-if="!isMobile"
    class="fixed top-0 left-0 right-0 z-50 flex h-[57px] items-center border-b border-border bg-background px-4 md:px-6"
    aria-label="Detail navigation"
  >
    <div class="flex min-w-0 flex-shrink-0 items-center gap-3">
      <Button
        :variant="isExploreActive ? 'navActive' : 'nav'"
        size="lg"
        class="gap-2 rounded-md"
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
        class="gap-2 rounded-md"
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

    <div class="flex flex-1 items-center justify-center px-4">
      <SearchInput
        :model-value="searchQuery ?? ''"
        class="w-full max-w-2xl md:max-w-3xl"
        placeholder-brand="EtnoExplorer"
        input-class="h-11 w-full rounded-xl text-[15px]"
        @update:model-value="emit('update:searchQuery', $event)"
        @submit="onSearchSubmit"
      />
    </div>

    <div class="flex flex-shrink-0 items-center gap-2">
      <NavActions />
    </div>
  </nav>

  <!-- Mobile nav: Figma – back (icon only) + title ± ID badge + menu -->
  <nav
    v-else
    class="fixed top-0 left-0 right-0 z-50 flex flex-col border-b border-border bg-background"
    aria-label="Detail navigation"
  >
    <div class="flex h-14 shrink-0 items-center justify-center pl-2 pr-3 py-1">
      <div class="flex h-10 w-full items-center justify-between gap-2">
        <Button
          variant="primary"
          size="icon"
          class="h-10 w-10 shrink-0 rounded-xl p-2 [&_svg]:size-6"
          :aria-label="props.mobileBackAriaLabel ?? 'Späť do Explore'"
          @click="goBackToExplore"
        >
          <PhCaretLeft class="size-6" />
        </Button>
        <div class="flex min-w-0 flex-1 items-center justify-start gap-3">
          <span class="truncate text-lg font-bold tracking-tight text-foreground">
            {{ props.mobileContextLabel ?? 'Detail' }}
          </span>
        </div>
        <MobileMenu />
      </div>
    </div>
    <div
      v-if="props.mobileShowSearch"
      class="flex items-center gap-2 px-4 pb-2.5"
    >
      <SearchInput
        :model-value="searchQuery ?? ''"
        class="flex-1 min-w-0"
        @update:model-value="emit('update:searchQuery', $event)"
        @submit="onSearchSubmit"
      />
    </div>
  </nav>
</template>
