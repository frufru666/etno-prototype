<script setup lang="ts">
defineProps<{
  id: string
}>()
</script>

<template>
  <span
    class="inline-flex items-center rounded-full bg-primary-100 px-2 py-1 font-mono text-xs font-semibold text-primary-500"
  >
    {{ id }}
  </span>
</template>

