<script setup lang="ts">
import VueComparison from "@/components/VueComparison.vue";
</script>

<template>
  <VueComparison
      left-title="Vue 2 - Options API"
      right-title="Vue 3 - Composition API"
      left-label="Vue 2 (Options API)"
      right-label="Vue 3 (Composition API)"
      left-component="Vue2Example"
      right-component="Vue3Example"
  >
  </VueComparison>
</template>

