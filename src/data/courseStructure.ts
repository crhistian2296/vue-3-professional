import type { CourseStructure } from '../types/course.ts';

export const courseStructure: CourseStructure = {
  modules: [
    {
      id: 'intro-y-evolucion',
      title: 'Introducción y evolución de Vue',
      description:
        'Aprende las principales diferencias entre Vue 2 y Vue 3, y cómo migrar tu código existente.',
      mdxPath: '/src/content/intro-y-evolucion/index.mdx',
      sections: [
        {
          id: 'principales-diferencias',
          title: 'Principales diferencias entre Vue 2 y Vue 3',
          mdxPath: '/src/content/intro-y-evolucion/principales-diferencias/index.mdx',
          exercises: [
            {
              id: 'composition-vs-options',
              title: 'Composition API vs Options API',
              description: 'Migra un componente de Vue 2 a Vue 3',
              mdxPath:
                '/src/content/intro-y-evolucion/principales-diferencias/composition-vs-options/index.mdx',
            },
          ],
        },
      ],
    },
    {
      id: '2',
      title: 'Composition API y SFC',
      description:
        'Domina la Composition API y las nuevas características de los Single File Components.',
      mdxPath: '/src/content/module2/module2.mdx',
      sections: [],
      locked: true,
    },
  ],
};
