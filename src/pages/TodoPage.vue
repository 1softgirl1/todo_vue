<template>
  <main>
    <section class="top">
      <div id="searchTask" class="form">
        <SearchBar v-model="searchQuery" @search="onSearch" />
        <button id="createTaskButton" @click="openCreate" class="button">
          <img src="../assets/plus.svg" alt="create task" />
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
      <p>
        Task to do - <span>{{ todoCount }}</span>
      </p>
      <TodoList
        :tasks="filteredTasks"
        @toggle="toggleTask"
        @edit="startEdit"
        @delete="deleteTask"
        :onlyDone="false"
      />
    </section>
    <section id="doneTasks" class="tasks">
      <p>
        Done - <span>{{ doneCount }}</span>
      </p>
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

<script setup lang="ts">
import { ref, computed, type Ref } from 'vue'
import AddTodoModal from '@/components/AddTodoModal.vue'
import TodoList from '@/components/TodoList.vue'
import SearchBar from '@/components/SearchBar.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

import { useDataStore } from '@/stores/useDataStore'
import { useUserStore } from '@/stores/useUserStore'
import type { Todo } from '@/types'

const store = useDataStore()
const userStore = useUserStore()

const isModalOpen: Ref<boolean> = ref(false)
const editingTask: Ref<Todo | null> = ref(null)
const searchQuery: Ref<string> = ref('')

const currentUser = computed(() => userStore.currentUser)
const tasks = computed<Todo[]>(() => {
  const cu = currentUser.value as { email?: string } | null
  if (!cu || !cu.email) return []
  return store.tasks.filter((t) => t.owner === cu.email)
})

const todoCount = computed(() => tasks.value.filter((t) => !t.done).length)
const doneCount = computed(() => tasks.value.filter((t) => t.done).length)

const filteredTasks = computed<Todo[]>(() =>
  tasks.value.filter(
    (t) =>
      !t.done &&
      t.text.toLowerCase().includes(searchQuery.value.trim().toLowerCase())
  )
)

const doneList = computed<Todo[]>(() =>
  tasks.value.filter(
    (t) =>
      t.done &&
      t.text.toLowerCase().includes(searchQuery.value.trim().toLowerCase())
  )
)

function openCreate(): void {
  editingTask.value = null
  isModalOpen.value = true
}

function closeModal(): void {
  isModalOpen.value = false
  editingTask.value = null
}

function handleAdd(task: Todo): void {
  const ownerEmail =
    currentUser.value && (currentUser.value as any).email
      ? (currentUser.value as any).email
      : null
  const taskWithOwner: Todo = { ...task, owner: ownerEmail }
  store.addTask(taskWithOwner)
}

function handleUpdate({ id, text }: { id: number; text: string }): void {
  store.updateTask({ id, text })
}

function deleteTask(id: number): void {
  store.deleteTask(id)
}

function toggleTask(id: number): void {
  store.toggleTask(id)
}

function startEdit(id: number): void {
  const found = tasks.value.find((t) => t.id === id)
  if (found) {
    editingTask.value = { ...found }
    isModalOpen.value = true
  }
}

function onSearch(query: string): void {
  searchQuery.value = query
}
</script>
