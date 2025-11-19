import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('useUserStore', () => {
    const users = ref([])
    const currentUser = ref(null)

    function loadUsers() {
        const saved = localStorage.getItem('users')
        users.value = saved ? JSON.parse(saved) : []
    }

    function saveUsers() {
        localStorage.setItem('users', JSON.stringify(users.value))
    }

    function loadCurrentUser() {
        const saved = localStorage.getItem('currentUser')
        currentUser.value = saved ? JSON.parse(saved) : null
    }

    function saveCurrentUser() {
        if (currentUser.value) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser.value))
        } else {
            localStorage.removeItem('currentUser')
        }
    }

    const isAuthenticated = computed(() => currentUser.value !== null)

    function getUserByEmail(email) {
        return users.value.find(u => u.email === email)
    }

    function registerUser(email, password) {
        const existing = getUserByEmail(email)
        if (existing) throw new Error('Пользователь с таким email уже существует')

        const newUser = { email, password }
        users.value.push(newUser)
        saveUsers()

        currentUser.value = { email }
        saveCurrentUser()
    }

    function loginUser(email, password) {
        const user = getUserByEmail(email)
        if (!user) throw new Error('Пользователь не найден')
        if (user.password !== password) throw new Error('Неверный пароль')

        currentUser.value = { email }
        saveCurrentUser()
    }

    function logout() {
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
        logout
    }
})
