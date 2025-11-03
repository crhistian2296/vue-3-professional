<template>
  <div class="max-w-2xl p-6 mx-auto">
    <h1 class="mb-6 text-2xl font-bold">Lista de Tareas</h1>

    <!-- Formulario básico -->
    <form class="mb-6" @submit.prevent="todoStore.addTodo()">
      <div class="flex gap-2">
        <input
          v-model="todoStore.newTodoText"
          placeholder="¿Qué necesitas hacer?"
          class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" class="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">Añadir</button>
      </div>
    </form>
    <div>
      <span>Filter complete todos: </span>
      <input
        type="checkbox"
        :checked="todoStore.filterState"
        @change="todoStore.toggleFilter"
      />
    </div>

    <!-- Lista básica de todos -->
    <ul class="space-y-2">
      <div v-if="todoStore.filterState">
        <li 
          v-for="todo in todoStore.filterComplete()" 
          :key="todo.id" 
          class="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-md"
        >
          <input 
            type="checkbox" 
            :checked="todo.completed"
            @change="todoStore.toggleTodo(todo.id)"
            class="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
          />
          <span 
            class="flex-1"
            :class="{ 'line-through text-gray-400': todo.completed }"
          >
            {{ todo.text }}
          </span>
          <button
            @click="todoStore.deleteTodo(todo.id)"
            class="px-3 py-1 text-sm text-red-600 rounded hover:bg-red-50"
          >
            Eliminar
          </button>
        </li>
      </div>
      <div v-else>
      <li 
        v-for="todo in todoStore.todos" 
        :key="todo.id" 
        class="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-md"
      >
        <input 
          type="checkbox" 
          :checked="todo.completed"
          @change="todoStore.toggleTodo(todo.id)"
          class="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
        />
        <span 
          class="flex-1"
          :class="{ 'line-through text-gray-400': todo.completed }"
        >
          {{ todo.text }}
        </span>
        <button
          @click="todoStore.deleteTodo(todo.id)"
          class="px-3 py-1 text-sm text-red-600 rounded hover:bg-red-50"
        >
          Eliminar
        </button>
      </li>
      </div>
    </ul>

    <!-- Mensaje si no hay todos -->
    <p v-if="todoStore.todos.length === 0" class="mt-4 text-center text-gray-500">
      No hay tareas aún. ¡Añade tu primera tarea!
    </p>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/stores/todos';

const todoStore = useTodoStore()
</script>
