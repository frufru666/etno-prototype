<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PhCaretRight } from "@phosphor-icons/vue";
import { transcriptPreview, type EtnoItem } from "@/data/mockData";

defineProps<{
  item: EtnoItem;
}>();

defineEmits<{
  (e: "hide"): void;
}>();
</script>

<template>
  <section class="flex min-h-0 flex-col">
    <header
      class="flex h-16 shrink-0 items-center justify-between border-b border-border px-4"
    >
      <h2 class="text-lg font-bold text-foreground">Transcript</h2>
      <Button
        variant="nav"
        size="sm"
        class="gap-1 rounded-md text-sm font-semibold"
        aria-label="Skryť Transcript"
        @click="$emit('hide')"
      >
        Skryť
        <PhCaretRight class="size-4" />
      </Button>
    </header>
    <ScrollArea class="min-h-0 flex-1 px-4 py-3">
      <p class="whitespace-pre-wrap text-base leading-7 text-foreground">
        {{ transcriptPreview(item) }}
      </p>
    </ScrollArea>
  </section>
</template>
