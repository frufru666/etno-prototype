<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import NavActions from '@/components/ct/NavActions.vue'
import MobileMenu from '@/components/ct/MobileMenu.vue'
import SearchInput from '@/components/ct/SearchInput.vue'
import { PhCaretLeft, PhSidebarSimple, PhSidebar } from '@phosphor-icons/vue'
import { useIsMobile } from '@/composables/useIsMobile'

defineProps<{
  rightPanelOpen: boolean
  searchQuery?: string
  mobileContextLabel?: string
  mobileContextId?: string
}>()

const emit = defineEmits<{
  (e: 'toggle-right-panel'): void
  (e: 'update:searchQuery', value: string): void
  (e: 'searchSubmit', value: string): void
}>()

const router = useRouter()
const isMobile = useIsMobile()

function goBackToExplore() {
  router.push({ name: 'explore' })
}

function onSearchSubmit(value: string) {
  emit('searchSubmit', value)
}
</script>

<template>
  <!-- Desktop nav: single row -->
  <nav
    v-if="!isMobile"
    class="fixed top-0 left-0 right-0 z-50 flex h-[57px] items-center border-b border-border bg-background px-4 md:px-6"
    aria-label="Detail navigation"
  >
    <div class="flex min-w-0 flex-shrink-0 items-center gap-3">
      <RouterLink
        to="/"
        class="truncate text-lg font-semibold text-primary-500 hover:text-primary-600"
      >
        Etno Explorer SAV
      </RouterLink>
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
      <Button
        variant="outline"
        size="sm"
        class="gap-1.5 rounded-lg border-border text-foreground hover:bg-accent focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
        aria-label="Toggle right panel"
        @click="emit('toggle-right-panel')"
      >
        <PhSidebar v-if="!rightPanelOpen" class="h-4 w-4" />
        <PhSidebarSimple v-else class="h-4 w-4" />
        <span class="hidden sm:inline">
          {{ rightPanelOpen ? 'Skryť panel' : 'Zobraziť panel' }}
        </span>
      </Button>
    </div>
  </nav>

  <!-- Mobile nav: two rows (title + menu, then back button + search) -->
  <nav
    v-else
    class="fixed top-0 left-0 right-0 z-50 flex flex-col border-b border-border bg-background"
    aria-label="Detail navigation"
  >
    <div class="flex h-[49px] items-center justify-between px-4">
      <div class="flex min-w-0 items-center gap-2">
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
    </div>
    <div class="flex items-center gap-2 px-4 pb-2.5">
      <Button
        variant="default"
        size="sm"
        class="gap-1.5 rounded-lg bg-primary-500 text-primary-foreground hover:bg-primary-600 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
        aria-label="Späť do Explore"
        @click="goBackToExplore"
      >
        <PhCaretLeft class="h-4 w-4" />
        <span>Späť do Explore</span>
      </Button>
      <SearchInput
        :model-value="searchQuery ?? ''"
        class="flex-1 min-w-0"
        @update:model-value="emit('update:searchQuery', $event)"
        @submit="onSearchSubmit"
      />
    </div>
  </nav>
</template>
