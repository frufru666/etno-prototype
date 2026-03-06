<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import UserAuthModal from '@/components/ct/UserAuthModal.vue'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useAuth } from '@/composables/useAuth'
import { PhList, PhFolderOpen, PhInfo, PhUser, PhTranslate, PhSignIn, PhUserPlus, PhSignOut } from '@phosphor-icons/vue'

const open = ref(false)
const userDialogOpen = ref(false)
const dialogInitialView = ref<'login' | 'register'>('login')
const { isLoggedIn, logout } = useAuth()

const btnClass = 'rounded-lg border-border text-foreground hover:bg-accent focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2'

async function openLoginModal() {
  dialogInitialView.value = 'login'
  open.value = false
  await nextTick()
  userDialogOpen.value = true
}

async function openRegisterModal() {
  dialogInitialView.value = 'register'
  open.value = false
  await nextTick()
  userDialogOpen.value = true
}

async function openAccountModal() {
  dialogInitialView.value = 'login'
  open.value = false
  await nextTick()
  userDialogOpen.value = true
}

function handleLogout() {
  logout()
  open.value = false
}
</script>

<template>
  <Sheet v-model:open="open">
    <SheetTrigger as-child>
      <Button variant="outline" size="icon" :class="['h-9 w-9', btnClass]" aria-label="Open menu">
        <PhList class="h-5 w-5" />
      </Button>
    </SheetTrigger>
    <SheetContent side="right" class="w-[280px] sm:max-w-[320px]">
      <SheetHeader>
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>
      <div class="mt-6 flex flex-col gap-2">
        <Button variant="outline" class="justify-start gap-2" as-child>
          <RouterLink to="/collections" class="flex items-center gap-2" @click="open = false">
            <PhFolderOpen class="h-4 w-4" />
            Collections
          </RouterLink>
        </Button>
        <Button variant="outline" class="justify-start gap-2" as-child>
          <RouterLink to="/info" class="flex items-center gap-2" @click="open = false">
            <PhInfo class="h-4 w-4" />
            Info
          </RouterLink>
        </Button>
        <Button
          v-if="!isLoggedIn"
          variant="outline"
          class="justify-start gap-2"
          @click="openLoginModal"
        >
          <PhSignIn class="h-4 w-4" />
          Prihlásiť sa
        </Button>
        <Button
          v-if="!isLoggedIn"
          variant="outline"
          class="justify-start gap-2"
          @click="openRegisterModal"
        >
          <PhUserPlus class="h-4 w-4" />
          Registrácia
        </Button>
        <Button
          v-if="isLoggedIn"
          variant="outline"
          class="justify-start gap-2"
          @click="openAccountModal"
        >
          <PhUser class="h-4 w-4" />
          Účet
        </Button>
        <Button
          v-if="isLoggedIn"
          variant="outline"
          class="justify-start gap-2"
          @click="handleLogout"
        >
          <PhSignOut class="h-4 w-4" />
          Odhlásiť
        </Button>
        <Button variant="outline" class="justify-start gap-2 opacity-70">
          <PhTranslate class="h-4 w-4" />
          EN/SK
        </Button>
      </div>
    </SheetContent>
  </Sheet>
  <Dialog v-model:open="userDialogOpen">
    <UserAuthModal
      v-if="userDialogOpen"
      :initial-view="dialogInitialView"
      @close="userDialogOpen = false"
    />
  </Dialog>
</template>
