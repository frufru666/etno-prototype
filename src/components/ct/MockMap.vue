<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import mapboxgl from "mapbox-gl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PhMagnifyingGlassPlus,
  PhMagnifyingGlassMinus,
  PhCrosshair,
  PhImage,
  PhPlay,
  PhMusicNotes,
  PhFileText,
} from "@phosphor-icons/vue";
import { getMediaType } from "@/data/mockData";
import type { MapPin } from "@/data/mockData";
import type { MediaType } from "@/data/mockData";

const MAPBOX_STYLE = "mapbox://styles/metafori/cmmm7nqgh009r01sb26yj1pkk";
const TOOLTIP_WIDTH = 280;
const TOOLTIP_HEIGHT_APPROX = 180;
const TOOLTIP_MARGIN = 16;
const TOOLTIP_GAP_FROM_PIN = 16;
const PIN_SIZE_NORMAL = 28;
const PIN_SIZE_EXPANDED = 90;
const PIN_OFFSET_NORMAL = -14;
/** Expanded pin: center 16px above map point */
const PIN_OFFSET_EXPANDED = -16;
const PIN_ANIMATION_MS = 100;
const ZOOM_ANIMATION_MS = 100;

// Slovakia default
const DEFAULT_CENTER: [number, number] = [19.5, 48.7];
const DEFAULT_ZOOM = 6;

const props = withDefaults(
  defineProps<{
    pins: MapPin[];
    /** Compact mode for detail panel (single pin, no controls) */
    compact?: boolean;
    /** Pin marker style: primary (blue), secondary (coral), or error (red) */
    pinStyle?: "primary" | "secondary" | "error";
    /** Cluster marker style: secondary (coral) or dark (Figma mobile) */
    clusterStyle?: "secondary" | "dark";
    /** When false, zoom/fit controls are hidden (e.g. on mobile) */
    showZoomControls?: boolean;
    /** When true, requires ctrl+scroll to zoom (desktop scroll protection) */
    cooperativeGestures?: boolean;
  }>(),
  {
    compact: false,
    pinStyle: "secondary",
    clusterStyle: "secondary",
    showZoomControls: true,
    cooperativeGestures: false,
  },
);

const router = useRouter();
const mapContainerRef = ref<HTMLDivElement | null>(null);
const map = ref<mapboxgl.Map | null>(null);
const markersRef = ref<mapboxgl.Marker[]>([]);
const tooltipPin = ref<MapPin | null>(null);
const tooltipPos = ref({ x: 0, y: 0 });
/** When set, tooltip stays open until map click or second pin click (open detail) */
const pinnedPinId = ref<string | null>(null);

// Token from runtime env.js only (never inlined in bundle; env.js is generated from .env)
const token =
  typeof window !== "undefined"
    ? (window as unknown as { __VITE_MAPBOX_ACCESS_TOKEN__?: string })
        .__VITE_MAPBOX_ACCESS_TOKEN__
    : undefined;
const hasToken = Boolean(token?.trim());

// Grid-based clustering: same cell = same cluster
const LNG_MIN = 17;
const LNG_MAX = 22.5;
const LAT_MIN = 47.5;
const LAT_MAX = 49.6;

