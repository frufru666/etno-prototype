<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ZoomIn, ZoomOut, Locate, ChevronRight, LayoutGrid } from 'lucide-vue-next'
import type { MapPin } from '@/data/mockData'

// Slovakia map: outline SVG (public domain)
const SLOVAKIA_MAP_URL = 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Slovakia_Outline.svg'

const props = withDefaults(
  defineProps<{
    pins: MapPin[]
    /** Compact mode for detail panel (single pin, no controls) */
    compact?: boolean
  }>(),
  { compact: false }
)

const router = useRouter()
const containerRef = ref<HTMLDivElement | null>(null)
const zoomLevel = ref(1)
const centerLng = ref(19.5)
const centerLat = ref(48.7)
const tooltipPin = ref<MapPin | null>(null)
const tooltipPos = ref({ x: 0, y: 0 })

// Slovakia approximate bounds
const LNG_MIN = 17
const LNG_MAX = 22.5
const LAT_MIN = 47.5
const LAT_MAX = 49.6

const baseScale = 80 // pixels per degree at zoom 1
const scale = computed(() => baseScale * Math.pow(1.5, zoomLevel.value - 1))

function lngLatToPixel(lng: number, lat: number) {
  if (!containerRef.value) return { x: 0, y: 0 }
  const W = containerRef.value.clientWidth
  const H = containerRef.value.clientHeight
  const x = (lng - centerLng.value) * scale.value + W / 2
  const y = (centerLat.value - lat) * scale.value + H / 2
  return { x, y }
}

// Grid-based clustering: same cell = same cluster
const GRID_SIZE = 40
function getCellKey(lng: number, lat: number) {
  const gx = Math.floor((lng - LNG_MIN) / (LNG_MAX - LNG_MIN) * 20)
  const gy = Math.floor((LAT_MAX - lat) / (LAT_MAX - LAT_MIN) * 20)
  return `${gx},${gy}`
}

interface Cluster {
  type: 'cluster'
  count: number
  lng: number
  lat: number
  pins: MapPin[]
}
interface Single {
  type: 'single'
  pin: MapPin
}

const displayItems = computed(() => {
  const pins = props.pins
  if (pins.length === 0) return []
  if (pins.length === 1 || props.compact) {
    return pins.map((pin): Single => ({ type: 'single', pin }))
  }
  const cells = new Map<string, MapPin[]>()
  for (const pin of pins) {
    const key = getCellKey(pin.lng, pin.lat)
    if (!cells.has(key)) cells.set(key, [])
    cells.get(key)!.push(pin)
  }
  const result: (Cluster | Single)[] = []
  cells.forEach((cellPins) => {
    if (cellPins.length > 1) {
      const lng = cellPins.reduce((s, p) => s + p.lng, 0) / cellPins.length
      const lat = cellPins.reduce((s, p) => s + p.lat, 0) / cellPins.length
      result.push({ type: 'cluster', count: cellPins.length, lng, lat, pins: cellPins })
    } else {
      result.push({ type: 'single', pin: cellPins[0] })
    }
  })
  return result
})

function goToPin(pin: MapPin) {
  router.push({ name: 'detail', params: { id: pin.id } })
}

function showTooltip(pin: MapPin, event: MouseEvent) {
  tooltipPin.value = pin
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  const container = containerRef.value?.getBoundingClientRect()
  if (container) {
    tooltipPos.value = {
      x: rect.left - container.left + rect.width / 2,
      y: rect.top - container.top - 8,
    }
  }
}

function hideTooltip() {
  tooltipPin.value = null
}

function zoomIn() {
  zoomLevel.value = Math.min(4, zoomLevel.value + 1)
}

function zoomOut() {
  zoomLevel.value = Math.max(0.5, zoomLevel.value - 1)
}

function fitBounds() {
  if (props.pins.length === 0) return
  const lngs = props.pins.map((p) => p.lng)
  const lats = props.pins.map((p) => p.lat)
  centerLng.value = (Math.min(...lngs) + Math.max(...lngs)) / 2
  centerLat.value = (Math.min(...lats) + Math.max(...lats)) / 2
  if (props.pins.length > 1) {
    const spanLng = Math.max(0.5, Math.max(...lngs) - Math.min(...lngs))
    const spanLat = Math.max(0.3, Math.max(...lats) - Math.min(...lats))
    const span = Math.max(spanLng, spanLat)
    zoomLevel.value = Math.max(0.5, 2 - Math.log2(span))
  }
}

