<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import mapboxgl from 'mapbox-gl'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PhMagnifyingGlassPlus, PhMagnifyingGlassMinus, PhCrosshair, PhCaretRight, PhSquaresFour } from '@phosphor-icons/vue'
import type { MapPin } from '@/data/mockData'

const MAPBOX_STYLE = 'mapbox://styles/metafori/cmmm7nqgh009r01sb26yj1pkk'
const TOOLTIP_WIDTH = 280
const TOOLTIP_HEIGHT_APPROX = 280
const TOOLTIP_MARGIN = 16

// Slovakia default
const DEFAULT_CENTER: [number, number] = [19.5, 48.7]
const DEFAULT_ZOOM = 6

const props = withDefaults(
  defineProps<{
    pins: MapPin[]
    /** Compact mode for detail panel (single pin, no controls) */
    compact?: boolean
  }>(),
  { compact: false }
)

const router = useRouter()
const mapContainerRef = ref<HTMLDivElement | null>(null)
const map = ref<mapboxgl.Map | null>(null)
const markersRef = ref<mapboxgl.Marker[]>([])
const tooltipPin = ref<MapPin | null>(null)
const tooltipPos = ref({ x: 0, y: 0 })

const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string | undefined
const hasToken = Boolean(token?.trim())

// Grid-based clustering: same cell = same cluster
const LNG_MIN = 17
const LNG_MAX = 22.5
const LAT_MIN = 47.5
const LAT_MAX = 49.6

