import express from "express";
// import { PORT } from "./src/config/dotenv.js";
import authRoutes from "./src/routes/authRoutes.js";
import cors from "cors"; // Import CORS middleware
import { swaggerDocs } from "./src/docs/swagger.js";
import profileRoutes from './src/routes/profile.js';

const app = express();

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

// Set up the server port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Set up Swagger docs
swaggerDocs(app, PORT);