function focusCluster(lng: number, lat: number) {
  centerLng.value = lng
  centerLat.value = lat
  zoomIn()
}

watch(
  () => props.pins,
  (newPins) => {
    if (newPins.length === 1) {
      centerLng.value = newPins[0].lng
      centerLat.value = newPins[0].lat
      zoomLevel.value = 2
    } else if (newPins.length > 1) {
      fitBounds()
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="relative h-full w-full overflow-hidden rounded-lg bg-muted">
    <div
      ref="containerRef"
      class="absolute inset-0 bg-[#e8ebe8]"
      :style="{
        backgroundImage: `url(${SLOVAKIA_MAP_URL})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }"
    >
      <!-- Pins / clusters -->
      <template v-for="(item, i) in displayItems" :key="i">
        <template v-if="item.type === 'single'">
          <button
            type="button"
            class="absolute z-10 h-7 w-7 -translate-x-1/2 -translate-y-full cursor-pointer rounded-full border-2 border-white bg-primary-500 shadow-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            :style="{
              left: lngLatToPixel(item.pin.lng, item.pin.lat).x + 'px',
              top: lngLatToPixel(item.pin.lng, item.pin.lat).y + 'px',
            }"
            :aria-label="item.pin.title"
            @click="showTooltip(item.pin, $event)"
          />
        </template>
        <template v-else>
          <button
            type="button"
            class="absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-secondary-500 text-xs font-bold text-white shadow-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500"
            :style="{
              left: lngLatToPixel(item.lng, item.lat).x + 'px',
              top: lngLatToPixel(item.lng, item.lat).y + 'px',
            }"
            :aria-label="`Klastre ${item.count} bodov`"
            @click="focusCluster(item.lng, item.lat)"
          >
            {{ item.count }}
          </button>
        </template>
      </template>

      <!-- Tooltip: wireframe style (image, title, author, tag, CTA, pointer) -->
      <div
        v-if="tooltipPin && !compact"
        class="absolute z-20 w-[280px] overflow-hidden rounded-xl border border-border bg-background shadow-xl"
        :style="{
          left: tooltipPos.x + 'px',
          top: tooltipPos.y + 'px',
          transform: 'translate(-50%, calc(-100% - 12px))',
        }"
      >
        <!-- Image placeholder (top ~40%) -->
        <div class="aspect-[4/3] w-full shrink-0 bg-muted">
          <div class="flex h-full w-full items-center justify-center text-muted-foreground">
            <LayoutGrid class="h-10 w-10" />
          </div>
        </div>
        <div class="p-3">
          <h3 class="mb-1.5 line-clamp-3 text-base font-bold leading-tight text-foreground">
            {{ tooltipPin.title }}
          </h3>
          <div class="mb-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <LayoutGrid class="h-3.5 w-3.5 shrink-0" />
            <span class="truncate">{{ tooltipPin.authorDisplay ?? '—' }}</span>
          </div>
          <Badge variant="secondary" class="mb-3 rounded-full text-xs">
            {{ tooltipPin.documentType }}
          </Badge>
          <Button
            size="sm"
            class="w-full gap-1.5 rounded-lg bg-primary-500 text-primary-foreground hover:bg-primary-600"
            @click="goToPin(tooltipPin); hideTooltip()"
          >
            Zobrazit polozku
            <ChevronRight class="h-4 w-4" />
          </Button>
        </div>
        <!-- Downward triangle pointer (matches card background) -->
        <div
          class="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-8 border-transparent"
          style="border-top-color: hsl(var(--background));"
        />
        <button
          type="button"
          class="absolute right-2 top-2 rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Zavrieť"
          @click="hideTooltip"
        >
          ×
        </button>
      </div>
    </div>

    <!-- Map controls -->
    <div
      v-if="!compact && pins.length > 0"
      class="absolute right-2 top-2 z-10 flex flex-col gap-1 rounded-lg border border-border bg-background/95 p-1 shadow-sm"
    >
      <Button
        variant="ghost"
        size="icon"
        class="h-8 w-8"
        aria-label="Priblížiť"
        @click="zoomIn"
      >
        <ZoomIn class="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        class="h-8 w-8"
        aria-label="Oddialiť"
        @click="zoomOut"
      >
        <ZoomOut class="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        class="h-8 w-8"
        aria-label="Zobraziť všetky body"
        @click="fitBounds"
      >
        <Locate class="h-4 w-4" />
      </Button>
    </div>
  </div>
</template>
