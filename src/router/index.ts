import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import ModuleLayout from '@/layouts/ModuleLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/modules',
    component: ModuleLayout,
    children: [
      {
        path: 'module-:moduleId',
        name: 'Module',
        component: () => import('@/views/Module.vue'),
        props: true,
      },
      {
        path: ':moduleId/section-:sectionId',
        name: 'Section',
        component: () => import('@/views/Section.vue'),
        props: true,
      },
      {
        path: ':moduleId/section-:sectionId/exercise-:exerciseId',
        name: 'Exercise',
        component: () => import('@/views/Exercise.vue'),
        props: true,
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
