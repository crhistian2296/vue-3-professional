<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold">TypeScript: tipando props y emits</h1>

    <div class="space-y-2">
      <p class="text-muted-foreground">
        Punto de partida sin tipos estáticos en <code>defineProps</code> y <code>defineEmits</code>. Añade TypeScript.
      </p>
      <ul class="list-disc pl-5 text-sm text-muted-foreground">
        <li>Tipa las props con generics de <code>defineProps&lt;T&gt;()</code>.</li>
        <li>Tipa los eventos con <code>defineEmits&lt;T&gt;()</code> usando tuplas.</li>
        <li>Marca opcionales y añade defaults donde aplique.</li>
      </ul>
    </div>

    <div class="border rounded-md p-4 bg-white space-y-4">
      <h2 class="font-semibold">Vista previa</h2>

      <div class="flex gap-2 items-center">
        <span class="text-sm text-muted-foreground">Foo:</span>
        <span class="px-2 py-1 bg-gray-100 rounded">{{ props.foo }}</span>
        <span class="text-sm text-muted-foreground ml-4">Bar:</span>
        <span class="px-2 py-1 bg-gray-100 rounded">{{ props.bar ?? '—' }}</span>
      </div>

      <div class="flex gap-2">
        <button class="px-3 py-1.5 text-sm rounded bg-blue-600 text-white hover:bg-blue-700" @click="emit('change', 1)">
          Emit change(1)
        </button>
        <button class="px-3 py-1.5 text-sm rounded bg-emerald-600 text-white hover:bg-emerald-700" @click="emit('update', input)">
          Emit update(input)
        </button>
        <input v-model="input" class="px-2 py-1 border rounded" placeholder="nuevo valor" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  foo: { type: String, required: true },
  bar: Number,
})

const emit = defineEmits(['change', 'update'])

const input = ref('2020')
</script>
