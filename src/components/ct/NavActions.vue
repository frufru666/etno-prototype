<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { FolderOpen, Info, User } from 'lucide-vue-next'

const btnClass = 'rounded-lg border-border text-foreground hover:bg-accent focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2'
</script>

<template>
  <Button variant="outline" size="sm" :class="['gap-1.5', btnClass]" aria-label="Collections">
    <FolderOpen class="h-4 w-4" />
    <span class="hidden sm:inline">Collections</span>
  </Button>
  <Button variant="outline" size="icon" :class="['h-9 w-9', btnClass]" aria-label="Info">
    <Info class="h-4 w-4" />
  </Button>
  <Button variant="outline" size="icon" :class="['h-9 w-9', btnClass]" aria-label="User">
    <User class="h-4 w-4" />
  </Button>
  <Button variant="outline" size="sm" :class="btnClass" aria-label="Language EN/SK">
    EN/SK
  </Button>
</template>
