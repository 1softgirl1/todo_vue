<template>
  <div class="about">
    <h1>About (или почему этот To-Do List вообще существует)</h1>

    <transition name="fade" appear>
      <div class="about-text" v-if="showText">
        <br>
        <p>Привет! Ты попал на страницу About моего великолепного, невероятного To-Do List’а, сделанного на Vue.</p>
        <br>
        <p>Здесь ты можешь:</p>
        <br>
        <transition-group name="bounce" tag="ul" class="bounce-list">
          <li
              v-for="(item, index) in items"
              :key="index"
              :style="{'--i': index}"
          >
            {{ item }}
          </li>
        </transition-group>

      </div>
    </transition>

  </div>

  <ThemeToggle />
</template>

<script setup>
import { useUserStore } from '@/stores/useUserStore.js'
import { useRouter } from 'vue-router'
import ThemeToggle from "@/components/ThemeToggle.vue";

const userStore = useUserStore()
const router = useRouter()

import { ref, onMounted } from 'vue'

const showText = ref(false)

onMounted(() => {
  showText.value = true
})

const items = [
  'добавлять задачи (и чувствовать себя продуктивным ровно 4 секунды);',
  'удалять задачи (потому что они мешают жить);',
  'отмечать выполнение (главная кнопка для самооценки);',
  'менять тему (прям как 2 постара к концерту иц)'
]


function logout() {
  userStore.logoutUser()
  router.push('/login')
}
</script>

<style lang="scss" scoped>
@use '../scss/utils/variables' as *;
@use '../scss/utils/mixins' as *;

.about {

  @include flex-center(column);
  align-items: center;
  margin-left: auto;
  margin-right: auto;


  padding-inline: 10px;
  height: 300px;
  width: 100%;
  max-width: 1000px;
  border-radius: 10px;
  background-color: var(--color-background);
  margin-bottom: 16px;
  margin-top: 50px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  }
  @include respond-to(tablet) {
    width: 100%;
    max-width: 432px;
    font-size: 10pt;
    align-items: center;

  }

  @include respond-to(mobile) {

    width: 100%;
    max-width: 320px;
    padding-inline: 5px;
    font-size: 10px;
    align-items: center;
    height: 350px;

  }
  p {
    font-size: 14px;
  }
  li {
    margin-left: 5px;
    font-size: 14px;
  }

  h1 {
    margin-top: 10px;
    padding-inline: 10px;
  }
  .about-text {
    padding: 10px;

  }


}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}


.bounce-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.bounce-enter-active {
  animation: bounce-in 0.6s cubic-bezier(.17,.67,.46,1.35) forwards;
}

.bounce-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}


.bounce-list li {
  animation-delay: calc(var(--i) * 110ms) !important;
}

@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  60% {
    opacity: 1;
    transform: translateY(-6px) scale(1.02);
  }
  80% {
    transform: translateY(3px) scale(0.98);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}




</style>
