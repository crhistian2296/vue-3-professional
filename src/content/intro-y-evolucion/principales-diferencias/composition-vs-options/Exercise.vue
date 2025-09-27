<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Valor: {{ counter }}</p>
    <button @click="increment">Incrementar</button>
    <button @click="reset">Reset</button>
    <p v-if="isEven">El número es par</p>
  </div>
</template>

<script>
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
</script>
