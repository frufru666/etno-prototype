<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { METADATA_SECTIONS, type EtnoDocument } from '@/data/mockData'
import { ExternalLink } from 'lucide-vue-next'
import DetailMap from '@/components/ct/detail/DetailMap.vue'

const props = withDefaults(
  defineProps<{
    document: EtnoDocument
    mobile?: boolean
    /** When true, hide ID/title/author (e.g. when shown in mobile hero block above) */
    hideHeader?: boolean
  }>(),
  { hideHeader: false }
)

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

// Transcript preview: abstract/note or longer placeholder for scrollability
function transcriptPreview(doc: EtnoDocument): string {
  if (doc.abstract) return doc.abstract
  if (doc.note) return doc.note
  return (
    'Transkript dokumentu. Dátum výskumu, Skupina, Heslo. Obec, č. d. Košická Nová Ves, 1.10.1974. Okres, Košice. Zapísal, Prameň, Predmet, Foto, Kresba. ' +
    'Bezzemkovia si tu prenajímali pôdu od väčších gazdov, aby na nej pestovali uhorky, pre ktoré sú tu neobyčajne dobré podmienky. ' +
    'Roľníci vysádzali priemerne na 1000–1200 m² uhorky, z čoho získali i 20 mechov po 60–70 metr.centov. Uhorky tu boli najdôležitejším výrobným artiklom a zdrojom peňazí. ' +
    'Tento text slúži ako placeholder na ukážku scrollovateľnosti transkriptu.'
  )
}

function formatCoords(doc: EtnoDocument): string {
  if (doc.lat != null && doc.lng != null) {
    return `${doc.lat.toFixed(4)}° N, ${doc.lng.toFixed(4)}° E`
  }
  return ''
}

const labelWidthClass = props.mobile ? 'w-[130px]' : 'w-[152px]'
</script>

<template>
  <component :is="mobile ? 'div' : ScrollArea" :class="mobile ? '' : 'h-full'">
    <div
      class="flex flex-col"
      :class="mobile ? 'px-4 py-5' : 'p-6'"
    >
      <!-- 1. Header (hidden on mobile when shown in hero block above) -->
      <div
        v-if="!hideHeader"
        class="mb-5 space-y-1"
      >
        <span
          class="inline-block font-mono text-label-small text-primary-500 bg-primary-50 px-2 py-0.5 rounded"
        >
          {{ document.id }}
        </span>
        <h2 class="text-2xl font-bold tracking-tight text-foreground">
          {{ document.title }}
        </h2>
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
        class="mb-7 border-neutral-200 bg-muted/20"
      >
        <CardHeader class="flex flex-row items-center justify-between space-y-0 py-2">
          <span class="text-sm font-semibold text-foreground">TRANSCRIPT</span>
          <Button
            variant="link"
            size="sm"
            class="h-auto p-0 text-primary-500 hover:text-primary-600 hover:underline"
            @click="emit('show-transcript')"
          >
            Zobraziť
          </Button>
        </CardHeader>
        <CardContent class="space-y-1 py-2 pt-0">
          <p class="text-xs text-muted-foreground">
            Obrázok 1/28
          </p>
          <p class="line-clamp-4 text-sm text-foreground">
            {{ transcriptPreview(document) }}
          </p>
        </CardContent>
      </Card>

      <!-- 3. Kľúčové slová -->
      <div class="mb-7">
        <h4 class="mb-2 text-label-small font-bold uppercase tracking-wide text-muted-foreground">
          KĽÚČOVÉ SLOVÁ
        </h4>
        <div class="flex flex-wrap gap-1.5">
          <Badge
            v-for="kw in document.keywords"
            :key="kw"
            variant="outline"
            class="cursor-pointer border-primary-200 text-primary-500 hover:bg-primary-50 hover:text-primary-600"
            @click="openExploreWithFilter('keywords', kw)"
          >
            {{ kw }}
          </Badge>
        </div>
      </div>

      <!-- 4. Údaje (DataRow structure from Archeo) -->
      <div class="mb-4">
        <h3 class="mb-5 border-b-2 border-foreground pb-3 text-base font-bold tracking-tight text-foreground">
          Údaje
        </h3>

        <template
          v-for="section in METADATA_SECTIONS"
          :key="section.title"
        >
          <h4 class="mb-1 text-label-small font-bold uppercase tracking-wide text-muted-foreground">
            {{ section.title }}
          </h4>
          <div class="mb-6 flex flex-col">
            <div
              v-for="field in section.fields.filter((f) => f.getValue(document) != null)"
              :key="field.key"
              class="flex items-baseline border-b border-neutral-200 py-2.5 last:border-b-0"
            >
              <span
                class="shrink-0 text-label-small text-muted-foreground"
                :class="labelWidthClass"
              >
                {{ field.label }}
              </span>
              <span class="min-w-0 flex-1 pl-2">
                <template v-if="field.isLink && field.filterKey">
                  <button
                    type="button"
                    class="inline-flex items-center gap-1 text-sm font-medium text-primary-500 hover:text-primary-600 hover:underline"
                    @click="
                      openExploreWithFilter(
                        field.filterKey!,
                        field.getValue(document)!
                      )
                    "
                  >
                    {{ field.getValue(document) }}
                    <ExternalLink class="h-3 w-3 shrink-0" />
                  </button>
                </template>
                <a
                  v-else-if="field.key === 'license' && document.license"
                  :href="document.license"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 text-sm font-medium text-primary-500 hover:text-primary-600 hover:underline"
                >
                  {{ field.getValue(document) }}
                  <ExternalLink class="h-3 w-3 shrink-0" />
                </a>
                <span
                  v-else
                  class="text-sm font-medium text-foreground"
                >
                  {{ field.getValue(document) }}
                </span>
              </span>
            </div>
          </div>
        </template>
      </div>

      <!-- 5. Lokalita -->
      <div
        v-if="document.hasMap && document.lat != null && document.lng != null"
        class="space-y-2"
      >
        <h4 class="text-label-small font-bold uppercase tracking-wide text-muted-foreground">
          LOKALITA
        </h4>
        <div class="relative aspect-square max-w-full overflow-hidden rounded-md border border-neutral-200 bg-primary-50">
          <DetailMap
            :lat="document.lat"
            :lng="document.lng"
            compact
          />
          <div
            v-if="formatCoords(document)"
            class="absolute bottom-2 left-2 z-10 rounded bg-white/90 px-2 py-1 font-mono text-xs text-foreground"
          >
            {{ formatCoords(document) }}
          </div>
          <Button
            variant="link"
            size="sm"
            class="absolute bottom-2 right-2 z-10 text-primary-500 hover:text-primary-600"
            @click="emit('open-map-fullscreen')"
          >
            Fullscreen →
          </Button>
        </div>
      </div>
    </div>
  </component>
</template>
