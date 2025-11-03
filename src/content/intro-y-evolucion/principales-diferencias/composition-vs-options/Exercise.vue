<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Valor: {{ counter }}</p>
    <button @click="increment" class="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Incrementar</button>
    <button @click="reset" class="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700">Reset</button>
    <p v-if="isEven">El número es par</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Contador Vue 2',
      counter: 0,
    }
  },
  computed: {
    isEven() {
      return this.counter % 2 === 0
    },
  },
  methods: {
    increment() {
      this.counter++
    },
    reset() {
      this.counter = 0
    },
  },
}
</script>

