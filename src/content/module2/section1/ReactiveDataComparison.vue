<script setup lang="ts">
import VueComparison from "@/components/VueComparison.vue";
</script>

<template>
  <VueComparison
      left-title="Options API - Reactive Data"
      right-title="Composition API - Reactive Data"
      left-label="Options API"
      right-label="Composition API"
      left-component="ReactiveDataOptions"
      right-component="ReactiveDataComposition"
      base-path="module2/section1"
  />
</template>