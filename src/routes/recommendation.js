import express from 'express';
import { getMealRecommendations, getExerciseRecommendations } from '../services/recommendation.js';
import { asyncHandler } from '../middlewares/asyncMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 *  /api_v1/recommendations/meals:
 *   get:
 *     summary: Get personalized meal recommendations
 *     tags: [Recommendations]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved meal recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   category:
 *                     type: string
 *                   calories:
 *                     type: number
 *                   carbs:
 *                     type: number
 *                   protein:
 *                     type: number
 *                   fat:
 *                     type: number
 *                   servingSize:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/recommendations/meals', authMiddleware, asyncHandler(async (req, res) => {
  const recommendations = await getMealRecommendations(req.user.id);
  res.json(recommendations);
}));

/**
 * @swagger
 * /api_v1/recommendations/exercises:
 *   get:
 *     summary: Get personalized exercise recommendations
 *     tags: [Recommendations]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved exercise recommendations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   caloriesBurnedPerMinute:
 *                     type: number
 *                   recommendedDuration:
 *                     type: number
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/recommendations/exercises', authMiddleware, asyncHandler(async (req, res) => {
  const recommendations = await getExerciseRecommendations(req.user.id);
  res.json(recommendations);
}));

export default router;