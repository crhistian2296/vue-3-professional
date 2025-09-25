<template>
  <div>
    <h4 class="font-semibold text-foreground mb-3">📝 Tarea:</h4>
    <div class="prose prose-sm max-w-none text-muted-foreground">
      <p>Reescribe el siguiente componente contador de Vue 2 (Options API) a Vue 3 usando Composition API con <code>&lt;script setup&gt;</code>:</p>

      <div class="bg-slate-900 rounded-lg p-4 mt-3 overflow-x-auto">
        <pre class="text-sm text-slate-100"><code>&lt;template&gt;
  &lt;div&gt;
    &lt;h2&gt;{{ title }}&lt;/h2&gt;
    &lt;p&gt;Valor: {{ counter }}&lt;/p&gt;
    &lt;button @click="increment"&gt;Incrementar&lt;/button&gt;
    &lt;button @click="reset"&gt;Reset&lt;/button&gt;
    &lt;p v-if="isEven"&gt;El número es par&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data() {
    return {
      title: 'Contador Vue 2',
      counter: 0
    }
  },
  methods: {
    increment() {
      this.counter++
    },
    reset() {
      this.counter = 0
    }
  },
  computed: {
    isEven() {
      return this.counter % 2 === 0
    }
  }
}
&lt;/script&gt;</code></pre>
      </div>

      <div class="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p class="text-sm text-blue-800 mb-2"><strong>💡 Pistas:</strong></p>
        <ul class="text-sm text-blue-700 space-y-1">
          <li>Usa <code>ref()</code> para datos reactivos</li>
          <li>Usa <code>computed()</code> para propiedades calculadas</li>
          <li>Las funciones se declaran directamente en el script</li>
          <li>No olvides el <code>.value</code> en las refs</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