function getCellKey(lng: number, lat: number) {
  const gx = Math.floor(((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * 20);
  const gy = Math.floor(((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * 20);
  return `${gx},${gy}`;
}

interface Cluster {
  type: "cluster";
  count: number;
  lng: number;
  lat: number;
  pins: MapPin[];
}
interface Single {
  type: "single";
  pin: MapPin;
}

const displayItems = computed(() => {
  const pins = props.pins;
  if (pins.length === 0) return [];
  if (pins.length === 1 || props.compact) {
    return pins.map((pin): Single => ({ type: "single", pin }));
  }
  const cells = new Map<string, MapPin[]>();
  for (const pin of pins) {
    const key = getCellKey(pin.lng, pin.lat);
    if (!cells.has(key)) cells.set(key, []);
    cells.get(key)!.push(pin);
  }
  const result: (Cluster | Single)[] = [];
  cells.forEach((cellPins) => {
    if (cellPins.length > 1) {
      const lng = cellPins.reduce((s, p) => s + p.lng, 0) / cellPins.length;
      const lat = cellPins.reduce((s, p) => s + p.lat, 0) / cellPins.length;
      result.push({
        type: "cluster",
        count: cellPins.length,
        lng,
        lat,
        pins: cellPins,
      });
    } else {
      result.push({ type: "single", pin: cellPins[0] });
    }
  });
  return result;
});

function goToPin(pin: MapPin) {
  router.push({ name: "detail", params: { id: pin.id } });
}

function updateTooltipPosition() {
  const m = map.value;
  const pin = tooltipPin.value;
  if (!m || !pin || !mapContainerRef.value) return;

  const pt = m.project([pin.lng, pin.lat]);
  const gap = TOOLTIP_GAP_FROM_PIN;
  // Expanded pin center is 16px above map point; card top = bottom of circle + gap
  const expandedBottom = pt.y - 16 + PIN_SIZE_EXPANDED / 2;
  const y = expandedBottom + gap;

  tooltipPos.value = { x: pt.x, y };
}

function expandPinEl(el: HTMLElement, pin: MapPin) {
  el.classList.remove("h-7", "w-7", "h-8", "w-8");
  el.classList.add("h-[90px]", "w-[90px]");
  const iconWrap = el.querySelector(".pin-type-icon") as HTMLElement | null;
  if (iconWrap) {
    iconWrap.classList.add("transition-opacity", "duration-100", "ease-out");
  }
  if (pin.thumbnailUrl) {
    const existing = el.querySelector(".pin-expanded-content");
    if (existing) existing.remove();
    const wrap = document.createElement("span");
    wrap.className =
      "pin-expanded-content absolute inset-0 flex items-center justify-center overflow-hidden rounded-full bg-muted opacity-0 transition-opacity duration-100 ease-out";
    const img = document.createElement("img");
    img.src = pin.thumbnailUrl;
    img.alt = pin.title;
    img.className = "h-full w-full object-cover";
    wrap.appendChild(img);
    el.appendChild(wrap);
    if (iconWrap) iconWrap.classList.add("opacity-0");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        wrap.classList.add("opacity-100");
      });
    });
  } else {
    const existing = el.querySelector(".pin-expanded-content");
    if (existing) existing.remove();
    if (iconWrap) {
      iconWrap.classList.remove("opacity-0", "[&_svg]:h-3.5", "[&_svg]:w-3.5");
      iconWrap.classList.add("pin-expanded-icon", "[&_svg]:h-8", "[&_svg]:w-8");
    }
  }
}

function collapsePinEl(el: HTMLElement) {
  el.classList.remove("h-[90px]", "w-[90px]");
  const isError = el.dataset.pinError === "true";
  if (isError) {
    el.classList.add("h-8", "w-8");
    el.innerHTML = MAP_PIN_SVG;
  } else {
    el.classList.add("h-7", "w-7");
    const existing = el.querySelector(".pin-expanded-content") as HTMLElement | null;
    const iconWrap = el.querySelector(".pin-type-icon") as HTMLElement | null;
    if (existing) {
      existing.classList.add("opacity-0");
      if (iconWrap) {
        iconWrap.classList.remove("opacity-0", "pin-expanded-icon", "[&_svg]:h-8", "[&_svg]:w-8");
        iconWrap.classList.add("[&_svg]:h-3.5", "[&_svg]:w-3.5");
      }
      setTimeout(() => existing.remove(), PIN_ANIMATION_MS);
    } else if (iconWrap) {
      iconWrap.classList.remove("pin-expanded-icon", "[&_svg]:h-8", "[&_svg]:w-8");
      iconWrap.classList.add("[&_svg]:h-3.5", "[&_svg]:w-3.5");
    }
  }
}

function applyActiveState() {
  const activePin = tooltipPin.value;
  const pins = props.pins;
  for (const marker of markersRef.value) {
    const el = marker.getElement() as HTMLElement;
    const pinId = el.dataset.pinId;
    if (!pinId) continue;
    const pin = pins.find((p) => p.id === pinId);
    if (!pin) continue;
    if (activePin?.id === pinId) {
      marker.setOffset([0, PIN_OFFSET_EXPANDED]);
      expandPinEl(el, activePin);
    } else {
      marker.setOffset([0, PIN_OFFSET_NORMAL]);
      collapsePinEl(el);
    }
  }
}

function showTooltip(pin: MapPin) {
  tooltipPin.value = pin;
  nextTick(() => {
    updateTooltipPosition();
    applyActiveState();
  });
}

function restoreTooltipToPinned() {
  const id = pinnedPinId.value;
  tooltipPin.value = id ? props.pins.find((p) => p.id === id) ?? null : null;
  nextTick(() => {
    updateTooltipPosition();
    applyActiveState();
  });
}

function hideTooltip() {
  tooltipPin.value = null;
  pinnedPinId.value = null;
  nextTick(applyActiveState);
}

