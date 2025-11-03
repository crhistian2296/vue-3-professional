# Store de Todos con Pinia

Este store gestiona el estado de la lista de tareas usando Pinia con Composition API.

## Estructura

```typescript
interface Todo {
  id: number
  text: string
  completed: boolean
}
```

## Estado

- `todos`: Array de tareas
- `newTodoText`: Texto del input para nuevas tareas

## Acciones

- `addTodo()`: Añade una nueva tarea
- `toggleTodo(id)`: Marca/desmarca una tarea como completada
- `deleteTodo(id)`: Elimina una tarea

## Uso en componentes

```vue
<script setup lang="ts">
import { useTodoStore } from '@/stores/todos'

const todoStore = useTodoStore()
</script>

<template>
  <input v-model="todoStore.newTodoText" />
  <button @click="todoStore.addTodo()">Añadir</button>
  
  <ul>
    <li v-for="todo in todoStore.todos" :key="todo.id">
      {{ todo.text }}
    </li>
  </ul>
</template>
```
