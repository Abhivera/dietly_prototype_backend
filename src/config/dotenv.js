import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
export const PORT = process.env.PORT || 3000;
