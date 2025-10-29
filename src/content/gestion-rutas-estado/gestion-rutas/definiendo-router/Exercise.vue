<template>
  <section class="space-y-3">
    <h2 class="text-base font-medium">Zona de práctica: Router embebido (sandbox)</h2>
    <p class="text-sm text-muted-foreground">
      Edita el código comentado en el <code>&lt;script setup&gt;</code> para migrar de Vue Router v3 a v4.
      Esta sección monta una mini‑app con su propio router usando <em>memory history</em>,
      sin tocar el router global de la aplicación.
    </p>
    <div ref="mountEl" class="rounded-md border p-3">
      <!-- Aquí se montará la mini‑app con RouterView -->
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
import { ref, onMounted, onBeforeUnmount, h, defineComponent } from 'vue'
import { createRouter, createMemoryHistory, RouterView, RouterLink, useRouter } from 'vue-router'
import { createApp } from 'vue'
import {Button} from "@/components/ui";

const Home = defineComponent({
  name: 'SandboxHome',
  setup() {
    const router = useRouter()
    return () =>
      h('div', { class: 'space-y-2' }, [
        h('h3', { class: 'font-semibold' }, 'Home (sandbox)'),
        h('div', { class: 'space-x-2' }, [
          h(
            RouterLink,
            { class: 'underline', to: '/' },
            { default: () => 'Home' }
          ),
          h('span', null, '|'),
          h(
            RouterLink,
            { class: 'underline', to: '/about' },
            { default: () => 'About' }
          ),
        ]),
        h(
          'button',
          { class: 'btn', onClick: () => router.push({ name: 'about' }) },
          'Ir a About'
        ),
        h(
          'button',
          { class: 'btn', onClick: () => router.push({ name: 'not-found' }) },
          'Ir a ruta inexistente'
        ),
      ])
  },
})

const About = defineComponent({
  name: 'SandboxAbout',
  setup() {
    const router = useRouter()
    return () =>
      h('div', { class: 'space-y-2' }, [
        h('h3', { class: 'font-semibold' }, 'About (sandbox)'),
        h('div', { class: 'space-x-2' }, [
          h(
            RouterLink,
            { to: '/', class: 'underline' },
            { default: () => 'Home' }
          ),
          h('span', null, '|'),
          h(
            RouterLink,
            { to: '/about', class: 'underline' },
            { default: () => 'About' }
          ),
        ]),
        h(
          Button,
          { class: 'btn', onClick: () => router.push({ name: 'home' }) },
          'Volver a Home'
        ),
      ])
  },
})

const NotFound = defineComponent({
  name: 'SandboxNotFound',
  setup() {
    const router = useRouter()
    return () => h('div', [
      h('h3', { class: 'font-semibold' }, 'Not found'),
      h(
          Button,
          { onClick: () => router.push({ name: 'home' }) },
          'Volver a Home'
      )
    ])
  },
})

// 2) Rutas del sandbox (v4)
const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/about', name: 'about', component: About },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
]

// 3) Router de memoria para no tocar el URL del navegador
const sandboxRouter = createRouter({
  history: createMemoryHistory(),
  routes,
})

// 4) Montaje/Desmontaje de la mini‑app dentro de este componente
const mountEl = ref<HTMLElement | null>(null)
let sandboxApp: ReturnType<typeof createApp> | null = null

onMounted(async () => {
  if (!mountEl.value) return
  sandboxApp = createApp({
    // La mini‑app solo renderiza el RouterView
    render: () => h(RouterView),
  })
  sandboxApp.use(sandboxRouter)
  // Si quieres esperar la primera navegación:
  // await sandboxRouter.isReady()
  sandboxApp.mount(mountEl.value)
})

onBeforeUnmount(() => {
  if (sandboxApp) {
    sandboxApp.unmount()
    sandboxApp = null
  }
})
</script>

