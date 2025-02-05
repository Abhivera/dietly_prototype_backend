import { Router } from 'express';
import { exerciseController } from '../controllers/exerciseController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Exercise:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         caloriesBurnedPerMinute:
 *           type: number
 *     ExerciseLog:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         exerciseId:
 *           type: integer
 *         duration:
 *           type: number
 *         caloriesBurned:
 *           type: number
 *         date:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api_v1/exercises:
 *   get:
 *     summary: Retrieve all exercises
 *     tags: [Exercises]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of exercises retrieved successfully
 *       500:
 *         description: Internal Server Error
 */
router.get('/exercises', authMiddleware, exerciseController.getAllExercises);

/**
 * @swagger
 * /api_v1/exercises:
 *   post:
 *     summary: Create a new exercise
 *     tags: [Exercises]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               caloriesBurnedPerMinute:
 *                 type: number
 *     responses:
 *       201:
 *         description: Exercise created successfully
 *       500:
 *         description: Internal Server Error
 */
router.post('/exercises', authMiddleware, exerciseController.createExercise);

/**
 * @swagger
 * /api_v1/exercises/log:
 *   post:
 *     summary: Log an exercise
 *     tags: [Exercises]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               exerciseId:
 *                 type: integer
 *               duration:
 *                 type: number
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Exercise logged successfully
 *       404:
 *         description: Exercise not found
 *       500:
 *         description: Internal Server Error
 */
router.post('/exercises/log', authMiddleware, exerciseController.logExercise);

/**
 * @swagger
 * /api_v1/exercises/log:
 *   get:
 *     summary: Retrieve exercise logs for a specific date
 *     tags: [Exercises]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       200:
 *         description: Exercise logs retrieved successfully
 *       500:
 *         description: Internal Server Error
 */
router.get('/exercises/log', authMiddleware, exerciseController.getExerciseLogs);

/**
 * @swagger
 * /api_v1/exercises/log/{id}:
 *   delete:
 *     summary: Delete an exercise log
 *     tags: [Exercises]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Exercise log deleted successfully
 *       404:
 *         description: Exercise log not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/exercises/log/:id', authMiddleware, exerciseController.deleteExerciseLog);

export default router;