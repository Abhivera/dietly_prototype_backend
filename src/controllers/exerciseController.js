import prisma from "../config/prisma.js";

export const exerciseController = {
  async getAllExercises(req, res, next) {
    try {
      const exercises = await prisma.exercise.findMany({
        where: { deleted: false }
      });
      res.json(exercises);
    } catch (error) {
      next(error);
    }
  },

  async createExercise(req, res, next) {
    try {
      const { name, caloriesBurnedPerMinute } = req.body;
      
      const exercise = await prisma.exercise.create({
        data: {
          name,
          caloriesBurnedPerMinute,
        }
      });
      
      res.status(201).json(exercise);
    } catch (error) {
      next(error);
    }
  },

  async logExercise(req, res, next) {
    try {
      const userId = req.user.id;
      const { exerciseId, duration, date } = req.body;
      
      const exercise = await prisma.exercise.findFirst({
        where: { id: exerciseId, deleted: false }
      });
      
      if (!exercise) {
        return res.status(404).json({ message: 'Exercise not found' });
      }
      
      const caloriesBurned = exercise.caloriesBurnedPerMinute * duration;
      
      const exerciseLog = await prisma.exerciseLog.create({
        data: {
          userId,
          exerciseId,
          duration,
          date: new Date(date),
          caloriesBurned,
        }
      });
      
      const existingProgressLog = await prisma.progressLog.findFirst({
        where: {
          userId,
          date: new Date(date)
        }
      });

      if (existingProgressLog) {
        await prisma.progressLog.update({
          where: { id: existingProgressLog.id },
          data: {
            caloriesBurned: {
              increment: caloriesBurned
            }
          }
        });
      } else {
        await prisma.progressLog.create({
          data: {
            userId,
            date: new Date(date),
            caloriesBurned,
            caloriesConsumed: 0,
            weight: 0,
          }
        });
      }
      
      res.status(201).json(exerciseLog);
    } catch (error) {
      next(error);
    }
  },

  async getExerciseLogs(req, res, next) {
    try {
      const userId = req.user.id;
      const { date } = req.query;
      
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      
      const logs = await prisma.exerciseLog.findMany({
        where: {
          userId,
          date: {
            gte: startDate,
            lte: endDate
          },
          deleted: false
        },
        include: {
          exercise: true
        }
      });
      
      res.json(logs);
    } catch (error) {
      next(error);
    }
  },

  async deleteExerciseLog(req, res, next) {
    try {
      const userId = req.user.id;
      const logId = parseInt(req.params.id);
      
      const log = await prisma.exerciseLog.findFirst({
        where: { id: logId, userId, deleted: false }
      });
      
      if (!log) {
        return res.status(404).json({ message: 'Exercise log not found' });
      }
      
      await prisma.exerciseLog.update({
        where: { id: logId },
        data: {
          deleted: true,
          deletedAt: new Date()
        }
      });
      
      const progressLog = await prisma.progressLog.findFirst({
        where: {
          userId,
          date: log.date
        }
      });

      if (progressLog) {
        await prisma.progressLog.update({
          where: { id: progressLog.id },
          data: {
            caloriesBurned: {
              decrement: log.caloriesBurned
            }
          }
        });
      }
      
      res.json({ message: 'Exercise log deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
};