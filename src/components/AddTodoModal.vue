<template>
  <div v-if="show" class="modal" @keydown.esc="onClose" tabindex="-1" ref="modalRoot" id="formModal">
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{ modalTitle }}</h3>
        <button id="modal-close" class="modal-close" @click="onClose" >&times;</button>
      </div>

      <div class="modal-body">
        <form @submit.prevent="onSubmit" class="input-group">
          <input
              v-model="form.text"
              ref="taskInput"
              type="text"
              placeholder="Add task"
              required
              autocomplete="off"
          />
          <button class="button" type="submit">{{ submitLabel }}</button>
        </form>
      </div>
    </div>
  </div>

</template>

<script setup>
import {ref, reactive, computed, watch, onMounted, onBeforeUnmount, nextTick} from 'vue';
  defineProps({
    show: { type: Boolean, required: true },
    editTask: { type: Object, default: null }
  });
  const emit = defineEmits(['add', 'update', 'close']);
  const form = reactive({
    text: ''
  });

  const taskInput = ref(null);
  const modalRoot = ref(null);
  const isEdit = computed(() => !!__props.editTask);
  const submitLabel = computed(() => (isEdit.value ? 'Save' : 'Add'));
  const modalTitle = computed(() => (isEdit.value ? 'Edit Task' : 'Add new task'));
  watch(
      () => __props.editTask,
      (newTask) => {
        if (newTask) {
          form.text = newTask.text || '';
          nextTick(() => taskInput.value && taskInput.value.focus());
        } else {
          form.text = '';
        }
      },
      { immediate: true }
  );
  watch(
      () => __props.show,
      (val) => {
        if (val) {
          nextTick(() => taskInput.value && taskInput.value.focus());
        }
      }
  );
  watch(() => __props.show, (val) => {
    console.log('Modal show prop changed:', val);
  });

function onSubmit() {
    const text = form.text.trim();
    if (!text) return;

    if (isEdit.value && __props.editTask) {
      emit('update', { id: __props.editTask.id, text });
    } else {
      const task = {
        id: Date.now(),
        text,
        done: false
      };
      emit('add', task);
    }

    form.text = '';
    emit('close');
  }
  function onClose() {
    emit('close');
  }
  function onClickOutside(e) {
    if (modalRoot.value && e.target === modalRoot.value) {
      onClose();
    }
  }
  onMounted(() => {
    window.addEventListener('click', onClickOutside);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('click', onClickOutside);
  });

</script>