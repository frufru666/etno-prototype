<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { PhX } from '@phosphor-icons/vue'

defineProps<{
  /** Right-side action label (e.g. "Zobraziť Transcript", "Open in Maps"). Omit for PDF. */
  rightLabel?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'action'): void
}>()
</script>

<template>
  <header
    class="flex h-10 shrink-0 items-center justify-between border-b border-border bg-background pl-2 pr-3 py-1"
    role="banner"
  >
    <Button
      variant="ghost"
      class="h-10 gap-2 text-base font-semibold text-primary-500 hover:bg-primary-50 hover:text-primary-600"
      aria-label="Zavrieť"
      @click="emit('close')"
    >
      <PhX class="size-5 shrink-0" />
      Zavrieť
    </Button>
    <div v-if="rightLabel" class="flex shrink-0 items-center">
      <Button
        variant="ghost"
        class="h-10 gap-2 text-base font-semibold text-primary-500 hover:bg-primary-50 hover:text-primary-600"
        @click="emit('action')"
      >
        {{ rightLabel }}
      </Button>
    </div>
    <slot v-else name="right">
      <!-- Optional custom right content (e.g. icon-only) -->
    </slot>
  </header>
</template>
