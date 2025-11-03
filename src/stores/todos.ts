import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Todo {
  id: number
  text: string
  completed: boolean
}

export const useTodoStore = defineStore('todos', () => {
  const todos = ref<Todo[]>([])
  const newTodoText = ref<string>('')
  const filterState = ref(false)

  function addTodo(): void {
    if (newTodoText.value.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: newTodoText.value.trim(),
        completed: false,
      }
      todos.value.push(newTodo)
      newTodoText.value = ''
    }
  }

  function toggleTodo(id: number): void {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  function toggleFilter(): void {
    filterState.value = !filterState.value
  }

  function deleteTodo(id: number): void {
    const index = todos.value.findIndex(t => t.id === id)
    if (index !== -1) {
      todos.value.splice(index, 1)
    }
  }

  function filterComplete(): Todo[] {
    return todos.value.filter(todo => todo.completed === filterState.value)
  }

  return {
    todos,
    newTodoText,
    addTodo,
    toggleTodo,
    filterComplete,
    toggleFilter,
    filterState,
    deleteTodo,
  }
})
