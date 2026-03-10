<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from 'reka-ui'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import UserAuthModal from '@/components/ct/UserAuthModal.vue'
import { useAuth } from '@/composables/useAuth'
import {
  PhInfo,
  PhUser,
  PhTranslate,
  PhSignIn,
  PhUserPlus,
  PhSignOut,
} from '@phosphor-icons/vue'

const route = useRoute()
const isInfoActive = computed(() => route.name === 'info')
const btnClass =
  'rounded-md focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2'
const userMenuOpen = ref(false)
const userDialogOpen = ref(false)
const dialogInitialView = ref<'login' | 'register'>('login')
const { isLoggedIn, logout } = useAuth()

function openLoginModal() {
  dialogInitialView.value = 'login'
  userMenuOpen.value = false
  userDialogOpen.value = true
}

function openRegisterModal() {
  dialogInitialView.value = 'register'
  userMenuOpen.value = false
  userDialogOpen.value = true
}

function handleLogout() {
  logout()
  userMenuOpen.value = false
}
</script>

<template>
  <!-- Info as text button (no icon-only) -->
  <Button
    :variant="isInfoActive ? 'primary' : 'outline'"
    size="lg"
    :class="['gap-2', btnClass]"
    aria-label="Info"
    as-child
  >
    <RouterLink to="/info" class="flex items-center gap-2">
      <PhInfo class="size-5" />
      <span class="hidden sm:inline">Info</span>
    </RouterLink>
  </Button>

  <!-- User is the only icon button -->
  <DropdownMenuRoot v-model:open="userMenuOpen">
    <DropdownMenuTrigger as-child>
      <Button
        variant="nav"
        size="icon-lg"
        :class="btnClass"
        aria-label="Používateľ – možnosti"
      >
        <PhUser class="size-6" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      class="min-w-[180px] rounded-lg border border-border bg-background p-1 shadow-lg"
      align="end"
    >
      <DropdownMenuItem
        v-if="!isLoggedIn"
        class="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none hover:bg-accent focus:bg-accent"
        @select="openLoginModal"
      >
        <PhSignIn class="h-4 w-4" />
        Prihlásiť sa
      </DropdownMenuItem>
      <DropdownMenuItem
        v-if="!isLoggedIn"
        class="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none hover:bg-accent focus:bg-accent"
        @select="openRegisterModal"
      >
        <PhUserPlus class="h-4 w-4" />
        Registrácia
      </DropdownMenuItem>
      <DropdownMenuItem
        v-if="isLoggedIn"
        class="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none hover:bg-accent focus:bg-accent"
        @select="handleLogout"
      >
        <PhSignOut class="h-4 w-4" />
        Odhlásiť
      </DropdownMenuItem>
      <DropdownMenuItem
        class="mt-1 flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none hover:bg-accent focus:bg-accent"
      >
        <PhTranslate class="h-4 w-4" />
        Switch to English
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenuRoot>

  <Dialog v-model:open="userDialogOpen">
    <UserAuthModal
      v-if="userDialogOpen"
      :initial-view="dialogInitialView"
      @close="userDialogOpen = false"
    />
  </Dialog>
</template>
