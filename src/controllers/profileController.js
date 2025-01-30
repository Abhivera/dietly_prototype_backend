import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const userProfile = await prisma.userProfile.findUnique({
            where: { userId },
            include: { preferences: true }
        });

        if (!userProfile) {
            return res.status(404).json({ message: 'User profile not found' });
        }

        res.json(userProfile);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { name, age, weight, height, gender, goal, activityLevel, preferences } = req.body;

        const userProfile = await prisma.userProfile.upsert({
            where: { userId },
            update: { name, age, weight, height, gender, goal, activityLevel },
            create: { userId, name, age, weight, height, gender, goal, activityLevel }
        });

        if (preferences) {
            await prisma.userPreferences.upsert({
                where: { userId },
                update: preferences,
                create: { userId, ...preferences }
            });
        }

        res.json({ message: 'Profile updated successfully', userProfile });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
