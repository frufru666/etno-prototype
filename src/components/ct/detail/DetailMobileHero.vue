<script setup lang="ts">
import type { EtnoItem } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

defineProps<{
  item: EtnoItem
  ctaLabel: string
}>()

function participantLines(item: EtnoItem): { label: string; names: string }[] {
  const out: { label: string; names: string }[] = []
  if (item.authors?.length)
    out.push({ label: 'Autor:', names: item.authors.map((a) => a.name).join(', ') })
  if (item.researchers?.length)
    out.push({ label: 'Výskumník:', names: item.researchers.map((a) => a.name).join(', ') })
  if (item.originators?.length)
    out.push({ label: 'Pôvodca:', names: item.originators.map((a) => a.name).join(', ') })
  return out
}

const emit = defineEmits<{
  (e: 'open-viewer'): void
}>()
</script>

<template>
  <div
    class="relative w-full min-h-[280px] h-[280px] bg-muted flex items-center justify-center cursor-pointer"
    role="button"
    tabindex="0"
    aria-label="Otvoriť prehliadač médií"
    @click="emit('open-viewer')"
    @keydown.enter.prevent="emit('open-viewer')"
    @keydown.space.prevent="emit('open-viewer')"
  >
    <span class="text-muted-foreground text-sm">Náhľad obsahu</span>
  </div>
  <div class="px-4 py-4 bg-background border-b border-border space-y-2">
    <span class="inline-block font-mono text-label-small text-primary-500 bg-primary-50 px-2 py-0.5 rounded">
      {{ item.id }}
    </span>
    <h2 class="text-xl font-bold tracking-tight text-foreground">
      {{ item.title }}
    </h2>
    <p
      v-for="line in participantLines(item)"
      :key="line.label"
      class="text-sm text-muted-foreground"
    >
      {{ line.label }} {{ line.names }}
    </p>
    <Badge variant="outline" class="text-muted-foreground">
      {{ item.documentType }}
    </Badge>
    <Button class="w-full mt-2" @click="emit('open-viewer')">
      {{ ctaLabel }}
    </Button>
  </div>
</template>
