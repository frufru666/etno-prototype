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
    /** When set (e.g. from visual viewport when keyboard open), overrides mobile height */
    heightPx?: number;
  }>(),
  { mobile: false },
);
</script>

<template>
  <div
    class="flex flex-col overflow-hidden bg-background rounded-2xl border border-border shadow-lg"
    :class="
      mobile
        ? 'w-full'
        : 'h-[calc(100vh-180px)] w-full max-w-[600px]'
    "
    :style="
      mobile && heightPx != null
        ? { height: `${heightPx}px` }
        : mobile
          ? { height: 'calc(100dvh - 120px)' }
          : undefined
    "
  >
    <div class="shrink-0 px-4 py-3">
      <h2 class="text-base font-bold tracking-tight text-foreground">
        {{ searchResultCountLabel(items.length) }}
      </h2>
    </div>
    <ScrollArea
      class="touch-pan-y min-h-0 flex-1"
      type="always"
    >
      <div class="flex flex-col pb-3">
        <template v-if="items.length">
          <ItemHorizontalCard
            v-for="item in items"
            :key="item.id"
            :item="item"
            :compact="false"
          />
        </template>
        <p
          v-else
          class="px-4 py-6 text-sm text-muted-foreground"
        >
          Žiadne výsledky pre zadaný výraz.
        </p>
      </div>
    </ScrollArea>
  </div>
</template>
