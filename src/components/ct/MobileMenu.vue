<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Menu, FolderOpen, Info, User, Languages } from 'lucide-vue-next'

const open = ref(false)

const btnClass = 'rounded-lg border-neutral-200 text-foreground hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2'
</script>

<template>
  <Sheet v-model:open="open">
    <SheetTrigger as-child>
      <Button variant="outline" size="icon" :class="['h-9 w-9', btnClass]" aria-label="Open menu">
        <Menu class="h-5 w-5" />
      </Button>
    </SheetTrigger>
    <SheetContent side="right" class="w-[280px] sm:max-w-[320px]">
      <SheetHeader>
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>
      <div class="mt-6 flex flex-col gap-2">
        <Button variant="outline" class="justify-start gap-2" @click="open = false">
          <FolderOpen class="h-4 w-4" />
          Collections
        </Button>
        <Button variant="outline" class="justify-start gap-2" @click="open = false">
          <Info class="h-4 w-4" />
          Info
        </Button>
        <Button variant="outline" class="justify-start gap-2" @click="open = false">
          <User class="h-4 w-4" />
          User
        </Button>
        <Button variant="outline" class="justify-start gap-2" @click="open = false">
          <Languages class="h-4 w-4" />
          EN/SK
        </Button>
      </div>
    </SheetContent>
  </Sheet>
</template>
