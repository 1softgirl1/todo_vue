import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import TodoPage from '@/pages/TodoPage.vue'
import { useUserStore } from '@/stores/useUserStore'
import AboutPage from '@/pages/AboutPage.vue'

const router = createRouter({
  history: createWebHistory('/todo_vue/'),
  routes: [
    { path: '/', redirect: '/about' },

    { path: '/login', name: 'login', component: LoginPage },
    { path: '/register', name: 'register', component: RegisterPage },
    { path: '/about', name: 'about', component: AboutPage },

    { path: '/todos', name: 'todos', component: TodoPage },
    { path: '/logout', name: 'logout', component: LoginPage }
  ]
})

router.beforeEach((to) => {
  const store = useUserStore()

  if (to.name === 'todos' && !store.isAuthenticated) {
    return '/login'
  }
})

export default router