const tooltipPositionStyle = computed(() => ({
  left: tooltipPos.value.x + "px",
  top: tooltipPos.value.y + "px",
  transform: "translate(-50%, 0)",
}));

const tooltipMediaIcon = computed(() => {
  const pin = tooltipPin.value;
  if (!pin) return PhFileText;
  const mediaType = getMediaType(pin.documentType);
  switch (mediaType) {
    case "image":
      return PhImage;
    case "video":
      return PhPlay;
    case "audio":
      return PhMusicNotes;
    default:
      return PhFileText;
  }
});

function zoomIn() {
  map.value?.zoomIn({ duration: ZOOM_ANIMATION_MS });
}

function zoomOut() {
  map.value?.zoomOut({ duration: ZOOM_ANIMATION_MS });
}

function fitBounds() {
  const m = map.value;
  const pins = props.pins;
  if (!m || pins.length === 0) return;
  if (pins.length === 1) {
    m.flyTo({
      center: [pins[0].lng, pins[0].lat],
      zoom: 12,
      duration: ZOOM_ANIMATION_MS,
    });
    return;
  }
  const lngs = pins.map((p) => p.lng);
  const lats = pins.map((p) => p.lat);
  const sw: [number, number] = [Math.min(...lngs), Math.min(...lats)];
  const ne: [number, number] = [Math.max(...lngs), Math.max(...lats)];
  m.fitBounds([sw, ne], { padding: 48, maxZoom: 14, duration: ZOOM_ANIMATION_MS });
}

function locate() {
  if (
    !map.value ||
    typeof navigator?.geolocation?.getCurrentPosition !== "function"
  )
    return;
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const m = map.value;
      if (!m) return;
      m.flyTo({
        center: [pos.coords.longitude, pos.coords.latitude],
        zoom: 14,
        duration: ZOOM_ANIMATION_MS,
      });
    },
    () => {},
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
  );
}

function focusCluster(lng: number, lat: number) {
  map.value?.flyTo({
    center: [lng, lat],
    zoom: (map.value?.getZoom() ?? 10) + 1,
    duration: ZOOM_ANIMATION_MS,
  });
}

const MAP_PIN_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M128 16a88.1 88.1 0 0 0-88 88c0 75.3 80 132.17 83.41 134.55a8 8 0 0 0 9.18 0C136 236.17 216 179.3 216 104a88.1 88.1 0 0 0-88-88zm0 56a32 32 0 1 1-32 32 32 32 0 0 1 32-32z"/></svg>';

// Phosphor regular-weight paths (same as MediaTypeIcon / grid thumbnails)
function getMediaTypeIconSvg(mediaType: MediaType): string {
  const attrs = 'xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256"';
  const paths: Record<MediaType, string> = {
    image:
      'M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z',
    video:
      'M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z',
    audio:
      'M212.92,17.69a8,8,0,0,0-6.86-1.45l-128,32A8,8,0,0,0,72,56V166.08A36,36,0,1,0,88,196V110.25l112-28v51.83A36,36,0,1,0,216,164V24A8,8,0,0,0,212.92,17.69ZM52,216a20,20,0,1,1,20-20A20,20,0,0,1,52,216ZM88,93.75V62.25l112-28v31.5ZM180,184a20,20,0,1,1,20-20A20,20,0,0,1,180,184Z',
    pdf:
      'M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,0,0,1,0-16h64A8,8,0,0,1,168,168Z',
    document:
      'M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,0,0,1,0-16h64A8,8,0,0,1,168,168Z',
  };
  const d = paths[mediaType] ?? paths.document;
  return `<svg ${attrs}><path d="${d}"/></svg>`;
}

