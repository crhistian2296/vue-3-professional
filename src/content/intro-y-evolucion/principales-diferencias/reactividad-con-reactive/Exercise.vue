<template>
  <div>
    <h2>{{ title }}</h2>
    <p>Nombre: {{ user.name }}</p>
    <p>Edad: {{ user.age }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Ciudad: {{ user.address.city }}</p>
    <p>País: {{ user.address.country }}</p>
    <button @click="updateName">Cambiar Nombre</button>
    <button @click="incrementAge">Incrementar Edad</button>
    <button @click="updateEmail">Cambiar Email</button>
    <button @click="updateAddress">Cambiar Dirección</button>
    <button @click="reset">Resetear</button>
    <p v-if="isAdult">Es mayor de edad</p>
    <p>Total de campos: {{ totalFields }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Perfil de Usuario Completo',
      user: {
        name: 'Juan',
        age: 25,
        email: 'juan@example.com',
        address: {
          city: 'Madrid',
          country: 'España',
        },
      },
    };
  },
  computed: {
    isAdult() {
      return this.user.age >= 18;
    },
    totalFields() {
      return Object.keys(this.user).length + Object.keys(this.user.address).length;
    },
  },
  methods: {
    updateName() {
      this.user.name = 'María';
    },
    incrementAge() {
      this.user.age++;
    },
    updateEmail() {
      this.user.email = 'maria@example.com';
    },
    updateAddress() {
      this.user.address.city = 'Barcelona';
      this.user.address.country = 'España';
    },
    reset() {
      this.user.name = 'Juan';
      this.user.age = 25;
      this.user.email = 'juan@example.com';
      this.user.address.city = 'Madrid';
      this.user.address.country = 'España';
    },
  },
};
</script>