function getCellKey(lng: number, lat: number) {
  const gx = Math.floor(((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * 20)
  const gy = Math.floor(((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * 20)
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

function updateTooltipPosition() {
  const m = map.value
  const pin = tooltipPin.value
  if (!m || !pin || !mapContainerRef.value) return
  const pt = m.project([pin.lng, pin.lat])
  const rect = mapContainerRef.value.getBoundingClientRect()
  const W = rect.width
  const H = rect.height
  const pad = TOOLTIP_MARGIN
  const halfW = TOOLTIP_WIDTH / 2
  let x = pt.x
  let y = pt.y - 24 // above pin
  if (x < halfW + pad) x = halfW + pad
  if (x > W - halfW - pad) x = W - halfW - pad
  if (y < pad) y = pt.y + 16
  if (y + TOOLTIP_HEIGHT_APPROX > H - pad) y = H - TOOLTIP_HEIGHT_APPROX - pad
  tooltipPos.value = { x, y }
}

function showTooltip(pin: MapPin) {
  tooltipPin.value = pin
  updateTooltipPosition()
}

function hideTooltip() {
  tooltipPin.value = null
}

const tooltipPositionStyle = computed(() => ({
  left: tooltipPos.value.x + 'px',
  top: tooltipPos.value.y + 'px',
  transform: 'translate(-50%, 0)',
}))

function zoomIn() {
  map.value?.zoomIn()
}

function zoomOut() {
  map.value?.zoomOut()
}

function fitBounds() {
  const m = map.value
  const pins = props.pins
  if (!m || pins.length === 0) return
  if (pins.length === 1) {
    m.flyTo({ center: [pins[0].lng, pins[0].lat], zoom: 12 })
    return
  }
  const lngs = pins.map((p) => p.lng)
  const lats = pins.map((p) => p.lat)
  const sw: [number, number] = [Math.min(...lngs), Math.min(...lats)]
  const ne: [number, number] = [Math.max(...lngs), Math.max(...lats)]
  m.fitBounds([sw, ne], { padding: 48, maxZoom: 14 })
}

function focusCluster(lng: number, lat: number) {
  map.value?.flyTo({ center: [lng, lat], zoom: (map.value?.getZoom() ?? 10) + 1 })
}

function createPinElement(pin: MapPin): HTMLButtonElement {
  const el = document.createElement('button')
  el.type = 'button'
  el.className =
    'absolute z-10 h-7 w-7 -translate-x-1/2 -translate-y-full cursor-pointer rounded-full border-2 border-white bg-primary-500 shadow-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 mapboxgl-marker-pin'
  el.setAttribute('aria-label', pin.title)
  el.addEventListener('click', (e) => {
    e.stopPropagation()
    showTooltip(pin)
  })
  return el
}

function createClusterElement(count: number, lng: number, lat: number, pins: MapPin[]): HTMLButtonElement {
  const el = document.createElement('button')
  el.type = 'button'
  el.className =
    'absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-secondary-500 text-xs font-bold text-white shadow-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500 mapboxgl-marker-cluster'
  el.setAttribute('aria-label', `Klastre ${count} bodov`)
  el.textContent = String(count)
  el.addEventListener('click', (e) => {
    e.stopPropagation()
    focusCluster(lng, lat)
  })
  return el
}

function syncMarkers() {
  const m = map.value
  if (!m) return
  markersRef.value.forEach((marker) => marker.remove())
  markersRef.value = []
  const newMarkers: mapboxgl.Marker[] = []
  for (const item of displayItems.value) {
    if (item.type === 'single') {
      const el = createPinElement(item.pin)
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([item.pin.lng, item.pin.lat])
        .setOffset([0, -14])
        .addTo(m)
      newMarkers.push(marker)
    } else {
      const el = createClusterElement(item.count, item.lng, item.lat, item.pins)
      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([item.lng, item.lat])
        .addTo(m)
      newMarkers.push(marker)
    }
  }
  markersRef.value = newMarkers
}

function initMap() {
  if (!mapContainerRef.value || !hasToken) return
  mapboxgl.accessToken = token!
  const mapInstance = new mapboxgl.Map({
    container: mapContainerRef.value,
    style: MAPBOX_STYLE,
    center: DEFAULT_CENTER,
    zoom: DEFAULT_ZOOM,
    cooperativeGestures: true,
  })
  map.value = mapInstance
  mapInstance.on('load', () => {
    mapInstance.setProjection('mercator')
    syncMarkers()
    if (props.pins.length === 1) {
      mapInstance.flyTo({ center: [props.pins[0].lng, props.pins[0].lat], zoom: 12 })
    } else if (props.pins.length > 1) {
      fitBounds()
    }
  })
  mapInstance.on('move', updateTooltipPosition)
  mapInstance.on('zoom', updateTooltipPosition)
}

watch(
  () => props.pins,
  (newPins) => {
    const m = map.value
    if (!m || !m.isStyleLoaded()) return
    if (newPins.length === 1) {
      m.flyTo({ center: [newPins[0].lng, newPins[0].lat], zoom: 12 })
    } else if (newPins.length > 1) {
      fitBounds()
    }
    syncMarkers()
  },
  { deep: true }
)

watch(displayItems, () => {
  if (map.value?.isStyleLoaded()) syncMarkers()
})

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  markersRef.value.forEach((marker) => marker.remove())
  markersRef.value = []
  map.value?.remove()
  map.value = null
})
</script>

<template>
  <div class="relative h-full w-full overflow-hidden bg-muted">
    <!-- No token: show placeholder -->
    <div
      v-if="!hasToken"
      class="flex h-full w-full items-center justify-center"
      style="background: linear-gradient(180deg, #e8f0e8 0%, #d0e0d0 50%, #c5d8c5 100%);"
    >
      <p class="text-sm text-muted-foreground">Nastavte VITE_MAPBOX_ACCESS_TOKEN v .env</p>
    </div>

    <!-- Mapbox map -->
    <template v-else>
      <div ref="mapContainerRef" class="absolute inset-0 h-full w-full" />

      <!-- Tooltip overlay (same as before) -->
      <div
        v-if="tooltipPin && !compact"
        class="pointer-events-auto absolute z-20 w-[280px] overflow-hidden rounded-xl border border-border bg-background shadow-xl"
        :style="tooltipPositionStyle"
      >
        <div class="h-16 w-full shrink-0 bg-muted">
          <div class="flex h-full w-full items-center justify-center text-muted-foreground">
            <PhSquaresFour class="h-6 w-6" />
          </div>
        </div>
        <div class="p-2.5">
          <h3 class="mb-1 line-clamp-3 text-sm font-semibold leading-tight text-foreground">
            {{ tooltipPin.title }}
          </h3>
          <div class="mb-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <PhSquaresFour class="h-3 w-3 shrink-0" />
            <span class="truncate">{{ tooltipPin.authorDisplay ?? '—' }}</span>
          </div>
          <Badge variant="secondary" class="mb-2 rounded-full text-xs">
            {{ tooltipPin.documentType }}
          </Badge>
          <Button
            size="sm"
            class="w-full gap-1.5 rounded-lg bg-primary-500 text-primary-foreground hover:bg-primary-600 text-sm font-semibold"
            @click="goToPin(tooltipPin); hideTooltip()"
          >
            Zobrazit polozku
            <PhCaretRight class="h-4 w-4" />
          </Button>
        </div>
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

      <!-- Map controls -->
      <div
        v-if="!compact && pins.length > 0 && hasToken"
        class="absolute right-2 bottom-2 z-10 flex flex-col gap-1 rounded-lg border border-border bg-background/95 p-1 shadow-sm"
      >
        <Button variant="ghost" size="icon" class="h-8 w-8" aria-label="Priblížiť" @click="zoomIn">
          <PhMagnifyingGlassPlus class="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" class="h-8 w-8" aria-label="Oddialiť" @click="zoomOut">
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
