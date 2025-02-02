import prisma from "../config/prisma.js";

export const getUserPreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const preferences = await prisma.userPreferences.findUnique({ where: { userId } });
    if (!preferences) return res.status(404).json({ error: "Preferences not found" });
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUserPreferences = async (req, res) => {
  try {
    const userId = req.user.id;
    const { dietaryRestrictions, dailyCalorieGoal, waterIntakeGoal } = req.body;
    const updatedPreferences = await prisma.userPreferences.upsert({
      where: { userId },
      update: { dietaryRestrictions, dailyCalorieGoal, waterIntakeGoal },
      create: { userId, dietaryRestrictions, dailyCalorieGoal, waterIntakeGoal },
    });
    res.json(updatedPreferences);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};