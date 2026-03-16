<script setup lang="ts">
import type { EtnoItem } from "@/data/mockData";
import {
  getMediaType,
  getCollectionsForItem,
  getDocumentsForItem,
  yearFromStudyPeriodStart,
} from "@/data/mockData";
import MediaMetaRow from "@/components/ct/MediaMetaRow.vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  item: EtnoItem;
  /** When true, hide some secondary lines (location/author). */
  compact?: boolean;
}>();

const router = useRouter();

const mediaType = getMediaType(props.item.documentType);
const collections = getCollectionsForItem(props.item.id);
const documents = getDocumentsForItem(props.item.id);

const locationDisplay = (() => {
  const raw = [props.item.obec, props.item.okres].filter(Boolean) as string[];
  const parts =
    raw.length === 2 && raw[0] === raw[1] ? [raw[0]] : raw;
  return parts.length > 0 ? parts.join(", ") : undefined;
})();
const yearDisplay = yearFromStudyPeriodStart(props.item.studyPeriodStart);
const authorDisplay = props.item.authors?.[0]?.name;

/** Thumbnail URL: use item's thumbnail if we had one; for now use same placeholder as map pins */
const thumbnailUrl = (() => {
  const id = props.item.id;
  const hash = id.split("").reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0);
  const hasPlaceholder = Math.abs(hash) % 10 < 8;
  return hasPlaceholder
    ? `https://picsum.photos/seed/${encodeURIComponent(id)}/144/144`
    : undefined;
})();

function thumbnailClass() {
  switch (mediaType) {
    case "image":
      return "bg-purple-50 text-purple-700";
    case "video":
      return "bg-secondary-100 text-secondary-800";
    case "audio":
      return "bg-green-50 text-green-800";
    case "pdf":
      return "bg-amber-50 text-amber-800";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function typeChipClass() {
  switch (mediaType) {
    case "image":
      return "border-purple-200 bg-purple-50 text-purple-700";
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

function goToDetail() {
  router.push({ name: "detail", params: { id: props.item.id } });
}
</script>

<template>
  <button
    type="button"
    class="flex w-full cursor-pointer items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
    @click="goToDetail"
  >
    <!-- Thumbnail (wireframe: small image or icon) -->
    <div
      class="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md"
      :class="thumbnailClass()"
    >
      <img
        v-if="thumbnailUrl"
        :src="thumbnailUrl"
        :alt="item.title"
        class="h-full w-full object-cover"
      />
      <MediaTypeIcon
        v-else
        :media-type="mediaType"
        :has-transcript="item.hasTranscript"
        class="h-6 w-6"
      />
    </div>
    <!-- Content: title, ID · type chip (wireframe), optional location/year, author, counts -->
    <div class="min-w-0 flex-1">
      <p class="line-clamp-2 text-sm font-medium leading-tight text-foreground">
        {{ item.title }}
      </p>
      <MediaMetaRow
        class="mt-1"
        :document-type="item.documentType"
        :media-type="mediaType"
        :collection-count="collections.length"
        :document-count="documents.length"
        :compact-counts="true"
      />
      <div
        v-if="(locationDisplay || yearDisplay) && !compact"
        class="mt-0.5 line-clamp-1 text-xs text-muted-foreground"
      >
        {{ [locationDisplay, yearDisplay].filter(Boolean).join(", ") }}
      </div>
      <p
        v-if="authorDisplay && !compact"
        class="mt-0.5 line-clamp-1 text-xs text-muted-foreground"
      >
        {{ authorDisplay }}
      </p>
    </div>
  </button>
</template>
