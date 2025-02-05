
import express from 'express';
import { mealController } from '../controllers/mealController.js';
import {authMiddleware} from "../middlewares/authMiddleware.js";
import { validateMealInput } from '../validations/mealsInput.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     MealLog:
 *       type: object
 *       required:
 *         - mealType
 *         - foodId
 *         - quantity
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the meal log
 *         mealType:
 *           type: string
 *           enum: [breakfast, lunch, dinner, snack]
 *           description: Type of meal
 *         foodId:
 *           type: integer
 *           description: ID of the food item
 *         quantity:
 *           type: number
 *           description: Quantity of food consumed
 *         totalCalories:
 *           type: number
 *           description: Total calories for this meal
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date and time of the meal
 *         food:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *             calories:
 *               type: number
 *             carbs:
 *               type: number
 *             protein:
 *               type: number
 *             fat:
 *               type: number
 *             servingSize:
 *               type: string
 *     MealSummary:
 *       type: object
 *       properties:
 *         totalCalories:
 *           type: number
 *           description: Total calories consumed for the day
 *         totalCarbs:
 *           type: number
 *           description: Total carbohydrates consumed for the day
 *         totalProtein:
 *           type: number
 *           description: Total protein consumed for the day
 *         totalFat:
 *           type: number
 *           description: Total fat consumed for the day
 *         remainingCalories:
 *           type: number
 *           description: Remaining calories based on daily goal
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *
 * @swagger
 * tags:
 *   name: Meals
 *   description: API endpoints for managing meal logs
 */

/**
 * @swagger
 * /api_v1/meals:
 *   post:
 *     summary: Create a new meal log
 *     tags: [Meals]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mealType
 *               - foodId
 *               - quantity
 *             properties:
 *               mealType:
 *                 type: string
 *                 enum: [breakfast, lunch, dinner, snack]
 *               foodId:
 *                 type: integer
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Meal log created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MealLog'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Food item not found
 *       500:
 *         description: Server error
 */
router.post('/meals', authMiddleware, validateMealInput, mealController.createMeal);

/**
 * @swagger
 * /api_v1/meals:
 *   get:
 *     summary: Get all meals for a specific day
 *     tags: [Meals]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Date to fetch meals for (YYYY-MM-DD). Defaults to current date
 *     responses:
 *       200:
 *         description: List of meals for the specified day
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MealLog'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/meals', authMiddleware, mealController.getMeals);

/**
 * @swagger
 * /api_v1/meals/{id}:
 *   delete:
 *     summary: Delete a specific meal log
 *     tags: [Meals]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the meal log to delete
 *     responses:
 *       200:
 *         description: Meal deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Meal not found
 *       500:
 *         description: Server error
 */
router.delete('/meals/:id', authMiddleware, mealController.deleteMeal);

/**
 * @swagger
 * /api_v1/meals/summary:
 *   get:
 *     summary: Get daily meal summary
 *     tags: [Meals]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Date to get summary for (YYYY-MM-DD). Defaults to current date
 *     responses:
 *       200:
 *         description: Daily nutrition summary
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MealSummary'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/meals/summary', authMiddleware, mealController.getMealSummary);

export default router;