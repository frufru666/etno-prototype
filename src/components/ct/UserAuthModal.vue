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
import { PhWarningCircle, PhCheckCircle, PhX } from '@phosphor-icons/vue'

type View = 'login' | 'reset' | 'register'

const DEMO_EMAIL = 'demo@etno.sk'
const DEMO_PASSWORD = 'password'

const props = withDefaults(
  defineProps<{
    /** Initial view when modal opens (from dropdown choice) */
    initialView?: 'login' | 'register'
  }>(),
  { initialView: 'login' }
)

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { isLoggedIn, userEmail, login, register, logout } = useAuth()

const view = ref<View>(props.initialView)
const email = ref(DEMO_EMAIL)
const password = ref(DEMO_PASSWORD)
const registerEmail = ref('')
const registerPassword = ref('')
const resetEmail = ref('')
const error = ref('')
const resetSent = ref(false)
const loginSuccess = ref(false)
const registerSuccess = ref(false)

/** Logged-in block only when opened already logged in (not after just succeeding login/register) */
const showLoggedInBlock = computed(
  () => isLoggedIn.value && !loginSuccess.value && !registerSuccess.value
)
const showLoginForm = computed(
  () => view.value === 'login' && (!isLoggedIn.value || loginSuccess.value)
)
const showResetForm = computed(() => !isLoggedIn.value && view.value === 'reset')
const showRegisterForm = computed(
  () => view.value === 'register' && (!isLoggedIn.value || registerSuccess.value)
)

function handleLogin() {
  error.value = ''
  loginSuccess.value = false
  const result = login(email.value, password.value)
  if (result.success) {
    loginSuccess.value = true
  } else {
    error.value = result.error ?? 'Prihlásenie zlyhalo.'
  }
}

function goToReset() {
  view.value = 'reset'
  error.value = ''
  resetSent.value = false
  loginSuccess.value = false
}

function goToLogin() {
  view.value = 'login'
  email.value = DEMO_EMAIL
  password.value = DEMO_PASSWORD
  error.value = ''
  resetSent.value = false
  loginSuccess.value = false
  registerSuccess.value = false
}

function goToRegister() {
  view.value = 'register'
  error.value = ''
  registerSuccess.value = false
}

function handleRegister() {
  error.value = ''
  registerSuccess.value = false
  const result = register(registerEmail.value, registerPassword.value)
  if (result.success) {
    registerSuccess.value = true
  } else {
    error.value = result.error ?? 'Registrácia zlyhala.'
  }
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
  (v) => {
    view.value = v
    if (v === 'login') {
      email.value = DEMO_EMAIL
      password.value = DEMO_PASSWORD
    }
  },
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
        <PhX class="h-4 w-4" />
      </DialogClose>
      <DialogHeader class="text-left">
        <DialogTitle>
          {{ showLoggedInBlock ? 'Účet' : view === 'reset' ? 'Obnoviť heslo' : view === 'register' ? 'Registrácia' : 'Prihlásenie' }}
        </DialogTitle>
        <DialogDescription v-if="showLoginForm && !loginSuccess && view === 'login'">
          Prihláste sa (demo: údaje sú predvyplnené).
        </DialogDescription>
        <DialogDescription v-else-if="view === 'reset'">
          Zadajte e-mail a my vám pošleme odkaz na obnovenie hesla.
        </DialogDescription>
        <DialogDescription v-else-if="showRegisterForm && !registerSuccess && view === 'register'">
          Vytvorte si účet (demo – bez skutočnej registrácie).
        </DialogDescription>
      </DialogHeader>

      <!-- Logged in: only when opening modal already logged in (not after success in this modal) -->
      <div v-if="showLoggedInBlock" class="space-y-4 py-4">
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
        <div v-if="loginSuccess" class="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800" role="status" aria-live="polite">
          <PhCheckCircle class="h-4 w-4 shrink-0 text-green-600" />
          Úspešne ste sa prihlásili.
        </div>
        <div v-if="error" class="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
          <PhWarningCircle class="h-4 w-4 shrink-0" />
          {{ error }}
        </div>
        <div v-if="!loginSuccess" class="flex flex-wrap gap-x-4 gap-y-1">
          <Button type="button" variant="link" class="h-auto p-0 text-sm text-primary-500" @click="goToReset">
            Zabudnuté heslo?
          </Button>
          <Button type="button" variant="link" class="h-auto p-0 text-sm text-primary-500" @click="goToRegister">
            Nemáte účet? Registrácia
          </Button>
        </div>
        <DialogFooter>
          <DialogClose as-child>
            <Button type="button" variant="outline">{{ loginSuccess ? 'Zavrieť' : 'Zrušiť' }}</Button>
          </DialogClose>
          <Button v-if="!loginSuccess" type="submit">
            Prihlásiť sa
          </Button>
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
        <div v-if="error" class="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
          <PhWarningCircle class="h-4 w-4 shrink-0" />
          {{ error }}
        </div>
        <div v-if="resetSent" class="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800" role="status" aria-live="polite">
          <PhCheckCircle class="h-4 w-4 shrink-0 text-green-600" />
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

      <!-- Register form -->
      <form
        v-else-if="showRegisterForm"
        class="space-y-4 py-4"
        @submit.prevent="handleRegister"
      >
        <div class="space-y-2">
          <label for="reg-email" class="text-sm font-medium text-foreground">E-mail</label>
          <Input
            id="reg-email"
            v-model="registerEmail"
            type="email"
            placeholder="vas@email.sk"
            class="w-full"
            autocomplete="email"
          />
        </div>
        <div class="space-y-2">
          <label for="reg-password" class="text-sm font-medium text-foreground">Heslo</label>
          <Input
            id="reg-password"
            v-model="registerPassword"
            type="password"
            placeholder="••••••••"
            class="w-full"
            autocomplete="new-password"
          />
        </div>
        <div v-if="registerSuccess" class="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800" role="status" aria-live="polite">
          <PhCheckCircle class="h-4 w-4 shrink-0 text-green-600" />
          Účet bol vytvorený. Ste prihlásený.
        </div>
        <div v-if="error" class="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
          <PhWarningCircle class="h-4 w-4 shrink-0" />
          {{ error }}
        </div>
        <DialogFooter>
          <Button v-if="!registerSuccess" type="button" variant="link" class="h-auto p-0 text-sm" @click="goToLogin">
            Už mám účet – prihlásiť sa
          </Button>
          <DialogClose as-child>
            <Button type="button" variant="outline">{{ registerSuccess ? 'Zavrieť' : 'Zrušiť' }}</Button>
          </DialogClose>
          <Button v-if="!registerSuccess" type="submit">
            Registrovať sa
          </Button>
        </DialogFooter>
      </form>
    </div>
  </DialogContent>
</template>
