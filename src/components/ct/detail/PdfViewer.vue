<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import MediaViewerMobileHeader from '@/components/ct/MediaViewerMobileHeader.vue'
import { PhMagnifyingGlassPlus, PhMagnifyingGlassMinus, PhCaretLeft, PhCaretRight, PhX } from '@phosphor-icons/vue'
import type { EtnoItem } from '@/data/mockData'
import { useIsMobile } from '@/composables/useIsMobile'

const props = defineProps<{
  item: EtnoItem
  mobile?: boolean
  fullscreen?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const router = useRouter()
const isMobile = useIsMobile()

// Mock page count (e.g. from document.size "245 strany" or default)
const pageCount = computed(() => {
  const s = props.item.size
  if (s && /^\d+/.test(s)) return parseInt(s, 10)
  return 245
})

const currentPage = ref(1)
</script>

<template>
  <div
    class="relative flex h-full w-full min-h-0 flex-col bg-muted"
    :class="{ 'fixed inset-0 z-[60]': fullscreen }"
  >
    <!-- Mobile fullscreen: Figma header (close only) + toolbar + content -->
    <template v-if="isMobile && fullscreen">
      <MediaViewerMobileHeader @close="emit('close')" />
      <div
        class="flex h-11 shrink-0 items-center gap-2 border-b border-border bg-background px-4"
      >
        <div class="flex flex-1 items-center justify-center gap-1">
          <Button variant="outline" size="icon" class="h-8 w-8" aria-label="Zoom out">
            <PhMagnifyingGlassMinus class="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" class="h-8 w-8" aria-label="Zoom in">
            <PhMagnifyingGlassPlus class="h-4 w-4" />
          </Button>
        </div>
        <div class="flex flex-1 items-center justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            class="h-8 w-8"
            :disabled="currentPage <= 1"
            aria-label="Previous page"
            @click="currentPage = Math.max(1, currentPage - 1)"
          >
            <PhCaretLeft class="h-4 w-4" />
          </Button>
          <span class="min-w-[4rem] text-center text-sm text-muted-foreground">
            {{ currentPage }} / {{ pageCount }}
          </span>
          <Button
            variant="outline"
            size="icon"
            class="h-8 w-8"
            :disabled="currentPage >= pageCount"
            aria-label="Next page"
            @click="currentPage = Math.min(pageCount, currentPage + 1)"
          >
            <PhCaretRight class="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ScrollArea class="min-h-0 flex-1 bg-muted p-4">
        <div class="mx-auto flex max-w-2xl flex-col gap-6">
          <div
            v-for="p in 3"
            :key="p"
            class="min-h-[50vh] rounded-md bg-white shadow-lg"
            :class="{ 'ring-2 ring-primary-400': (currentPage - 1) % 3 === p - 1 }"
          >
            <div class="p-6">
              <div class="h-4 w-full rounded bg-muted" />
              <div class="mt-4 space-y-2">
                <div
                  v-for="i in 12"
                  :key="i"
                  class="h-3 w-full rounded bg-muted"
                  :class="{ 'w-3/4': i % 4 === 0 }"
                />
              </div>
              <p class="mt-6 text-right text-sm text-muted-foreground">
                {{ (currentPage - 1) + p }}
              </p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </template>

    <!-- Desktop or non-fullscreen: original toolbar + content -->
    <template v-else>
      <div
        class="flex shrink-0 items-center gap-4 border-b border-border bg-background px-4 py-2"
      >
        <div class="flex flex-1 items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            class="gap-1.5 text-white"
            aria-label="Back to Explore"
            @click="router.push({ name: 'explore' })"
          >
            <PhCaretLeft class="h-4 w-4" />
            Back to Explore
          </Button>
          <Button
            v-if="fullscreen"
            variant="ghost"
            size="sm"
            aria-label="Zavrieť"
            @click="emit('close')"
          >
            <PhX class="h-4 w-4" />
            Zavrieť
          </Button>
        </div>
        <div class="flex flex-1 items-center justify-center gap-1">
          <Button variant="outline" size="icon" class="h-8 w-8" aria-label="Zoom out">
            <PhMagnifyingGlassMinus class="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" class="h-8 w-8" aria-label="Zoom in">
            <PhMagnifyingGlassPlus class="h-4 w-4" />
          </Button>
        </div>
        <div class="flex flex-1 items-center justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            class="h-8 w-8"
            :disabled="currentPage <= 1"
            aria-label="Previous page"
            @click="currentPage = Math.max(1, currentPage - 1)"
          >
            <PhCaretLeft class="h-4 w-4" />
          </Button>
          <span class="min-w-[6rem] text-center text-sm text-muted-foreground">
            ( {{ currentPage }} / {{ pageCount }} )
          </span>
          <Button
            variant="outline"
            size="icon"
            class="h-8 w-8"
            :disabled="currentPage >= pageCount"
            aria-label="Next page"
            @click="currentPage = Math.min(pageCount, currentPage + 1)"
          >
            <PhCaretRight class="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ScrollArea class="min-h-0 flex-1 p-6">
      <div class="mx-auto flex max-w-2xl flex-col gap-6">
        <div
          v-for="p in 3"
          :key="p"
          class="min-h-[60vh] rounded-md bg-white shadow-lg"
          :class="{ 'ring-2 ring-primary-400': (currentPage - 1) % 3 === p - 1 }"
        >
          <div class="p-8">
            <div class="h-4 w-full rounded bg-muted" />
            <div class="mt-4 space-y-2">
              <div
                v-for="i in 12"
                :key="i"
                class="h-3 w-full rounded bg-muted"
                :class="{ 'w-3/4': i % 4 === 0 }"
              />
            </div>
            <p class="mt-8 text-right text-sm text-muted-foreground">
              {{ (currentPage - 1) + p }}
            </p>
          </div>
        </div>
      </div>
    </ScrollArea>
    </template>
  </div>
</template>
