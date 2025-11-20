<template>
  <div :class="['task-card', { done: task.done }]">
    <span :class="{ done: task.done }">{{ task.text }}</span>
    <div class="actions">
      <input type="checkbox" :checked="task.done" @change="$emit('toggle', task.id)" />
      <button class="edit" @click="$emit('edit', task.id)"></button>
      <button class="delete" @click="$emit('delete', task.id)">✕</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  task: { type: Object, required: true }
});
</script>