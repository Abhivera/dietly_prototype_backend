import express from 'express';
import { getProgressData, getChartData } from '../services/analytics.js';
import { asyncHandler } from '../middlewares/asyncMiddleware.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api_v1/analytics/progress:
 *   get:
 *     summary: Get user progress data
 *     tags: [Analytics]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date for progress data
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date for progress data
 *     responses:
 *       200:
 *         description: Successfully retrieved progress data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   weight:
 *                     type: number
 *                   caloriesBurned:
 *                     type: number
 *                   caloriesConsumed:
 *                     type: number
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/analytics/progress', authMiddleware, asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  const progress = await getProgressData(
    req.user.id,
    new Date(startDate),
    new Date(endDate)
  );
  res.json(progress);
}));

/**
 * @swagger
 * /api_v1/analytics/charts:
 *   get:
 *     summary: Get chart data for user metrics
 *     tags: [Analytics]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: metric
 *         required: true
 *         schema:
 *           type: string
 *           enum: [weight, calories]
 *         description: Metric to chart
 *       - in: query
 *         name: period
 *         required: true
 *         schema:
 *           type: string
 *           enum: [week, month]
 *         description: Time period for the chart
 *     responses:
 *       200:
 *         description: Successfully retrieved chart data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   value:
 *                     type: number
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get('/analytics/charts', authMiddleware, asyncHandler(async (req, res) => {
  const { metric, period } = req.query;
  const chartData = await getChartData(req.user.id, metric, period);
  res.json(chartData);
}));

export default router;