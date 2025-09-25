<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-markup';

interface Props {
  code: string;
  language?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  language: 'javascript',
});

const codeRef = ref<HTMLElement>();

onMounted(() => {
  if (codeRef.value) {
    Prism.highlightElement(codeRef.value);
  }
});
</script>

<template>
  <div class="relative">
    <pre :class="['rounded-lg overflow-x-auto', props.class]"><code 
      ref="codeRef" 
      :class="`language-${language}`"
      v-text="code"
    /></pre>
  </div>
</template>

<style>
/* Override Prism theme for better integration */
pre[class*="language-"] {
  background: #1a1a1a !important;
  padding: 1rem !important;
  margin: 0 !important;
  border-radius: 0.5rem !important;
}

code[class*="language-"] {
  color: #f8f8f2 !important;
  font-family: 'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace !important;
  font-size: 0.875rem !important;
  line-height: 1.5 !important;
}
</style>