<script setup lang="ts">
import { ref, provide, watch } from 'vue';

interface Props {
  open?: boolean;
}

interface Emits {
  (e: 'update:open', value: boolean): void;
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
});

const emit = defineEmits<Emits>();

const isOpen = ref(props.open);

watch(() => props.open, (newValue) => {
  isOpen.value = newValue;
});

watch(isOpen, (newValue) => {
  emit('update:open', newValue);
});

const closeDialog = () => {
  isOpen.value = false;
};

// Provide dialog context
provide('dialog', {
  isOpen,
  closeDialog,
});
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 bg-black/50 backdrop-blur-sm"
      @click="closeDialog"
    ></div>
    
    <!-- Dialog content -->
    <div class="relative z-50">
      <slot />
    </div>
  </div>
</template>