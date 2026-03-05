<script setup lang="ts">
import type { EtnoDocument } from '@/data/mockData'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

defineProps<{
  document: EtnoDocument
  ctaLabel: string
}>()

function participantLines(doc: EtnoDocument): { label: string; names: string }[] {
  const out: { label: string; names: string }[] = []
  if (doc.authors?.length)
    out.push({ label: 'Autor:', names: doc.authors.map((a) => a.name).join(', ') })
  if (doc.researchers?.length)
    out.push({ label: 'Výskumník:', names: doc.researchers.map((a) => a.name).join(', ') })
  if (doc.originators?.length)
    out.push({ label: 'Pôvodca:', names: doc.originators.map((a) => a.name).join(', ') })
  return out
}

const emit = defineEmits<{
  (e: 'open-viewer'): void
}>()
</script>

<template>
  <div
    class="relative w-full min-h-[280px] h-[280px] bg-neutral-200 flex items-center justify-center cursor-pointer"
    role="button"
    tabindex="0"
    aria-label="Otvoriť prehliadač médií"
    @click="emit('open-viewer')"
    @keydown.enter.prevent="emit('open-viewer')"
    @keydown.space.prevent="emit('open-viewer')"
  >
    <span class="text-muted-foreground text-sm">Náhľad obsahu</span>
  </div>
  <div class="px-4 py-4 bg-white border-b border-neutral-200 space-y-2">
    <span class="inline-block font-mono text-label-small text-primary-500 bg-primary-50 px-2 py-0.5 rounded">
      {{ document.id }}
    </span>
    <h2 class="text-xl font-bold tracking-tight text-foreground">
      {{ document.title }}
    </h2>
    <p
      v-for="line in participantLines(document)"
      :key="line.label"
      class="text-sm text-muted-foreground"
    >
      {{ line.label }} {{ line.names }}
    </p>
    <Badge variant="outline" class="text-muted-foreground">
      {{ document.documentType }}
    </Badge>
    <Button class="w-full mt-2" @click="emit('open-viewer')">
      {{ ctaLabel }}
    </Button>
  </div>
</template>
