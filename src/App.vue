<template>
  <main>
    <section class="top">

      <div id="searchTask" class="form">
        <label>
          <input id="searchInput" type="text" placeholder="Search task"/>
        </label>
        <button id="searchButton" class="button" ><img src="./assets/magnifier_white.png"></button>
        <button id="createTaskButton" @click="openCreate" class="button"><img src="./assets/plus.svg"></button>
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
      <p>Task to do - <span id="taskCount">0</span></p>
      <div id="tasksContainer" class="tasksContainer">
      </div>
    </section>
    <section id="doneTasks" class="tasks">
      <p>Done - <span id="doneCount">0</span></p>
      <div id="doneTasksContainer" class="tasksContainer">
      </div>
    </section>
  </main>
  <button id='theme' class="switch" data-switch-dark aria-hidden></button>
</template>

<script setup>
  import { ref, reactive, computed, watch, onMounted } from 'vue';
  import AddTodoModal from './components/AddTodoModal.vue';
  const isModalOpen = ref(false);
  const editingTask = ref(null);

  const tasks = ref([]);

  // загрузка из localStorage
  onMounted(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks.value = Array.isArray(saved) ? saved : [];
    } catch (e) {
      tasks.value = [];
    }
  });

  // watch: сохраняем изменения в localStorage
  watch(
      tasks,
      (newVal) => {
        localStorage.setItem('tasks', JSON.stringify(newVal));
      },
      { deep: true }
  );

  const todoCount = computed(() => tasks.value.filter(t => !t.done).length);
  const doneCount = computed(() => tasks.value.filter(t => t.done).length);

  function openCreate() {
    editingTask.value = null;
    isModalOpen.value = true;
  }

  function closeModal() {
    isModalOpen.value = false;
    editingTask.value = null;
  }
  function handleAdd(task) {
    tasks.value = [task, ...tasks.value];
  }
  function handleUpdate({ id, text }) {
    tasks.value = tasks.value.map(t => (t.id === id ? { ...t, text } : t));
  }

</script>

