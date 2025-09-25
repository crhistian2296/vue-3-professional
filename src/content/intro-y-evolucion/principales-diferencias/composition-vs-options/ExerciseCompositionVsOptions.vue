<script setup lang="ts">

import ExerciseComponent from "@/components/ExerciseComponent.vue";
import Content from "@/content/intro-y-evolucion/principales-diferencias/composition-vs-options/Content.vue";
import Solution from "@/content/intro-y-evolucion/principales-diferencias/composition-vs-options/Solution.vue";
</script>

<template>
  <ExerciseComponent
      module-id="intro-y-evolucion"
      section-id="principales-diferencias"
      exercise-id="composition-vs-options"
      title="Ejercicio 1: De Options API a Composition API"
      description="Practica la migración de Vue 2 a Vue 3 reescribiendo un componente contador usando la nueva sintaxis <script setup> y Composition API."
  >
    <template v-slot:content><Content></Content></template>
    <template v-slot:solution><Solution></Solution></template>
  </ExerciseComponent>
</template>
