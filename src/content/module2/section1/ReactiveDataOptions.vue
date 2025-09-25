<template>
  <div class="reactive-demo p-4 border rounded-lg bg-white">
    <h2 class="text-xl font-bold mb-4">Datos Reactivos - Options API</h2>
    
    <div class="space-y-6">
      <!-- Data Example -->
      <div class="border-l-4 border-blue-500 pl-4">
        <h3 class="font-semibold text-blue-700 mb-2">data() - Propiedades reactivas</h3>
        <p>Nombre: <span class="font-mono">{{ name }}</span></p>
        <input 
          v-model="name"
          class="mt-2 px-3 py-1 border rounded"
          placeholder="Escribe tu nombre"
        />
      </div>

      <!-- Object Data Example -->
      <div class="border-l-4 border-green-500 pl-4">
        <h3 class="font-semibold text-green-700 mb-2">data() - Objetos</h3>
        <p>Email: <span class="font-mono">{{ user.email }}</span></p>
        <p>Edad: <span class="font-mono">{{ user.age }}</span></p>
        <div class="mt-2 space-y-2">
          <input 
            v-model="user.email"
            class="block px-3 py-1 border rounded"
            placeholder="Email"
          />
          <input 
            v-model.number="user.age"
            type="number"
            class="block px-3 py-1 border rounded"
            placeholder="Edad"
          />
        </div>
      </div>

      <!-- Computed Example -->
      <div class="border-l-4 border-purple-500 pl-4">
        <h3 class="font-semibold text-purple-700 mb-2">computed - Propiedades calculadas</h3>
        <p class="font-medium">{{ fullProfile }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'Vue Developer',
      user: {
        email: 'developer@vue.js',
        age: 25
      }
    }
  },
  computed: {
    fullProfile() {
      return `${this.name} (${this.user.email}) - ${this.user.age} años`
    }
  }
}
</script>