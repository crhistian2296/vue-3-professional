<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { courseStructure } from '@/data/courseStructure';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';

const route = useRoute();
const router = useRouter();

const moduleId = parseInt(route.params.moduleId as string);
const module = courseStructure.modules.find(m => m.id === moduleId);
const moduleContent = ref<any>(null);

onMounted(async () => {
  if (module?.mdxPath) {
    try {
      const content = await import(/* @vite-ignore */ module.mdxPath);
      moduleContent.value = content.default;
    } catch (error) {
      console.error('Error loading module content:', error);
    }
  }
});

const navigateToSection = (sectionId: string) => {
  router.push(`/modules/${moduleId}/${sectionId}`);
};
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Breadcrumbs -->
    <nav class="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <button @click="router.push('/')" class="hover:text-blue-600 transition-colors">
        Home
      </button>
      <span>/</span>
      <span class="text-gray-900 font-medium">{{ module?.title }}</span>
    </nav>

    <div v-if="module" class="space-y-8">
      <!-- Module Header -->
      <div class="text-center space-y-4">
        <h1 class="text-4xl font-bold text-gray-900">{{ module.title }}</h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">{{ module.description }}</p>
      </div>

      <!-- Module Content -->
      <div v-if="moduleContent" class="prose prose-lg max-w-4xl mx-auto">
        <component :is="moduleContent" />
      </div>

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
            <CardDescription>{{ section.description }}</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-500">
                {{ section.exercises.length }} exercise{{ section.exercises.length !== 1 ? 's' : '' }}
              </span>
              <button class="text-blue-600 hover:text-blue-800 font-medium">
                Start Section →
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <div v-else class="text-center py-12">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Module Not Found</h1>
      <p class="text-gray-600 mb-6">The requested module could not be found.</p>
      <button 
        @click="router.push('/')"
        class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Return Home
      </button>
    </div>
  </div>
</template>