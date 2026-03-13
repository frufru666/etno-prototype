<script setup lang="ts">
import { computed } from "vue";
import { Button } from "@/components/ui/button";

const props = defineProps<{
  count: number;
}>();

const hasItems = computed(() => props.count > 0);
</script>

<template>
  <div
    class="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center pb-6"
  >
    <div
      class="pointer-events-auto inline-flex items-center gap-10 rounded-xl border border-border bg-background/95 w-fit px-2 py-2 shadow-lg backdrop-blur"
    >
      <p class="mx-2 text-sm text-foreground">
        <span class="font-semibold">{{ count }}</span>
        <span class="ml-1">items filtered.</span>
      </p>
      <Button
        type="button"
        size="sm"
        class="rounded-lg px-4"
        :disabled="!hasItems"
        @click="$emit('show-list')"
      >
        Show in list
      </Button>
    </div>
  </div>
</template>

