<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router';
import {Button, Card, CardContent, Progress} from '@/components/ui';
import {useExercisesStore} from '@/stores/exercises';
import {BookOpen, CheckCircle, ChevronRight, Circle, GraduationCap, Home} from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const exercisesStore = useExercisesStore();

const modules = [
  {
    id: 1,
    title: 'Introducción y evolución de Vue',
    sections: [
      {
        id: 1,
        title: 'Principales diferencias entre Vue 2 y Vue 3',
        route: '/modules/1/section-1',
      },
    ],
  },
  {
    id: 2,
    title: 'Composition API y SFC',
    sections: [],
    locked: true,
  },
  {
    id: 3,
    title: 'Gestión de rutas y estado',
    sections: [],
    locked: true,
  },
  {
    id: 4,
    title: 'Buenas prácticas y herramientas',
    sections: [],
    locked: true,
  },
  {
    id: 5,
    title: 'Vue + TypeScript',
    sections: [],
    locked: true,
  },
];

const isCurrentRoute = (routePath: string) => {
  return route.path === routePath;
};

const goToHome = () => {
  router.push('/');
};

const goToSection = (routePath: string) => {
  router.push(routePath);
};
</script>

<template>
  <div class="w-80 bg-background border-r border-border h-screen overflow-y-auto">
    <!-- Header -->
    <div class="p-6 border-b border-border">
      <div class="flex items-center space-x-3 mb-4">
        <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
          <GraduationCap class="w-4 h-4 text-white" />
        </div>
        <span class="text-lg font-bold text-foreground">Vue 3 Pro</span>
      </div>

      <!-- Home Button -->
      <Button
        @click="goToHome"
        variant="ghost"
        class="w-full justify-start mb-4"
        :class="{ 'bg-accent': route.path === '/' }"
      >
        <Home class="w-4 h-4 mr-2" />
        Inicio
      </Button>

      <!-- Progress Card -->
      <Card class="bg-card/50">
        <CardContent class="p-4">
          <div class="text-center">
            <h3 class="text-sm font-semibold text-foreground mb-2">Progreso Global</h3>
            <div class="space-y-2">
              <div class="flex justify-between items-center text-xs">
                <span class="text-muted-foreground">Completado:</span>
                <span class="font-medium text-foreground">
                  {{ exercisesStore.completedCount }} / {{ exercisesStore.totalExercises }}
                </span>
              </div>
              <Progress
                :value="exercisesStore.progressPercentage"
                class="h-2"
              />
              <div class="text-sm font-bold text-blue-600">
                {{ exercisesStore.progressPercentage }}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Navigation -->
    <div class="p-4">
      <h2 class="text-sm font-semibold text-muted-foreground mb-4 px-2">MÓDULOS DEL CURSO</h2>

      <div class="space-y-2">
        <div v-for="module in modules" :key="module.id" class="space-y-1">
          <!-- Module Header -->
          <div class="flex items-center px-2 py-2 text-sm font-medium text-foreground">
            <BookOpen class="w-4 h-4 mr-2 text-muted-foreground" />
            <span class="flex-1">{{ module.title }}</span>
            <span v-if="module.locked" class="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              Próximamente
            </span>
          </div>

          <!-- Sections -->
          <div v-if="!module.locked && module.sections.length > 0" class="ml-6 space-y-1">
            <button
              v-for="section in module.sections"
              :key="section.id"
              @click="goToSection(section.route)"
              class="w-full flex items-center px-2 py-2 text-sm text-left rounded-md transition-colors hover:bg-accent"
              :class="{
                'bg-accent text-accent-foreground': isCurrentRoute(section.route),
                'text-muted-foreground hover:text-foreground': !isCurrentRoute(section.route)
              }"
            >
              <CheckCircle
                v-if="exercisesStore.isExerciseCompleted(`module-${module.id}-section-${section.id}`)"
                class="w-4 h-4 mr-2 text-green-600"
              />
              <Circle
                v-else
                class="w-4 h-4 mr-2 text-muted-foreground"
              />
              <span class="flex-1">{{ section.title }}</span>
              <ChevronRight
                v-if="isCurrentRoute(section.route)"
                class="w-3 h-3 text-muted-foreground"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
