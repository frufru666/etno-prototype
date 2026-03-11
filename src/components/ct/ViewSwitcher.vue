<script setup lang="ts">
defineProps<{
  modelValue: 'map' | 'list'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: 'map' | 'list'): void
}>()
</script>

<template>
  <div
    class="fixed left-1/2 z-40 flex h-12 w-[min(371px,calc(100vw-24px))] -translate-x-1/2 items-center rounded-full border border-ct-neutral-200 bg-primary-500 px-2 py-1.5"
    style="bottom: calc(16px + env(safe-area-inset-bottom, 0px))"
    role="tablist"
    aria-label="Map or list view"
  >
    <button
      type="button"
      class="flex-1 h-full rounded-full py-2 text-base font-bold leading-4 tracking-tight align-bottom transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-500"
      :class="modelValue === 'map' ? 'bg-view-switcher-active text-primary-500' : 'bg-transparent text-white/90 hover:text-white'"
      role="tab"
      :aria-selected="modelValue === 'map'"
      @click="emit('update:modelValue', 'map')"
    >
      Map
    </button>
    <button
      type="button"
      class="flex-1 h-full rounded-full py-2 text-base font-bold leading-4 tracking-tight align-bottom transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-500"
      :class="modelValue === 'list' ? 'bg-view-switcher-active text-primary-500' : 'bg-transparent text-white/90 hover:text-white'"
      role="tab"
      :aria-selected="modelValue === 'list'"
      @click="emit('update:modelValue', 'list')"
    >
      Item List
    </button>
  </div>
</template>
