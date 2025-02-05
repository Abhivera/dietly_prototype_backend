import { z } from 'zod';

const mealSchema = z.object({
  mealType: z.enum(['breakfast', 'lunch', 'dinner', 'snack']),
  foodId: z.number().positive(),
  quantity: z.number().positive()
});

export const validateMealInput = (req, res, next) => {
  try {
    mealSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({
      error: 'Invalid input',
      details: error.errors
    });
  }
};