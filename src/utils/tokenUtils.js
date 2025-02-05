import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/dotenv.js";  // Ensure you have JWT_SECRET loaded properly
import prisma from "../config/prisma.js";
// Generate Access Token
export const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1d' }
    );
};

// Generate Refresh Token
export const generateRefreshToken = async (user) => {
    const refreshToken = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
    );

    // Optionally save refreshToken in the database to handle invalidation in future requests
    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: user.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expiry time
        },
    });

    return refreshToken;
};

// Verify Refresh Token
export const verifyRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return reject(new Error("Invalid or expired refresh token"));
            }
            resolve(decoded);
        });
    });
};
