import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  email: string
  password: string
}

interface CurrentUser {
  email: string
}

export const useUserStore = defineStore('useUserStore', () => {
  const users = ref<User[]>([])
  const currentUser = ref<CurrentUser | null>(null)

  function loadUsers(): void {
    const saved = localStorage.getItem('users')
    users.value = saved ? JSON.parse(saved) : []
  }

  function saveUsers(): void {
    localStorage.setItem('users', JSON.stringify(users.value))
  }

  function loadCurrentUser(): void {
    const saved = localStorage.getItem('currentUser')
    currentUser.value = saved ? JSON.parse(saved) : null
  }

  function saveCurrentUser(): void {
    if (currentUser.value) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser.value))
    } else {
      localStorage.removeItem('currentUser')
    }
  }

  const isAuthenticated = computed(() => currentUser.value !== null)

  function getUserByEmail(email: string): User | undefined {
    return users.value.find((u) => u.email === email)
  }

  function registerUser(email: string, password: string): void {
    const existing = getUserByEmail(email)
    if (existing) throw new Error('Пользователь с таким email уже существует')

    const newUser = { email, password }
    users.value.push(newUser)
    saveUsers()

    currentUser.value = { email }
    saveCurrentUser()
  }

  function loginUser(email: string, password: string): void {
    const user = getUserByEmail(email)
    if (!user) throw new Error('Пользователь не найден')
    if (user.password !== password) throw new Error('Неверный пароль')

    currentUser.value = { email }
    saveCurrentUser()
  }

  function logoutUser(): void {
    currentUser.value = null
    saveCurrentUser()
  }

  loadUsers()
  loadCurrentUser()

  return {
    users,
    currentUser,
    isAuthenticated,
    getUserByEmail,
    registerUser,
    loginUser,
    logoutUser
  }
})
