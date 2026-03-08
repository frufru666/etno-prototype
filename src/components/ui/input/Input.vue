<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { useVModel } from "@vueuse/core"
import { cn } from "@/lib/utils"

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes["class"]
}>()

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void
}>()

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input v-model="modelValue" :class="cn('flex h-10 w-full rounded-md border border-[#D4D4D4] bg-white px-3 py-2 text-body-small text-[#171717] transition-all placeholder:text-[#A3A3A3] hover:border-[#1A62FF] focus-visible:outline-none focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#1A62FF] focus-visible:bg-[#FAFAFA] disabled:cursor-not-allowed disabled:opacity-50 disabled:border-[#404040] file:border-0 file:bg-transparent file:text-body-small file:font-medium [&::-webkit-search-cancel-button]:hidden', props.class)">
</template>
