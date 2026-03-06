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
import { FolderOpen, Info, User, LogIn, UserPlus, LogOut } from 'lucide-vue-next'

const btnClass = 'rounded-lg border-border text-foreground hover:bg-accent focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2'
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
  <Button variant="outline" size="sm" :class="['gap-1.5', btnClass]" aria-label="Collections" as-child>
    <RouterLink to="/collections" class="flex items-center gap-1.5">
      <FolderOpen class="h-4 w-4" />
      <span class="hidden sm:inline">Collections</span>
    </RouterLink>
  </Button>
  <Button variant="outline" size="icon" :class="['h-9 w-9', btnClass]" aria-label="Info" as-child>
    <RouterLink to="/info" class="flex items-center justify-center">
      <Info class="h-4 w-4" />
    </RouterLink>
  </Button>

  <DropdownMenuRoot v-model:open="userMenuOpen">
    <DropdownMenuTrigger as-child>
      <Button
        variant="outline"
        size="icon"
        :class="['h-9 w-9', btnClass]"
        aria-label="Používateľ – možnosti"
      >
        <User class="h-4 w-4" />
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
        <LogIn class="h-4 w-4" />
        Prihlásiť sa
      </DropdownMenuItem>
      <DropdownMenuItem
        v-if="!isLoggedIn"
        class="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none hover:bg-accent focus:bg-accent"
        @select="openRegisterModal"
      >
        <UserPlus class="h-4 w-4" />
        Registrácia
      </DropdownMenuItem>
      <DropdownMenuItem
        v-if="isLoggedIn"
        class="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none hover:bg-accent focus:bg-accent"
        @select="handleLogout"
      >
        <LogOut class="h-4 w-4" />
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

  <Button variant="outline" size="sm" :class="btnClass" aria-label="Language EN/SK">
    EN/SK
  </Button>
</template>
