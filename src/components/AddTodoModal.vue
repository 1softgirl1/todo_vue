<template>
  <div
    v-if="props.show"
    class="modal"
    @keydown.esc="onClose"
    tabindex="-1"
    ref="modalRoot"
    id="formModal"
  >
    <div class="modal-content">
      <div class="modal-header">
        <h3>{{ modalTitle }}</h3>
        <button id="modal-close" class="modal-close" @click="onClose">
          &times;
        </button>
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
          <button id="addButton" class="button" type="submit">
            {{ submitLabel }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  reactive,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick,
  type Ref
} from 'vue'
import type { Todo } from '@/types'

const props = defineProps<{ show: boolean; editTask: Todo | null }>()

const emit = defineEmits<{
  (e: 'add', task: Todo): void
  (e: 'update', payload: { id: number; text: string }): void
  (e: 'close'): void
}>()

const form = reactive<{ text: string }>({ text: '' })

const taskInput: Ref<HTMLInputElement | null> = ref(null)
const modalRoot: Ref<HTMLElement | null> = ref(null)

const isEdit = computed<boolean>(() => !!props.editTask)
const submitLabel = computed<string>(() => (isEdit.value ? 'Save' : 'Add'))
const modalTitle = computed<string>(() =>
  isEdit.value ? 'Edit Task' : 'Add new task'
)

watch(
  () => props.editTask,
  (newTask) => {
    if (newTask) {
      form.text = newTask.text || ''
      nextTick(() => taskInput.value && taskInput.value.focus())
    } else {
      form.text = ''
    }
  },
  { immediate: true }
)

watch(
  () => props.show,
  (val) => {
    if (val) {
      nextTick(() => taskInput.value && taskInput.value.focus())
    }
  }
)

function onSubmit(): void {
  const text = form.text.trim()
  if (!text) return

  if (isEdit.value && props.editTask) {
    emit('update', { id: props.editTask.id, text })
  } else {
    const task: Todo = {
      id: Date.now(),
      text,
      done: false
    }
    emit('add', task)
  }

  form.text = ''
  emit('close')
}

function onClose(): void {
  emit('close')
}

function onClickOutside(e: Event): void {
  if (modalRoot.value && e.target === modalRoot.value) {
    onClose()
  }
}

onMounted(() => {
  window.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', onClickOutside)
})
</script>
