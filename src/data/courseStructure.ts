import type { CourseStructure } from '@/types/course';

export const courseStructure: CourseStructure = {
  modules: [
    {
      id: '1',
      title: 'Introducción y evolución de Vue',
      sections: [
        {
          id: '1',
          title: 'Principales diferencias entre Vue 2 y Vue 3',
          exercises: [
            {
              id: 'counter-migration',
              title: 'Migración de Contador',
              description: 'Convierte un contador de Vue 2 a Vue 3',
              component: 'CounterMigration',
              mdxPath: '/src/content/module1/section1/exercises/counter-migration.mdx'
            },
            {
              id: 'reactive-data',
              title: 'Datos Reactivos',
              description: 'Practica con ref() y reactive()',
              component: 'ReactiveData',
              mdxPath: '/src/content/module1/section1/exercises/reactive-data.mdx'
            }
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'Composition API y SFC',
      sections: [
        {
          id: '1',
          title: 'Composition API Avanzada',
          exercises: [
            {
              id: 'composables',
              title: 'Creando Composables',
              description: 'Aprende a crear y usar composables',
              component: 'ComposablesExample',
              mdxPath: '/src/content/module2/section1/exercises/composables.mdx'
            }
          ]
        }
      ],
      locked: true
    }
  ]
};