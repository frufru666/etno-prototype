<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
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
import { PhFolderOpen, PhInfo, PhUser, PhSignIn, PhUserPlus, PhSignOut } from '@phosphor-icons/vue'

const btnClass = 'rounded-md focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2'
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
  <Button variant="secondary" size="lg" :class="['gap-2', btnClass]" aria-label="Collections" as-child>
    <RouterLink to="/collections" class="flex items-center gap-2">
      <PhFolderOpen class="size-6 text-primary-500" />
      <span class="hidden sm:inline text-primary-500">Collections</span>
    </RouterLink>
  </Button>
  <Button variant="secondary" size="icon-lg" :class="btnClass" aria-label="Info" as-child>
    <RouterLink to="/info" class="flex items-center justify-center">
      <PhInfo class="size-6" />
    </RouterLink>
  </Button>

  <DropdownMenuRoot v-model:open="userMenuOpen">
    <DropdownMenuTrigger as-child>
      <Button
        variant="secondary"
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
    </DropdownMenuContent>
  </DropdownMenuRoot>

  <Dialog v-model:open="userDialogOpen">
    <UserAuthModal
      v-if="userDialogOpen"
      :initial-view="dialogInitialView"
      @close="userDialogOpen = false"
    />
  </Dialog>

  <Button variant="secondary" size="lg" :class="btnClass" aria-label="Language EN/SK">
    EN/SK
  </Button>
</template>
