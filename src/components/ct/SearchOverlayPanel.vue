<script setup lang="ts">
import type { EtnoItem } from "@/data/mockData";
import { computed, ref, watch, nextTick, watchEffect } from "vue";
import type { OnCleanup } from "vue";
import SearchResultsPanel from "@/components/ct/SearchResultsPanel.vue";

const props = withDefaults(
  defineProps<{
    items: EtnoItem[];
    query: string;
    open?: boolean;
    mobile?: boolean;
    /** When set (mobile + keyboard), panel height uses this instead of calc(100dvh-120px) */
    availableHeightPx?: number | null;
    positionClass?: string;
  }>(),
  {
    open: true,
    mobile: false,
    availableHeightPx: null,
    positionClass:
      "fixed left-2 right-2 top-[104px] z-30 md:left-1/2 md:right-auto md:top-[72px] md:w-[480px] md:-translate-x-1/2",
  },
);

const isOpen = computed(
  () => !!props.open && props.query.trim().length > 0,
);

/** Drives expand animation (scale-y) when overlay opens on mobile */
const expanded = ref(false);
watch(
  () => isOpen.value && props.mobile,
  (open: boolean) => {
    if (open) {
      expanded.value = false;
      nextTick(() => {
        expanded.value = true;
      });
    } else {
      expanded.value = false;
    }
  },
  { immediate: true },
);

watchEffect((onCleanup: OnCleanup) => {
  if (!props.mobile || !isOpen.value) return;

  const prevBodyOverflow = document.body.style.overflow;
  const prevHtmlOverflow = document.documentElement.style.overflow;

  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";

  onCleanup(() => {
    document.body.style.overflow = prevBodyOverflow;
    document.documentElement.style.overflow = prevHtmlOverflow;
  });
});
</script>

<template>
  <div v-if="isOpen" :class="positionClass" class="overflow-hidden">
    <div
      class="origin-top transition-transform duration-300 ease-out"
      :class="[
        mobile ? (expanded ? 'scale-y-100' : 'scale-y-0') : 'scale-y-100',
        !mobile && 'w-full max-w-[600px] translate-x-10',
      ]"
    >
      <SearchResultsPanel
        :items="items"
        :query="query"
        :mobile="mobile"
        :height-px="availableHeightPx ?? undefined"
      />
    </div>
  </div>
</template>