function createPinElement(pin: MapPin): HTMLButtonElement {
  const el = document.createElement("button");
  el.type = "button";
  const isError = props.pinStyle === "error";
  const isCoral = props.pinStyle === "secondary";
  const pinBg = isError
    ? "bg-error"
    : isCoral
      ? "bg-secondary-700"
      : "bg-primary-500";
  el.className = isError
    ? "absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-full cursor-pointer items-center justify-center rounded-[19px] border border-white bg-error shadow-md ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 mapboxgl-marker-pin text-white overflow-hidden"
    : `absolute z-10 flex h-7 w-7 -translate-x-1/2 -translate-y-full cursor-pointer items-center justify-center rounded-full border-2 border-white ${pinBg} shadow-md ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 mapboxgl-marker-pin overflow-hidden text-white`;
  el.style.setProperty("--pin-duration", `${PIN_ANIMATION_MS}ms`);
  el.style.transition =
    "width var(--pin-duration) ease-out, height var(--pin-duration) ease-out";
  el.dataset.pinId = pin.id;
  el.dataset.mediaType = getMediaType(pin.documentType);
  if (isError) {
    el.dataset.pinError = "true";
    el.innerHTML = MAP_PIN_SVG;
  } else {
    const iconWrap = document.createElement("span");
    iconWrap.className =
      "pin-type-icon flex items-center justify-center [&_svg]:h-3.5 [&_svg]:w-3.5 [&_svg]:transition-all [&_svg]:duration-100 [&_svg]:ease-out";
    iconWrap.innerHTML = getMediaTypeIconSvg(getMediaType(pin.documentType));
    el.appendChild(iconWrap);
  }
  el.setAttribute("aria-label", pin.title);
  el.addEventListener("mouseenter", () => {
    if (pinnedPinId.value) return;
    showTooltip(pin);
  });
  el.addEventListener("mouseleave", () => {
    if (pinnedPinId.value) return;
    restoreTooltipToPinned();
  });
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    if (pinnedPinId.value === pin.id && tooltipPin.value?.id === pin.id) {
      goToPin(pin);
      hideTooltip();
      pinnedPinId.value = null;
    } else {
      pinnedPinId.value = pin.id;
      showTooltip(pin);
    }
  });
  return el;
}

function createClusterElement(
  count: number,
  lng: number,
  lat: number,
  pins: MapPin[],
): HTMLButtonElement {
  const el = document.createElement("button");
  el.type = "button";
  const isDark = props.clusterStyle === "dark";
  el.className = isDark
    ? "absolute z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[20px] border border-white text-base font-bold text-white shadow-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 mapboxgl-marker-cluster"
    : "absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-secondary-500 text-xs font-bold text-white shadow-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 mapboxgl-marker-cluster";
  if (isDark) {
    el.style.backgroundColor = "rgba(23, 23, 23, 0.4)";
  }
  el.setAttribute("aria-label", `Klastre ${count} bodov`);
  el.textContent = String(count);
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    focusCluster(lng, lat);
  });
  return el;
}

function syncMarkers() {
  const m = map.value;
  if (!m) return;
  markersRef.value.forEach((marker) => marker.remove());
  markersRef.value = [];
  const newMarkers: mapboxgl.Marker[] = [];
  for (const item of displayItems.value) {
    if (item.type === "single") {
      const el = createPinElement(item.pin);
      const pinOffset = props.pinStyle === "error" ? -16 : -14;
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([item.pin.lng, item.pin.lat])
        .setOffset([0, pinOffset])
        .addTo(m);
      newMarkers.push(marker);
    } else {
      const el = createClusterElement(
        item.count,
        item.lng,
        item.lat,
        item.pins,
      );
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([item.lng, item.lat])
        .addTo(m);
      newMarkers.push(marker);
    }
  }
  markersRef.value = newMarkers;
  nextTick(applyActiveState);
}

function initMap() {
  if (!mapContainerRef.value || !hasToken) return;
  mapboxgl.accessToken = token!;
  const mapInstance = new mapboxgl.Map({
    container: mapContainerRef.value,
    style: MAPBOX_STYLE,
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
    cooperativeGestures: props.cooperativeGestures,
  });
  map.value = mapInstance;
  mapInstance.on("load", () => {
    mapInstance.setProjection("mercator");
    syncMarkers();
    if (props.pins.length === 1) {
      mapInstance.flyTo({
        center: [props.pins[0].lng, props.pins[0].lat],
        zoom: 12,
        duration: ZOOM_ANIMATION_MS,
      });
    } else if (props.pins.length > 1) {
      fitBounds();
    }
  });
  mapInstance.on("move", updateTooltipPosition);
  mapInstance.on("zoom", updateTooltipPosition);
  mapInstance.on("click", () => {
    if (tooltipPin.value) {
      hideTooltip();
    }
  });
}

watch(
  () => props.pins,
  (newPins) => {
    const m = map.value;
    if (!m || !m.isStyleLoaded()) return;
    if (newPins.length === 1) {
      m.flyTo({
        center: [newPins[0].lng, newPins[0].lat],
        zoom: 12,
        duration: ZOOM_ANIMATION_MS,
      });
    } else if (newPins.length > 1) {
      fitBounds();
    }
    syncMarkers();
  },
  { deep: true },
);

watch(displayItems, () => {
  if (map.value?.isStyleLoaded()) syncMarkers();
});

