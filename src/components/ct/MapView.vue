<script setup lang="ts">
import { ref } from "vue";
import type { MapPin } from "@/data/mockData";
import MockMap from "@/components/ct/MockMap.vue";

withDefaults(
  defineProps<{
    pins: MapPin[];
    enabled?: boolean;
    /** Pin marker style: primary (blue), secondary (coral), or error (red) */
    pinStyle?: "primary" | "secondary" | "error";
    /** Cluster marker style: secondary (coral) or dark */
    clusterStyle?: "secondary" | "dark";
    /** When false, zoom/fit controls are hidden (e.g. on mobile) */
    showZoomControls?: boolean;
    /** When true, requires ctrl+scroll to zoom (desktop scroll protection) */
    cooperativeGestures?: boolean;
  }>(),
  {
    enabled: true,
    pinStyle: "secondary",
    clusterStyle: "secondary",
    showZoomControls: true,
    cooperativeGestures: false,
  },
);

const mockMapRef = ref<InstanceType<typeof MockMap> | null>(null);

function fitBounds() {
  mockMapRef.value?.fitBounds?.();
}

function locate() {
  mockMapRef.value?.locate?.();
}

defineExpose({ fitBounds, locate });
</script>

<template>
  <div class="relative h-full w-full">
    <MockMap
      v-if="enabled"
      ref="mockMapRef"
      :pins="pins"
      :pin-style="pinStyle"
      :cluster-style="clusterStyle"
      :show-zoom-controls="showZoomControls"
      :cooperative-gestures="cooperativeGestures"
    />
    <div
      v-else
      class="absolute inset-0 flex items-center justify-center bg-muted text-sm text-muted-foreground"
    >
      Mapa
    </div>
  </div>
</template>
