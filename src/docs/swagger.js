import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Authentication API",
            version: "1.0.0",
            description: "API documentation for authentication system",
        },
        servers: [
            {
                url: "http://localhost:5000", // Update with your server URL
            },
        ],
    },
    apis: ["./src/routes/*.js"], // Path to your route files
};

const swaggerSpec = swaggerJsDoc(options);

export const swaggerDocs = (app, port) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`Swagger Docs available at http://localhost:${port}/api-docs`);
};
