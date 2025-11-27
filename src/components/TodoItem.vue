<template>
  <div :class="['task-card', { done: task.done }]">
    <span :class="{ done: task.done }">{{ task.text }}</span>
    <div class="actions">
      <input
        type="checkbox"
        :checked="task.done"
        @change="$emit('toggle', task.id)"
      />
      <button class="edit" @click="$emit('edit', task.id)"></button>
      <button class="delete" @click="$emit('delete', task.id)">✕</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from '@/types'

// объявление типа props без присваивания — используется в шаблоне
defineProps<{ task: Todo }>()

// объявление emits без присваивания — события эмитятся из шаблона
defineEmits<{
  (e: 'toggle', id: number): void
  (e: 'edit', id: number): void
  (e: 'delete', id: number): void
}>()
</script>
