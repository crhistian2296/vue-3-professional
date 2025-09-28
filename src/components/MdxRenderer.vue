<script setup lang="ts">
import { MDXProvider } from '@mdx-js/vue';
import { type Component, h } from 'vue';
import CodeBlock from './CodeBlock.vue';

interface Props {
  content: Component;
}

const props = defineProps<Props>();

// custom wrapper that forwards props
const CodeWithProps = (props: any, { slots }: any) => {
  // Extract code content from children or slots
  const children = props.children ?? (slots.default && slots.default());
  let code = '';
  let language = 'javascript';

  // Handle different children structures
  if (children) {
    if (Array.isArray(children)) {
      // If children is an array, look for the code element
      const codeChild = children.find(
        (child: any) => (child && child.type === 'code') || (child.props && child.props.className)
      );
      if (codeChild) {
        if (
          codeChild.props &&
          codeChild.props.className &&
          typeof codeChild.props.className === 'string'
        ) {
          const match = codeChild.props.className.match(/language-(\w+)/);
          if (match) {
            language = match[1];
          }
        }
        if (codeChild.children) {
          code = Array.isArray(codeChild.children)
            ? codeChild.children.join('')
            : codeChild.children;
        }
      }
    } else if (children.props) {
      // MDX structure: pre > code with className like "language-vue"
      const codeProps = children.props;
      if (codeProps.className && typeof codeProps.className === 'string') {
        const match = codeProps.className.match(/language-(\w+)/);
        if (match) {
          language = match[1];
        }
      }

      // Extract the actual code content
      if (codeProps.children) {
        code = Array.isArray(codeProps.children) ? codeProps.children.join('') : codeProps.children;
      }
    } else if (typeof children === 'string') {
      code = children;
    }
  }

  return h(CodeBlock, {
    code,
    language,
    class: props.class + ' not-prose',
  });
};

const mdxComponents = {
  pre: CodeWithProps,
};
</script>

<template>
  <article class="prose prose-sm max-w-none">
    <MDXProvider :components="mdxComponents">
      <component
          :is="props.content"
          v-if="props.content"
          :components="mdxComponents"
      />
      <div v-else class="text-muted-foreground">
        Cargando contenido...
      </div>
    </MDXProvider>
  </article>
</template>
