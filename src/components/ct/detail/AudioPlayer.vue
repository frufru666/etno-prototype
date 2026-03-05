<script setup lang="ts">
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import PlaybackControls from '@/components/ct/detail/PlaybackControls.vue'
import type { EtnoDocument } from '@/data/mockData'

const props = defineProps<{
  document: EtnoDocument
  mobile?: boolean
  fullscreen?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const isPlaying = ref(false)
const currentTime = ref(15)
const duration = ref(93)

function seek(seconds: number) {
  currentTime.value = Math.max(0, Math.min(duration.value, currentTime.value + seconds))
}

const transcriptText = computed(() => {
  if (props.document.note) return props.document.note
  if (props.document.abstract) return props.document.abstract
  return 'Transkript nahrávky… (mock text) Dátum výskumu, Skupina, Heslo. Obec, č. d. Košická Nová Ves, 1.10.1974. Okres, Košice. Zapísal, Prameň, Predmet, Foto, Kresba.'
})
</script>

<template>
  <div
    class="relative flex h-full w-full flex-col bg-muted"
    :class="{ 'fixed inset-0 z-[60]': fullscreen }"
  >
    <div
      v-if="fullscreen"
      class="flex flex-shrink-0 items-center border-b border-border bg-background px-4 py-2"
    >
      <Button variant="ghost" size="sm" class="gap-1" aria-label="Zavrieť" @click="emit('close')">
        <span class="text-lg leading-none">×</span>
        Zavrieť
      </Button>
    </div>

    <ScrollArea class="flex-1 p-4">
      <h3 class="mb-2 text-lg font-semibold">Transcript</h3>
      <p class="whitespace-pre-wrap text-sm text-muted-foreground">
        {{ transcriptText }}
      </p>
    </ScrollArea>

    <PlaybackControls
      :is-playing="isPlaying"
      :current-time="currentTime"
      :duration="duration"
      @seek="seek"
      @toggle-play="isPlaying = !isPlaying"
    />
  </div>
</template>
