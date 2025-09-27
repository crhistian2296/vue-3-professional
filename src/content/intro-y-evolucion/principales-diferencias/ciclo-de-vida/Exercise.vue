<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Contador: {{ counter }}</p>
    <button @click="increment">Incrementar</button>
    <p>Abre la consola para ver los mensajes del ciclo de vida</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Ciclo de Vida - Vue 2',
      counter: 0,
    };
  },
  mounted() {
    console.log('✅ mounted: Componente montado');
  },
  updated() {
    console.log('🔄 updated: Componente actualizado');
  },
  beforeUnmount() {
    console.log('🧹 beforeUnmount: Limpiando antes de desmontar');
  },
  methods: {
    increment() {
      this.counter++;
    },
  },
};
</script>
