<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Nombre: {{ name }}</p>
    <p>Edad: {{ age }}</p>
    <p>Email: {{ email }}</p>
    <button @click="updateName">Cambiar Nombre</button>
    <button @click="incrementAge">Incrementar Edad</button>
    <button @click="updateEmail">Cambiar Email</button>
    <button @click="reset">Resetear</button>
    <p v-if="isAdult">Es mayor de edad</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Perfil de Usuario',
      name: 'Juan',
      age: 25,
      email: 'juan@example.com',
    };
  },
  methods: {
    updateName() {
      this.name = 'María';
    },
    incrementAge() {
      this.age++;
    },
    updateEmail() {
      this.email = 'maria@example.com';
    },
    reset() {
      this.name = 'Juan';
      this.age = 25;
      this.email = 'juan@example.com';
    },
  },
  computed: {
    isAdult() {
      return this.age >= 18;
    },
  },
};
</script>
