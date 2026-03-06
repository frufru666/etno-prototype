<script setup lang="ts">
import type { EtnoDocument } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    document: EtnoDocument
    /** Optional subtitle (e.g. count of items) */
    subtitle?: string
    /** Action label on the right */
    actionLabel?: string
  }>(),
  { actionLabel: 'Detail' }
)

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button
    type="button"
    class="group flex w-full cursor-pointer items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2.5 transition-all hover:border-muted-foreground/30 hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
    @click="emit('click')"
  >
    <div class="flex min-w-0 flex-1 items-center gap-2.5">
      <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted">
        <FileText class="h-4 w-4 text-muted-foreground" />
      </div>
      <div class="min-w-0 text-left">
        <p class="text-sm font-medium text-foreground">
          {{ document.name }}
        </p>
        <p
          v-if="subtitle"
          class="font-mono text-xs text-muted-foreground"
        >
          {{ subtitle }}
        </p>
      </div>
    </div>
    <span class="ml-2 shrink-0 text-xs font-medium text-muted-foreground group-hover:text-primary-500 group-hover:underline">
      {{ actionLabel }}
    </span>
  </button>
</template>
