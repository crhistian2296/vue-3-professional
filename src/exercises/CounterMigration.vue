<template>
  <div class="counter p-4 border rounded-lg bg-white">
    <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
    <div class="space-y-4">
      <p class="text-lg">Valor: <span class="font-mono font-bold">{{ counter }}</span></p>
      <div class="flex space-x-2">
        <button 
          @click="increment"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Incrementar
        </button>
        <button 
          @click="reset"
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Reset
        </button>
      </div>
      <p v-if="isEven" class="text-green-600 font-medium">El número es par</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const title = ref('Contador Vue 3');
const counter = ref(0);

const increment = () => {
  counter.value++;
};

const reset = () => {
  counter.value = 0;
};

const isEven = computed(() => counter.value % 2 === 0);
</script>