<script setup lang="ts">
import { computed } from "vue";
import type { MediaType } from "@/data/mockData";
import MediaTypeIcon from "@/components/ct/MediaTypeIcon.vue";
import { PhFolder, PhFileText } from "@phosphor-icons/vue";

const props = defineProps<{
  documentType: string;
  mediaType: MediaType;
  collectionCount?: number;
  documentCount?: number;
  /** When true, show only [icon] [number] for counts (used in tooltips). */
  compactCounts?: boolean;
  /** Reserved for future tweaks; currently both sizes render at 12px. */
  size?: "sm" | "md";
}>();

const sizeClass = computed(() => "text-xs");

function typeChipClass(mediaType: MediaType): string {
  switch (mediaType) {
    case "image":
      return "border-primary-200 bg-primary-50 text-primary-700";
    case "video":
      return "border-secondary-300 bg-secondary-100 text-secondary-800";
    case "audio":
      return "border-green-200 bg-green-50 text-green-800";
    case "pdf":
      return "border-amber-200 bg-amber-50 text-amber-800";
    default:
      return "border-muted-foreground/30 bg-muted/50 text-muted-foreground";
  }
}
</script>

<template>
  <div
    class="flex items-center justify-between gap-2 text-muted-foreground"
    :class="sizeClass"
  >
    <span class="flex min-w-0 items-center">
      <span
        class="inline-flex max-w-full items-center gap-1 truncate rounded-full border px-2 py-0.5"
        :class="typeChipClass(mediaType)"
      >
        <MediaTypeIcon
          :media-type="mediaType"
          class="h-3.5 w-3.5 shrink-0"
        />
        <span class="truncate">{{ documentType }}</span>
      </span>
    </span>
    <span class="flex shrink-0 items-center gap-2 text-foreground/80">
      <span
        v-if="collectionCount && collectionCount > 0"
        class="flex items-center gap-1 text-muted-foreground"
      >
        <PhFolder class="h-4 w-4 shrink-0" aria-hidden />
        <template v-if="compactCounts">
          <span>{{ collectionCount }}</span>
        </template>
        <span v-else class="font-medium">
          Zbierka
          <span class="opacity-80">({{ collectionCount }})</span>
        </span>
      </span>
      <span
        v-if="documentCount && documentCount > 0"
        class="flex items-center gap-1 text-muted-foreground"
      >
        <PhFileText class="h-4 w-4 shrink-0" aria-hidden />
        <template v-if="compactCounts">
          <span>{{ documentCount }}</span>
        </template>
        <span v-else class="font-medium">
          Dokument
          <span class="opacity-80">({{ documentCount }})</span>
        </span>
      </span>
    </span>
  </div>
</template>

