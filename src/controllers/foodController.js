import prisma from "../config/prisma.js";
import redisClient from "../config/redis.js";

export const getFoods = async (req, res) => {
    try {
        const cachedFoods = await redisClient.get("foods");
        if (cachedFoods) return res.json(JSON.parse(cachedFoods));

        const foods = await prisma.foodItem.findMany();
        await redisClient.set("foods", JSON.stringify(foods), { EX: 3600 });

        res.json(foods);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const addFood = async (req, res) => {
    try {
        const { name, category, calories, carbs, protein, fat, servingSize } = req.body;

        const newFood = await prisma.foodItem.create({
            data: { name, category, calories, carbs, protein, fat, servingSize },
        });

        await redisClient.del("foods"); // Clear cache
        res.status(201).json(newFood);
    } catch (err) {
        res.status(500).json({ error: "Error adding food" });
    }
};

export const getFoodById = async (req, res) => {
    try {
        const { id } = req.params;

        const cachedFood = await redisClient.get(`food:${id}`);
        if (cachedFood) return res.json(JSON.parse(cachedFood));

        const food = await prisma.foodItem.findUnique({ where: { id: parseInt(id) } });

        if (!food) return res.status(404).json({ error: "Food not found" });

        await redisClient.set(`food:${id}`, JSON.stringify(food), { EX: 3600 });
        res.json(food);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