defineExpose({ fitBounds, locate });

onMounted(() => {
  initMap();
});

onUnmounted(() => {
  markersRef.value.forEach((marker) => marker.remove());
  markersRef.value = [];
  map.value?.remove();
  map.value = null;
});
</script>

<template>
  <div class="relative h-full w-full overflow-hidden bg-muted">
    <!-- No token: show placeholder -->
    <div
      v-if="!hasToken"
      class="flex h-full w-full items-center justify-center"
      style="
        background: linear-gradient(
          180deg,
          #e8f0e8 0%,
          #d0e0d0 50%,
          #c5d8c5 100%
        );
      "
    >
      <p class="text-sm text-muted-foreground">
        Nastavte VITE_MAPBOX_ACCESS_TOKEN v .env a spustite npm run env:generate
      </p>
    </div>

    <!-- Mapbox map -->
    <template v-else>
      <div ref="mapContainerRef" class="absolute inset-0 h-full w-full" />

      <!-- Tooltip card below expanded pin (dissolve in/out) -->
      <Transition
        name="tooltip-dissolve"
        enter-active-class="transition-opacity duration-100 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-100 ease-out"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="tooltipPin && !compact"
          class="pointer-events-auto absolute z-20 w-[280px] overflow-visible rounded-xl border border-border bg-background shadow-xl"
          :style="tooltipPositionStyle"
        >
          <!-- Notch pointing up to the pin -->
          <div
            class="absolute left-1/2 bottom-full h-0 w-0 -translate-x-1/2 border-8 border-transparent"
            style="border-bottom-color: hsl(var(--background))"
          />
          <div class="p-4">
            <!-- File type icon + doc type, then title, then one row: author · location · year -->
            <div
              class="mb-2 flex items-center gap-1.5 text-muted-foreground"
              aria-hidden
            >
              <component :is="tooltipMediaIcon" class="h-4 w-4 shrink-0" />
              <span class="text-xs font-medium uppercase tracking-wide">
                {{ tooltipPin.documentType }}
              </span>
            </div>
            <h3
              class="mb-2 line-clamp-3 text-sm font-semibold leading-tight text-foreground"
            >
              {{ tooltipPin.title }}
            </h3>
            <div class="line-clamp-1 flex flex-wrap items-baseline gap-x-3 gap-y-0.5 text-xs">
              <button
                v-if="tooltipPin.authorDisplay"
                type="button"
                class="cursor-pointer font-medium text-primary-500 underline-offset-2 hover:underline hover:text-primary-600 focus:outline-none focus:underline focus:ring-0"
                @click="goToPin(tooltipPin)"
              >
                {{ tooltipPin.authorDisplay }}
              </button>
              <span
                v-if="tooltipPin.authorDisplay && (tooltipPin.locationDisplay || tooltipPin.yearDisplay)"
                class="shrink-0 text-muted-foreground/60"
                aria-hidden
              >
                ·
              </span>
              <span
                v-if="tooltipPin.locationDisplay"
                class="text-muted-foreground"
              >
                {{ tooltipPin.locationDisplay }}
              </span>
              <span
                v-if="tooltipPin.yearDisplay && (tooltipPin.authorDisplay || tooltipPin.locationDisplay)"
                class="shrink-0 text-muted-foreground/60"
                aria-hidden
              >
                ·
              </span>
              <span
                v-if="tooltipPin.yearDisplay"
                class="text-muted-foreground/80"
              >
                {{ tooltipPin.yearDisplay }}
              </span>
              <span
                v-if="!tooltipPin.authorDisplay && !tooltipPin.locationDisplay && !tooltipPin.yearDisplay"
                class="text-muted-foreground"
              >
                —
              </span>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Map controls: top-right (hidden on mobile when showZoomControls is false) -->
      <div
        v-if="showZoomControls && !compact && pins.length > 0 && hasToken"
        class="absolute right-2 bottom-6 z-10 flex flex-col items-end justify-center gap-1 rounded-lg border border-border bg-background/95 p-1"
      >
        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8"
          aria-label="Priblížiť"
          @click="zoomIn"
        >
          <PhMagnifyingGlassPlus class="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8"
          aria-label="Oddialiť"
          @click="zoomOut"
        >
          <PhMagnifyingGlassMinus class="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          class="h-8 w-8"
          aria-label="Zobraziť všetky body"
          @click="fitBounds"
        >
          <PhCrosshair class="h-4 w-4" />
        </Button>
      </div>
    </template>
  </div>
</template>
