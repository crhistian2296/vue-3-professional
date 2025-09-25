<script setup lang="ts">
import { inject } from 'vue';

const dialog = inject('dialog') as any;

const openDialog = () => {
  if (dialog?.isOpen) {
    dialog.isOpen.value = true;
  }
};
</script>

<template>
  <div @click="openDialog">
    <slot />
  </div>
</template>