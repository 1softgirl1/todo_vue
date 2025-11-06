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

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(['update:modelValue', 'search']);

const localQuery = ref(props.modelValue);

watch(
    () => props.modelValue,
    (newVal) => {
      localQuery.value = newVal;
    }
);

function emitSearch() {
  emit('update:modelValue', localQuery.value);
  emit('search', localQuery.value);
}
</script>