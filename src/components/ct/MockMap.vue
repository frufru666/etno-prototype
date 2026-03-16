<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import mapboxgl from "mapbox-gl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  PhMagnifyingGlassPlus,
  PhMagnifyingGlassMinus,
  PhCrosshair,
  PhImage,
  PhPlay,
  PhMusicNotes,
  PhFileText,
  PhFolder,
  PhPlus,
} from "@phosphor-icons/vue";
import {
  getMediaType,
  getCollectionsForItem,
  getDocumentsForItem,
} from "@/data/mockData";
import type { MapPin, EtnoItem } from "@/data/mockData";
import type { MediaType } from "@/data/mockData";
import MediaMetaRow from "@/components/ct/MediaMetaRow.vue";
import MediaTypeIcon from "@/components/ct/MediaTypeIcon.vue";
import ItemHorizontalCard from "@/components/ct/ItemHorizontalCard.vue";
import { useIsMobile } from "@/composables/useIsMobile";

const MAPBOX_STYLE = "mapbox://styles/metafori/cmmm7nqgh009r01sb26yj1pkk";
const TOOLTIP_WIDTH = 280;
const TOOLTIP_HEIGHT_APPROX = 180;
const TOOLTIP_MARGIN = 16;
const TOOLTIP_GAP_FROM_PIN = 16;
const PIN_SIZE_NORMAL = 32;
const PIN_SIZE_EXPANDED = 40;
/** Multi-pin: 40px, blue with count */
const PIN_SIZE_MULTI = 40;
const PIN_OFFSET_NORMAL = -16;
/** Expanded pin: center 16px above map point */
const PIN_OFFSET_EXPANDED = -16;
/** Multi-pin offset (half of 40px) */
const PIN_OFFSET_MULTI = -20;
const PIN_ANIMATION_MS = 100;
const ZOOM_ANIMATION_MS = 100;

// Slovakia default
const DEFAULT_CENTER: [number, number] = [19.5, 48.7];
const DEFAULT_ZOOM = 6;

const props = withDefaults(
  defineProps<{
    pins: MapPin[];
    /** Optional full items to render horizontal cards in multi-pin tooltip and "show all" */
    items?: EtnoItem[];
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
    /** When true (default), show mobile CTA in tooltip to open detail */
    showDetailCta?: boolean;
  }>(),
  {
    compact: false,
    pinStyle: "secondary",
    clusterStyle: "secondary",
    showZoomControls: true,
    cooperativeGestures: false,
    showDetailCta: true,
  },
);

const emit = defineEmits<{
  (e: "showAllInGrid", ids: string[]): void;
}>();

const router = useRouter();
const mapContainerRef = ref<HTMLDivElement | null>(null);
const map = ref<mapboxgl.Map | null>(null);
const markersRef = ref<mapboxgl.Marker[]>([]);
const tooltipPin = ref<MapPin | null>(null);
/** When set, tooltip shows list of items at same location (multi-pin) */
const tooltipMulti = ref<{ pins: MapPin[]; lng: number; lat: number } | null>(
  null,
);
const tooltipPos = ref({ x: 0, y: 0 });
/** When set, tooltip stays open until map click or second pin click (open detail) */
const pinnedPinId = ref<string | null>(null);
/** When set, multi-pin tooltip is pinned */
const pinnedMultiKey = ref<string | null>(null);
/** Desktop: when tooltip shows, pin turns blue (40px); click opens detail */
const showOpenDetailHint = ref(false);
const isMobile = useIsMobile();
/** Element that currently has desktop active style (blue 40px) for cleanup */
const desktopActivePinElRef = ref<HTMLElement | null>(null);

// Token from runtime env.js only (never inlined in bundle; env.js is generated from .env)
const token =
  typeof window !== "undefined"
    ? (window as unknown as { __VITE_MAPBOX_ACCESS_TOKEN__?: string })
        .__VITE_MAPBOX_ACCESS_TOKEN__
    : undefined;
const hasToken = Boolean(token?.trim());

