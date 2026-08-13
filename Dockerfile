# Multi-stage Dockerfile for React/Vite Portfolio

# Stage 1: Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency manifests and install dependencies
COPY package*.json ./
RUN npm ci

# Copy source files and build production artifacts
COPY . .
RUN npm run build

# Stage 2: Production stage using Nginx
FROM nginx:alpine

# Copy custom Nginx configuration (handles SPA routing, gzip, caching headers)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build artifacts from stage 1 to Nginx serve directory
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
