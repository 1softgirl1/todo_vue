<template>
  <div class="tasksContainer">
    <TodoItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
      @toggle="$emit('toggle', $event)"
      @delete="$emit('delete', $event)"
      @edit="$emit('edit', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import TodoItem from './TodoItem.vue'
import type { Todo } from '@/types'

defineProps<{ tasks: Todo[] }>()

defineEmits<{
  (e: 'toggle', id: number): void
  (e: 'delete', id: number): void
  (e: 'edit', id: number): void
}>()
</script>
