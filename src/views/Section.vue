<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Home, ChevronRight } from 'lucide-vue-next'

interface Props {
  moduleId: string
  sectionId: string
}

const props = defineProps<Props>()
const route = useRoute()

const SectionContent = ref<any>(null)

const sectionTitle = computed(() => {
  if (props.moduleId === '1' && props.sectionId === '1') {
    return 'Principales diferencias entre Vue 2 y Vue 3'
  }
  return `Módulo ${props.moduleId} - Sección ${props.sectionId}`
})

onMounted(async () => {
  try {
    if (props.moduleId === '1' && props.sectionId === '1') {
      const module = await import('@/content/module1/section1.mdx')
      SectionContent.value = module.default
    }
  } catch (error) {
    console.error('Error loading section content:', error)
  }
})
</script>

<template>
  <div class="bg-card rounded-lg shadow-sm border">
    <div class="p-8">
      <div class="mb-8">
        <div class="flex items-center text-sm text-muted-foreground mb-4">
          <Home class="w-4 h-4 mr-2" />
          <span>Módulo {{ moduleId }}</span>
          <ChevronRight class="w-4 h-4 mx-2" />
          <span>Sección {{ sectionId }}</span>
        </div>
        <h1 class="text-3xl font-bold text-foreground mb-4">
          {{ sectionTitle }}
        </h1>
      </div>

      <div class="prose prose-lg max-w-none">
        <component :is="SectionContent" v-if="SectionContent" />
        <div v-else class="text-muted-foreground">
          Cargando contenido...
        </div>
      </div>
    </div>
  </div>
</template>