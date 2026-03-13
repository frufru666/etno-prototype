<script setup lang="ts">
import type { EtnoItem } from "@/data/mockData";
import {
  getMediaType,
  getCollectionsForItem,
  getDocumentsForItem,
  yearFromStudyPeriodStart,
} from "@/data/mockData";
import MediaTypeIcon from "@/components/ct/MediaTypeIcon.vue";
import { PhFolder, PhFileText } from "@phosphor-icons/vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  item: EtnoItem;
  /** When true, show compact meta (e.g. in map multi-pin tooltip). */
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
      <div class="mt-1 flex flex-wrap items-center gap-2 text-xs">
        <span class="font-mono text-muted-foreground">ID {{ item.id }}</span>
        <span class="text-muted-foreground">·</span>
        <span
          class="inline-flex items-center gap-1 rounded-full border px-2 py-0.5"
          :class="typeChipClass()"
        >
          <MediaTypeIcon :media-type="mediaType" class="h-3.5 w-3.5 shrink-0" />
          <span class="truncate">{{ item.documentType }}</span>
        </span>
      </div>
      <div
        v-if="!compact && (collections.length > 0 || documents.length > 0)"
        class="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground"
      >
        <span v-if="collections.length > 0" class="flex items-center gap-1">
          <PhFolder class="h-4 w-4 shrink-0" aria-hidden />
          <span>{{ collections.length }}</span>
        </span>
        <span v-if="documents.length > 0" class="flex items-center gap-1">
          <PhFileText class="h-4 w-4 shrink-0" aria-hidden />
          <span>{{ documents.length }}</span>
        </span>
      </div>
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
