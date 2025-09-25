<script setup lang="ts">
import VueComparison from "@/components/VueComparison.vue";
import Vue2Example from "./Vue2Example.vue";
import Vue3Example from "./Vue3Example.vue";
</script>

<template>
  <VueComparison
      leftTitle="Vue 2 - Options API"
      rightTitle="Vue 3 - Composition API"
      leftLabel="Vue 2 (Options API)"
      rightLabel="Vue 3 (Composition API"
  >
    <template v-slot:left><Vue2Example></Vue2Example></template>
    <template v-slot:right><Vue3Example></Vue3Example></template>
  </VueComparison>

</template>

<style scoped>

</style>
