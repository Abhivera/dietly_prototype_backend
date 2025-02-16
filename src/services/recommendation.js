import prisma from '../utils/prisma.js';
import { calculateBMR, calculateTDEE } from '../utils/calculation.js';

export const getMealRecommendations = async (userId) => {
  try {
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
      include: { preferences: true }
    });
    
    if (!userProfile?.preferences) {
      throw new Error('User profile or preferences not found');
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const mealLogs = await prisma.mealLog.findMany({
      where: {
        userId: userProfile.id,
        date: { gte: today },
        deleted: false
      },
      include: { food: true }
    });

    const caloriesConsumed = mealLogs.reduce((sum, log) => sum + log.totalCalories, 0);
    const remainingCalories = userProfile.preferences.dailyCalorieGoal - caloriesConsumed;

    const recommendedMeals = await prisma.foodItem.findMany({
      where: {
        calories: { lte: remainingCalories },
        deleted: false,
        ...(userProfile.preferences.dietaryRestrictions && {
          category: { notIn: userProfile.preferences.dietaryRestrictions.split(',') }
        })
      },
      take: 5,
      orderBy: { calories: 'desc' }
    });

    return recommendedMeals;
  } catch (error) {
    throw new Error(`Failed to get meal recommendations: ${error.message}`);
  }
};

export const getExerciseRecommendations = async (userId) => {
  try {
    // Get user profile and today's exercise logs
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId },
      include: {
        preferences: true,
        exerciseLogs: {
          where: {
            date: {
              gte: new Date(new Date().setHours(0, 0, 0, 0))
            },
            deleted: false
          }
        }
      }
    });

    if (!userProfile?.preferences) {
      throw new Error('User profile or preferences not found');
    }

    // Calculate BMR and TDEE
    const bmr = calculateBMR(
      userProfile.weight,
      userProfile.height,
      userProfile.age,
      userProfile.gender
    );

    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    const tdee = bmr * activityMultipliers[userProfile.activityLevel];

    // Calculate calories burned so far today
    const caloriesBurned = userProfile.exerciseLogs.reduce(
      (sum, log) => sum + log.caloriesBurned,
      0
    );

    // Calculate remaining calories to burn
    const remainingCaloriesToBurn = Math.max(0, tdee - caloriesBurned);

    // Get exercise recommendations based on activity level
    const exercises = await prisma.exercise.findMany({
      where: {
        deleted: false
      },
      orderBy: {
        caloriesBurnedPerMinute: userProfile.activityLevel === 'beginner' ? 'asc' : 'desc'
      },
      take: 5
    });

    // Calculate recommended duration for each exercise
    const recommendations = exercises.map(exercise => {
      const recommendedDuration = Math.round(remainingCaloriesToBurn / exercise.caloriesBurnedPerMinute);
      
      return {
        ...exercise,
        recommendedDuration,
        estimatedCaloriesBurn: Math.round(exercise.caloriesBurnedPerMinute * recommendedDuration),
        intensity: determineIntensity(exercise.caloriesBurnedPerMinute)
      };
    });

    // Sort recommendations by user's activity level
    if (userProfile.activityLevel === 'beginner') {
      recommendations.sort((a, b) => a.intensity - b.intensity);
    } else {
      recommendations.sort((a, b) => b.estimatedCaloriesBurn - a.estimatedCaloriesBurn);
    }

    return recommendations;
  } catch (error) {
    throw new Error(`Failed to get exercise recommendations: ${error.message}`);
  }
};

// Helper function to determine exercise intensity
const determineIntensity = (caloriesBurnedPerMinute) => {
  if (caloriesBurnedPerMinute <= 5) return 'Low';
  if (caloriesBurnedPerMinute <= 10) return 'Medium';
  return 'High';
};
