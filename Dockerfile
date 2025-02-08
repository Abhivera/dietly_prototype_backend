# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy everything else
COPY . .

# Run Prisma generate
RUN npx prisma generate

# Install nodemon globally
RUN npm install -g nodemon

# Expose the application port
EXPOSE 5000

# Start the server in watch mode
CMD ["npm", "run", "server"]
