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

<script setup>
import TodoItem from './TodoItem.vue';

defineProps({
  tasks: { type: Array, required: true }
});
</script>
