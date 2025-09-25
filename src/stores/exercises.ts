import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { z } from 'zod';

const ExerciseSchema = z.object({
  id: z.string(),
  completed: z.boolean(),
});

const ExercisesStateSchema = z.object({
  completedExercises: z.array(z.string()),
});

type Exercise = z.infer<typeof ExerciseSchema>;
type ExercisesState = z.infer<typeof ExercisesStateSchema>;

export const useExercisesStore = defineStore(
  'exercises',
  () => {
    const completedExercises = ref<string[]>([]);

    // Total exercises in the course
    const totalExercises = ref(1); // Starting with 1 exercise

    const completedCount = computed(() => completedExercises.value.length);

    const progressPercentage = computed(() => {
      if (totalExercises.value === 0) return 0;
      return Math.round((completedCount.value / totalExercises.value) * 100);
    });

    const toggleExercise = (exerciseId: string) => {
      // Validate exercise ID
      try {
        z.string().min(1).parse(exerciseId);
      } catch {
        console.error('Invalid exercise ID:', exerciseId);
        return;
      }

      const index = completedExercises.value.indexOf(exerciseId);
      if (index === -1) {
        completedExercises.value.push(exerciseId);
      } else {
        completedExercises.value.splice(index, 1);
      }
    };

    const isExerciseCompleted = (exerciseId: string): boolean => {
      return completedExercises.value.includes(exerciseId);
    };

    return {
      completedExercises,
      totalExercises,
      completedCount,
      progressPercentage,
      toggleExercise,
      isExerciseCompleted,
    };
  },
  {
    persist: {
      key: 'vue-course-exercises',
      storage: localStorage,
    },
  }
);
