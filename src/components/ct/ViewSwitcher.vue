<script setup lang="ts">
defineProps<{
  modelValue: "map" | "list";
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: "map" | "list"): void;
}>();
</script>

<template>
  <div
    class="fixed left-1/2 z-40 flex h-10 w-[264px] -translate-x-1/2 items-center justify-center rounded-xl border-0 bg-primary-500 px-2 py-1.5"
    style="bottom: calc(8px + env(safe-area-inset-bottom, 0px))"
    role="tablist"
    aria-label="Map or list view"
  >
    <button
      type="button"
      class="flex-1 h-full rounded-lg border-0 py-2 text-sm font-bold leading-[8px] tracking-tight align-middle transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-500"
      :class="
        modelValue === 'map'
          ? 'bg-view-switcher-active text-primary-500'
          : 'bg-transparent text-white/90 hover:text-white'
      "
      role="tab"
      :aria-selected="modelValue === 'map'"
      @click="emit('update:modelValue', 'map')"
    >
      Map
    </button>
    <button
      type="button"
      class="flex-1 h-full rounded-lg border-0 py-2 text-sm font-bold leading-[8px] tracking-tight align-middle transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-500"
      :class="
        modelValue === 'list'
          ? 'bg-view-switcher-active text-primary-500'
          : 'bg-transparent text-white/90 hover:text-white'
      "
      role="tab"
      :aria-selected="modelValue === 'list'"
      @click="emit('update:modelValue', 'list')"
    >
      Item List
    </button>
  </div>
</template>
