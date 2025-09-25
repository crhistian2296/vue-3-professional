<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import ContentLayout from '@/components/ContentLayout.vue';
import { courseStructure } from '@/data/courseStructure';

interface Props {
  moduleId: string;
  sectionId: string;
}

const props = defineProps<Props>();

const SectionContent = ref<any>(null);

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
  const content = await import(/* @vite-ignore */ section.value.mdxPath);
  SectionContent.value = content.default;
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
      <component :is="SectionContent" v-if="SectionContent" />
      <div v-else class="text-muted-foreground">
        Cargando contenido...
      </div>
    </article>
  </ContentLayout>
</template>
