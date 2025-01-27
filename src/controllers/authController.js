// authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import { registerSchema, loginSchema } from "../validations/authValidation.js";
import { JWT_SECRET } from "../config/dotenv.js";
import { z } from 'zod';
import { generateAccessToken,verifyRefreshToken,generateRefreshToken } from "../utils/tokenUtils.js";

class AuthController {
 

   

    

    static async register(req, res) {
        try {
            const validatedData = registerSchema.parse(req.body);
            const hashedPassword = await bcrypt.hash(validatedData.password, 10);

            const user = await prisma.user.create({
                data: {
                    email: validatedData.email,
                    password: hashedPassword,
                },
            });

            res.status(201).json({ message: "User registered successfully", user });
        } catch (error) {
            console.error("Error during registration:", error);
            if (error instanceof z.ZodError) {
                return res.status(400).json({ errors: error.errors });
            }
            res.status(500).json({ message: "Server error", error: error.message });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) return res.status(400).json({ message: "Invalid credentials." });

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials." });

            const accessToken = generateAccessToken(user);  
            const refreshToken = await generateRefreshToken(user); 

            res.status(200).json({ accessToken, refreshToken });
        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ message: "Server error.", error: error.message });
        }
    }

    static async refresh(req, res) {
        const { token } = req.body;

        try {
            const decoded = await verifyRefreshToken(token);
            const user = await prisma.user.findUnique({ where: { id: decoded.id } });
            if (!user) return res.status(404).json({ message: "User not found." });

            const accessToken = generateAccessToken(user);
            res.status(200).json({ accessToken });
        } catch (error) {
            console.error("Refresh token error:", error);
            res.status(403).json({ message: "Invalid or expired refresh token." });
        }
    }
}

export default AuthController;
