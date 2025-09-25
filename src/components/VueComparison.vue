<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import CodeBlock from '@/components/CodeBlock.vue';

interface Props {
  leftTitle: string;
  rightTitle: string;
  leftLabel: string;
  rightLabel: string;
  leftComponent?: string;
  rightComponent?: string;
}

const props = defineProps<Props>();

const activeTab = ref<'left' | 'right'>('left');
const leftCode = ref('');
const rightCode = ref('');
const LeftComponent = ref<any>(null);
const RightComponent = ref<any>(null);

onMounted(async () => {
  // Load left component and its raw code
  if (props.leftComponent) {
    try {
      const leftModule = await import(`@/content/intro-y-evolucion/principales-diferencias/${props.leftComponent}.vue`);
      LeftComponent.value = leftModule.default;
      
      const leftRaw = await import(`@/content/intro-y-evolucion/principales-diferencias/${props.leftComponent}.vue?raw`);
      leftCode.value = leftRaw.default;
    } catch (error) {
      console.error('Error loading left component:', error);
    }
  }

  // Load right component and its raw code
  if (props.rightComponent) {
    try {
      const rightModule = await import(`@/content/intro-y-evolucion/principales-diferencias/${props.rightComponent}.vue`);
      RightComponent.value = rightModule.default;
      
      const rightRaw = await import(`@/content/intro-y-evolucion/principales-diferencias/${props.rightComponent}.vue?raw`);
      rightCode.value = rightRaw.default;
    } catch (error) {
      console.error('Error loading right component:', error);
    }
  }
});
</script>

<template>
  <div class="vue-comparison space-y-6">
    <!-- Tab Selector -->
    <div class="flex justify-center">
      <Tabs v-model="activeTab" class="w-full max-w-md">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="left">{{ props.leftLabel }}</TabsTrigger>
          <TabsTrigger value="right">{{ props.rightLabel }}</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>

    <!-- Content Display -->
    <Card>
      <CardHeader>
        <CardTitle class="text-center">
          {{ activeTab === 'left' ? props.leftTitle : props.rightTitle }}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <!-- Left Content -->
        <div v-if="activeTab === 'left'" class="space-y-6">
          <div class="grid lg:grid-cols-2 gap-6">
            <!-- Live Preview -->
            <div class="space-y-3">
              <h4 class="text-lg font-semibold text-foreground">🎯 Vista Previa</h4>
              <div class="border rounded-lg p-4 bg-background min-h-[200px] flex items-center justify-center">
                <component :is="LeftComponent" v-if="LeftComponent" />
                <div v-else class="text-muted-foreground">
                  <slot name="left">Contenido no disponible</slot>
                </div>
              </div>
            </div>

            <!-- Raw Code -->
            <div class="space-y-3">
              <h4 class="text-lg font-semibold text-foreground">💻 Código Fuente</h4>
              <div class="max-h-[400px] overflow-y-auto">
                <CodeBlock 
                  v-if="leftCode" 
                  :code="leftCode" 
                  language="vue" 
                />
                <div v-else class="text-muted-foreground p-4 border rounded">
                  Cargando código...
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Content -->
        <div v-if="activeTab === 'right'" class="space-y-6">
          <div class="grid lg:grid-cols-2 gap-6">
            <!-- Live Preview -->
            <div class="space-y-3">
              <h4 class="text-lg font-semibold text-foreground">🎯 Vista Previa</h4>
              <div class="border rounded-lg p-4 bg-background min-h-[200px] flex items-center justify-center">
                <component :is="RightComponent" v-if="RightComponent" />
                <div v-else class="text-muted-foreground">
                  <slot name="right">Contenido no disponible</slot>
                </div>
              </div>
            </div>

            <!-- Raw Code -->
            <div class="space-y-3">
              <h4 class="text-lg font-semibold text-foreground">💻 Código Fuente</h4>
              <div class="max-h-[400px] overflow-y-auto">
                <CodeBlock 
                  v-if="rightCode" 
                  :code="rightCode" 
                  language="vue" 
                />
                <div v-else class="text-muted-foreground p-4 border rounded">
                  Cargando código...
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped>
.vue-comparison {
  max-width: 100%;
}
</style>