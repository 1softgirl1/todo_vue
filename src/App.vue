<template>


  <nav class="menu">
    <router-link to="/login" v-if="this.$route.path !== '/todos'">Login</router-link>
    <router-link to="/register" v-if="this.$route.path !== '/todos'">Register</router-link>
    <router-link to="/todos"  v-if="this.$route.path !== '/todos'">Todo</router-link>
    <router-link to="/about"  v-if="this.$route.path !== '/todos'">About</router-link>
    <router-link
        id="logout"
        to="/login"
        @click="logout"
        v-if="$route.path === '/todos'"
    >
      Logout
    </router-link>

  </nav>
    <router-view />
  <ThemeToggle></ThemeToggle>
</template>

<script setup>
import { useUserStore } from '@/stores/useUserStore.js'
import { useRouter } from 'vue-router'
import ThemeToggle from "@/components/ThemeToggle.vue";

const userStore = useUserStore()
const router = useRouter()
console.log(userStore.currentUser)
console.log(userStore.users)

function logout() {
  userStore.logoutUser()
  router.push('/login')
}

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
