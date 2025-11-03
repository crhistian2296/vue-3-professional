<template>
  <div class="max-w-md p-6 mx-auto bg-white shadow-lg rounded-xl">
    <h2 class="mb-6 text-2xl font-bold">{{ title }}</h2>

    <!-- Cart Items -->
    <div class="mb-6">
      <h3 class="mb-3 text-lg font-semibold">Productos en el carrito:</h3>
      <div v-for="item in items" :key="item.id" class="flex items-center justify-between p-3 mb-2 rounded bg-gray-50">
        <div>
          <span class="font-medium">{{ item.name }}</span>
          <span class="text-gray-500"> - €{{ item.price }}</span>
        </div>
        <div class="flex items-center space-x-2">
          <button @click="decrementQuantity(item.id)" class="px-2 py-1 text-sm text-white bg-red-500 rounded">-</button>
          <span class="mx-2">{{ item.quantity }}</span>
          <button @click="incrementQuantity(item.id)" class="px-2 py-1 text-sm text-white bg-green-500 rounded">+</button>
          <button @click="removeItem(item.id)" class="px-2 py-1 ml-2 text-sm text-white bg-gray-500 rounded">Eliminar</button>
        </div>
      </div>
    </div>

    <!-- Add New Item -->
    <div class="p-4 mb-6 rounded bg-blue-50">
      <h3 class="mb-2 font-semibold">Agregar producto:</h3>
      <div class="flex space-x-2">
        <input
          v-model="newItemName"
          placeholder="Nombre"
          class="flex-1 px-2 py-1 border rounded"
        />
        <input
          v-model="newItemPrice"
          type="number"
          placeholder="Precio"
          class="w-20 px-2 py-1 border rounded"
        />
        <button @click="addItem" class="px-3 py-1 text-white bg-blue-500 rounded">+</button>
      </div>
    </div>

    <!-- Apply discount -->
    <div class="p-4 mb-6 rounded bg-blue-50">
      <h3 class="mb-2 font-semibold">Aplicar descuento:</h3>
      <div class="flex items-center justify-between space-x-2">
        <button @click="toggleDiscount" class="px-3 py-1 text-white bg-blue-500 rounded">+</button>
        <p v-if="!hasDiscount" class="">{{discount}}</p>
      </div>
    </div>

    <!-- Cart Statistics (Manually Synchronized) -->
    <div class="p-4 bg-gray-100 rounded">
      <h3 class="mb-2 font-semibold">Resumen del carrito:</h3>
      <p><strong>Total de productos:</strong> {{ totalItems }}</p>
      <p><strong>Total de artículos únicos:</strong> {{ uniqueItemsCount }}</p>
      <p><strong>Precio total:</strong> €{{ totalPrice.toFixed(2) }}</p>
      <p><strong>Precio con descuento:</strong> €{{ discount }}</p>
      <p><strong>Precio promedio:</strong> €{{ averagePrice.toFixed(2) }}</p>
      <p v-if="hasExpensiveItems" class="text-orange-600"><strong>⚠️ Tienes productos caros (+€50)</strong></p>
      <p><strong>Estado del carrito:</strong> {{ cartStatus }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

// Reactive data
const title = ref('Carrito de Compras - Sincronización Manual');
const items = ref([
  { id: 1, name: 'Laptop', price: 999, quantity: 1 },
  { id: 2, name: 'Mouse', price: 25, quantity: 2 },
  { id: 3, name: 'Teclado', price: 75, quantity: 1 },
]);

const newItemName = ref('');
const newItemPrice = ref(0);
const hasDiscount = ref(false);

// PROBLEMA: Estado sincronizado manualmente (anti-patrón)
// Estas variables se actualizan manualmente en cada operación
const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0)); // 1 + 2 + 1
const uniqueItemsCount = computed( () => items.value.reduce((sum, item) => item.quantity > 0 ? sum + 1 : sum, 0)); // 3
const totalPrice = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity,0)); // 999 + (25*2) + 75
const averagePrice = computed(() => uniqueItemsCount.value > 0 ? totalPrice.value / totalItems.value : 0); // 1124 / 3
const hasExpensiveItems = computed(() => items.value.find((item) => item.price > 50 && item.quantity > 0)); // Laptop > 50
const cartStatus = computed(() => items.value.length === 0 ? 'Carrito vacío' : totalPrice.value > 500 ? 'Carrito premium' : 'Carrito con productos');
const discount = computed(() => (totalPrice.value * 0.75).toFixed(2));

// Helper function to recalculate all statistics (called after each operation)
// const updateCartStatistics = () => {
//   // Recalcular total de productos
//   totalItems.value = items.value.reduce((sum, item) => sum + item.quantity, 0);

//   // Recalcular productos únicos
//   uniqueItemsCount.value = items.value.length;

//   // Recalcular precio total
//   totalPrice.value = items.value.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   // Recalcular precio promedio
//   averagePrice.value = uniqueItemsCount.value > 0 ? totalPrice.value / uniqueItemsCount.value : 0;

//   // Verificar productos caros
//   hasExpensiveItems.value = items.value.some((item) => item.price > 50);

//   // Estado del carrito
//   if (items.value.length === 0) {
//     cartStatus.value = 'Carrito vacío';
//   } else if (totalPrice.value > 500) {
//     cartStatus.value = 'Carrito premium';
//   } else {
//     cartStatus.value = 'Carrito con productos';
//   }
// };

const incrementQuantity = (id: number) => {
  const item = items.value.find((item) => item.id === id);
  if (item) {
    item.quantity++;
    // updateCartStatistics(); // ¡Sincronización manual requerida!
  }
};

const decrementQuantity = (id: number) => {
  const item = items.value.find((item) => item.id === id);
  if (item && item.quantity > 0) {
    item.quantity--;
    // updateCartStatistics(); // ¡Sincronización manual requerida!
  }
};

const removeItem = (id: number) => {
  items.value = items.value.filter((item) => item.id !== id);
  // updateCartStatistics(); // ¡Sincronización manual requerida!
};

const addItem = () => {
  if (newItemName.value && newItemPrice.value > 0) {
    const newId = Math.max(...items.value.map((item) => item.id)) + 1;
    items.value.push({
      id: newId,
      name: newItemName.value,
      price: newItemPrice.value,
      quantity: 1,
    });
    newItemName.value = '';
    newItemPrice.value = 0;
    // updateCartStatistics(); // ¡Sincronización manual requerida!
  }
};

const toggleDiscount = () => {
  hasDiscount.value = !hasDiscount.value;
}
</script>
