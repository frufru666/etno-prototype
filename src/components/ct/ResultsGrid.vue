<script setup lang="ts">
import type { EtnoDocument } from '@/data/mockData'
import ObjectCard from '@/components/ct/ObjectCard.vue'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const props = defineProps<{
  documents: EtnoDocument[]
  sortKey: string
  sortOrder: 'asc' | 'desc'
}>()

const emit = defineEmits<{
  (e: 'update:sortKey', value: string): void
  (e: 'update:sortOrder', value: 'asc' | 'desc'): void
}>()

const sortOptions = [
  { value: 'id', label: 'ID' },
  { value: 'title', label: 'Názov' },
  { value: 'studyPeriodStart', label: 'Čas aktivity' },
] as const
</script>

<template>
  <section class="px-4 py-4 md:px-6">
    <div class="mb-4 flex flex-wrap items-center justify-between gap-2">
      <p class="text-sm font-medium text-muted-foreground">
        {{ documents.length }} Objektov
      </p>
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground">Zoradiť podľa:</span>
        <Select
          :model-value="sortKey"
          @update:model-value="(v) => emit('update:sortKey', v ?? 'id')"
        >
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Vyberte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="opt in sortOptions"
              :key="opt.value"
              :value="opt.value"
            >
              {{ opt.label }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <ObjectCard
        v-for="doc in documents"
        :key="doc.id"
        :document="doc"
      />
    </div>
  </section>
</template>
