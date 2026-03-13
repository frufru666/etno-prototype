<script setup lang="ts">
import type { EtnoItem } from "@/data/mockData";
import { searchResultCountLabel } from "@/lib/itemPresentation";
import { ScrollArea } from "@/components/ui/scroll-area";
import ItemHorizontalCard from "@/components/ct/ItemHorizontalCard.vue";

const props = withDefaults(
  defineProps<{
    items: EtnoItem[];
    query: string;
    mobile?: boolean;
  }>(),
  { mobile: false },
);
</script>

<template>
  <div
    class="flex flex-col overflow-hidden bg-background"
    :class="
      mobile
        ? 'w-full max-h-[calc(100dvh-112px)] rounded-xl border border-border shadow-lg'
        : 'h-[calc(100vh-90px)] w-[480px] rounded-xl border border-border shadow-lg'
    "
  >
    <div class="shrink-0 px-4 pb-2 pt-4">
      <h2 class="text-base font-bold tracking-tight text-foreground">
        {{ searchResultCountLabel(items.length) }}
      </h2>
    </div>
    <ScrollArea class="flex-1 min-h-0">
      <div class="flex flex-col">
        <ItemHorizontalCard
          v-for="item in items"
          :key="item.id"
          :item="item"
          :compact="false"
        />
      </div>
    </ScrollArea>
  </div>
</template>
