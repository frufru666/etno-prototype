<script setup lang="ts">
import type { EtnoItem } from "@/data/mockData";
import ObjectCard from "@/components/ct/ObjectCard.vue";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PhCaretDown, PhCaretUp } from "@phosphor-icons/vue";

const props = withDefaults(
  defineProps<{
    items: EtnoItem[];
    sortKey: string;
    sortOrder: "asc" | "desc";
    /** When set and items empty, show search empty state */
    searchQuery?: string;
  }>(),
  { searchQuery: "" },
);

const emit = defineEmits<{
  (e: "update:sortKey", value: string): void;
  (e: "update:sortOrder", value: "asc" | "desc"): void;
}>();

const sortOptions = [
  { value: "id", label: "ID" },
  { value: "title", label: "Názov" },
  { value: "studyPeriodStart", label: "Čas aktivity" },
] as const;

function toggleSortOrder() {
  emit("update:sortOrder", props.sortOrder === "asc" ? "desc" : "asc");
}
</script>

<template>
  <section class="px-4 py-4 md:px-6">
    <div class="mb-4 flex flex-nowrap items-center justify-between gap-16">
      <h2 class="shrink-0 truncate text-lg font-semibold text-foreground md:text-xl">
        {{ items.length }} objektov
      </h2>
      <div class="flex min-w-0 shrink items-center gap-2">
        <span class="shrink-0 text-sm text-muted-foreground">Zoradiť:</span>
        <div class="min-w-0 w-[180px] max-w-full shrink">
          <Select
            :model-value="sortKey"
            @update:model-value="(v) => emit('update:sortKey', v ?? 'id')"
          >
            <SelectTrigger
              class="w-full min-w-0 rounded-lg border-border focus-visible:ring-2 focus-visible:ring-primary-500 [&>span]:min-w-0 [&>span]:truncate"
            >
              <SelectValue placeholder="Vyberte" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem
              v-for="opt in sortOptions"
              :key="opt.value"
              :value="opt.value"
            >
              {{ opt.label }}
            </SelectItem>
          </SelectContent>
        </Select>
        </div>
        <Button
          variant="outline"
          size="icon"
          class="h-9 w-9 shrink-0 rounded-lg border-border"
          aria-label="Zmeniť smer zoradenia"
          @click="toggleSortOrder"
        >
          <PhCaretUp v-if="sortOrder === 'asc'" class="h-4 w-4" />
          <PhCaretDown v-else class="h-4 w-4" />
        </Button>
      </div>
    </div>
    <div
      v-if="items.length === 0 && searchQuery?.trim()"
      class="rounded-lg border border-border bg-muted/30 px-6 py-8 text-center text-sm text-muted-foreground"
    >
      Pre hľadaný výraz „{{ searchQuery.trim() }}“ sa nenašli žiadne výsledky.
    </div>
    <!-- ≤768: 1 col | ≥1024: 2 cols | ≥1280: 3 cols | ≥1920: 4 cols; cards fill grid -->
    <div
      v-else
      class="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 min-[1920px]:grid-cols-4"
    >
      <ObjectCard v-for="item in items" :key="item.id" :item="item" />
    </div>
  </section>
</template>
