
import { z } from 'zod';

export const exerciseValidation = {
  createExercise: z.object({
    body: z.object({
      name: z.string().min(1, 'Exercise name is required'),
      caloriesBurnedPerMinute: z.number().positive('Calories must be positive')
    })
  }),

  createExerciseLog: z.object({
    body: z.object({
      exerciseId: z.number().int().positive('Exercise ID is required'),
      duration: z.number().positive('Duration must be positive'),
      date: z.string().datetime('Invalid date format')
    })
  }),

  getExerciseLogs: z.object({
    query: z.object({
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
    })
  }),

  deleteExerciseLog: z.object({
    params: z.object({
      id: z.string().regex(/^\d+$/, 'Invalid ID format').transform(Number)
    })
  })
};