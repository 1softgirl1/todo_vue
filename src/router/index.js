import { createRouter, createWebHistory } from 'vue-router'

// импорт страниц
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import TodoPage from '@/pages/TodoPage.vue'
import { useUserStore } from '@/stores/useUserStore'



const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/login' },

        { path: '/login', name: 'login', component: LoginPage },
        { path: '/register', name: 'register', component: RegisterPage },

        { path: '/todos', name: 'todos', component: TodoPage },
    ],
})

router.beforeEach((to) => {
    const store = useUserStore()

    if (to.name === 'todos' && !store.isAuthenticated) {
        return '/login'
    }
})

export default router
