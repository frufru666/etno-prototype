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
  X,
} from 'lucide-vue-next'
import { useIsMobile } from '@/composables/useIsMobile'

const props = defineProps<{
  filterOpen: boolean
  activeFilterCount: number
  searchQuery?: string
}>()

const emit = defineEmits<{
  (e: 'toggle-filter'): void
  (e: 'update:searchQuery', value: string): void
}>()

const isMobile = useIsMobile()
const mobileSheetOpen = ref(false)
</script>

<template>
  <!-- Desktop nav: single row -->
  <nav
    v-if="!isMobile"
    class="fixed top-0 left-0 right-0 z-50 flex h-[57px] items-center border-b border-neutral-200 bg-white px-4 md:px-6 focus-within:outline-none"
    aria-label="Main navigation"
  >
    <div class="flex min-w-0 flex-shrink-0 items-center gap-2">
      <span class="truncate text-lg font-semibold text-primary-500">
        Etno Explorer SAV
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

    <div class="flex flex-1 justify-center px-4">
      <div class="relative w-full max-w-lg">
        <Search
          class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          :model-value="searchQuery ?? ''"
          type="search"
          class="h-9 rounded-lg pl-9 pr-8 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-primary-500 [&::-webkit-search-cancel-button]:hidden"
          placeholder="Search in collection"
          aria-label="Search collection"
          @update:model-value="emit('update:searchQuery', $event ?? '')"
        />
        <button
          v-if="(searchQuery ?? '').length > 0"
          type="button"
          class="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
          @click="emit('update:searchQuery', '')"
        >
          <X class="h-4 w-4" />
        </button>
      </div>
    </div>

    <div class="flex flex-shrink-0 items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        class="gap-1.5 rounded-lg border-neutral-200 text-foreground hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
        aria-label="Collections"
      >
        <FolderOpen class="h-4 w-4" />
        <span class="hidden sm:inline">Collections</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        class="h-9 w-9 rounded-lg border-neutral-200 text-foreground hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
        aria-label="Info"
      >
        <Info class="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        class="h-9 w-9 rounded-lg border-neutral-200 text-foreground hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
        aria-label="User"
      >
        <User class="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        class="rounded-lg border-neutral-200 text-foreground hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
        aria-label="Language EN/SK"
      >
        EN/SK
      </Button>
    </div>
  </nav>

  <!-- Mobile nav: two rows -->
  <nav
    v-else
    class="fixed top-0 left-0 right-0 z-50 flex flex-col border-b border-neutral-200 bg-white"
    aria-label="Main navigation"
  >
    <!-- Row 1: branding + hamburger -->
    <div class="flex h-[49px] items-center justify-between px-4">
      <span class="truncate text-lg font-semibold text-primary-500">
        Etno Explorer SAV
      </span>
      <Sheet v-model:open="mobileSheetOpen">
        <SheetTrigger as-child>
          <Button
            variant="outline"
            size="icon"
            class="h-9 w-9 rounded-lg border-neutral-200 text-foreground hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
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
    <!-- Row 2: filter + search -->
    <div class="flex items-center gap-2 px-4 pb-2.5">
      <div class="relative shrink-0">
        <Button
          type="button"
          size="sm"
          class="gap-1.5 bg-primary-500 text-white hover:bg-primary-600"
          aria-label="Toggle filters"
          @click="emit('toggle-filter')"
        >
          <SlidersHorizontal class="h-4 w-4" />
          <span>Filter</span>
        </Button>
        <Badge
          v-if="activeFilterCount > 0"
          class="absolute -right-1 -top-1 h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs"
          variant="secondary"
        >
          {{ activeFilterCount }}
        </Badge>
      </div>
      <div class="relative flex-1 min-w-0">
        <Search
          class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          :model-value="searchQuery ?? ''"
          type="search"
          class="h-9 rounded-lg pl-9 pr-8 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-primary-500 [&::-webkit-search-cancel-button]:hidden"
          placeholder="Search in collection"
          aria-label="Search collection"
          @update:model-value="emit('update:searchQuery', $event ?? '')"
        />
        <button
          v-if="(searchQuery ?? '').length > 0"
          type="button"
          class="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
          @click="emit('update:searchQuery', '')"
        >
          <X class="h-4 w-4" />
        </button>
      </div>
    </div>
  </nav>
</template>
