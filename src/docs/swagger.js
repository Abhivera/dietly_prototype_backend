import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Dietly API",
            version: "1.0.0",
            description: "API documentation",
        },
        servers: [
            {
                url: "http://localhost:5000", // Your server URL (adjust if necessary)
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT", // Format of the token (JWT)
                },
            },
            schemas: {
                FoodItem: {
                    type: "object",
                    required: ["name", "category", "calories", "carbs", "protein", "fat", "servingSize"],
                    properties: {
                        id: {
                            type: "integer",
                            description: "ID of the food item",
                        },
                        name: {
                            type: "string",
                            description: "Name of the food item",
                        },
                        category: {
                            type: "string",
                            description: "Category of the food item",
                        },
                        calories: {
                            type: "number",
                            format: "float",
                            description: "Calories per serving",
                        },
                        carbs: {
                            type: "number",
                            format: "float",
                            description: "Carbohydrates per serving",
                        },
                        protein: {
                            type: "number",
                            format: "float",
                            description: "Protein per serving",
                        },
                        fat: {
                            type: "number",
                            format: "float",
                            description: "Fat per serving",
                        },
                        servingSize: {
                            type: "string",
                            description: "Serving size of the food item",
                        },
                    },
                },
                // Add more schemas here (like User, Exercise, etc.)
            },
        },
    },
    // Add paths to route files (foodRoutes.js, userRoutes.js, etc.)
    apis: ["./src/routes/*.js"], // Make sure your routes are properly documented with Swagger annotations
};

// Initialize Swagger with the options defined above
const swaggerSpec = swaggerJsdoc(options);

// Export the Swagger documentation setup
export const swaggerDocs = (app, port) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`Swagger Docs available at http://localhost:${port}/api-docs`);
};
