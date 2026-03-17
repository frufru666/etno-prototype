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
  <input
    v-model="modelValue"
    :class="cn('flex h-10 w-full rounded-control border border-[#D4D4D4] bg-white px-3 py-2 text-body-small text-[#171717] transition-colors file:border-0 file:bg-transparent file:text-body-small file:font-medium placeholder:text-[#A3A3A3] hover:border-primary-500 focus-visible:border-2 focus-visible:border-primary-500 focus-visible:bg-[#FAFAFA] focus-visible:outline-none aria-[invalid=true]:border-error disabled:cursor-not-allowed disabled:border-neutral-700 disabled:opacity-50', props.class)"
  >
</template>
