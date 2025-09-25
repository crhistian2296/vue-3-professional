<script setup lang="ts">
import highlightjs from '@highlightjs/vue-plugin';
import 'highlight.js/styles/atom-one-dark.css';

interface Props {
  code: string;
  language?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  language: 'javascript',
});

const { component: HighlightCode } = highlightjs;
</script>

<template>
  <div class="relative">
    <HighlightCode
      :language="language"
      :code="code"
      :class="['rounded-lg overflow-x-auto', props.class]"
    />
  </div>
</template>

<style>
/* Custom styles for highlight.js integration */
.hljs {
  padding: 1rem !important;
  border-radius: 0.5rem !important;
  font-family: 'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace !important;
  font-size: 0.875rem !important;
  line-height: 1.5 !important;
}
</style>
