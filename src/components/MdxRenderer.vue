<script setup lang="ts">
import { computed, h } from 'vue';
import { MDXProvider } from '@mdx-js/vue';
import CodeBlock from '@/components/CodeBlock.vue';
import MyH1 from '@/components/mdx/MyH1.vue';

interface Props {
  content: any;
  additionalComponents?: Record<string, any>;
}

const props = withDefaults(defineProps<Props>(), {
  additionalComponents: () => ({}),
});

// Default custom component mappings
const defaultComponents = {
  h1: MyH1,
  code: CodeBlock,
  // Add more default mappings as needed
  pre: (props: any) => {
    // Handle pre blocks with code highlighting
    if (props.children?.props?.className?.includes('language-')) {
      const language = props.children.props.className.replace('language-', '');
      const code = props.children.props.children;
      return h(CodeBlock, { code, language });
    }
    return h('pre', props);
  },
};

// Merge default components with additional ones
const components = computed(() => ({
  ...defaultComponents,
  ...props.additionalComponents,
}));
</script>

<template>
  <MDXProvider :components="components">
    <component :is="content" v-if="content" />
    <div v-else class="text-muted-foreground">
      Cargando contenido...
    </div>
  </MDXProvider>
</template>
