<template>
  <nav class="menu">
    <router-link to="/login" v-if="route.path !== '/todos'">Login</router-link>
    <router-link to="/register" v-if="route.path !== '/todos'">Register</router-link>
    <router-link to="/todos" v-if="route.path !== '/todos'">Todo</router-link>
    <router-link to="/about" v-if="route.path !== '/todos'">About</router-link>

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
.menu{
  @include flex-center(row, $spacing-md);
  margin-top: 30px;
}
.router-link {
  color: red;
}

</style>
