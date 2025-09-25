<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { Button } from '@/components/ui'

const activeTab = ref<'vue2' | 'vue3'>('vue2')

const vue2Code = `<template>
  <div class="counter">
    <h2>{{ title }}</h2>
    <p>Contador: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <p v-if="isEven">El número es par</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Mi Contador',
      count: 0
    }
  },
  computed: {
    isEven() {
      return this.count % 2 === 0
    }
  },
  methods: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    }
  }
}
</scr' + 'ipt>`

const vue3Code = `<template>
  <div class="counter">
    <h2>{{ title }}</h2>
    <p>Contador: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <p v-if="isEven">El número es par</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const title = ref('Mi Contador')
const count = ref(0)

const isEven = computed(() => count.value % 2 === 0)

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}
</scr' + 'ipt>`
</script>

<template>
  <div class="vue-comparison">
    <div class="mb-6">
      <div class="flex space-x-2 mb-4">
        <Button 
          :variant="activeTab === 'vue2' ? 'default' : 'outline'"
          @click="activeTab = 'vue2'"
        >
          Vue 2 (Options API)
        </Button>
        <Button 
          :variant="activeTab === 'vue3' ? 'default' : 'outline'"
          @click="activeTab = 'vue3'"
        >
          Vue 3 (Composition API)
        </Button>
      </div>
    </div>

    <Card>
      <CardHeader>
        <CardTitle>
          {{ activeTab === 'vue2' ? 'Vue 2 - Options API' : 'Vue 3 - Composition API' }}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="bg-slate-900 rounded-lg p-4 overflow-x-auto">
          <pre class="text-sm text-slate-100"><code>{{ activeTab === 'vue2' ? vue2Code : vue3Code }}</code></pre>
        </div>
        
        <div class="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 class="font-semibold text-blue-800 mb-2">
            {{ activeTab === 'vue2' ? 'Características de Vue 2:' : 'Características de Vue 3:' }}
          </h4>
          <ul class="text-sm text-blue-700 space-y-1">
            <li v-if="activeTab === 'vue2'">• Usa Options API con data(), methods, computed</li>
            <li v-if="activeTab === 'vue2'">• Lógica separada por tipo de opción</li>
            <li v-if="activeTab === 'vue2'">• Acceso directo a propiedades con `this`</li>
            <li v-if="activeTab === 'vue3'">• Usa Composition API con ref() y computed()</li>
            <li v-if="activeTab === 'vue3'">• Lógica agrupada por funcionalidad</li>
            <li v-if="activeTab === 'vue3'">• Mejor soporte para TypeScript</li>
            <li v-if="activeTab === 'vue3'">• Sintaxis &lt;script setup&gt; más concisa</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.vue-comparison {
  max-width: 100%;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>