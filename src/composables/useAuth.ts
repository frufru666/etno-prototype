import { ref, computed } from 'vue'

// Mock auth state – no real backend. Replace with real auth when needed.
const isLoggedIn = ref(false)
const mockUserEmail = ref('')

export function useAuth() {
  function login(email: string, password: string): { success: boolean; error?: string } {
    const e = email.trim().toLowerCase()
    const p = password
    if (!e) return { success: false, error: 'Zadajte e-mail.' }
    if (!p) return { success: false, error: 'Zadajte heslo.' }
    // Mock: accept any email with password "password"
    if (p !== 'password') return { success: false, error: 'Nesprávny e-mail alebo heslo.' }
    isLoggedIn.value = true
    mockUserEmail.value = e
    return { success: true }
  }

  function register(email: string, password: string): { success: boolean; error?: string } {
    const e = email.trim().toLowerCase()
    const p = password
    if (!e) return { success: false, error: 'Zadajte e-mail.' }
    if (!p) return { success: false, error: 'Zadajte heslo.' }
    // Demo: any non-empty password; then log in
    isLoggedIn.value = true
    mockUserEmail.value = e
    return { success: true }
  }

  function logout() {
    isLoggedIn.value = false
    mockUserEmail.value = ''
  }

  return {
    isLoggedIn: computed(() => isLoggedIn.value),
    userEmail: computed(() => mockUserEmail.value),
    login,
    register,
    logout,
  }
}
