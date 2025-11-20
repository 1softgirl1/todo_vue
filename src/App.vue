<template>
  <nav class="menu">
    <router-link to="/about" v-if="route.path !== '/todos'">About</router-link>
    <router-link to="/login" v-if="route.path !== '/todos'">Login</router-link>
    <router-link to="/register" v-if="route.path !== '/todos'">Register</router-link>
    <router-link to="/todos" v-if="route.path !== '/todos'">Todo</router-link>
    <button id="logout" @click="logout" v-if="route.path === '/todos'">
      Logout
    </button>
  </nav>

  <router-view />
  <ThemeToggle />
</template>

<script setup>
import { useUserStore } from '@/stores/useUserStore.js'
import { useRouter, useRoute } from 'vue-router'
import ThemeToggle from "@/components/ThemeToggle.vue";

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

function logout() {
  userStore.logoutUser()
  router.push('/login')
}

console.log(userStore.currentUser)
console.log(userStore.users)


</script>

<style lang="scss" scoped>
.menu {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
  padding: 10px 20px;
  border-radius: 12px;

  a,
  button {
    text-decoration: none;
    color: var(--color-text);
    font-weight: 500;
    padding: 6px 12px;
    border-radius: 8px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }

  a.router-link-active {
    background-color: var(--color-primary);
    color: var(--color-text);
  }

  a:hover,
  button:hover {
    background-color: var(--color-background);
    color: var(--color-text);
    transform: scale(1.05);
  }

  button#logout {
    background-color: #e53e3e;
    color: #fff;
    font-weight: bold;
  }

  button#logout:hover {
    background-color: #c53030;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 10px;
  }
}
</style>



