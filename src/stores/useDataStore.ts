import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Todo } from '@/types'

export const useDataStore = defineStore(
  'dataStore',
  () => {
    const tasks = ref<Todo[]>([])

    function addTask(task: Todo) {
      tasks.value.unshift(task)
    }

    function updateTask({ id, text }: { id: number; text: string }) {
      tasks.value = tasks.value.map((t) => (t.id === id ? { ...t, text } : t))
    }

    function toggleTask(id: number) {
      tasks.value = tasks.value.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    }

    function deleteTask(id: number) {
      tasks.value = tasks.value.filter((t) => t.id !== id)
    }

    return {
      tasks,
      addTask,
      updateTask,
      toggleTask,
      deleteTask
    }
  },
  {
    persist: true
  }
)
