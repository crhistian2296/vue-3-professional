<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavigationSidebar from '@/components/NavigationSidebar.vue';
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <NavigationSidebar />
    <main class="flex-1 ml-80">
      <div class="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>
