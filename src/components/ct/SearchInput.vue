<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-vue-next'

withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
    inputClass?: string
  }>(),
  { placeholder: 'Hľadať v databáze', inputClass: '' }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit', value: string): void
}>()

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    emit('submit', (e.target as HTMLInputElement).value ?? '')
  }
}
</script>

<template>
  <div class="relative">
    <Search class="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-[#A3A3A3]" aria-hidden />
    <Input
      :model-value="modelValue"
      type="search"
      class="h-10 rounded-md pl-11 pr-9 [&::-webkit-search-cancel-button]:hidden"
      :class="inputClass"
      :placeholder="placeholder"
      aria-label="Search"
      @update:model-value="emit('update:modelValue', $event ?? '')"
      @keydown="onKeydown"
    />
    <button
      v-if="modelValue.length > 0"
      type="button"
      class="absolute right-2.5 top-1/2 -translate-y-1/2 text-primary-600 transition-colors hover:text-primary-700"
      aria-label="Clear search"
      @click="$emit('update:modelValue', '')"
    >
      <X class="h-4 w-4" />
    </button>
  </div>
</template>
