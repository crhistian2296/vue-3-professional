<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import ContentLayout from '@/components/ContentLayout.vue';
import {courseStructure} from '../data/courseStructure.ts';
import {Button, Card, CardContent, CardHeader, CardTitle} from '@/components/ui';
import MdxRenderer from '@/components/MdxRenderer.vue';

interface Props {
  moduleId: string;
}

const props = defineProps<Props>();

const router = useRouter();

const module = courseStructure.modules.find(m => m.id === props.moduleId);
const moduleContent = ref<any>(null);

onMounted(async () => {
      const content = await import(/* @vite-ignore */ module.mdxPath);
      moduleContent.value = content.default;
});

const navigateToSection = (sectionId: string) => {
  router.push(`/modules/${props.moduleId}/${sectionId}`);
};
</script>

<template>
  <ContentLayout>
      <div v-if="module" class="space-y-8">
        <!-- Module Header -->
        <div class="text-center space-y-4">
          <h1 class="text-4xl font-bold text-foreground">{{ module.title }}</h1>
          <p class="text-xl text-muted-foreground max-w-3xl mx-auto">{{ module.description }}</p>
        </div>

        <article class="prose prose-lg max-w-none">
          <MdxRenderer :content="moduleContent" />
        </article>

        <!-- Sections Grid -->
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card
              v-for="section in module.sections"
              :key="section.id"
              class="cursor-pointer hover:shadow-lg transition-shadow"
              @click="navigateToSection(section.id)"
          >
            <CardHeader>
              <CardTitle class="text-xl">{{ section.title }}</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500">
                {{ section.exercises.length }} ejercicio{{ section.exercises.length !== 1 ? 's' : '' }}
              </span>
                <Button>
                  Comenzar sección →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div v-else class="text-center py-12">
        <h1 class="text-2xl font-bold text-gray-900 mb-4">Módulo no encontrado</h1>
        <p class="text-gray-600 mb-6">El módulo no pudo ser encontrado.</p>
        <button
            @click="router.push('/')"
            class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Volver al inicio
        </button>
      </div>
  </ContentLayout>
</template>
