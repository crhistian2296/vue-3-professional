<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useExercisesStore } from '@/stores/exercises'
import { Button, Card, CardContent, Progress } from '@/components/ui'
import { GraduationCap, Play, ExternalLink, Star, ChartLine } from 'lucide-vue-next'

const router = useRouter()
const exercisesStore = useExercisesStore()

const goToModules = () => {
  router.push('/modules/1/section-1')
}

const openVueDocs = () => {
  window.open('https://vuejs.org/', '_blank')
}
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
          <h2 class="text-3xl font-bold text-foreground mb-4">Módulos del Curso</h2>
          <p class="text-muted-foreground text-lg">Actualiza tus conocimientos desde Vue 2 a Vue 3 con foco en prácticas modernas</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card class="hover:shadow-lg transition-shadow duration-200">
            <CardContent class="p-6">
              <div class="text-center">
                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <h3 class="font-semibold text-foreground mb-2">Módulo 1</h3>
                <p class="text-muted-foreground text-sm">Introducción y evolución de Vue</p>
              </div>
            </CardContent>
          </Card>
          
          <Card class="hover:shadow-lg transition-shadow duration-200 opacity-60">
            <CardContent class="p-6">
              <div class="text-center">
                <div class="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-6 h-6 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <h3 class="font-semibold text-foreground mb-2">Módulo 2</h3>
                <p class="text-muted-foreground text-sm">Composition API y SFC</p>
              </div>
            </CardContent>
          </Card>
          
          <Card class="hover:shadow-lg transition-shadow duration-200 opacity-60">
            <CardContent class="p-6">
              <div class="text-center">
                <div class="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-6 h-6 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <h3 class="font-semibold text-foreground mb-2">Módulo 3</h3>
                <p class="text-muted-foreground text-sm">Gestión de rutas y estado</p>
              </div>
            </CardContent>
          </Card>
          
          <Card class="hover:shadow-lg transition-shadow duration-200 opacity-60">
            <CardContent class="p-6">
              <div class="text-center">
                <div class="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-6 h-6 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <h3 class="font-semibold text-foreground mb-2">Módulo 4</h3>
                <p class="text-muted-foreground text-sm">Buenas prácticas y herramientas</p>
              </div>
            </CardContent>
          </Card>
          
          <Card class="hover:shadow-lg transition-shadow duration-200 opacity-60">
            <CardContent class="p-6">
              <div class="text-center">
                <div class="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-6 h-6 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                  </svg>
                </div>
                <h3 class="font-semibold text-foreground mb-2">Módulo 5</h3>
                <p class="text-muted-foreground text-sm">Vue + TypeScript</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  </div>
</template>