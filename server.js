import express from "express";
import { PORT } from "./src/config/dotenv.js";
import authRoutes from "./src/routes/authRoutes.js";
import cors from "cors"; // Import CORS middleware
import { swaggerDocs } from "./src/docs/swagger.js";
import profileRoutes from './src/routes/profile.js';
import preferencesRouter from './src/routes/preferences.js';
import foodRouter from './src/routes/food.js';
import requestLogger from "./src/middlewares/requestLogger.js";
import mealRoutes from "./src/routes/meal.js";
import exerciseRoutes from "./src/routes/exercise.js";
import rateLimit from "express-rate-limit";
import recommendation from "./src/routes/recommendation.js";
import "./src/cron/dailyEmailJobs.js"; // Import cron job


const app = express();

app.use(requestLogger);
// Rate limit middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per IP
  message: { error: "Too many requests, please try again later." },
  headers: true, // Show rate limit info in response headers
});

// Apply to all routes
app.use(limiter);




// Enable CORS for all origins (you can modify this for more security)
// Configure CORS
app.use(
    cors({
      origin: '*', // Allow all origins (you can replace this with your Swagger UI URL for tighter security)
      methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
      allowedHeaders: 'Content-Type,Authorization', // Allowed headers
    })
  );

// Middleware for JSON and URL encoded data
app.use(express.json());  // Handles JSON bodies
app.use(express.urlencoded({ extended: true }));  // Handles form-url-encoded bodies

// Routes
app.use("/auth", authRoutes);

app.use('/api_v1', profileRoutes);
app.use('/api_v1',preferencesRouter);
app.use('/api_v1',foodRouter);
app.use('/api_v1',mealRoutes);
app.use('/api_v1',exerciseRoutes);
app.use('/api_v1',recommendation);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Set up Swagger docs
swaggerDocs(app, PORT);
