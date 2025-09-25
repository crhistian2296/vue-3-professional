<template>
  <div class="composables-demo p-4 border rounded-lg bg-white">
    <h2 class="text-xl font-bold mb-4">Composables en Acción</h2>
    
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Counter Composable -->
      <div class="border rounded-lg p-4">
        <h3 class="font-semibold mb-3">useCounter</h3>
        <p class="text-2xl font-bold mb-3">{{ count }}</p>
        <div class="space-x-2">
          <button 
            @click="increment"
            class="px-3 py-1 bg-green-500 text-white rounded text-sm"
          >
            +
          </button>
          <button 
            @click="decrement"
            class="px-3 py-1 bg-red-500 text-white rounded text-sm"
          >
            -
          </button>
          <button 
            @click="reset"
            class="px-3 py-1 bg-gray-500 text-white rounded text-sm"
          >
            Reset
          </button>
        </div>
      </div>

      <!-- Mouse Position Composable -->
      <div class="border rounded-lg p-4">
        <h3 class="font-semibold mb-3">useMouse</h3>
        <p class="text-sm text-gray-600">Mueve el mouse sobre esta área</p>
        <div 
          @mousemove="updateMouse"
          class="h-24 bg-gray-100 rounded mt-2 flex items-center justify-center cursor-crosshair"
        >
          <span class="font-mono text-sm">
            x: {{ x }}, y: {{ y }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// useCounter composable (inline for simplicity)
const count = ref(0);
const increment = () => count.value++;
const decrement = () => count.value--;
const reset = () => (count.value = 0);

// useMouse composable (inline for simplicity)
const x = ref(0);
const y = ref(0);

const updateMouse = (event: MouseEvent) => {
  const rect = (event.target as HTMLElement).getBoundingClientRect();
  x.value = Math.round(event.clientX - rect.left);
  y.value = Math.round(event.clientY - rect.top);
};
</script>