/** Same location = multi-pin (white + count + plus) */
function getLocationKey(lng: number, lat: number): string {
  return `${Math.round(lng * 1e5)},${Math.round(lat * 1e5)}`;
}

interface Single {
  type: "single";
  pin: MapPin;
}
interface Multi {
  type: "multi";
  lng: number;
  lat: number;
  pins: MapPin[];
}
type LocationItem = Single | Multi;

/** Group pins by exact location: single or multi (no clustering). */
const displayItems = computed((): LocationItem[] => {
  const pins = props.pins;
  if (pins.length === 0) return [];
  const byLocation = new Map<string, MapPin[]>();
  for (const pin of pins) {
    const key = getLocationKey(pin.lng, pin.lat);
    if (!byLocation.has(key)) byLocation.set(key, []);
    byLocation.get(key)!.push(pin);
  }
  const result: LocationItem[] = [];
  byLocation.forEach((locationPins) => {
    if (locationPins.length === 1) {
      result.push({ type: "single", pin: locationPins[0] });
    } else {
      const lng = locationPins[0].lng;
      const lat = locationPins[0].lat;
      result.push({ type: "multi", lng, lat, pins: locationPins });
    }
  });
  return result;
});

function goToPin(pin: MapPin) {
  router.push({ name: "detail", params: { id: pin.id } });
}

function getItemForPin(pinId: string): EtnoItem | undefined {
  return props.items?.find((i) => i.id === pinId);
}

/** For multi-pin tooltip: pairs of pin + resolved item (when items prop provided). */
const tooltipMultiEntries = computed(() => {
  const multi = tooltipMulti.value;
  if (!multi) return [];
  return multi.pins.map((pin) => ({ pin, item: getItemForPin(pin.id) }));
});

function updateTooltipPosition() {
  const m = map.value;
  const multi = tooltipMulti.value;
  const pin = tooltipPin.value;
  const lngLat = multi
    ? [multi.lng, multi.lat]
    : pin
      ? [pin.lng, pin.lat]
      : null;
  if (!m || !lngLat || !mapContainerRef.value) return;

  const pt = m.project(lngLat as [number, number]);
  const gap = TOOLTIP_GAP_FROM_PIN;
  // Single: 40px pin; multi: 36px pin. Card top = bottom of circle + gap.
  const pinHalf = multi ? PIN_SIZE_MULTI / 2 : PIN_SIZE_EXPANDED / 2;
  const y = pt.y + pinHalf + gap;

  tooltipPos.value = { x: pt.x, y };
}

function expandPinEl(el: HTMLElement, _pin: MapPin) {
  el.classList.remove("h-7", "w-7", "h-8", "w-8");
  el.classList.add("h-10", "w-10");
  const iconWrap = el.querySelector(".pin-type-icon") as HTMLElement | null;
  if (iconWrap) {
    iconWrap.classList.remove("[&_svg]:h-3.5", "[&_svg]:w-3.5", "[&_svg]:h-4", "[&_svg]:w-4");
    iconWrap.classList.add("pin-expanded-icon", "[&_svg]:h-5", "[&_svg]:w-5");
  }
}

function applyDesktopActivePinStyle(el: HTMLElement) {
  const isError = el.dataset.pinError === "true";
  if (isError) {
    desktopActivePinElRef.value = el;
    return;
  }
  desktopActivePinElRef.value = el;
}

function removeDesktopActivePinStyle(
  el: HTMLElement | null,
  onAfter?: () => void,
) {
  if (!el) {
    onAfter?.();
    return;
  }
  // Remove any forced active background so pin returns to its media color
  if (desktopActivePinElRef.value === el) desktopActivePinElRef.value = null;
  onAfter?.();
}

