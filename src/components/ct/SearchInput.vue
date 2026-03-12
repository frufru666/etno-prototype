<script setup lang="ts">
import { Input } from '@/components/ui/input'
import { PhMagnifyingGlass, PhX } from '@phosphor-icons/vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
    /** When set, placeholder is "Search " + bold brand (e.g. "EtnoExplorer") */
    placeholderBrand?: string
    inputClass?: string
  }>(),
  { placeholder: 'Hľadať v databáze', inputClass: '' }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit', value: string): void
}>()

const effectivePlaceholder = props.placeholderBrand ? ' ' : props.placeholder

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    emit('submit', (e.target as HTMLInputElement).value ?? '')
  }
}
</script>

<template>
  <div class="relative flex w-full gap-1">
    <PhMagnifyingGlass class="absolute left-3 top-1/2 z-10 h-6 w-6 -translate-y-1/2 text-muted-foreground" aria-hidden />
    <!-- When placeholderBrand is set, show "Search **brand**" as overlay when empty -->
    <div
      v-if="placeholderBrand && !modelValue"
      class="pointer-events-none absolute left-11 top-1/2 z-10 -translate-y-1/2 text-[14px] text-muted-foreground"
      aria-hidden
    >
      Search <strong class="font-bold text-foreground">{{ placeholderBrand }}</strong>
    </div>
    <Input
      :model-value="modelValue"
      type="search"
      class="h-10 rounded-md pl-11 pr-9 text-base [&::-webkit-search-cancel-button]:hidden"
      :class="inputClass"
      :placeholder="effectivePlaceholder"
      aria-label="Search"
      @update:model-value="emit('update:modelValue', $event ?? '')"
      @keydown="onKeydown"
    />
    <button
      v-if="modelValue.length > 0"
      type="button"
      class="absolute right-2.5 top-1/2 z-10 -translate-y-1/2 text-primary-600 transition-colors hover:text-primary-700"
      aria-label="Clear search"
      @click="$emit('update:modelValue', '')"
    >
      <PhX class="h-4 w-4" />
    </button>
  </div>
</template>
