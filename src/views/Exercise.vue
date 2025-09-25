<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Home, ChevronRight, Play, Check, Eye, EyeOff } from 'lucide-vue-next';
import { 
  Button, 
  Card, 
  CardContent, 
  Checkbox, 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui';
import { useExercisesStore } from '@/stores/exercises';
import { courseStructure } from '@/data/courseStructure';
import CodeBlock from '@/components/CodeBlock.vue';

interface Props {
  moduleId: string;
  sectionId: string;
  exerciseId: string;
}

const props = defineProps<Props>();
const router = useRouter();
const exercisesStore = useExercisesStore();

const ExerciseContent = ref<any>(null);
const ExerciseComponent = ref<any>(null);
const showSolution = ref(false);
const componentCode = ref('');

const module = computed(() => {
  return courseStructure.modules.find(m => m.id === props.moduleId);
});

const section = computed(() => {
  return module.value?.sections.find(s => s.id === props.sectionId);
});

const exercise = computed(() => {
  return section.value?.exercises.find(e => e.id === props.exerciseId);
});

const isCompleted = computed(() => exercisesStore.isExerciseCompleted(props.exerciseId));

const toggleCompletion = () => {
  exercisesStore.toggleExercise(props.exerciseId);
};

const toggleSolution = () => {
  showSolution.value = !showSolution.value;
};

const goToHome = () => {
  router.push('/');
};

const goToModule = () => {
  router.push(`/modules/${props.moduleId}`);
};

const goToSection = () => {
  router.push(`/modules/${props.moduleId}/section-${props.sectionId}`);
};

onMounted(async () => {
  if (!exercise.value) return;

  try {
    // Load MDX content
    const mdxModule = await import(/* @vite-ignore */ exercise.value.mdxPath);
    ExerciseContent.value = mdxModule.default;

    // Load exercise component
    const componentModule = await import(`@/exercises/${exercise.value.component}.vue`);
    ExerciseComponent.value = componentModule.default;

    // Get component source code
    const response = await fetch(`/src/exercises/${exercise.value.component}.vue`);
    componentCode.value = await response.text();
  } catch (error) {
    console.error('Error loading exercise:', error);
  }
});
</script>

<template>
  <div class="bg-card rounded-lg shadow-sm border">
    <div class="p-8">
      <!-- Breadcrumb -->
      <div class="flex items-center text-sm text-muted-foreground mb-6 space-x-1">
        <button @click="goToHome" class="flex items-center hover:text-foreground transition-colors">
          <Home class="w-4 h-4 mr-2" />
          Inicio
        </button>
        <ChevronRight class="w-4 h-4 mx-2" />
        <button @click="goToModule" class="hover:text-foreground transition-colors">
          {{ module?.title }}
        </button>
        <ChevronRight class="w-4 h-4 mx-2" />
        <button @click="goToSection" class="hover:text-foreground transition-colors">
          {{ section?.title }}
        </button>
        <ChevronRight class="w-4 h-4 mx-2" />
        <span>{{ exercise?.title }}</span>
      </div>

      <!-- Exercise Header -->
      <div class="mb-8">
        <div class="flex items-center space-x-3 mb-4">
          <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <Play class="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h1 class="text-2xl font-bold text-foreground">{{ exercise?.title }}</h1>
            <p class="text-muted-foreground">{{ exercise?.description }}</p>
          </div>
        </div>

        <!-- Completion Status -->
        <div class="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div class="flex items-center space-x-3">
            <Checkbox
              :checked="isCompleted"
              @update:checked="toggleCompletion"
            />
            <span :class="['font-medium', isCompleted ? 'text-green-700' : 'text-muted-foreground']">
              {{ isCompleted ? '✅ Completado' : 'Marcar como completado' }}
            </span>
          </div>

          <Button
            v-if="isCompleted"
            @click="toggleSolution"
            variant="outline"
            size="sm"
          >
            <Eye v-if="!showSolution" class="w-4 h-4 mr-2" />
            <EyeOff v-else class="w-4 h-4 mr-2" />
            {{ showSolution ? 'Ocultar solución' : 'Ver solución' }}
          </Button>
        </div>
      </div>

      <!-- Exercise Content -->
      <div class="grid lg:grid-cols-2 gap-8">
        <!-- Instructions -->
        <div class="space-y-6">
          <Card>
            <CardContent class="p-6">
              <h3 class="text-lg font-semibold mb-4">📝 Instrucciones</h3>
              <article class="prose prose-sm max-w-none">
                <component :is="ExerciseContent" v-if="ExerciseContent" />
                <div v-else class="text-muted-foreground">
                  Cargando instrucciones...
                </div>
              </article>
            </CardContent>
          </Card>

        </div>

        <!-- Live Preview -->
        <div class="space-y-6">
          <Card>
            <CardContent class="p-6">
              <h3 class="text-lg font-semibold mb-4">🎯 Vista Previa</h3>
              <div class="border rounded-lg p-4 bg-background min-h-[200px] flex items-center justify-center">
                <component :is="ExerciseComponent" v-if="ExerciseComponent" />
                <div v-else class="text-muted-foreground">
                  Cargando componente...
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent class="p-6">
              <h3 class="text-lg font-semibold mb-4">💻 Código del Componente</h3>
              <CodeBlock :code="componentCode" language="vue" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    <!-- Solution Modal -->
    <Dialog v-model:open="showSolution">
      <DialogContent class="max-w-4xl">
        <DialogHeader>
          <DialogTitle class="text-green-800">✅ Solución: {{ exercise?.title }}</DialogTitle>
        </DialogHeader>
        <div class="space-y-4">
          <div class="bg-green-50 p-4 rounded-lg border border-green-200">
            <p class="text-green-800 text-sm">
              Esta es la implementación completa del ejercicio. Estudia el código y compáralo con tu solución.
            </p>
          </div>
          <CodeBlock :code="componentCode" language="vue" />
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>