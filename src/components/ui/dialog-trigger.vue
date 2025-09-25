<script setup lang="ts">
import { cn } from '@/lib/utils';

interface Props {
  class?: string;
  asChild?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <button 
    :class="cn(
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:pointer-events-none',
      'bg-primary text-primary-foreground hover:bg-primary/90',
      'h-10 px-4 py-2',
      props.class
    )"
  >
    <slot />
  </button>
</template></script>