<template>
  <label>
    <input
      id="searchInput"
      v-model="localQuery"
      type="text"
      placeholder="Search task"
      @input="emitSearch"
    />
  </label>
  <button id="searchButton" class="button" @click="emitSearch">
    <img src="../assets/magnifier_white.png" alt="search" />
  </button>
</template>

<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'

const props = defineProps<{ modelValue?: string }>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search', value: string): void
}>()

const localQuery: Ref<string> = ref(props.modelValue ?? '')

watch(
  () => props.modelValue,
  (newVal) => {
    localQuery.value = newVal ?? ''
  }
)

function emitSearch(): void {
  emit('update:modelValue', localQuery.value)
  emit('search', localQuery.value)
}
</script>
