<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { METADATA_SECTIONS, type EtnoDocument } from '@/data/mockData'

const props = defineProps<{
  document: EtnoDocument
  mobile?: boolean
}>()

const emit = defineEmits<{
  (e: 'open-map-fullscreen'): void
  (e: 'show-transcript'): void
}>()

const router = useRouter()

function authorLine(doc: EtnoDocument): string {
  if (!doc.authors?.length) return ''
  return doc.authors.map((a) => a.name).join(', ')
}

function openExploreWithFilter(filterKey: string, value: string) {
  router.push({ name: 'explore', query: { [filterKey]: value } })
}

// Transcript preview text: use abstract or note, or placeholder
function transcriptPreview(doc: EtnoDocument): string {
  if (doc.abstract) return doc.abstract
  if (doc.note) return doc.note
  return 'Transkript dokumentu…'
}

function formatCoords(doc: EtnoDocument): string {
  if (doc.lat != null && doc.lng != null) {
    return `${doc.lat.toFixed(4)}° N, ${doc.lng.toFixed(4)}° E`
  }
  return ''
}
</script>

<template>
  <ScrollArea class="h-full">
    <div class="flex flex-col gap-4 p-4">
      <!-- 1. Header -->
      <div class="space-y-2">
        <Badge
          class="bg-primary-500 px-2 py-0.5 font-mono text-white"
        >
          {{ document.id }}
        </Badge>
        <h3 class="text-lg font-semibold leading-tight">
          {{ document.title }}
        </h3>
        <p
          v-if="authorLine(document)"
          class="text-sm text-muted-foreground"
        >
          Autor: {{ authorLine(document) }}
        </p>
        <Badge
          variant="outline"
          class="text-muted-foreground"
        >
          {{ document.documentType }}
        </Badge>
      </div>

      <!-- 2. Transcript preview -->
      <Card
        v-if="document.hasTranscript"
        class="bg-muted/30"
      >
        <CardHeader class="flex flex-row items-center justify-between space-y-0 py-2">
          <span class="text-sm font-semibold">TRANSCRIPT</span>
          <Button
            variant="link"
            size="sm"
            class="h-auto p-0 text-primary-600"
            @click="emit('show-transcript')"
          >
            Zobraziť
          </Button>
        </CardHeader>
        <CardContent class="space-y-1 py-2 pt-0">
          <p class="text-xs text-muted-foreground">
            Obrázok 1/28
          </p>
          <p class="line-clamp-3 text-sm">
            {{ transcriptPreview(document) }}
          </p>
        </CardContent>
      </Card>

      <!-- 3. Kľúčové slová -->
      <div class="space-y-2">
        <h4 class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          KĽÚČOVÉ SLOVÁ
        </h4>
        <div class="flex flex-wrap gap-1.5">
          <Badge
            v-for="kw in document.keywords"
            :key="kw"
            variant="outline"
            class="cursor-pointer border-primary-200 text-primary-700 hover:bg-primary-50"
            @click="openExploreWithFilter('keywords', kw)"
          >
            {{ kw }}
          </Badge>
        </div>
      </div>

      <!-- 4. Údaje (metadata) -->
      <div class="space-y-3">
        <h4 class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          ÚDAJE
        </h4>
        <dl class="space-y-3">
          <template
            v-for="section in METADATA_SECTIONS"
            :key="section.title"
          >
            <div class="space-y-1.5">
              <dt class="text-xs font-medium text-muted-foreground">
                {{ section.title }}
              </dt>
              <dd class="space-y-1 text-sm">
                <template
                  v-for="field in section.fields"
                  :key="field.key"
                >
                  <div
                    v-if="field.getValue(document) != null"
                    class="flex flex-wrap gap-x-1"
                  >
                    <span class="text-muted-foreground">{{ field.label }}:</span>
                    <template v-if="field.isLink">
                      <button
                        type="button"
                        class="text-primary-600 hover:underline"
                        @click="
                          field.filterKey &&
                            openExploreWithFilter(
                              field.filterKey,
                              field.getValue(document)!
                            )
                        "
                      >
                        {{ field.getValue(document) }}
                      </button>
                    </template>
                    <template v-else>
                      <a
                        v-if="field.key === 'license' && document.license"
                        :href="document.license"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-primary-600 hover:underline"
                      >
                        {{ field.getValue(document) }}
                      </a>
                      <span v-else>{{ field.getValue(document) }}</span>
                    </template>
                  </div>
                </template>
              </dd>
            </div>
            <Separator />
          </template>
        </dl>
      </div>

      <!-- 5. Lokalita -->
      <div
        v-if="document.hasMap"
        class="space-y-2"
      >
        <h4 class="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          LOKALITA
        </h4>
        <div class="relative aspect-square max-w-full overflow-hidden rounded-md bg-primary-100">
          <div class="absolute inset-0 flex items-center justify-center text-muted-foreground">
            Map placeholder
          </div>
          <div
            v-if="formatCoords(document)"
            class="absolute bottom-2 left-2 rounded bg-white/90 px-2 py-1 font-mono text-xs"
          >
            {{ formatCoords(document) }}
          </div>
          <Button
            variant="link"
            size="sm"
            class="absolute bottom-2 right-2 text-primary-600"
            @click="emit('open-map-fullscreen')"
          >
            Fullscreen →
          </Button>
        </div>
      </div>
    </div>
  </ScrollArea>
</template>
