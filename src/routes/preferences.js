import express from "express";
import { getUserPreferences, updateUserPreferences } from "../controllers/preferencesController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";
const router = express.Router();

/**
 * @swagger
 * /api_v1/preferences:
 *   get:
 *     summary: Fetch user preferences
 *     tags: [Preferences]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User preferences retrieved successfully
 *       404:
 *         description: Preferences not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/",authMiddleware, getUserPreferences);

/**
 * @swagger
 * /api_v1/preferences:
 *   put:
 *     summary: Update user preferences
 *     tags: [Preferences]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dietaryRestrictions:
 *                 type: string
 *               dailyCalorieGoal:
 *                 type: number
 *               waterIntakeGoal:
 *                 type: number
 *     responses:
 *       200:
 *         description: Preferences updated successfully
 *       500:
 *         description: Internal Server Error
 */
router.put("/",authMiddleware, updateUserPreferences);

export default router;
