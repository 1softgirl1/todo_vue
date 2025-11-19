<template>

  <main>
    <section class="top">
      <div id="searchTask" class="form">
        <SearchBar
            v-model="searchQuery"
            @search="onSearch"
        />
        <button id="createTaskButton" @click="openCreate" class="button">
          <img src="./assets/plus.svg" />
        </button>
      </div>

      <AddTodoModal
          :show="isModalOpen"
          :editTask="editingTask"
          @add="handleAdd"
          @update="handleUpdate"
          @close="closeModal"
      />
    </section>
    <section id="taskToDo" class="tasks">
      <p>Task to do - <span>{{ todoCount }}</span></p>
      <TodoList
          :tasks="filteredTasks"
          @toggle="toggleTask"
          @edit="startEdit"
          @delete="deleteTask"
          :onlyDone="false"
      />
    </section>
    <section id="doneTasks" class="tasks">
      <p>Done - <span>{{ doneCount }}</span></p>
      <TodoList
          :tasks="doneList"
          @toggle="toggleTask"
          @edit="startEdit"
          @delete="deleteTask"
          :onlyDone="true"
      />
    </section>

  </main>
  <ThemeToggle />
</template>

<script setup>
import { ref, computed } from 'vue';
import AddTodoModal from '@/components/AddTodoModal.vue';
import TodoList from '@/components/TodoList.vue';
import SearchBar from '@/components/SearchBar.vue';
import ThemeToggle from "@/components/ThemeToggle.vue";

import { useDataStore } from '@/stores/useDataStore.js'
import { useUserStore } from '@/stores/useUserStore.js'


const store = useDataStore()
const userStore = useUserStore()

const isModalOpen = ref(false);
const editingTask = ref(null);
const searchQuery = ref('');

const currentUser = computed(() => userStore.currentUser)
const tasks = computed(() => {
  if (!currentUser.value || !currentUser.value.email) return []
  return store.tasks.filter(t => t.owner === currentUser.value.email)
})

const todoCount = computed(() => tasks.value.filter(t => !t.done).length);
const doneCount = computed(() => tasks.value.filter(t => t.done).length);

const filteredTasks = computed(() =>
    tasks.value.filter(
        t =>
            !t.done &&
            t.text.toLowerCase().includes(searchQuery.value.trim().toLowerCase())
    )
);

const doneList = computed(() =>
    tasks.value.filter(
        t =>
            t.done &&
            t.text.toLowerCase().includes(searchQuery.value.trim().toLowerCase())
    )
);

function openCreate() {
  editingTask.value = null;
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
  editingTask.value = null;
}

function handleAdd(task) {
  // Присваиваем владельца (email текущего пользователя)
  const ownerEmail = currentUser.value && currentUser.value.email ? currentUser.value.email : null
  const taskWithOwner = { ...task, owner: ownerEmail }
  store.addTask(taskWithOwner)
}

function handleUpdate({ id, text }) {
  store.updateTask({ id, text })
}

function deleteTask(id) {
  store.deleteTask(id)
}

function toggleTask(id) {
  store.toggleTask(id)
}

function startEdit(id) {
  const found = tasks.value.find(t => t.id === id)
  if (found) {
    editingTask.value = { ...found }
    isModalOpen.value = true
  }
}

function onSearch(query) {
  searchQuery.value = query
}
</script>
