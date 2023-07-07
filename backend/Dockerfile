# Base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Install necessary tools
RUN apk add --no-cache build-base

# Copy the rest of the backend code to the working directory
COPY . .

# Expose the port on which the backend will run (modify if needed)
EXPOSE 8001

# Command to start the backend server
CMD ["node", "app.js"]
