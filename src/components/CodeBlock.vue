<script setup lang="ts">

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
    <div :class="['rounded-lg overflow-x-auto', props.class]">
      <highlightjs autodetect :code="code"/>
    </div>
  </div>
</template>