function collapsePinEl(el: HTMLElement) {
  removeDesktopActivePinStyle(el, () => {
    el.classList.remove("h-10", "w-10");
    const isError = el.dataset.pinError === "true";
    if (isError) {
      el.classList.add("h-8", "w-8");
      el.innerHTML = MAP_PIN_SVG;
    } else {
      el.classList.add("h-8", "w-8");
      const iconWrap = el.querySelector(".pin-type-icon") as HTMLElement | null;
      if (iconWrap) {
        iconWrap.classList.remove(
          "pin-expanded-icon",
          "[&_svg]:h-5",
          "[&_svg]:w-5",
        );
        iconWrap.classList.add("[&_svg]:h-4", "[&_svg]:w-4");
      }
    }
  });
}

function applyActiveState() {
  const activePin = tooltipPin.value;
  const activeMulti = tooltipMulti.value;
  const activeMultiKey = activeMulti
    ? getLocationKey(activeMulti.lng, activeMulti.lat)
    : null;
  for (const marker of markersRef.value) {
    const el = marker.getElement() as HTMLElement;
    const pinId = el.dataset.pinId;
    const multiKey = el.dataset.multiKey;
    if (multiKey) {
      marker.setOffset([0, PIN_OFFSET_MULTI]);
      continue;
    }
    if (!pinId) continue;
    const pin = props.pins.find((p) => p.id === pinId);
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
  tooltipMulti.value = null;
  tooltipPin.value = pin;
  nextTick(() => {
    updateTooltipPosition();
    applyActiveState();
  });
}

function showMultiTooltip(pins: MapPin[], lng: number, lat: number) {
  tooltipPin.value = null;
  tooltipMulti.value = { pins, lng, lat };
  nextTick(() => {
    updateTooltipPosition();
    applyActiveState();
  });
}

function restoreTooltipToPinned() {
  const id = pinnedPinId.value;
  const multiKey = pinnedMultiKey.value;
  if (id) {
    tooltipMulti.value = null;
    tooltipPin.value = props.pins.find((p) => p.id === id) ?? null;
  } else if (multiKey) {
    const pins = props.pins.filter(
      (p) => getLocationKey(p.lng, p.lat) === multiKey,
    );
    tooltipPin.value = null;
    tooltipMulti.value = pins.length
      ? { pins, lng: pins[0].lng, lat: pins[0].lat }
      : null;
  } else {
    tooltipPin.value = null;
    tooltipMulti.value = null;
  }
  nextTick(() => {
    updateTooltipPosition();
    applyActiveState();
  });
}

function hideTooltip() {
  removeDesktopActivePinStyle(desktopActivePinElRef.value);
  showOpenDetailHint.value = false;
  tooltipPin.value = null;
  tooltipMulti.value = null;
  pinnedPinId.value = null;
  pinnedMultiKey.value = null;
  nextTick(applyActiveState);
}

watch(
  () => [tooltipPin.value, tooltipMulti.value],
  () => {
    removeDesktopActivePinStyle(desktopActivePinElRef.value);
    showOpenDetailHint.value = false;
    if (tooltipPin.value && !props.compact) {
      showOpenDetailHint.value = true;
    }
  },
);

watch(showOpenDetailHint, (visible) => {
  if (visible && !isMobile.value && tooltipPin.value && !tooltipMulti.value) {
    const pinId = tooltipPin.value.id;
    const marker = markersRef.value.find(
      (m) => (m.getElement() as HTMLElement).dataset.pinId === pinId,
    );
    if (marker) applyDesktopActivePinStyle(marker.getElement() as HTMLElement);
  } else if (!visible) {
    removeDesktopActivePinStyle(desktopActivePinElRef.value);
  }
});

const tooltipPositionStyle = computed(() => ({
  left: tooltipPos.value.x + "px",
  top: tooltipPos.value.y + "px",
  transform: "translate(-50%, 0)",
}));

const tooltipMediaType = computed<MediaType>(() => {
  const pin = tooltipPin.value;
  if (!pin) return "document";
  return getMediaType(pin.documentType);
});

const tooltipMediaIcon = computed(() => {
  const mediaType = tooltipMediaType.value;
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

const tooltipCollectionsCount = computed(() => {
  const pin = tooltipPin.value;
  if (!pin) return 0;
  return getCollectionsForItem(pin.id).length;
});

const tooltipDocumentsCount = computed(() => {
  const pin = tooltipPin.value;
  if (!pin) return 0;
  return getDocumentsForItem(pin.id).length;
});

const tooltipThumbnailClass = computed(() =>
  getThumbnailClassForMediaType(tooltipMediaType.value),
);

function getThumbnailClassForMediaType(mediaType: MediaType): string {
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
  m.fitBounds([sw, ne], {
    padding: 48,
    maxZoom: 14,
    duration: ZOOM_ANIMATION_MS,
  });
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

/** Placeholder cluster pin position (visible on map; clustering removed for now). */
const PLACEHOLDER_CLUSTER_LNG = 19.65;
const PLACEHOLDER_CLUSTER_LAT = 48.72;
const PLACEHOLDER_CLUSTER_COUNT = 5;

const MAP_PIN_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M128 16a88.1 88.1 0 0 0-88 88c0 75.3 80 132.17 83.41 134.55a8 8 0 0 0 9.18 0C136 236.17 216 179.3 216 104a88.1 88.1 0 0 0-88-88zm0 56a32 32 0 1 1-32 32 32 32 0 0 1 32-32z"/></svg>';

// Phosphor regular-weight paths (same as MediaTypeIcon / grid thumbnails)
function getMediaTypeIconSvg(mediaType: MediaType): string {
  const attrs =
    'xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 256 256"';
  const paths: Record<MediaType, string> = {
    image:
      "M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z",
    video:
      "M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z",
    audio:
      "M212.92,17.69a8,8,0,0,0-6.86-1.45l-128,32A8,8,0,0,0,72,56V166.08A36,36,0,1,0,88,196V110.25l112-28v51.83A36,36,0,1,0,216,164V24A8,8,0,0,0,212.92,17.69ZM52,216a20,20,0,1,1,20-20A20,20,0,0,1,52,216ZM88,93.75V62.25l112-28v31.5ZM180,184a20,20,0,1,1,20-20A20,20,0,0,1,180,184Z",
    pdf: "M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,0,0,1,0-16h64A8,8,0,0,1,168,168Z",
    document:
      "M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,0,0,1,0-16h64A8,8,0,0,1,168,168Z",
  };
  const d = paths[mediaType] ?? paths.document;
  return `<svg ${attrs}><path d="${d}"/></svg>`;
}

function createPinElement(pin: MapPin): HTMLButtonElement {
  const el = document.createElement("button");
  el.type = "button";
  const isError = props.pinStyle === "error";
  const mediaType = getMediaType(pin.documentType);
  const pinBg = isError
    ? "bg-error"
    : mediaType === "image"
      ? "bg-purple-600"
      : mediaType === "video"
        ? "bg-secondary-700"
        : mediaType === "audio"
          ? "bg-green-600"
          : "bg-amber-500";
  el.className = isError
    ? "absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-full cursor-pointer items-center justify-center rounded-[19px] border border-white bg-error shadow-md transition-transform duration-100 ease-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 mapboxgl-marker-pin text-white overflow-hidden"
    : `absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-full cursor-pointer items-center justify-center rounded-full border-2 border-white ${pinBg} shadow-md transition-transform duration-100 ease-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 mapboxgl-marker-pin overflow-hidden text-white`;
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
      "pin-type-icon flex items-center justify-center [&_svg]:h-4 [&_svg]:w-4 [&_svg]:transition-all [&_svg]:duration-100 [&_svg]:ease-out";
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
    const isPinnedAndThisPin =
      pinnedPinId.value === pin.id && tooltipPin.value?.id === pin.id;
    const isHintVisibleAndThisPin =
      tooltipPin.value?.id === pin.id && showOpenDetailHint.value;
    // Mobile: only CTA in tooltip opens detail. Desktop: second tap or hover-then-click on pill opens detail.
    const shouldOpenDetail =
      !isMobile.value && (isPinnedAndThisPin || isHintVisibleAndThisPin);
    if (shouldOpenDetail) {
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

const PH_PLUS_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"/></svg>';

function createMultiPinElement(
  lng: number,
  lat: number,
  pins: MapPin[],
): HTMLButtonElement {
  const el = document.createElement("button");
  el.type = "button";
  const key = getLocationKey(lng, lat);
  el.dataset.multiKey = key;
  // Multi-pin: fixed 40px blue pill with count; no scale animation.
  el.className =
    "absolute z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-primary-500 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-primary-500 mapboxgl-marker-multi";
  const countSpan = document.createElement("span");
  countSpan.className = "multi-count text-xs font-bold leading-none";
  countSpan.textContent = String(pins.length);
  el.appendChild(countSpan);
  el.setAttribute("aria-label", `${pins.length} položiek na rovnakom mieste`);
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    pinnedPinId.value = null;
    pinnedMultiKey.value = key;
    showMultiTooltip(pins, lng, lat);
  });
  return el;
}

function createPlaceholderClusterElement(count: number): HTMLButtonElement {
  const el = document.createElement("button");
  el.type = "button";
  el.className =
    "absolute z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-default items-center justify-center rounded-full border-2 border-white bg-neutral-700 text-base font-bold text-white shadow-md focus:outline-none mapboxgl-marker-cluster";
  el.setAttribute("aria-label", `Klastre ${count} bodov (placeholder)`);
  el.textContent = String(count);
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
      const el = createMultiPinElement(item.lng, item.lat, item.pins);
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([item.lng, item.lat])
        .setOffset([0, PIN_OFFSET_MULTI])
        .addTo(m);
      newMarkers.push(marker);
    }
  }
  const placeholderCluster = new mapboxgl.Marker({
    element: createPlaceholderClusterElement(PLACEHOLDER_CLUSTER_COUNT),
  })
    .setLngLat([PLACEHOLDER_CLUSTER_LNG, PLACEHOLDER_CLUSTER_LAT])
    .addTo(m);
  newMarkers.push(placeholderCluster);
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
    // Right-panel compact map: no pan/zoom; user must open fullscreen to interact
    if (props.compact) {
      mapInstance.dragPan.disable();
      mapInstance.scrollZoom.disable();
      mapInstance.doubleClickZoom.disable();
      mapInstance.touchZoomRotate.disable();
      // Also remove grab/hand cursor in compact (detail right panel) map
      mapInstance.getCanvas().style.cursor = "default";
    }
  });
  mapInstance.on("move", updateTooltipPosition);
  mapInstance.on("zoom", updateTooltipPosition);
  mapInstance.on("click", () => {
    if (tooltipPin.value || tooltipMulti.value) {
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

watch(
  () => props.compact,
  (isCompact) => {
    const m = map.value;
    if (!m || !m.isStyleLoaded()) return;
    if (isCompact) {
      m.dragPan.disable();
      m.scrollZoom.disable();
      m.doubleClickZoom.disable();
      m.touchZoomRotate.disable();
      m.getCanvas().style.cursor = "default";
    } else {
      m.dragPan.enable();
      m.scrollZoom.enable();
      m.doubleClickZoom.enable();
      m.touchZoomRotate.enable();
      m.getCanvas().style.cursor = "";
    }
  },
);

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
          <!-- Thumbnail at top of tooltip – colored by media type, always shows icon -->
          <div
            v-if="tooltipPin.thumbnailUrl"
            class="h-28 w-full overflow-hidden rounded-t-xl"
            :class="tooltipThumbnailClass"
          >
            <img
              :src="tooltipPin.thumbnailUrl"
              :alt="tooltipPin.title"
              class="h-full w-full object-cover"
            />
          </div>
          <div
            v-else
            class="h-28 w-full overflow-hidden rounded-t-xl"
            :class="tooltipThumbnailClass"
          >
            <div
              class="flex h-full w-full flex-col items-center justify-center gap-1"
            >
              <MediaTypeIcon :media-type="tooltipMediaType" class="h-10 w-10" />
            </div>
          </div>
          <div class="px-3 pt-3 pb-2">
            <!-- Shared media meta row (type chip only) -->
            <MediaMetaRow
              :document-type="tooltipPin.documentType"
              :media-type="tooltipMediaType"
              size="sm"
            />
            <!-- Location and year above title -->
            <div
              v-if="tooltipPin.locationDisplay || tooltipPin.yearDisplay"
              class="mt-1 mb-1.5 line-clamp-1 text-xs text-muted-foreground"
            >
              <span class="truncate">
                {{
                  [tooltipPin.locationDisplay, tooltipPin.yearDisplay]
                    .filter(Boolean)
                    .join(", ")
                }}
              </span>
            </div>
            <h3
              class="mb-1.5 line-clamp-3 text-sm font-semibold leading-tight text-foreground"
            >
              {{ tooltipPin.title }}
            </h3>
            <!-- Author (left) + collection/document counts (right) -->
            <div
              v-if="
                tooltipPin.authorDisplay ||
                tooltipCollectionsCount > 0 ||
                tooltipDocumentsCount > 0
              "
              class="mb-1.5 flex items-center justify-between gap-2 text-xs text-muted-foreground"
            >
              <span v-if="tooltipPin.authorDisplay" class="min-w-0 truncate">
                {{ tooltipPin.authorDisplay }}
              </span>
              <span class="flex shrink-0 items-center gap-2 text-foreground/80">
                <span
                  v-if="tooltipCollectionsCount > 0"
                  class="flex items-center gap-1"
                >
                  <PhFolder class="h-4 w-4 shrink-0" aria-hidden />
                  <span>{{ tooltipCollectionsCount }}</span>
                </span>
                <span
                  v-if="tooltipDocumentsCount > 0"
                  class="flex items-center gap-1"
                >
                  <PhFileText class="h-4 w-4 shrink-0" aria-hidden />
                  <span>{{ tooltipDocumentsCount }}</span>
                </span>
              </span>
            </div>
            <!-- Mobile: CTA to open detail (disabled when showDetailCta is false, e.g. fullscreen detail map) -->
            <Button
              v-if="isMobile && showDetailCta"
              variant="default"
              size="sm"
              class="mt-1.5 w-full"
              @click="goToPin(tooltipPin)"
            >
              Open detail
            </Button>
          </div>
        </div>
      </Transition>

      <!-- Multi-pin tooltip: unified horizontal cards (same as search results) + "show all" when >3 -->
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
          v-if="tooltipMulti && !compact"
          class="pointer-events-auto absolute z-20 w-[280px] overflow-hidden rounded-xl border border-border bg-background shadow-xl"
          :style="tooltipPositionStyle"
        >
          <div
            class="absolute left-1/2 bottom-full h-0 w-0 -translate-x-1/2 border-8 border-transparent"
            style="border-bottom-color: hsl(var(--background))"
          />
          <ScrollArea class="max-h-[320px]">
            <div class="flex w-[280px] flex-col">
              <template
                v-for="{ pin, item } in tooltipMultiEntries"
                :key="pin.id"
              >
                <ItemHorizontalCard v-if="item" :item="item" :compact="true" />
                <button
                  v-else
                  type="button"
                  class="flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left text-sm font-medium hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary-500"
                  @click="goToPin(pin)"
                >
                  {{ pin.title }}
                </button>
              </template>
            </div>
          </ScrollArea>
          <div
            v-if="tooltipMulti.pins.length >= 3"
            class="border-t border-border p-2"
          >
            <Button
              variant="default"
              size="sm"
              class="w-full"
              @click="
                () => {
                  hideTooltip();
                  emit(
                    'showAllInGrid',
                    tooltipMulti.pins.map((p) => p.id),
                  );
                }
              "
            >
              Zobraziť iba tieto ({{ tooltipMulti.pins.length }})
            </Button>
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
