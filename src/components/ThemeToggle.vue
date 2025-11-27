<template>
  <button
    id="theme"
    class="switch"
    :aria-label="`Switch to ${isDark ? 'light' : 'dark'} theme`"
    @click="toggleTheme"
  >
    <img v-if="isDark" src="../assets/sun.png" alt="sun" class="icon" />
    <img v-else src="../assets/moon.png" alt="moon" class="icon" />
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, type Ref } from 'vue'

const isDark: Ref<boolean> = ref(false)

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDark.value = true
    document.body.classList.add('dark')
  }
})

watch(isDark, (val: boolean) => {
  if (val) {
    document.body.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.body.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
})

function toggleTheme(): void {
  isDark.value = !isDark.value
}
</script>
