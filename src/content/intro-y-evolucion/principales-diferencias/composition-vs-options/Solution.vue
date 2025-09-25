<template>
  <div>
    <div class="bg-slate-900 rounded-lg p-4 overflow-x-auto mb-4">
      <pre class="text-sm text-slate-100"><code>&lt;template&gt;
  &lt;div&gt;
    &lt;h2&gt;{{ title }}&lt;/h2&gt;
    &lt;p&gt;Valor: {{ counter }}&lt;/p&gt;
    &lt;button @click="increment"&gt;Incrementar&lt;/button&gt;
    &lt;button @click="reset"&gt;Reset&lt;/button&gt;
    &lt;p v-if="isEven"&gt;El número es par&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref, computed } from 'vue'

const title = ref('Contador Vue 3')
const counter = ref(0)

const increment = () =&gt; {
  counter.value++
}

const reset = () =&gt; {
  counter.value = 0
}

const isEven = computed(() =&gt; counter.value % 2 === 0)
&lt;/script&gt;</code></pre>
    </div>

    <div class="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
      <h5 class="font-semibold text-green-800 mb-3">🔍 Explicación de la solución:</h5>
      <ul class="text-sm text-green-700 space-y-2">
        <li><strong><code>ref()</code> para datos reactivos:</strong> Reemplaza <code>data()</code> del Options API</li>
        <li><strong><code>computed()</code> para propiedades calculadas:</strong> Mantiene la misma funcionalidad pero con nueva sintaxis</li>
        <li><strong>Funciones directas:</strong> Los métodos ahora son funciones constantes declaradas directamente</li>
        <li><strong><code>.value</code> para acceder a refs:</strong> Necesario para leer/escribir valores de referencias reactivas</li>
        <li><strong>Imports explícitos:</strong> Vue 3 requiere importar las funciones que uses desde 'vue'</li>
      </ul>
    </div>

    <div class="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
      <h5 class="font-semibold text-yellow-800 mb-2">⚡ Beneficios de esta migración:</h5>
      <ul class="text-sm text-yellow-700 space-y-1">
        <li>• Mejor tree-shaking (solo importas lo que usas)</li>
        <li>• Código más conciso con <code>&lt;script setup&gt;</code></li>
        <li>• Mejor soporte para TypeScript</li>
        <li>• Lógica más organizada y reutilizable</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// No props needed for this static solution component
</script>
