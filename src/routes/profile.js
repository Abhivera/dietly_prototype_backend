import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import {authMiddleware} from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /api_v1/profile:
 *   get:
 *     summary: Fetch user profile
 *     description: Retrieve the user profile including preferences.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - User Profile
 *     responses:
 *       200:
 *         description: Successful response with user profile data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 weight:
 *                   type: number
 *                 height:
 *                   type: number
 *                 gender:
 *                   type: string
 *                 goal:
 *                   type: string
 *                 activityLevel:
 *                   type: string
 *       401:
 *         description: Unauthorized, missing or invalid token.
 *       404:
 *         description: User profile not found.
 */
router.get('/profile', authMiddleware, getProfile);

/**
 * @swagger
 * /api_v1/profile:
 *   put:
 *     summary: Update user profile
 *     description: Modify user details including weight, goals, and activity level.
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - User Profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               weight:
 *                 type: number
 *               height:
 *                 type: number
 *               gender:
 *                 type: string
 *               goal:
 *                 type: string
 *               activityLevel:
 *                 type: string
 *               preferences:
 *                 type: object
 *                 properties:
 *                   dietaryRestrictions:
 *                     type: string
 *                   dailyCalorieGoal:
 *                     type: number
 *                   waterIntakeGoal:
 *                     type: number
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *       400:
 *         description: Bad request, invalid parameters.
 *       401:
 *         description: Unauthorized.
 */
router.put('/profile', authMiddleware, updateProfile);

export default router;
