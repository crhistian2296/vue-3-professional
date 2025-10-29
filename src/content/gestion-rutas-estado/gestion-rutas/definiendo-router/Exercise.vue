<template>
  <section class="space-y-6">
    <header>
      <h2 class="text-xl font-semibold">Ejercicio: Migrar Vue Router v3 (Vue 2) a Vue Router v4 (Vue 3)</h2>
      <p class="text-muted-foreground">Usa este ejercicio guiado para practicar la migración de un router típico de Vue 2 a Vue 3.</p>
    </header>

    <div class="grid gap-6 md:grid-cols-2">
      <div class="space-y-3">
        <h3 class="font-medium">Código de partida (Vue 2 + Vue Router v3)</h3>
        <p>Imagina que este es tu código existente:</p>
        <pre class="not-prose overflow-auto rounded border p-3 bg-muted">
<code class="language-js">// main.js (Vue 2)
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import About from './pages/About.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '*', name: 'not-found', component: () => import('./pages/NotFound.vue') },
  ],
})

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
</code>
        </pre>
        <pre class="not-prose overflow-auto rounded border p-3 bg-muted">
<code class="language-vue"><!-- Home.vue (Options API) -->
<template>
  <div>
  <h1>Test</h1>
    <h1>Home</h1>
    <button @click="$router.push({ name: 'about' })">Ir a About</button>
    <p>Ruta actual: {{$route.name}}</p>
  </div>
</template>

<script setup></script>
<script>
export default {
  name: 'Home',
}
</script>
</code>
        </pre>
      </div>

      <div class="space-y-3">
        <h3 class="font-medium">Objetivo (Vue 3 + Vue Router v4)</h3>
        <ol class="list-decimal pl-5 space-y-1">
          <li>Crea el router con <code>createRouter</code> y <code>createWebHistory</code>.</li>
          <li>Declara rutas: <code>home</code>, <code>about</code> y la ruta catch-all <code>/:pathMatch(.*)*</code>.</li>
          <li>Registra el router en la app con <code>app.use(router)</code>.</li>
          <li>En un componente con <code>&lt;script setup&gt;</code>, usa <code>useRoute</code> y <code>useRouter</code> para navegar y leer la ruta actual.</li>
        </ol>

        <details class="rounded border p-3 bg-muted/40">
          <summary class="cursor-pointer font-medium">Pista de solución mínima</summary>
          <pre class="not-prose overflow-auto rounded border p-3 bg-muted mt-3">
<code class="language-js">// main.ts (Vue 3)
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

const routes = [
  { path: '/', name: 'home', component: () => import('./pages/Home.vue') },
  { path: '/about', name: 'about', component: () => import('./pages/About.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./pages/NotFound.vue') },
]

const router = createRouter({ history: createWebHistory(), routes })

createApp(App).use(router).mount('#app')
</code>
          </pre>
          <pre class="not-prose overflow-auto rounded border p-3 bg-muted mt-3">
<code class="language-vue">&lt;!-- Home.vue (script setup) --&gt;
&lt;script setup&gt;
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const currentName = computed(() =&gt; route.name)
const goAbout = () =&gt; router.push({ name: 'about' })
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;
    &lt;h1&gt;Home&lt;/h1&gt;
    &lt;button @click="goAbout"&gt;Ir a About&lt;/button&gt;
    &lt;p&gt;Ruta actual: {{ currentName }}&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;
</code>
          </pre>
        </details>
      </div>
    </div>

    <footer class="text-sm text-muted-foreground">
      Cuando termines, revisa la solución detallada en la pestaña “Solución”.
    </footer>
  </section>
</template>

<script setup lang="ts">
// Este componente solo muestra las instrucciones del ejercicio.
</script>

