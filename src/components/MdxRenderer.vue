<script setup lang="ts">
import { computed } from 'vue';
import { MDXProvider } from '@mdx-js/vue';
import CodeBlock from './CodeBlock.vue';

interface Props {
  content: any;
  additionalComponents?: Record<string, any>;
}

const props = withDefaults(defineProps<Props>(), {
  additionalComponents: () => ({}),
});

const defaultComponents = {
  code: CodeBlock,
};

// Merge default components with additional ones
const components = computed(() => ({
  ...defaultComponents,
  ...props.additionalComponents,
}));
</script>

<template>
  <article class="prose prose-sm max-w-none">
    <MDXProvider :components="components">
      <component :is="content" v-if="content"/>
      <div v-else class="text-muted-foreground">
        Cargando contenido...
      </div>
    </MDXProvider>
  </article>
</template>
