<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useExercisesStore } from '@/stores/exercises';
import { courseStructure } from '@/data/courseStructure';
import { Button, Card, CardContent, Progress } from '@/components/ui';
import { GraduationCap, Play, ExternalLink, Star, ChartLine, CheckCircle } from 'lucide-vue-next';

const router = useRouter();
const exercisesStore = useExercisesStore();

const goToModules = () => {
  router.push('/modules/1/section-1');
};

const openVueDocs = () => {
  window.open('https://vuejs.org/', '_blank');
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-background to-indigo-50">
    <!-- Navigation -->
    <nav class="bg-background/80 backdrop-blur-sm border-b sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <GraduationCap class="w-4 h-4 text-white" />
            </div>
            <span class="text-xl font-bold text-foreground">Vue 3 Pro</span>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <div class="mb-8">
          <div class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
            <Star class="w-4 h-4 mr-2 fill-current" />
            Curso Profesional
          </div>
          <h1 class="text-5xl sm:text-6xl font-bold text-foreground mb-6 leading-tight">
            Formación <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Vue 3</span> Profesional
          </h1>
          <p class="text-xl text-muted-foreground mb-4 leading-relaxed">
            Domina el Framework y Diseña Software Escalable
          </p>
          <div class="flex items-center justify-center space-x-2 text-muted-foreground mb-8">
            <img src="https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2"
                 alt="César Alberca"
                 class="w-8 h-8 rounded-full object-cover">
            <span class="text-sm">por <strong>César Alberca</strong></span>
            <span class="text-muted-foreground/50">•</span>
            <span class="text-sm">Frontend Software Architect</span>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            @click="goToModules"
            class="px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
          >
            <Play class="w-5 h-5 mr-3" />
            Ir a los módulos
          </Button>
          <Button
            @click="openVueDocs"
            variant="outlined"
            class="px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 transform hover:-translate-y-1"
          >
            <ExternalLink class="w-5 h-5 mr-3" />
            Docs de Vue
          </Button>
        </div>

        <!-- Progress Card -->
        <Card class="max-w-md mx-auto shadow-xl bg-card/70 backdrop-blur-sm">
          <CardContent class="p-6">
            <div class="text-center">
              <div class="mb-4">
                <ChartLine class="w-10 h-10 text-blue-600 mb-4 mx-auto" />
                <h3 class="text-xl font-bold text-foreground mb-2">Tu Progreso</h3>
              </div>
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <span class="text-muted-foreground">Ejercicios completados:</span>
                  <span class="font-bold text-foreground">
                    {{ exercisesStore.completedCount }} / {{ exercisesStore.totalExercises }}
                  </span>
                </div>
                <Progress
                  :value="exercisesStore.progressPercentage"
                  class="h-3"
                />
                <div class="text-2xl font-bold text-blue-600">
                  {{ exercisesStore.progressPercentage }}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>

    <!-- Course Overview -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 bg-background/50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-foreground mb-4">Estructura del Curso</h2>
          <p class="text-muted-foreground text-lg">Explora los módulos, secciones y ejercicios del curso</p>
        </div>

        <div class="space-y-8">
          <div v-for="module in courseStructure.modules" :key="module.id" class="space-y-4">
            <!-- Module Card -->
            <Card
              class="hover:shadow-lg transition-all duration-200 cursor-pointer border-l-4"
              :class="module.locked ? 'border-l-gray-300 opacity-60' : 'border-l-blue-500'"
              @click="!module.locked && $router.push(`/modules/${module.id}`)"
            >
            <CardContent class="p-6">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div :class="[
                    'w-12 h-12 rounded-full flex items-center justify-center',
                    module.locked ? 'bg-gray-100' : 'bg-blue-100'
                  ]">
                    <GraduationCap :class="[
                      'w-6 h-6',
                      module.locked ? 'text-gray-500' : 'text-blue-600'
                    ]" />
                  </div>
                </div>
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-2">
                    <h3 class="text-xl font-bold text-foreground">{{ module.title }}</h3>
                    <span v-if="module.locked" class="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      Próximamente
                    </span>
                  </div>
                  <p class="text-muted-foreground mb-4">{{ module.description }}</p>

                  <!-- Sections -->
                  <div v-if="!module.locked && module.sections.length > 0" class="space-y-3">
                    <div v-for="section in module.sections" :key="section.id" class="border-l-2 border-gray-200 pl-4">
                      <div class="flex items-center justify-between mb-2">
                        <h4
                          class="font-medium text-foreground hover:text-blue-600 cursor-pointer transition-colors"
                          @click.stop="$router.push(`/modules/${module.id}/section-${section.id}`)"
                        >
                          {{ section.title }}
                        </h4>
                        <span class="text-xs text-muted-foreground">
                          {{ section.exercises.length }} ejercicio{{ section.exercises.length !== 1 ? 's' : '' }}
                        </span>
                      </div>

                      <!-- Exercises -->
                      <div v-if="section.exercises.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div
                          v-for="exercise in section.exercises"
                          :key="exercise.id"
                          class="flex items-center space-x-2 p-2 rounded-md hover:bg-accent/50 cursor-pointer transition-colors"
                          @click.stop="$router.push(`/modules/${module.id}/section-${section.id}/exercise-${exercise.id}`)"
                        >
                          <CheckCircle
                            v-if="exercisesStore.isExerciseCompleted(exercise.id)"
                            class="w-4 h-4 text-green-600 flex-shrink-0"
                          />
                          <Play
                            v-else
                            class="w-4 h-4 text-orange-500 flex-shrink-0"
                          />
                          <span class="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            {{ exercise.title }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
