<script setup lang="ts">
import 'highlight.js/styles/atom-one-dark.css';

interface Props {
  code: string;
  language?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  language: 'javascript',
});
</script>

<template>
  <div class="relative">
    <p
      :class="['rounded-lg overflow-x-auto', props.class]"
    >{{code}}</p>
  </div>
</template>
