<script setup lang="ts">
import type { EtnoItem } from '@/data/mockData'
import { getMediaType } from '@/data/mockData'
import { ScrollArea } from '@/components/ui/scroll-area'
import MediaTypeIcon from '@/components/ct/MediaTypeIcon.vue'
import { useRouter } from 'vue-router'

const props = withDefaults(
  defineProps<{
    items: EtnoItem[]
    query: string
    mobile?: boolean
  }>(),
  { mobile: false }
)

const router = useRouter()

function goToDetail(id: string) {
  router.push({ name: 'detail', params: { id } })
}

function getItemMediaType(item: EtnoItem) {
  return getMediaType(item.documentType)
}

function resultCountLabel(count: number): string {
  if (count === 1) return '1 výsledok vyhľadávania'
  if (count >= 2 && count <= 4) return `${count} výsledky vyhľadávania`
  return `${count} výsledkov vyhľadávania`
}
</script>

<template>
  <div
    class="flex flex-col overflow-hidden bg-background"
    :class="mobile
      ? 'w-full min-h-[50vh]'
      : 'h-[calc(100vh-90px)] w-[480px] rounded-xl border border-border shadow-lg'"
  >
    <div class="shrink-0 px-4 pb-2 pt-4">
      <h2 class="text-base font-bold tracking-tight text-foreground">
        {{ resultCountLabel(items.length) }}
      </h2>
    </div>
    <ScrollArea class="flex-1 min-h-0">
      <div class="flex flex-col">
        <button
          v-for="item in items"
          :key="item.id"
          type="button"
          class="flex cursor-pointer items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-accent"
          @click="goToDetail(item.id)"
        >
          <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <MediaTypeIcon
              :media-type="getItemMediaType(item)"
              :has-transcript="item.hasTranscript"
              class="h-6 w-6"
            />
          </div>
          <div class="min-w-0 flex-1">
            <p class="line-clamp-2 text-sm font-medium leading-tight text-foreground">
              {{ item.title }}
            </p>
            <p class="mt-1 text-xs text-muted-foreground">
              <span class="font-mono">ID {{ item.id }}</span>
              <span class="mx-1.5">·</span>
              <span class="capitalize">{{ item.documentType }}</span>
            </p>
          </div>
        </button>
      </div>
    </ScrollArea>
  </div>
</template>
