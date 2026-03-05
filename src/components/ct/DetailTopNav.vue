<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import NavActions from '@/components/ct/NavActions.vue'
import MobileMenu from '@/components/ct/MobileMenu.vue'
import SearchInput from '@/components/ct/SearchInput.vue'
import { PanelRightClose, PanelRightOpen } from 'lucide-vue-next'
import { useIsMobile } from '@/composables/useIsMobile'

defineProps<{
  rightPanelOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-right-panel'): void
}>()

const isMobile = useIsMobile()
const searchQuery = ref('')
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 flex items-center border-b border-neutral-200 bg-white px-4 md:px-6"
    :class="isMobile ? 'h-[49px]' : 'h-[57px]'"
    aria-label="Detail navigation"
  >
    <div class="flex min-w-0 flex-shrink-0 items-center gap-3">
      <RouterLink
        to="/"
        class="truncate text-lg font-semibold text-primary-500 hover:text-primary-600"
      >
        Etno Explorer SAV
      </RouterLink>
      <RouterLink
        :to="{ name: 'explore' }"
        class="hidden shrink-0 text-sm text-muted-foreground hover:text-foreground md:inline"
      >
        ← Späť do Explore
      </RouterLink>
    </div>

    <!-- Center: search (desktop only) -->
    <div v-if="!isMobile" class="flex flex-1 justify-center px-4">
      <SearchInput
        v-model="searchQuery"
        class="w-full max-w-md"
      />
    </div>

    <!-- Right: desktop actions + panel toggle -->
    <div v-if="!isMobile" class="flex flex-shrink-0 items-center gap-2">
      <NavActions />
      <Button
        variant="outline"
        size="sm"
        class="gap-1.5 rounded-lg border-neutral-200 text-foreground hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
        aria-label="Toggle right panel"
        @click="emit('toggle-right-panel')"
      >
        <PanelRightOpen v-if="!rightPanelOpen" class="h-4 w-4" />
        <PanelRightClose v-else class="h-4 w-4" />
        <span class="hidden sm:inline">
          {{ rightPanelOpen ? 'Skryť panel' : 'Zobraziť panel' }}
        </span>
      </Button>
    </div>

    <!-- Right: mobile -->
    <template v-else>
      <RouterLink
        :to="{ name: 'explore' }"
        class="flex-1 text-sm text-primary-500 hover:text-primary-600 hover:underline"
      >
        ← Späť do Explore
      </RouterLink>
      <MobileMenu />
    </template>
  </nav>
</template>
