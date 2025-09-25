<script setup lang="ts">
import { useExercisesStore } from '@/stores/exercises';
import { Button, Card, CardContent, Checkbox } from '@/components/ui';
import { Pencil, Check } from 'lucide-vue-next';
import CodeBlock from '@/components/CodeBlock.vue';

interface Props {
  exerciseId: string;
  title: string;
  description: string;
}

const props = defineProps<Props>();
const exercisesStore = useExercisesStore();

const toggleCompletion = () => {
  exercisesStore.toggleExercise(props.exerciseId);
};

const isCompleted = () => exercisesStore.isExerciseCompleted(props.exerciseId);
</script>

<template>
  <Card class="my-8 shadow-lg border-l-4 border-l-orange-400 bg-orange-50">
    <CardContent class="p-6">
      <div class="flex items-start space-x-4">
        <div class="flex-shrink-0 mt-1">
          <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
            <Pencil class="w-5 h-5 text-orange-600" />
          </div>
        </div>
        <div class="flex-1">
          <h3 class="text-xl font-bold text-foreground mb-2">{{ title }}</h3>
          <p class="text-muted-foreground mb-4">{{ description }}</p>
          
          <div class="bg-background p-4 rounded-lg border border-orange-200 mb-4">
            <h4 class="font-semibold text-foreground mb-3">📝 Tarea:</h4>
            <div class="prose prose-sm max-w-none text-muted-foreground">
              <p>Reescribe el siguiente componente contador de Vue 2 (Options API) a Vue 3 usando Composition API con <code>&lt;script setup&gt;</code>:</p>
              
              <div class="mt-3">
                <CodeBlock 
                  language="javascript"
                  :code="`&lt;template&gt;
  &lt;div&gt;
    &lt;h2&gt;{{ title }}&lt;/h2&gt;
    &lt;p&gt;Valor: {{ counter }}&lt;/p&gt;
    &lt;button @click="increment"&gt;Incrementar&lt;/button&gt;
    &lt;button @click="reset"&gt;Reset&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data() {
    return {
      title: 'Contador Vue 2',
      counter: 0
    }
  },
  methods: {
    increment() {
      this.counter++
    },
    reset() {
      this.counter = 0
    }
  },
  computed: {
    isEven() {
      return this.counter % 2 === 0
    }
  }
}
&lt;/scr' + 'ipt&gt;`"
                />
              </div>

              <div class="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p class="text-sm text-blue-800 mb-2"><strong>Pistas:</strong></p>
                <ul class="text-sm text-blue-700 space-y-1">
                  <li>• Usa <code>ref()</code> para datos reactivos</li>
                  <li>• Usa <code>computed()</code> para propiedades calculadas</li>
                  <li>• Las funciones se declaran directamente en el script</li>
                  <li>• No olvides el <code>.value</code> en las refs</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <Checkbox 
                :checked="isCompleted()" 
                @update:checked="toggleCompletion"
              />
              <span :class="['font-medium', isCompleted() ? 'text-green-700' : 'text-muted-foreground']">
                {{ isCompleted() ? '✅ Completado' : 'Marcar como completado' }}
              </span>
            </div>
            
            <Button 
              v-if="isCompleted()"
              variant="outline"
              class="bg-green-100 text-green-700 hover:bg-green-200 border-green-300"
              size="small"
            >
              <Check class="w-4 h-4 mr-2" />
              ¡Bien hecho!
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>