<script setup lang="ts">
import { inject } from 'vue';
import { X } from 'lucide-vue-next';
import { cn } from '@/lib/utils';

interface Props {
  class?: string;
}

const props = defineProps<Props>();

const dialog = inject('dialog') as any;
</script>

<template>
  <div 
    :class="cn(
      'bg-background p-6 shadow-lg border rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto',
      props.class
    )"
    @click.stop
  >
    <button
      @click="dialog?.closeDialog"
      class="absolute top-4 right-4 p-1 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
    >
      <X class="h-4 w-4" />
    </button>
    <slot />
  </div>
</template>