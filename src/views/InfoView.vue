<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopNav from '@/components/ct/TopNav.vue'
import Footer from '@/components/ct/Footer.vue'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { INFO_CONTENT, type InfoSection } from '@/data/infoContent'
import SearchOverlayPanel from '@/components/ct/SearchOverlayPanel.vue'
import { useIsMobile } from '@/composables/useIsMobile'
import { useSearchOverlay } from '@/composables/useSearchOverlay'
import { pushExploreSearch } from '@/lib/navigation'
import { ExternalLink } from 'lucide-vue-next'

const router = useRouter()
const isMobile = useIsMobile()
const filterOpen = ref(false)
const searchQuery = ref('')
const { searchFilteredItems } = useSearchOverlay(searchQuery)

function onSearchSubmit(value: string) {
  pushExploreSearch(router, value)
}

function sectionTag(level: InfoSection['level']) {
  return `h${level}`
}
</script>

<template>
  <div class="min-h-dvh bg-background flex flex-col">
    <TopNav
      :filter-open="filterOpen"
      :active-filter-count="0"
      :search-query="searchQuery"
      @toggle-filter="filterOpen = !filterOpen"
      @update:search-query="searchQuery = $event"
      @search-submit="onSearchSubmit"
    />
    <div class="flex-1 flex flex-col pt-[96px] md:pt-[57px]">
      <SearchOverlayPanel
        :items="searchFilteredItems"
        :query="searchQuery"
        :mobile="isMobile"
      />
      <main class="mx-auto w-full max-w-3xl flex-1 px-4 py-8 md:px-6 md:py-10">
        <h1 class="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {{ INFO_CONTENT.title }}
        </h1>
        <p class="mt-4 text-lg text-muted-foreground md:mt-6">
          {{ INFO_CONTENT.perex }}
        </p>
        <Separator class="my-8" />
        <div class="space-y-8">
          <template
            v-for="(section, i) in INFO_CONTENT.sections"
            :key="i"
          >
            <component
              :is="sectionTag(section.level)"
              :class="[
                section.level === 2 && 'text-xl font-semibold text-foreground md:text-2xl border-b border-border pb-2',
                section.level === 3 && 'text-lg font-semibold text-foreground md:text-xl mt-6',
                section.level === 4 && 'text-base font-semibold text-foreground md:text-lg mt-4',
              ]"
            >
              {{ section.heading }}
            </component>
            <p
              v-if="section.body"
              class="text-sm leading-relaxed text-foreground md:text-base"
            >
              {{ section.body }}
            </p>
            <div
              v-if="section.images?.length"
              class="flex flex-wrap gap-4 py-2"
            >
              <div
                v-for="(img, j) in section.images"
                :key="j"
                class="overflow-hidden rounded-lg border border-border bg-muted"
                style="max-width: 320px;"
              >
                <img
                  :src="img.src"
                  :alt="img.alt"
                  class="h-auto w-full object-cover"
                >
              </div>
            </div>
            <div
              v-if="section.links?.length"
              class="grid gap-3 sm:grid-cols-2"
            >
              <Card
                v-for="(link, k) in section.links"
                :key="k"
                class="cursor-pointer transition-colors hover:border-primary-200 hover:bg-primary-50/50"
              >
                <a
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block"
                >
                  <CardContent class="flex items-center justify-between p-4">
                    <span class="font-medium text-foreground">{{ link.label }}</span>
                    <ExternalLink class="h-4 w-4 shrink-0 text-primary-500" />
                  </CardContent>
                </a>
              </Card>
            </div>
          </template>
        </div>
      </main>
      <Footer />
    </div>
  </div>
</template>
