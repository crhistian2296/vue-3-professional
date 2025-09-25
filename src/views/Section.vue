<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Home, ChevronRight } from 'lucide-vue-next';
import { courseStructure } from '@/data/courseStructure';

interface Props {
  moduleId: string;
  sectionId: string;
}

const props = defineProps<Props>();
const router = useRouter();

const SectionContent = ref<any>(null);

const module = computed(() => {
  return courseStructure.modules.find(m => m.id === props.moduleId);
});

const section = computed(() => {
  return module.value?.sections.find(s => s.id === props.sectionId);
});

const sectionTitle = computed(() => {
  return section.value?.title || `Sección ${props.sectionId}`;
});

const goToHome = () => {
  router.push('/');
};

const goToModule = () => {
  router.push(`/modules/${props.moduleId}`);
};

onMounted(async () => {
  try {
    if (props.moduleId === '1' && props.sectionId === '1') {
      const module = await import('@/content/module1/section1/section1.mdx');
      SectionContent.value = module.default;
    }
  } catch (error) {
    console.error('Error loading section content:', error);
  }
});
</script>

<template>
  <div class="bg-card max-w-4xl mx-auto rounded-lg shadow-sm border">
    <div class="p-8">
      <div class="mb-8">
        <div class="flex items-center text-sm text-muted-foreground mb-4 space-x-1">
          <button @click="goToHome" class="flex items-center hover:text-foreground transition-colors">
            <Home class="w-4 h-4 mr-2" />
            Inicio
          </button>
          <ChevronRight class="w-4 h-4 mx-2" />
          <button @click="goToModule" class="hover:text-foreground transition-colors">
            {{ module?.title }}
          </button>
          <ChevronRight class="w-4 h-4 mx-2" />
          <span>{{ sectionTitle }}</span>
        </div>
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
    </div>
  </div>
</template>
