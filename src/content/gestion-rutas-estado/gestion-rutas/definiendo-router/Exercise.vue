<template>
  <section class="space-y-3">
    <h2 class="text-base font-medium">Zona de práctica: Router embebido (sandbox)</h2>
    <p class="text-sm text-muted-foreground">
      Edita el código comentado en el <code>&lt;script setup&gt;</code> para migrar de Vue Router v3 a v4.
      Esta sección monta una mini‑app con su propio router usando <em>memory history</em>,
      sin tocar el router global de la aplicación.
    </p>
    <div ref="mountEl" class="rounded-md border p-3">
      <p class="text-xs text-muted-foreground">Cargando sandbox…</p>
    </div>
  </section>
</template>

<script setup lang="ts">
// ==========================
// Referencia: Vue Router v3
// (Vue 2) — SOLO REFERENCIA
// ==========================
// import Vue from 'vue'
// import VueRouter from 'vue-router'
// import App from './App.vue'
// import Home from './pages/Home.vue'
// import About from './pages/About.vue'
//
// Vue.use(VueRouter)
//
// const routerV3 = new VueRouter({
//   mode: 'history',
//   routes: [
//     { path: '/', name: 'home', component: Home },
//     { path: '/about', name: 'about', component: About },
//     // En v3 la catch‑all era '*'
//     { path: '*', name: 'not-found', component: () => import('./pages/NotFound.vue') },
//   ],
// })
//
// new Vue({
//   router: routerV3,
//   render: (h) => h(App),
// }).$mount('#app')

// ==========================
// Implementación real (v4)
// Mini‑app con router embebido
// ==========================
import {createMemoryHistory, createRouter} from 'vue-router'
import {About, Home, NotFound, useSandBoxRouter} from './components.ts'
import {ref} from "vue";


// 2) Rutas del sandbox (v4)
const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/about', name: 'about', component: About },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
]

// 3) Router de memoria para no tocar el URL del navegador
const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

const mountEl = ref<HTMLElement | null>(null)
useSandBoxRouter(router, mountEl)
</script>

