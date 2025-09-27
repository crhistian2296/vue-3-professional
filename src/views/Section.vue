<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import ContentLayout from '../components/ContentLayout.vue';
import { courseStructure } from '../data/courseStructure.ts';
import MdxRenderer from '../components/MdxRenderer.vue';

interface Props {
  moduleId: string;
  sectionId: string;
}

const props = defineProps<Props>();

const SectionContent = ref<unknown>(null);

const module = computed(() => {
  return courseStructure.modules.find((m) => m.id === props.moduleId);
});

const section = computed(() => {
  return module.value?.sections.find((s) => s.id === props.sectionId);
});

const sectionTitle = computed(() => {
  return section.value?.title || `Sección ${props.sectionId}`;
});

onMounted(async () => {
  if (section.value) {
    const content = await import(/* @vite-ignore */ section.value.mdxPath);
    SectionContent.value = content.default;
  }
});
</script>

<template>
  <ContentLayout>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-foreground mb-4">
        {{ sectionTitle }}
      </h1>
    </div>

    <article class="prose prose-lg max-w-none">
      <MdxRenderer :content="SectionContent" />
    </article>
  </ContentLayout>
</template>
