<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Search,
  Menu,
  FolderOpen,
  Info,
  User,
  Languages,
  PanelRightClose,
  PanelRightOpen,
} from 'lucide-vue-next'
import { useIsMobile } from '@/composables/useIsMobile'

defineProps<{
  rightPanelOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-right-panel'): void
}>()

const isMobile = useIsMobile()
const mobileSheetOpen = ref(false)
const searchQuery = ref('')
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 flex items-center border-b border-neutral-200 bg-white px-4 md:px-6"
    :class="isMobile ? 'h-[49px]' : 'h-[57px]'"
    aria-label="Detail navigation"
  >
    <!-- Left: branding + back -->
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
    <div
      v-if="!isMobile"
      class="flex flex-1 justify-center px-4"
    >
      <div class="relative w-full max-w-md">
        <Search
          class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          v-model="searchQuery"
          type="search"
          class="h-9 pl-9"
          placeholder="Search in collection"
          aria-label="Search in collection"
        />
      </div>
    </div>

    <!-- Right: desktop — nav buttons + panel toggle -->
    <div
      v-if="!isMobile"
      class="flex flex-shrink-0 items-center gap-2"
    >
      <Button
        variant="outline"
        size="sm"
        class="gap-1.5"
        aria-label="Collections"
      >
        <FolderOpen class="h-4 w-4" />
        <span class="hidden sm:inline">Collections</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        class="h-9 w-9"
        aria-label="Info"
      >
        <Info class="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        class="h-9 w-9"
        aria-label="User"
      >
        <User class="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        aria-label="Language EN/SK"
      >
        EN/SK
      </Button>
      <Button
        variant="outline"
        size="sm"
        class="gap-1.5"
        aria-label="Toggle right panel"
        @click="emit('toggle-right-panel')"
      >
        <PanelRightOpen
          v-if="!rightPanelOpen"
          class="h-4 w-4"
        />
        <PanelRightClose
          v-else
          class="h-4 w-4"
        />
        <span class="hidden sm:inline">
          {{ rightPanelOpen ? 'Skryť panel' : 'Zobraziť panel' }}
        </span>
      </Button>
    </div>

    <!-- Right: mobile — back + menu -->
    <template v-else>
      <RouterLink
        :to="{ name: 'explore' }"
        class="flex-1 text-sm text-primary-600 hover:underline"
      >
        ← Späť do Explore
      </RouterLink>
      <Sheet v-model:open="mobileSheetOpen">
        <SheetTrigger as-child>
          <Button
            variant="outline"
            size="icon"
            class="h-9 w-9"
            aria-label="Open menu"
          >
            <Menu class="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" class="w-[280px] sm:max-w-[320px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div class="mt-6 flex flex-col gap-2">
            <Button
              variant="outline"
              class="justify-start gap-2"
              @click="mobileSheetOpen = false"
            >
              <FolderOpen class="h-4 w-4" />
              Collections
            </Button>
            <Button
              variant="outline"
              class="justify-start gap-2"
              @click="mobileSheetOpen = false"
            >
              <Info class="h-4 w-4" />
              Info
            </Button>
            <Button
              variant="outline"
              class="justify-start gap-2"
              @click="mobileSheetOpen = false"
            >
              <User class="h-4 w-4" />
              User
            </Button>
            <Button
              variant="outline"
              class="justify-start gap-2"
              @click="mobileSheetOpen = false"
            >
              <Languages class="h-4 w-4" />
              EN/SK
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </template>
  </nav>
</template>
