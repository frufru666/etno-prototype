<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { MapPin } from '@/data/mockData'

const props = withDefaults(
  defineProps<{
    pins: MapPin[]
    /** When false, show placeholder (no token or disabled) */
    enabled?: boolean
  }>(),
  { enabled: true }
)

const router = useRouter()
const containerRef = ref<HTMLDivElement | null>(null)
let map: mapboxgl.Map | null = null
let markers: mapboxgl.Marker[] = []

const token = typeof import.meta !== 'undefined' && import.meta.env?.VITE_MAPBOX_ACCESS_TOKEN

function initMap() {
  if (!containerRef.value || !token || !props.enabled) return
  if (map) {
    map.remove()
    map = null
    markers = []
  }
  mapboxgl.accessToken = token
  map = new mapboxgl.Map({
    container: containerRef.value,
    style: 'mapbox://styles/mapbox/light-v11',
    center: [19.5, 48.7],
    zoom: 7,
  })
  map.addControl(new mapboxgl.NavigationControl(), 'top-right')
  updateMarkers()
}

function updateMarkers() {
  if (!map || !token) return
  markers.forEach((m) => m.remove())
  markers = []
  if (props.pins.length === 0) return
  const bounds = new mapboxgl.LngLatBounds()
  for (const pin of props.pins) {
    const el = document.createElement('button')
    el.type = 'button'
    el.className = 'mapboxgl-marker'
    el.setAttribute('aria-label', pin.title)
    el.style.cssText = `
      width: 28px; height: 28px; background: #1A62FF;
      border: 2px solid white; border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg); cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    `
    const marker = new mapboxgl.Marker({ element: el })
      .setLngLat([pin.lng, pin.lat])
      .setPopup(
        new mapboxgl.Popup({ offset: 20 }).setHTML(
          `<div style="padding:10px 12px;min-width:180px;">
            <div style="font-size:12px;font-weight:600;color:hsl(var(--muted-foreground));margin-bottom:4px;">${pin.documentType}</div>
            <div style="font-size:14px;font-weight:600;margin-bottom:8px;">${pin.title}</div>
            <button data-id="${pin.id}" class="detail-link" style="
              width:100%;padding:6px 0;background:#1A62FF;color:white;border:none;border-radius:6px;
              font-size:12px;font-weight:600;cursor:pointer;
            ">Detail dokumentu →</button>
          </div>`
        )
      )
      .addTo(map)
    marker.getElement().addEventListener('click', () => {
      router.push({ name: 'detail', params: { id: pin.id } })
    })
    marker.getPopup().on('open', () => {
      const popupEl = marker.getPopup().getElement()
      popupEl?.querySelector('.detail-link')?.addEventListener('click', (e) => {
        e.preventDefault()
        router.push({ name: 'detail', params: { id: pin.id } })
      })
    })
    markers.push(marker)
    bounds.extend([pin.lng, pin.lat])
  }
  if (props.pins.length > 1) {
    map.fitBounds(bounds, { padding: 50, maxZoom: 12, duration: 500 })
  } else if (props.pins.length === 1) {
    map.setCenter([props.pins[0].lng, props.pins[0].lat])
    map.setZoom(11)
  }
}

onMounted(() => {
  initMap()
})
onUnmounted(() => {
  markers.forEach((m) => m.remove())
  markers = []
  if (map) {
    map.remove()
    map = null
  }
})
watch(
  () => [props.pins, props.enabled],
  () => {
    if (map && token) updateMarkers()
    else if (containerRef.value && token && props.enabled) initMap()
  },
  { deep: true }
)
</script>

<template>
  <div class="relative h-full w-full">
    <template v-if="token && enabled">
      <div ref="containerRef" class="absolute inset-0 z-0" />
    </template>
    <div
      v-else
      class="absolute inset-0 flex items-center justify-center bg-neutral-200 text-muted-foreground text-sm"
    >
      Mapa (nastavte VITE_MAPBOX_ACCESS_TOKEN)
    </div>
  </div>
</template>
