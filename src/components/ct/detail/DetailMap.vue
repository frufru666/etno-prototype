<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const props = withDefaults(
  defineProps<{
    lat: number
    lng: number
    /** Compact mode for right panel; false = full height (e.g. fullscreen) */
    compact?: boolean
  }>(),
  { compact: false }
)

const containerRef = ref<HTMLDivElement | null>(null)
let map: mapboxgl.Map | null = null
let marker: mapboxgl.Marker | null = null

const token = typeof import.meta !== 'undefined' && import.meta.env?.VITE_MAPBOX_ACCESS_TOKEN

function initMap() {
  if (!containerRef.value || !token) return
  if (map) {
    marker?.remove()
    map.remove()
    map = null
    marker = null
  }
  mapboxgl.accessToken = token
  map = new mapboxgl.Map({
    container: containerRef.value,
    style: 'mapbox://styles/mapbox/light-v11',
    center: [props.lng, props.lat],
    zoom: 12,
  })
  const el = document.createElement('div')
  el.className = 'mapboxgl-marker'
  el.style.cssText = `
    width: 32px; height: 32px;
    border: 2px solid white; border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg); box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  `
  marker = new mapboxgl.Marker({ element: el })
    .setLngLat([props.lng, props.lat])
    .addTo(map)
}

onMounted(() => {
  initMap()
})
onUnmounted(() => {
  marker?.remove()
  marker = null
  if (map) {
    map.remove()
    map = null
  }
})
watch(
  () => [props.lat, props.lng],
  () => {
    if (map && marker) {
      marker.setLngLat([props.lng, props.lat])
      map.setCenter([props.lng, props.lat])
    } else if (containerRef.value && token) initMap()
  }
)
</script>

<template>
  <div class="relative h-full w-full min-h-[200px]">
    <template v-if="token">
      <div ref="containerRef" class="absolute inset-0 z-0" />
    </template>
    <div
      v-else
      class="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-sm"
    >
      Mapa (VITE_MAPBOX_ACCESS_TOKEN)
    </div>
  </div>
</template>
