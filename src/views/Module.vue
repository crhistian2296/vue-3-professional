<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Home, ChevronRight, BookOpen, Play, Lock } from 'lucide-vue-next';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { courseStructure } from '@/data/courseStructure';

interface Props {
  moduleId: string;
}

const props = defineProps<Props>();
const router = useRouter();

const ModuleContent = ref<any>(null);

const module = computed(() => {
  return courseStructure.modules.find(m => m.id === props.moduleId);
});

const goToHome = () => {
  router.push('/');
};

const goToSection = (sectionId: string) => {
  router.push(`/modules/${props.moduleId}/section-${sectionId}`);
};

onMounted(async () => {
  if (!module.value) return;

  try {
    const mdxModule = await import(/* @vite-ignore */ module.value.mdxPath);
    ModuleContent.value = mdxModule.default;
  } catch (error) {
    console.error('Error loading module content:', error);
  }
});
</script>

<template>
  <div class="bg-card rounded-lg shadow-sm border">
    <div class="p-8">
      <!-- Breadcrumb -->
      <div class="flex items-center text-sm text-muted-foreground mb-6">
        <button @click="goToHome" class="flex items-center hover:text-foreground transition-colors">
          <Home class="w-4 h-4 mr-2" />
          Inicio
        </button>
        <ChevronRight class="w-4 h-4 mx-2" />
        <span>Módulo {{ moduleId }}</span>
      </div>

      <!-- Module Header -->
      <div class="mb-8">
        <div class="flex items-center space-x-3 mb-4">
          <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <BookOpen class="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 class="text-3xl font-bold text-foreground">{{ module?.title }}</h1>
            <p class="text-muted-foreground">{{ module?.description }}</p>
          </div>
        </div>
      </div>

      <!-- Module Content -->
      <article class="prose prose-lg max-w-none mb-12">
        <component :is="ModuleContent" v-if="ModuleContent" />
        <div v-else class="text-muted-foreground">
          Cargando contenido del módulo...
        </div>
      </article>

      <!-- Sections Grid -->
      <div class="grid md:grid-cols-2 gap-6">
        <Card 
          v-for="section in module?.sections" 
          :key="section.id"
          class="hover:shadow-lg transition-shadow duration-200 cursor-pointer"
          @click="goToSection(section.id)"
        >
          <CardHeader>
            <CardTitle class="flex items-center justify-between">
              <span>{{ section.title }}</span>
              <div class="flex items-center space-x-2">
                <span class="text-sm text-muted-foreground">
                  {{ section.exercises.length }} ejercicios
                </span>
                <Play class="w-4 h-4 text-blue-600" />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <div 
                v-for="exercise in section.exercises.slice(0, 3)" 
                :key="exercise.id"
                class="text-sm text-muted-foreground flex items-center"
              >
                <div class="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                {{ exercise.title }}
              </div>
              <div v-if="section.exercises.length > 3" class="text-sm text-muted-foreground">
                +{{ section.exercises.length - 3 }} más...
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>