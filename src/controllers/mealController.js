import prisma from "../config/prisma.js";


export const mealController = {
  createMeal: async (req, res) => {
    try {
      const { mealType, foodId, quantity } = req.body;
      const userId = req.user.id;

      const foodItem = await prisma.foodItem.findUnique({
        where: { id: foodId }
      });

      if (!foodItem) {
        return res.status(404).json({ error: 'Food item not found' });
      }

      const totalCalories = foodItem.calories * quantity;

      const mealLog = await prisma.mealLog.create({
        data: {
          userId,
          date: new Date(),
          mealType,
          foodId,
          quantity,
          totalCalories
        }
      });

      res.status(201).json(mealLog);
    } catch (error) {
      res.status(500).json({ error: 'Failed to log meal' });
    }
  },

  getMeals: async (req, res) => {
    try {
      const userId = req.user.id;
      const date = req.query.date ? new Date(req.query.date) : new Date();

      const meals = await prisma.mealLog.findMany({
        where: {
          userId,
          date: {
            gte: new Date(date.setHours(0, 0, 0, 0)),
            lt: new Date(date.setHours(23, 59, 59, 999))
          },
          deleted: false
        },
        include: {
          food: true
        }
      });

      res.json(meals);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch meals' });
    }
  },

  deleteMeal: async (req, res) => {
    try {
      const mealId = parseInt(req.params.id);
      const userId = req.user.id;

      const meal = await prisma.mealLog.findFirst({
        where: {
          id: mealId,
          userId,
          deleted: false
        }
      });

      if (!meal) {
        return res.status(404).json({ error: 'Meal not found' });
      }

      await prisma.mealLog.update({
        where: { id: mealId },
        data: {
          deleted: true,
          deletedAt: new Date()
        }
      });

      res.json({ message: 'Meal deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete meal' });
    }
  },

  getMealSummary: async (req, res) => {
    try {
      const userId = req.user.id;
      const date = req.query.date ? new Date(req.query.date) : new Date();

      const userPreferences = await prisma.userPreferences.findUnique({
        where: { userId }
      });

      const meals = await prisma.mealLog.findMany({
        where: {
          userId,
          date: {
            gte: new Date(date.setHours(0, 0, 0, 0)),
            lt: new Date(date.setHours(23, 59, 59, 999))
          },
          deleted: false
        },
        include: {
          food: true
        }
      });

      const summary = meals.reduce((acc, meal) => {
        const { quantity, food } = meal;
        acc.totalCalories += food.calories * quantity;
        acc.totalCarbs += food.carbs * quantity;
        acc.totalProtein += food.protein * quantity;
        acc.totalFat += food.fat * quantity;
        return acc;
      }, {
        totalCalories: 0,
        totalCarbs: 0,
        totalProtein: 0,
        totalFat: 0
      });

      summary.remainingCalories = userPreferences ? 
        userPreferences.dailyCalorieGoal - summary.totalCalories : 
        null;

      res.json(summary);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch meal summary' });
    }
  }
};