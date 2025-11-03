<template>
  <div class="max-w-2xl mx-auto p-6 space-y-4">
    <h1 class="text-2xl font-bold">Capas: partimos de un componente monolítico</h1>

    <div class="flex items-center justify-between">
      <p class="text-muted-foreground">Carga una lista de TODOS desde jsonplaceholder</p>
      <button class="px-3 py-1.5 text-sm rounded bg-blue-600 text-white hover:bg-blue-700" @click="loadTodos">
        Volver a cargar
      </button>
    </div>

    <div class="border rounded-md p-4 bg-white">
      <h2 class="font-semibold mb-2">Resultado</h2>
      <div v-if="loading" class="text-sm text-muted-foreground">Cargando...</div>
      <div v-else-if="error" class="text-sm text-red-600">{{ error }}</div>
      <ul v-else class="list-disc pl-5 space-y-1">
        <li v-for="todo in todos" :key="todo.id" class="text-sm">
          <span :class="{ 'line-through text-muted-foreground': todo.completed }">{{ todo.title }}</span>
        </li>
      </ul>
    </div>

    <details class="border rounded-md p-4 bg-white text-sm">
      <summary class="cursor-pointer font-semibold">Código actual (monolítico)</summary>
      <p class="mt-2 mb-2 text-muted-foreground">
        Este componente mezcla UI (delivery), acceso a datos (infrastructure), contrato/modelo (domain) y el "caso de
        uso" (application). El objetivo del ejercicio es separar estas responsabilidades en sus capas correspondientes.
      </p>
      <pre class="whitespace-pre-wrap"><code>{{ monolithSnippet }}</code></pre>
    </details>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

// Tipos "de dominio" definidos aquí mismo (monolítico)
interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

const todos = ref<Todo[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

async function loadTodos() {
  loading.value = true
  error.value = null
  try {
    // Acceso a datos directo (infrastructure) desde el componente (delivery)
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    if (!response.ok) throw new Error(`HTTP ${response.status}`)

    // El componente asume el mapeo (DTO -> dominio)
    const data = (await response.json()) as Todo[]
    todos.value = data
  } catch (e) {
    error.value = e instanceof Error ? e.message : String(e)
  } finally {
    loading.value = false
  }
}

onMounted(loadTodos)

const monolithSnippet = `// delivery (UI) + application + domain + infrastructure en el mismo archivo
interface Todo { userId: number; id: number; title: string; completed: boolean }

async function loadTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
  if (!response.ok) throw new Error(
    'HTTP ' + response.status
  )
  const data = await response.json() // DTO ~== Dominio en este caso
  return data as Todo[]
}
`
</script>
