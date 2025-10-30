<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Valor: {{ counter }}</p>
    <button @click="increment" class="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Incrementar</button>
    <button @click="reset" class="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700">Reset</button>
    <p v-if="isEven">El número es par</p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

const title = 'Contador Vue 3 by me';
const counter = ref(0);
const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const isEven = computed(() => counter.value % 2 === 0);

onMounted(() => {
  const storedValue = localStorage.getItem('counter');
  if (storedValue !== null) {
    counter.value = parseInt(storedValue);
  }
});

function increment() {
  counter.value++;
  setLocalStorage('counter', counter.value);
}

function reset() {
  counter.value = 0;
  setLocalStorage('counter', counter.value);
}
</script>

