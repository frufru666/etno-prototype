<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  SlidersHorizontal,
  Search,
  Menu,
  FolderOpen,
  Info,
  User,
  Languages,
} from 'lucide-vue-next'
import { useIsMobile } from '@/composables/useIsMobile'

const props = defineProps<{
  filterOpen: boolean
  activeFilterCount: number
}>()

const emit = defineEmits<{
  (e: 'toggle-filter'): void
}>()

const isMobile = useIsMobile()
const mobileSheetOpen = ref(false)
const searchQuery = ref('')
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 flex items-center border-b border-neutral-200 bg-white px-4 md:px-6"
    :class="isMobile ? 'h-[49px]' : 'h-[57px]'"
    aria-label="Main navigation"
  >
    <!-- Left: branding + filter toggle -->
    <div class="flex min-w-0 flex-shrink-0 items-center gap-2">
      <span class="truncate text-lg font-semibold text-primary-500">
        Etno SAV Explorer
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

    <!-- Center: search -->
    <div class="flex flex-1 justify-center px-4">
      <div class="relative w-full max-w-md">
        <Search
          class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          v-model="searchQuery"
          type="search"
          class="h-9 pl-9"
          placeholder="Hľadať v zbierke"
          aria-label="Search collection"
        />
      </div>
    </div>

    <!-- Right: desktop actions -->
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
        size="icon-sm"
        aria-label="Info"
      >
        <Info class="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon-sm"
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
    </div>

    <!-- Right: mobile hamburger + sheet -->
    <div v-else class="flex flex-shrink-0">
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
    </div>
  </nav>
</template>
