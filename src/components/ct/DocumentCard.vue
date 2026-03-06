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
    class="group flex w-full cursor-pointer items-center justify-between rounded-xl border border-border bg-background px-3.5 py-3.5 transition-all hover:border-primary-200 hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
    @click="emit('click')"
  >
    <div class="flex min-w-0 flex-1 items-center gap-3">
      <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-50">
        <FileText class="h-[18px] w-[18px] text-primary-500" />
      </div>
      <div class="min-w-0 text-left">
        <p class="text-sm font-semibold tracking-tight text-foreground">
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
    <span class="ml-2 shrink-0 text-sm font-semibold text-primary-500 group-hover:underline">
      {{ actionLabel }}
    </span>
  </button>
</template>
