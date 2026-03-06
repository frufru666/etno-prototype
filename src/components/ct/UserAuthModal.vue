<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAuth } from '@/composables/useAuth'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Info, X } from 'lucide-vue-next'

type View = 'login' | 'reset'

const props = withDefaults(
  defineProps<{
    /** Initial view when modal opens (from dropdown choice) */
    initialView?: View
  }>(),
  { initialView: 'login' }
)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { isLoggedIn, userEmail, login, logout } = useAuth()

const view = ref<View>(props.initialView)
const email = ref('')
const password = ref('')
const resetEmail = ref('')
const error = ref('')
const resetSent = ref(false)

const showLoginForm = computed(() => !isLoggedIn.value && view.value === 'login')
const showResetForm = computed(() => !isLoggedIn.value && view.value === 'reset')

function handleLogin() {
  error.value = ''
  const result = login(email.value, password.value)
  if (result.success) emit('close')
  else error.value = result.error ?? 'Prihlásenie zlyhalo.'
}

function goToReset() {
  view.value = 'reset'
  error.value = ''
  resetSent.value = false
}

function goToLogin() {
  view.value = 'login'
  error.value = ''
  resetSent.value = false
}

function handleResetSubmit() {
  error.value = ''
  const e = resetEmail.value.trim()
  if (!e) {
    error.value = 'Zadajte e-mail.'
    return
  }
  // Mock: always succeed
  resetSent.value = true
}

function handleLogout() {
  logout()
  view.value = 'login'
  email.value = ''
  password.value = ''
  emit('close')
}

watch(
  () => props.initialView,
  (v) => { view.value = v },
  { immediate: true }
)
</script>

<template>
  <DialogContent class="sm:max-w-md">
    <div class="relative">
      <DialogClose
        class="absolute right-0 top-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label="Zavrieť"
      >
        <X class="h-4 w-4" />
      </DialogClose>
      <DialogHeader class="text-left">
        <DialogTitle>
          {{ isLoggedIn ? 'Účet' : view === 'reset' ? 'Obnoviť heslo' : 'Prihlásenie' }}
        </DialogTitle>
        <DialogDescription v-if="!isLoggedIn && view === 'login'">
          Prihláste sa do svojho účtu. (Demo: heslo „password“)
        </DialogDescription>
        <DialogDescription v-else-if="!isLoggedIn && view === 'reset'">
          Zadajte e-mail a my vám pošleme odkaz na obnovenie hesla.
        </DialogDescription>
      </DialogHeader>

      <!-- Logged in -->
      <div v-if="isLoggedIn" class="space-y-4 py-4">
        <p class="text-sm text-muted-foreground">
          Prihlásený ako <strong class="text-foreground">{{ userEmail }}</strong>
        </p>
        <DialogFooter>
          <Button variant="outline" @click="handleLogout">
            Odhlásiť
          </Button>
          <DialogClose as-child>
            <Button variant="secondary">Zavrieť</Button>
          </DialogClose>
        </DialogFooter>
      </div>

      <!-- Login form -->
      <form
        v-else-if="showLoginForm"
        class="space-y-4 py-4"
        @submit.prevent="handleLogin"
      >
        <div class="space-y-2">
          <label for="auth-email" class="text-sm font-medium text-foreground">E-mail</label>
          <Input
            id="auth-email"
            v-model="email"
            type="email"
            placeholder="vas@email.sk"
            class="w-full"
            autocomplete="email"
          />
        </div>
        <div class="space-y-2">
          <label for="auth-password" class="text-sm font-medium text-foreground">Heslo</label>
          <Input
            id="auth-password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full"
            autocomplete="current-password"
          />
        </div>
        <div v-if="error" class="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          <Info class="h-4 w-4 shrink-0" />
          {{ error }}
        </div>
        <Button type="button" variant="link" class="h-auto p-0 text-sm text-primary-500" @click="goToReset">
          Zabudnuté heslo?
        </Button>
        <DialogFooter>
          <DialogClose as-child>
            <Button type="button" variant="outline">Zrušiť</Button>
          </DialogClose>
          <Button type="submit">Prihlásiť sa</Button>
        </DialogFooter>
      </form>

      <!-- Reset password form -->
      <form
        v-else-if="showResetForm"
        class="space-y-4 py-4"
        @submit.prevent="handleResetSubmit"
      >
        <div v-if="!resetSent" class="space-y-2">
          <label for="reset-email" class="text-sm font-medium text-foreground">E-mail</label>
          <Input
            id="reset-email"
            v-model="resetEmail"
            type="email"
            placeholder="vas@email.sk"
            class="w-full"
            autocomplete="email"
          />
        </div>
        <div v-if="error" class="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          <Info class="h-4 w-4 shrink-0" />
          {{ error }}
        </div>
        <div v-if="resetSent" class="rounded-lg border border-primary-200 bg-primary-50 px-3 py-2 text-sm text-foreground">
          Odkaz na obnovenie hesla bol odoslaný na váš e-mail. (Demo – žiadny e-mail sa neodosiela.)
        </div>
        <DialogFooter class="flex-row flex-wrap gap-2 sm:gap-2">
          <Button type="button" variant="link" class="h-auto p-0 text-sm" @click="goToLogin">
            Späť na prihlásenie
          </Button>
          <DialogClose v-if="resetSent" as-child>
            <Button>Zavrieť</Button>
          </DialogClose>
          <Button v-else type="submit">Odoslať</Button>
        </DialogFooter>
      </form>
    </div>
  </DialogContent>
</template>
