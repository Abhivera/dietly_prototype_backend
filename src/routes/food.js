import { Router } from "express";
import { getFoods, addFood, getFoodById } from "../controllers/foodController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Foods
 *   description: Operations related to food items
 */

/**
 * @swagger
 * /api_v1/foods:
 *   get:
 *     summary: Fetch food list
 *     description: Get a list of food items with optional filters
 *     tags: [Foods]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter foods by category
 *       - in: query
 *         name: calories
 *         schema:
 *           type: number
 *           format: float
 *         description: Filter foods by maximum calories
 *     responses:
 *       200:
 *         description: A list of food items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FoodItem'
 *       500:
 *         description: Internal Server Error
 */
router.get("/foods", getFoods);

/**
 * @swagger
 * /api_v1/foods:
 *   post:
 *     summary: Add a new food item
 *     description: Add a new food item (admin or user-defined)
 *     tags: [Foods]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - category
 *               - calories
 *               - carbs
 *               - protein
 *               - fat
 *               - servingSize
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               calories:
 *                 type: number
 *                 format: float
 *               carbs:
 *                 type: number
 *                 format: float
 *               protein:
 *                 type: number
 *                 format: float
 *               fat:
 *                 type: number
 *                 format: float
 *               servingSize:
 *                 type: string
 *     responses:
 *       201:
 *         description: Food item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FoodItem'
 *       401:
 *         description: Unauthorized (JWT required)
 *       500:
 *         description: Internal Server Error
 */
router.post("/foods", authMiddleware, addFood);

/**
 * @swagger
 * /api_v1/foods/{id}:
 *   get:
 *     summary: Get food details
 *     description: Get details of a specific food item by ID
 *     tags: [Foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the food item
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Food item details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FoodItem'
 *       404:
 *         description: Food item not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/foods/:id", getFoodById);

export default router;
