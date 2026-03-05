<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-vue-next'

withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
    inputClass?: string
  }>(),
  { placeholder: 'Search in collection', inputClass: '' }
)

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="relative">
    <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
    <Input
      :model-value="modelValue"
      type="search"
      class="h-9 rounded-lg pl-9 pr-8 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-primary-500 [&::-webkit-search-cancel-button]:hidden"
      :class="inputClass"
      :placeholder="placeholder"
      aria-label="Search"
      @update:model-value="$emit('update:modelValue', $event ?? '')"
    />
    <button
      v-if="modelValue.length > 0"
      type="button"
      class="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      aria-label="Clear search"
      @click="$emit('update:modelValue', '')"
    >
      <X class="h-4 w-4" />
    </button>
  </div>
</template>
