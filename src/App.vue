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
  <button id='theme' class="switch" data-switch-dark aria-hidden></button>
</template>

<script setup>
  import { ref, reactive, computed, watch, onMounted } from 'vue';
  import AddTodoModal from './components/AddTodoModal.vue';
  import TodoList from './components/TodoList.vue';
  import SearchBar from './components/SearchBar.vue';


  const tasks = ref([]);
  const isModalOpen = ref(false);
  const editingTask = ref(null);
  const searchQuery = ref('');

  onMounted(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks.value = Array.isArray(saved) ? saved : [];
    } catch {
      tasks.value = [];
    }
  });

  watch(
      tasks,
      (newVal) => {
        localStorage.setItem('tasks', JSON.stringify(newVal));
      },
      { deep: true }
  );

  const todoCount = computed(() => tasks.value.filter(t => !t.done).length);
  const doneCount = computed(() => tasks.value.filter(t => t.done).length);

  const filteredTasks = computed(() =>
      tasks.value.filter(
          (t) =>
              !t.done &&
              t.text.toLowerCase().includes(searchQuery.value.trim().toLowerCase())
      )
  );
  const doneList = computed(() =>
      tasks.value.filter(
          (t) =>
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
    tasks.value = [task, ...tasks.value];
  }
  function handleUpdate({ id, text }) {
    tasks.value = tasks.value.map(t => (t.id === id ? { ...t, text } : t));
  }
  function deleteTask(id) {
    tasks.value = tasks.value.filter((t) => t.id !== id);
  }

  function toggleTask(id) {
    tasks.value = tasks.value.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
    );
  }
  function startEdit(id) {
    const found = tasks.value.find((t) => t.id === id);
    if (found) {
      editingTask.value = { ...found };
      isModalOpen.value = true;
    }
  }
  function onSearch(query) {
    searchQuery.value = query;
  }

</script>

